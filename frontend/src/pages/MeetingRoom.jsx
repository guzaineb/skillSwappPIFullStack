import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaPhoneSlash, FaComments, FaUserPlus, FaRobot, FaBrain, FaSmile } from 'react-icons/fa';
import '../styles/meetingRoom.css';
import MeetingAssistant from '../components/MeetingAssistant';
import FaceDetection from '../components/FaceDetection';

// URL du serveur socket - utilise l'URL de l'API depuis l'environnement ou par défaut
const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL || window.location.origin.replace(/:\d+$/, ':5000');

// Configuration améliorée des options de socket pour résoudre les problèmes de connexion
const SOCKET_OPTIONS = {
  reconnection: true,
  reconnectionAttempts: 10,        // Augmenté pour plus de tentatives
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,      // Délai maximum entre les tentatives
  timeout: 20000,                  // Timeout augmenté
  transports: ['polling', 'websocket'], // Commencer par polling puis passer à WebSocket
  upgrade: true,                   // Permettre la mise à niveau vers WebSocket
  forceNew: true,                  // Forcer une nouvelle connexion
  autoConnect: true,               // Se connecter automatiquement
  path: '/socket.io/',             // Chemin par défaut
  query: {                         // Paramètres de requête pour le débogage
    clientVersion: '1.0.0',
    transport: 'polling,websocket'
  }
};

const MeetingRoom = () => {
  // Paramètres de l'URL
  const { meetingId } = useParams();
  const navigate = useNavigate();

  // États
  const [loading, setLoading] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenSharingUser, setScreenSharingUser] = useState(null);
  const [meetingStartTime, setMeetingStartTime] = useState(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [faceDetectionEnabled, setFaceDetectionEnabled] = useState(false);
  const [detectedExpression, setDetectedExpression] = useState(null);

  // Références
  const socketRef = useRef(null);
  const localVideoRef = useRef(null);
  const peerConnectionsRef = useRef({});
  const chatMessagesRef = useRef(null); // Ajout de la référence manquante
  // Récupérer les informations de l'utilisateur depuis le localStorage
  let user;
  try {
    const userString = localStorage.getItem('user');
    if (userString) {
      user = JSON.parse(userString);
      console.log('Utilisateur authentifié:', user);
    } else {
      // Demander le nom de l'utilisateur s'il n'est pas connecté
      const storedGuestName = sessionStorage.getItem('guestName');

      if (storedGuestName) {
        user = { name: storedGuestName };
        console.log('Nom d\'invité récupéré de la session:', storedGuestName);
      } else {
        // Utiliser un nom d'invité par défaut
        user = { name: 'Invité' };
        console.log('Utilisateur anonyme créé avec nom par défaut');

        // Afficher une boîte de dialogue pour demander le nom après le chargement
        setTimeout(() => {
          const guestName = prompt('Veuillez entrer votre nom pour la réunion:', 'Invité');
          if (guestName && guestName.trim() !== '') {
            user.name = guestName.trim();
            sessionStorage.setItem('guestName', user.name);
            console.log('Nom d\'invité mis à jour:', user.name);

            // Mettre à jour le nom dans l'interface
            document.querySelector('.local-info span').textContent = user.name;

            // Informer les autres participants du changement de nom
            if (socketRef.current && socketRef.current.connected) {
              socketRef.current.emit('user-name-change', {
                meetingId,
                name: user.name
              });
            }
          }
        }, 1000);
      }
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur:', error);
    // Fallback en cas d'erreur
    user = { name: 'Invité' };
  }

  // Configuration WebRTC améliorée avec des serveurs TURN pour traverser les NAT
  const rtcConfig = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
      {
        urls: 'turn:numb.viagenie.ca',
        username: 'webrtc@live.com',
        credential: 'muazkh'
      },
      {
        urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
        username: 'webrtc',
        credential: 'webrtc'
      }
    ],
    iceCandidatePoolSize: 10,
    // Modification de la politique de bundle pour éviter les erreurs
    bundlePolicy: 'balanced', // Changé de 'max-bundle' à 'balanced'
    rtcpMuxPolicy: 'require',
    sdpSemantics: 'unified-plan'
  };

  // Créer une connexion peer pour un participant
  const createPeerConnection = (participantSocketId) => {
    console.log(`Création d'une connexion peer pour ${participantSocketId}`);

    try {
      // Vérifier si une connexion existe déjà
      if (peerConnectionsRef.current[participantSocketId]) {
        console.log(`Une connexion existe déjà pour ${participantSocketId}, réutilisation`);
        return peerConnectionsRef.current[participantSocketId];
      }

      console.log(`Configuration RTCPeerConnection pour ${participantSocketId}:`, rtcConfig);

      // S'assurer que le flux local est disponible avant de créer la connexion
      if (!localStream) {
        console.warn(`Création de la connexion pour ${participantSocketId} sans flux local disponible`);
        console.log("Un flux vide sera créé pour éviter les erreurs");
      }

      const peerConnection = new RTCPeerConnection(rtcConfig);
      peerConnectionsRef.current[participantSocketId] = peerConnection;

      // Ajouter les pistes locales
      if (localStream) {
        console.log(`Ajout des pistes locales à la connexion pour ${participantSocketId}`);

        try {
          // Vérifier si le flux a des pistes
          const tracks = localStream.getTracks();

          if (tracks.length > 0) {
            tracks.forEach(track => {
              console.log(`Ajout de la piste ${track.kind} à la connexion pour ${participantSocketId}`);
              peerConnection.addTrack(track, localStream);
            });
          } else {
            console.warn(`Le flux local existe mais ne contient aucune piste pour ${participantSocketId}`);
            // Créer la connexion quand même, les pistes seront ajoutées plus tard
          }
        } catch (trackError) {
          console.error(`Erreur lors de l'ajout des pistes pour ${participantSocketId}:`, trackError);
        }
      } else {
        console.error(`Aucun flux local disponible pour ${participantSocketId}`);

        // Créer un événement pour ajouter les pistes plus tard quand le flux sera disponible
        const checkInterval = setInterval(() => {
          if (localStream) {
            console.log(`Flux local maintenant disponible pour ${participantSocketId}, ajout des pistes`);

            try {
              localStream.getTracks().forEach(track => {
                const senders = peerConnection.getSenders();
                const senderExists = senders.some(sender => sender.track === track);

                if (!senderExists) {
                  console.log(`Ajout différé de la piste ${track.kind} à la connexion pour ${participantSocketId}`);
                  peerConnection.addTrack(track, localStream);
                }
              });
            } catch (error) {
              console.error(`Erreur lors de l'ajout différé des pistes pour ${participantSocketId}:`, error);
            }

            clearInterval(checkInterval);
          }
        }, 1000);

        // Limiter la durée de l'intervalle à 10 secondes
        setTimeout(() => clearInterval(checkInterval), 10000);
      }

      // Gérer les candidats ICE
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log(`Candidat ICE généré pour ${participantSocketId}:`, event.candidate);
          socketRef.current.emit('ice-candidate', {
            to: participantSocketId,
            candidate: event.candidate
          });
        } else {
          console.log(`Fin de la génération de candidats ICE pour ${participantSocketId}`);
        }
      };

      // Surveiller l'état de la connexion ICE
      peerConnection.oniceconnectionstatechange = () => {
        console.log(`État de connexion ICE pour ${participantSocketId}: ${peerConnection.iceConnectionState}`);

        // Gérer les différents états de connexion
        switch (peerConnection.iceConnectionState) {
          case 'connected':
            console.log(`Connexion établie avec ${participantSocketId}`);
            break;

          case 'completed':
            console.log(`Connexion complétée avec ${participantSocketId}`);
            break;

          case 'failed':
          case 'disconnected':
            console.log(`Connexion perdue avec ${participantSocketId}, état: ${peerConnection.iceConnectionState}`);

            // Tentative de reconnexion après un délai
            setTimeout(() => {
              try {
                console.log(`Tentative de reconnexion avec ${participantSocketId}`);

                // Vérifier si la connexion existe toujours
                if (!peerConnectionsRef.current[participantSocketId]) {
                  console.log(`La connexion avec ${participantSocketId} n'existe plus, création d'une nouvelle`);
                  // Créer une nouvelle connexion
                  const newPeerConnection = createPeerConnection(participantSocketId);

                  if (!newPeerConnection) {
                    throw new Error(`Impossible de créer une nouvelle connexion pour ${participantSocketId}`);
                  }

                  // Créer une nouvelle offre avec options explicites
                  newPeerConnection.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true
                  })
                    .then(offer => {
                      // Vérifier que l'offre est valide
                      if (!offer || !offer.sdp) {
                        throw new Error(`Offre SDP invalide pour ${participantSocketId}`);
                      }
                      console.log(`Offre SDP créée pour ${participantSocketId}`);
                      return newPeerConnection.setLocalDescription(offer);
                    })
                    .then(() => {
                      // Attendre un court délai pour s'assurer que la description est bien appliquée
                      return new Promise(resolve => setTimeout(() => resolve(), 500));
                    })
                    .then(() => {
                      socketRef.current.emit('offer', {
                        to: participantSocketId,
                        offer: newPeerConnection.localDescription
                      });
                      console.log(`Nouvelle offre envoyée à ${participantSocketId}`);
                    })
                    .catch(error => {
                      console.error(`Erreur lors de la création de l'offre pour ${participantSocketId}:`, error);
                      toast.error(`Problème de connexion avec un participant: ${error.message}`);
                    });
                } else {
                  // Réutiliser la connexion existante
                  console.log(`Réutilisation de la connexion existante pour ${participantSocketId}`);

                  // Créer une nouvelle offre avec options explicites
                  peerConnectionsRef.current[participantSocketId].createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true
                  })
                    .then(offer => {
                      // Vérifier que l'offre est valide
                      if (!offer || !offer.sdp) {
                        throw new Error(`Offre SDP invalide pour ${participantSocketId}`);
                      }
                      console.log(`Offre SDP créée pour ${participantSocketId}`);
                      return peerConnectionsRef.current[participantSocketId].setLocalDescription(offer);
                    })
                    .then(() => {
                      // Attendre un court délai pour s'assurer que la description est bien appliquée
                      return new Promise(resolve => setTimeout(() => resolve(), 500));
                    })
                    .then(() => {
                      socketRef.current.emit('offer', {
                        to: participantSocketId,
                        offer: peerConnectionsRef.current[participantSocketId].localDescription
                      });
                      console.log(`Nouvelle offre envoyée à ${participantSocketId}`);
                    })
                    .catch(error => {
                      console.error(`Erreur lors de la reconnexion avec ${participantSocketId}:`, error);
                      toast.error(`Problème de reconnexion avec un participant: ${error.message}`);
                    });
                }
              } catch (error) {
                console.error(`Erreur lors de la tentative de reconnexion avec ${participantSocketId}:`, error);
              }
            }, 2000);
            break;

          case 'closed':
            console.log(`Connexion fermée avec ${participantSocketId}`);
            // Supprimer la référence à la connexion
            delete peerConnectionsRef.current[participantSocketId];
            break;

          default:
            console.log(`État de connexion ICE pour ${participantSocketId}: ${peerConnection.iceConnectionState}`);
        }
      };

      // Gérer les pistes distantes
      peerConnection.ontrack = (event) => {
        console.log(`Piste reçue de ${participantSocketId}:`, event.track.kind, event.track.label);
        console.log('Flux associés:', event.streams);

        // Activer explicitement la piste reçue et ajouter un délai pour s'assurer qu'elle est bien activée
        event.track.enabled = true;

        // Traiter les candidats ICE en attente une fois que la piste est reçue
        if (iceCandidatesQueueRef.current[participantSocketId] &&
          iceCandidatesQueueRef.current[participantSocketId].length > 0) {
          console.log(`Traitement de ${iceCandidatesQueueRef.current[participantSocketId].length} candidats ICE en attente pour ${participantSocketId}`);

          // Traiter tous les candidats en attente
          const processCandidates = async () => {
            for (const candidate of iceCandidatesQueueRef.current[participantSocketId]) {
              try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                console.log(`Candidat ICE en attente ajouté pour ${participantSocketId}`);
              } catch (error) {
                console.error(`Erreur lors de l'ajout d'un candidat ICE en attente pour ${participantSocketId}:`, error);
              }
            }
            // Vider la file d'attente
            iceCandidatesQueueRef.current[participantSocketId] = [];
          };

          processCandidates();
        }

        // Pour les pistes audio, s'assurer qu'elles sont bien audibles
        if (event.track.kind === 'audio') {
          console.log(`Configuration spéciale pour la piste audio de ${participantSocketId}`);

          // Ajouter un gestionnaire d'événements pour détecter quand la piste devient active
          event.track.onunmute = () => {
            console.log(`Piste audio de ${participantSocketId} activée (unmuted)`);
          };

          // Ajouter un gestionnaire d'événements pour détecter quand la piste devient inactive
          event.track.onmute = () => {
            console.log(`Piste audio de ${participantSocketId} désactivée (muted), tentative de réactivation`);
            event.track.enabled = true;
          };

          // Ajouter un gestionnaire d'événements pour détecter quand la piste est terminée
          event.track.onended = () => {
            console.log(`Piste audio de ${participantSocketId} terminée`);
          };
        }

        // Vérifier périodiquement que la piste est activée
        const trackCheckInterval = setInterval(() => {
          if (!event.track.enabled) {
            console.log(`Réactivation de la piste ${event.track.kind} de ${participantSocketId}`);
            event.track.enabled = true;
          }

          // Arrêter l'intervalle après 30 secondes
          setTimeout(() => clearInterval(trackCheckInterval), 30000);
        }, 1000);

        if (!event.streams || !event.streams[0]) {
          console.error(`Aucun flux reçu de ${participantSocketId}`);

          // Créer un nouveau flux si aucun n'est fourni
          const syntheticStream = new MediaStream();
          syntheticStream.addTrack(event.track);

          console.log(`Flux synthétique créé pour ${participantSocketId} avec la piste ${event.track.kind}`);

          // Ajouter un identifiant au flux pour le retrouver facilement
          syntheticStream.socketId = participantSocketId;

          // S'assurer que la piste est activée
          event.track.enabled = true;

          // Vérifier périodiquement que la piste reste activée
          const trackActiveInterval = setInterval(() => {
            if (event.track && !event.track.enabled) {
              console.log(`Réactivation de la piste ${event.track.kind} dans le flux synthétique`);
              event.track.enabled = true;
            }
          }, 1000);

          // Arrêter l'intervalle après 30 secondes
          setTimeout(() => clearInterval(trackActiveInterval), 30000);

          // Mettre à jour l'état des participants avec le flux
          updateParticipantStream(participantSocketId, syntheticStream);
          return;
        }

        const remoteStream = event.streams[0];

        // Ajouter un identifiant au flux pour le retrouver facilement
        remoteStream.socketId = participantSocketId;

        // S'assurer que toutes les pistes sont activées
        remoteStream.getTracks().forEach(track => {
          track.enabled = true;
          console.log(`Piste ${track.kind} (${track.label}) activée pour ${participantSocketId}`);

          // Ajouter un gestionnaire d'événements pour s'assurer que la piste reste activée
          track.onmute = () => {
            console.log(`Piste ${track.kind} mise en sourdine, réactivation...`);
            track.enabled = true;
          };

          // Configuration spéciale pour les pistes audio
          if (track.kind === 'audio') {
            console.log(`Configuration supplémentaire pour la piste audio de ${participantSocketId}`);

            // Vérifier si la piste est active
            console.log(`État initial de la piste audio: enabled=${track.enabled}, muted=${track.muted}, readyState=${track.readyState}`);

            // Forcer l'activation de la piste audio
            track.enabled = true;

            // Ajouter un gestionnaire d'événements pour détecter quand la piste devient active
            track.onunmute = () => {
              console.log(`Piste audio de ${participantSocketId} activée (unmuted)`);
              track.enabled = true;
            };
          }

          // Vérifier périodiquement que la piste reste activée
          const trackActiveInterval = setInterval(() => {
            if (track && !track.enabled) {
              console.log(`Réactivation de la piste ${track.kind} dans le flux distant`);
              track.enabled = true;
            }
          }, 1000);

          // Arrêter l'intervalle après 30 secondes
          setTimeout(() => clearInterval(trackActiveInterval), 30000);
        });

        console.log(`Mise à jour du participant ${participantSocketId} avec le flux reçu`);
        console.log('Pistes dans le flux:', remoteStream.getTracks().map(t => `${t.kind} (${t.label})`));

        // Vérifier si la piste est un partage d'écran
        const isScreenShare = event.track.label && (
          event.track.label.toLowerCase().includes('screen') ||
          event.track.label.toLowerCase().includes('display') ||
          event.track.label.toLowerCase().includes('window')
        );

        if (isScreenShare && event.track.kind === 'video') {
          console.log(`Piste de partage d'écran détectée de ${participantSocketId}`);
        }

        // Mettre à jour l'état des participants avec le flux
        updateParticipantStream(participantSocketId, remoteStream, isScreenShare);
      };

      // Fonction utilitaire pour mettre à jour le flux d'un participant
      const updateParticipantStream = (socketId, stream, isScreenShare = false) => {
        setParticipants(prev => {
          const participantExists = prev.some(p => p.socketId === socketId);

          if (!participantExists) {
            console.log(`Participant ${socketId} non trouvé, ajout à la liste`);

            // Vérifier si le flux contient des pistes audio
            const hasAudio = stream && stream.getAudioTracks().length > 0;
            console.log(`Le flux du nouveau participant contient ${hasAudio ? 'des' : 'aucune'} piste(s) audio`);

            // Vérifier si le flux contient des pistes vidéo
            const hasVideo = stream && stream.getVideoTracks().length > 0;
            console.log(`Le flux du nouveau participant contient ${hasVideo ? 'des' : 'aucune'} piste(s) vidéo`);

            // Si le participant n'existe pas encore, l'ajouter
            return [...prev, {
              socketId: socketId,
              name: `Participant ${socketId.substring(0, 5)}`,
              stream: stream,
              audio: hasAudio,
              video: hasVideo,
              isScreenSharing: isScreenShare
            }];
          }

          // Mettre à jour le participant existant
          return prev.map(p => {
            if (p.socketId === socketId) {
              console.log(`Mise à jour du flux pour ${p.name} (${socketId})`);

              // Vérifier si le nouveau flux contient des pistes audio
              const hasAudio = stream && stream.getAudioTracks().length > 0;
              console.log(`Le nouveau flux contient ${hasAudio ? 'des' : 'aucune'} piste(s) audio`);

              // Vérifier si le nouveau flux contient des pistes vidéo
              const hasVideo = stream && stream.getVideoTracks().length > 0;
              console.log(`Le nouveau flux contient ${hasVideo ? 'des' : 'aucune'} piste(s) vidéo`);

              // Si c'est un partage d'écran, mettre à jour l'état
              if (isScreenShare) {
                console.log(`Mise à jour de l'état de partage d'écran pour ${p.name}`);

                // Mettre à jour l'état global du partage d'écran
                setScreenSharingUser({
                  socketId: socketId,
                  name: p.name
                });
              }

              return {
                ...p,
                stream: stream,
                // Mettre à jour l'état audio/vidéo uniquement si le flux contient des pistes
                audio: hasAudio ? true : p.audio,
                video: hasVideo ? true : p.video,
                isScreenSharing: isScreenShare || p.isScreenSharing
              };
            }
            return p;
          });
        });
      };

      return peerConnection;
    } catch (error) {
      console.error('Erreur lors de la création de la connexion peer:', error);
      toast.error('Problème de connexion avec un participant');
      return null;
    }
  };

  // Fonction pour nettoyer les ressources média
  const cleanupMediaResources = () => {
    console.log('Nettoyage des ressources média...');

    // Arrêter tous les tracks du stream local
    if (localStream) {
      console.log('Arrêt des pistes du flux local');
      localStream.getTracks().forEach(track => {
        console.log(`Arrêt de la piste ${track.kind}: ${track.label}`);
        track.stop();
      });

      // Libérer explicitement le stream
      setLocalStream(null);
    }

    // Réinitialiser les références
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    // Réinitialiser les états des médias
    setVideoEnabled(false);
    setAudioEnabled(false);
  };

  // Initialiser la connexion
  useEffect(() => {
    // Nettoyer les ressources média existantes au démarrage
    cleanupMediaResources();

    // Référence au socket avec gestion améliorée des erreurs
    console.log(`Tentative de connexion au serveur socket: ${SOCKET_SERVER_URL}`);
    console.log('Options de connexion:', SOCKET_OPTIONS);

    try {
      // Créer la connexion socket avec gestion d'erreurs
      socketRef.current = io(SOCKET_SERVER_URL, SOCKET_OPTIONS);

      // Ajouter un gestionnaire d'événements pour les erreurs de connexion
      socketRef.current.on('connect_error', (error) => {
        console.error('Erreur de connexion socket:', error);
        toast.error(`Problème de connexion au serveur: ${error.message}`);

        // Vérifier si l'erreur est liée à WebSocket
        if (error.message && error.message.includes('websocket')) {
          console.log('Erreur WebSocket détectée, tentative de reconnexion avec polling uniquement...');

          // Recréer la connexion avec polling uniquement
          if (socketRef.current) {
            socketRef.current.close();
          }

          // Nouvelles options sans WebSocket
          const pollingOptions = {
            ...SOCKET_OPTIONS,
            transports: ['polling'],
            forceNew: true
          };

          console.log('Nouvelles options de connexion (polling uniquement):', pollingOptions);
          socketRef.current = io(SOCKET_SERVER_URL, pollingOptions);
        }
      });
    } catch (error) {
      console.error('Exception lors de la création de la connexion socket:', error);
      toast.error(`Erreur de connexion: ${error.message}`);
    }

    // Vérifier la connexion du socket
    socketRef.current.on('connect', () => {
      console.log('Socket connecté avec succès:', socketRef.current.id);
      console.log('Transport utilisé:', socketRef.current.io.engine.transport.name);
      toast.success(`Connecté au serveur de réunion (${socketRef.current.io.engine.transport.name})`);

      // Afficher les informations de transport
      socketRef.current.io.engine.on('upgrade', (transport) => {
        console.log(`Transport mis à niveau vers: ${transport.name}`);
        toast.info(`Connexion améliorée (${transport.name})`);
      });

      // Fonction pour initialiser les médias avec gestion d'erreurs améliorée
      const initializeMedia = async (videoEnabled = true, audioEnabled = true, retryCount = 0) => {
        console.log(`Tentative d'initialisation des médias (essai ${retryCount + 1})...`);
        console.log(`Paramètres: vidéo=${videoEnabled}, audio=${audioEnabled}`);

        try {
          // Nettoyer les ressources média existantes avant d'en créer de nouvelles
          cleanupMediaResources();

          // Forcer le navigateur à demander à nouveau les permissions
          // en ajoutant un petit délai avant de demander l'accès aux médias
          await new Promise(resolve => setTimeout(resolve, 500));

          // Vérifier les permissions d'accès aux périphériques
          console.log('Vérification des permissions...');
          try {
            const permissionStatus = await navigator.permissions.query({ name: 'camera' });
            console.log(`Statut de permission caméra: ${permissionStatus.state}`);

            if (permissionStatus.state === 'denied') {
              console.warn('Permission caméra refusée par l\'utilisateur');
              toast.error('L\'accès à la caméra a été refusé. Veuillez autoriser l\'accès dans les paramètres de votre navigateur.');
              videoEnabled = false;
            }
          } catch (permError) {
            console.log('Impossible de vérifier les permissions:', permError);
            // Continuer malgré l'erreur de vérification des permissions
          }

          // Vérifier d'abord si les périphériques sont disponibles
          console.log('Vérification des périphériques disponibles...');
          let devices = [];

          try {
            devices = await navigator.mediaDevices.enumerateDevices();
          } catch (enumError) {
            console.error('Erreur lors de l\'énumération des périphériques:', enumError);
            toast.warning('Impossible de détecter les périphériques. Tentative d\'accès direct...');

            // Si nous ne pouvons pas énumérer les périphériques, essayons quand même d'accéder aux médias
            devices = [];
          }

          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          const audioDevices = devices.filter(device => device.kind === 'audioinput');

          console.log(`Périphériques détectés: ${videoDevices.length} caméras, ${audioDevices.length} microphones`);

          // Afficher les périphériques disponibles
          videoDevices.forEach((device, index) => {
            console.log(`Caméra ${index + 1}: ${device.label || 'Sans nom'} (${device.deviceId})`);
          });

          audioDevices.forEach((device, index) => {
            console.log(`Microphone ${index + 1}: ${device.label || 'Sans nom'} (${device.deviceId})`);
          });

          // Vérifier si nous avons les périphériques nécessaires
          const hasVideo = videoDevices.length > 0;
          const hasAudio = audioDevices.length > 0;

          // Si aucun périphérique n'est détecté, cela peut être dû à des permissions non accordées
          // Nous allons quand même essayer d'accéder aux médias
          const noDevicesDetected = videoDevices.length === 0 && audioDevices.length === 0;

          if (videoEnabled && !hasVideo && !noDevicesDetected) {
            console.warn('Aucune caméra détectée mais vidéo demandée');
            toast.warning('Aucune caméra détectée. La vidéo sera désactivée.');
            videoEnabled = false;
          }

          if (audioEnabled && !hasAudio && !noDevicesDetected) {
            console.warn('Aucun microphone détecté mais audio demandé');
            toast.warning('Aucun microphone détecté. L\'audio sera désactivé.');
            audioEnabled = false;
          }

          // Options de configuration pour les contraintes média
          // Utiliser des contraintes plus simples pour éviter les problèmes de compatibilité
          const constraints = {
            audio: audioEnabled,
            video: videoEnabled ? {
              width: { ideal: 640 },
              height: { ideal: 480 },
              frameRate: { ideal: 24 }
            } : false
          };

          console.log('Utilisation de contraintes simplifiées pour améliorer la compatibilité');

          // Si nous avons des périphériques spécifiques avec des labels (permissions déjà accordées), les utiliser
          if (videoEnabled && videoDevices.length > 0 && videoDevices[0].deviceId && videoDevices[0].label) {
            console.log(`Utilisation de la caméra spécifique: ${videoDevices[0].label}`);
            constraints.video = {
              ...constraints.video,
              deviceId: { exact: videoDevices[0].deviceId }
            };
          }

          if (audioEnabled && audioDevices.length > 0 && audioDevices[0].deviceId && audioDevices[0].label) {
            console.log(`Utilisation du microphone spécifique: ${audioDevices[0].label}`);
            constraints.audio = {
              ...constraints.audio,
              deviceId: { exact: audioDevices[0].deviceId }
            };
          }

          console.log('Demande d\'accès aux périphériques avec contraintes:', JSON.stringify(constraints, null, 2));

          // Demander l'accès aux périphériques avec une approche plus robuste
          console.log('Tentative d\'accès aux périphériques avec contraintes simplifiées...');
          let stream;

          try {
            // Première tentative avec les contraintes définies
            stream = await navigator.mediaDevices.getUserMedia(constraints);
          } catch (mediaError) {
            console.warn('Première tentative échouée:', mediaError.name, mediaError.message);

            // Si la première tentative échoue, essayer avec des contraintes encore plus simples
            if (retryCount < 1) {
              console.log('Tentative avec des contraintes minimales...');
              const minimalConstraints = {
                audio: audioEnabled && { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
                video: videoEnabled && {
                  facingMode: "user",
                  width: { ideal: 320 }, // Résolution plus basse
                  height: { ideal: 240 },
                  frameRate: { max: 15 } // Framerate plus bas
                }
              };

              try {
                stream = await navigator.mediaDevices.getUserMedia(minimalConstraints);
                console.log('Accès aux médias réussi avec contraintes minimales');
              } catch (minimalError) {
                console.error('Échec avec contraintes minimales:', minimalError);
                throw minimalError; // Propager l'erreur pour la gestion plus haut
              }
            } else {
              throw mediaError; // Propager l'erreur originale
            }
          }

          console.log('Flux média obtenu avec succès:', stream);

          // Après avoir obtenu les permissions, réénumérer les périphériques pour obtenir leurs labels
          if (noDevicesDetected) {
            console.log('Réénumération des périphériques après obtention des permissions...');
            try {
              const updatedDevices = await navigator.mediaDevices.enumerateDevices();
              const updatedVideoDevices = updatedDevices.filter(device => device.kind === 'videoinput');
              const updatedAudioDevices = updatedDevices.filter(device => device.kind === 'audioinput');

              console.log(`Périphériques après permissions: ${updatedVideoDevices.length} caméras, ${updatedAudioDevices.length} microphones`);

              updatedVideoDevices.forEach((device, index) => {
                console.log(`Caméra ${index + 1}: ${device.label || 'Sans nom'} (${device.deviceId})`);
              });

              updatedAudioDevices.forEach((device, index) => {
                console.log(`Microphone ${index + 1}: ${device.label || 'Sans nom'} (${device.deviceId})`);
              });
            } catch (error) {
              console.error('Erreur lors de la réénumération des périphériques:', error);
            }
          }

          // Vérifier si le flux contient des pistes
          const videoTracks = stream.getVideoTracks();
          const audioTracks = stream.getAudioTracks();

          console.log(`Pistes obtenues: ${videoTracks.length} vidéo, ${audioTracks.length} audio`);

          // Afficher les détails des pistes vidéo
          videoTracks.forEach((track, index) => {
            console.log(`Piste vidéo ${index + 1}:`, {
              label: track.label,
              id: track.id,
              enabled: track.enabled,
              muted: track.muted,
              readyState: track.readyState,
              settings: track.getSettings()
            });
          });

          // Afficher les détails des pistes audio
          audioTracks.forEach((track, index) => {
            console.log(`Piste audio ${index + 1}:`, {
              label: track.label,
              id: track.id,
              enabled: track.enabled,
              muted: track.muted,
              readyState: track.readyState,
              settings: track.getSettings()
            });
          });

          // S'assurer que les pistes sont activées selon les préférences
          audioTracks.forEach(track => {
            track.enabled = audioEnabled;
            console.log(`Piste audio ${track.label} ${audioEnabled ? 'activée' : 'désactivée'}`);
          });

          // Forcer l'activation des pistes vidéo pour que tous les participants soient visibles
          videoTracks.forEach(track => {
            track.enabled = true; // Forcer à true au lieu de videoEnabled
            console.log(`Piste vidéo ${track.label} forcée à activée`);
          });

          // Mettre à jour les états globaux
          setAudioEnabled(audioEnabled && audioTracks.length > 0);
          setVideoEnabled(true); // Forcer l'activation de la vidéo

          // Mettre à jour l'état et les références
          setLocalStream(stream);

          // Attacher le flux à l'élément vidéo
          if (localVideoRef.current) {
            console.log('Attachement du flux à l\'élément vidéo local');
            localVideoRef.current.srcObject = stream;

            // Vérifier si l'élément vidéo est correctement configuré
            console.log('État de l\'élément vidéo:', {
              autoplay: localVideoRef.current.autoplay,
              muted: localVideoRef.current.muted,
              playsInline: localVideoRef.current.playsInline,
              controls: localVideoRef.current.controls,
              width: localVideoRef.current.width,
              height: localVideoRef.current.height
            });

            // Forcer la lecture
            try {
              const playPromise = localVideoRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => console.log('Lecture vidéo démarrée avec succès'))
                  .catch(error => {
                    console.error('Erreur lors du démarrage de la lecture vidéo:', error);

                    // Essayer à nouveau après un court délai
                    setTimeout(() => {
                      console.log('Nouvelle tentative de lecture vidéo...');
                      localVideoRef.current.play()
                        .then(() => console.log('Lecture vidéo démarrée avec succès (2e tentative)'))
                        .catch(err => console.error('Échec de la 2e tentative de lecture vidéo:', err));
                    }, 1000);
                  });
              }
            } catch (error) {
              console.error('Exception lors de la tentative de lecture vidéo:', error);
            }
          } else {
            console.warn('Référence à l\'élément vidéo local non disponible');
          }

          setLoading(false);
          setMeetingStartTime(new Date());

          // Notification de succès
          if (videoTracks.length > 0 && audioTracks.length > 0) {
            toast.success('Caméra et microphone initialisés avec succès');
          } else if (videoTracks.length > 0) {
            toast.success('Caméra initialisée avec succès (pas de microphone)');
          } else if (audioTracks.length > 0) {
            toast.success('Microphone initialisé avec succès (pas de caméra)');
          } else {
            toast.warning('Aucun périphérique média n\'a pu être initialisé');
          }

          return stream;
        } catch (error) {
          console.error('Erreur lors de l\'accès aux périphériques média:', error);

          // Gestion spécifique selon le type d'erreur
          if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            toast.error('Accès à la caméra ou au microphone refusé. Veuillez autoriser l\'accès dans les paramètres de votre navigateur.');
            setLoading(false);
          } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
            // Si les périphériques ne sont pas trouvés, essayer avec des options différentes
            if (videoEnabled && audioEnabled && retryCount === 0) {
              toast.warning('Caméra ou microphone non détecté. Tentative avec audio uniquement...');
              return initializeMedia(false, true, retryCount + 1);
            } else if (!videoEnabled && audioEnabled && retryCount === 1) {
              toast.warning('Microphone non détecté. Tentative avec vidéo uniquement...');
              return initializeMedia(true, false, retryCount + 1);
            } else {
              toast.error('Aucun périphérique média (caméra/microphone) détecté.');
              setLoading(false);
            }
          } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
            toast.error('Impossible d\'accéder à la caméra ou au microphone. Un autre programme utilise peut-être ces périphériques.');
            setLoading(false);
          } else if (error.name === 'OverconstrainedError') {
            // Si les contraintes sont trop restrictives, essayer avec des contraintes plus souples
            if (retryCount < 2) {
              toast.warning('Contraintes média trop restrictives. Tentative avec des paramètres plus souples...');
              const newConstraints = {
                audio: audioEnabled,
                video: videoEnabled
              };
              console.log('Nouvelles contraintes:', newConstraints);
              return initializeMedia(videoEnabled, audioEnabled, retryCount + 1);
            } else {
              toast.error('Impossible de satisfaire les contraintes média requises.');
              setLoading(false);
            }
          } else {
            toast.error(`Erreur d'initialisation des périphériques: ${error.message}`);
            setLoading(false);
          }

          // En cas d'échec, créer un flux vide pour permettre quand même la connexion
          if (retryCount >= 2) {
            console.log('Création d\'un flux vide après plusieurs échecs');
            const emptyStream = new MediaStream();
            setLocalStream(emptyStream);
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = emptyStream;
            }
            return emptyStream;
          }

          return null;
        }
      };

      // Initialiser les médias - forcer l'activation de la vidéo pour tous les participants
      initializeMedia(true, true).then(stream => {
        // Forcer l'activation de la vidéo
        setVideoEnabled(true);

        // S'assurer que toutes les pistes vidéo sont activées
        if (stream) {
          const videoTracks = stream.getVideoTracks();
          videoTracks.forEach(track => {
            track.enabled = true;
            console.log(`Piste vidéo ${track.label} forcée à activée`);
          });
        }
        if (stream) {
          console.log('Initialisation des médias réussie, flux obtenu:', stream);

          // Préparer les données utilisateur
          const userData = {
            name: user.name || 'Invité'
          };

          // Ajouter l'ID et l'email seulement s'ils existent
          if (user._id) {
            userData._id = user._id;
          }

          if (user.email) {
            userData.email = user.email;
          }

          console.log('Données utilisateur pour la connexion:', userData);

          // Rejoindre la réunion avec toutes les informations nécessaires
          socketRef.current.emit('join-meeting', {
            meetingId,
            user: userData,
            video: videoEnabled,
            audio: audioEnabled
          });

          console.log('Émission de l\'événement join-meeting avec les données:', {
            meetingId,
            user: userData
          });

          // Gérer les participants existants
          socketRef.current.on('meeting-participants', (participants) => {
            console.log('Participants existants reçus du serveur:', participants);

            if (!Array.isArray(participants)) {
              console.error('Format invalide pour les participants:', participants);
              return;
            }

            // Filtrer pour exclure l'utilisateur actuel
            const otherParticipants = participants.filter(
              p => p.socketId !== socketRef.current.id
            );

            console.log('Autres participants après filtrage:', otherParticipants);
            console.log('Mon socket ID:', socketRef.current.id);

            // Mettre à jour l'état des participants
            setParticipants(otherParticipants);

            // Créer des connexions peer pour chaque participant existant
            otherParticipants.forEach(participant => {
              console.log(`Création d'une connexion pour ${participant.name} (${participant.socketId})`);

              try {
                // Créer une offre pour le nouveau participant
                const peerConnection = createPeerConnection(participant.socketId);

                if (!peerConnection) {
                  console.error(`Impossible de créer une connexion pour ${participant.socketId}`);
                  return;
                }

                console.log(`Création de l'offre pour ${participant.socketId}`);

                peerConnection.createOffer({
                  offerToReceiveAudio: true,
                  offerToReceiveVideo: true
                })
                  .then(offer => {
                    // Vérifier que l'offre est valide
                    if (!offer || !offer.sdp) {
                      throw new Error(`Offre SDP invalide pour ${participant.socketId}`);
                    }
                    console.log(`Offre créée pour ${participant.socketId}:`, offer);
                    return peerConnection.setLocalDescription(offer);
                  })
                  .then(() => {
                    // Vérifier que la description locale est définie
                    if (!peerConnection.localDescription) {
                      throw new Error(`Description locale non définie pour ${participant.socketId}`);
                    }
                    console.log(`Description locale définie pour ${participant.socketId}`);

                    // Attendre un court délai pour s'assurer que la description est bien appliquée
                    return new Promise(resolve => setTimeout(() => resolve(), 500));
                  })
                  .then(() => {
                    socketRef.current.emit('offer', {
                      to: participant.socketId,
                      offer: peerConnection.localDescription
                    });
                    console.log(`Offre envoyée à ${participant.socketId}`);
                  })
                  .catch(error => {
                    console.error(`Erreur lors de la création de l'offre pour ${participant.socketId}:`, error);
                  });
              } catch (error) {
                console.error(`Erreur lors de la création de la connexion pour ${participant.socketId}:`, error);
              }
            });
          });

          // Gérer les nouveaux participants
          socketRef.current.on('user-joined', (participant) => {
            console.log(`Nouveau participant a rejoint: ${participant.name} (${participant.socketId})`);

            // Vérifier si le participant n'est pas déjà dans la liste
            setParticipants(prev => {
              // Vérifier si le participant existe déjà
              const exists = prev.some(p => p.socketId === participant.socketId);
              if (exists) {
                console.log(`Le participant ${participant.name} existe déjà dans la liste`);
                return prev;
              }

              // Créer un MediaStream vide pour le nouveau participant
              const emptyStream = new MediaStream();

              console.log(`Ajout du participant ${participant.name} à la liste avec un stream vide`);
              return [...prev, {
                ...participant,
                stream: emptyStream // Ajouter un stream vide pour préparer la réception
              }];
            });

            // Attendre que le nouveau participant envoie une offre
            console.log(`En attente d'une offre de ${participant.name} (${participant.socketId})`);
          });

          // Gérer les départs de participants
          socketRef.current.on('user-left', ({ socketId }) => {
            console.log(`Participant parti: ${socketId}`);

            // Fermer la connexion peer
            if (peerConnectionsRef.current[socketId]) {
              peerConnectionsRef.current[socketId].close();
              delete peerConnectionsRef.current[socketId];
            }

            // Mettre à jour l'état des participants
            setParticipants(prev => prev.filter(p => p.socketId !== socketId));

            // Notification
            toast.info('Un participant a quitté la réunion');
          });

          // Gérer les offres reçues
          socketRef.current.on('offer', async ({ from, offer }) => {
            console.log(`Offre reçue de ${from}:`, offer);

            try {
              let peerConnection = peerConnectionsRef.current[from];

              if (!peerConnection) {
                console.log(`Création d'une nouvelle connexion pour ${from} suite à une offre`);
                peerConnection = createPeerConnection(from);

                if (!peerConnection) {
                  throw new Error(`Impossible de créer une connexion pour ${from}`);
                }
              }

              // Vérifier si l'offre est valide
              if (!offer || !offer.type) {
                throw new Error(`Offre invalide reçue de ${from}`);
              }

              console.log(`Définition de la description distante pour ${from}`);
              await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

              console.log(`Création d'une réponse pour ${from}`);
              const answer = await peerConnection.createAnswer();

              console.log(`Définition de la description locale pour ${from}`);
              await peerConnection.setLocalDescription(answer);

              console.log(`Envoi de la réponse à ${from}`);
              socketRef.current.emit('answer', {
                to: from,
                answer: peerConnection.localDescription
              });

              console.log(`Réponse envoyée à ${from}`);
            } catch (error) {
              console.error(`Erreur lors du traitement de l'offre de ${from}:`, error);
            }
          });

          // Gérer les réponses reçues
          socketRef.current.on('answer', async ({ from, answer }) => {
            console.log(`Réponse reçue de ${from}:`, answer);

            try {
              const peerConnection = peerConnectionsRef.current[from];

              if (!peerConnection) {
                throw new Error(`Aucune connexion trouvée pour ${from}`);
              }

              // Vérifier si la réponse est valide
              if (!answer || !answer.type) {
                throw new Error(`Réponse invalide reçue de ${from}`);
              }

              console.log(`Définition de la description distante pour ${from} (réponse)`);
              await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
              console.log(`Description distante définie pour ${from}`);
            } catch (error) {
              console.error(`Erreur lors du traitement de la réponse de ${from}:`, error);
            }
          });

          // Gérer les candidats ICE
          socketRef.current.on('ice-candidate', async ({ from, candidate }) => {
            console.log(`Candidat ICE reçu de ${from}:`, candidate);

            try {
              // Vérifier si la connexion existe
              let peerConnection = peerConnectionsRef.current[from];

              // Si la connexion n'existe pas, la créer et la stocker
              if (!peerConnection) {
                console.log(`Connexion non trouvée pour ${from}, création d'une nouvelle connexion`);

                // Créer une nouvelle connexion
                peerConnection = createPeerConnection(from);

                if (!peerConnection) {
                  console.error(`Impossible de créer une connexion pour ${from}`);
                  return;
                }

                // Ajouter le candidat ICE à une file d'attente pour le traiter plus tard
                if (!iceCandidatesQueueRef.current[from]) {
                  iceCandidatesQueueRef.current[from] = [];
                }

                iceCandidatesQueueRef.current[from].push(candidate);
                console.log(`Candidat ICE mis en file d'attente pour ${from}`);

                // Attendre que la connexion soit établie avant de traiter les candidats
                return;
              }

              if (!candidate) {
                console.warn(`Candidat ICE invalide reçu de ${from}`);
                return;
              }

              // Vérifier l'état de la connexion
              const connectionState = peerConnection.connectionState || peerConnection.iceConnectionState;
              console.log(`État de la connexion pour ${from}: ${connectionState}`);

              // Si la connexion n'est pas encore établie, mettre le candidat en file d'attente
              if (connectionState === 'new' || connectionState === 'checking') {
                if (!iceCandidatesQueueRef.current[from]) {
                  iceCandidatesQueueRef.current[from] = [];
                }

                iceCandidatesQueueRef.current[from].push(candidate);
                console.log(`Candidat ICE mis en file d'attente pour ${from} (connexion en cours d'établissement)`);
                return;
              }

              console.log(`Ajout du candidat ICE pour ${from}`);
              await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
              console.log(`Candidat ICE ajouté pour ${from}`);
            } catch (error) {
              console.error(`Erreur lors de l'ajout du candidat ICE de ${from}:`, error);
            }
          });

          // Gérer les changements d'état des médias
          socketRef.current.on('user-media-changed', ({ socketId, audio, video }) => {
            console.log(`Changement d'état média pour ${socketId}: audio=${audio}, video=${video}`);

            setParticipants(prev => {
              return prev.map(p => {
                if (p.socketId === socketId) {
                  // Mettre à jour l'état des médias du participant
                  return { ...p, audio, video };
                }
                return p;
              });
            });
          });

          // Gérer les notifications de partage d'écran
          socketRef.current.on('screen-sharing-changed', ({ socketId, isSharing, userName, timestamp }) => {
            console.log(`Partage d'écran ${isSharing ? 'démarré' : 'arrêté'} par ${userName} (${socketId})`);

            // Si c'est notre propre événement de partage d'écran, mettre à jour l'état local
            if (socketId === socketRef.current.id) {
              setIsScreenSharing(isSharing);
            }

            // Mettre à jour l'état global du partage d'écran
            if (isSharing) {
              setScreenSharingUser({
                socketId,
                name: userName,
                timestamp
              });

              // Notification seulement si ce n'est pas nous qui partageons
              if (socketId !== socketRef.current.id) {
                toast.info(`${userName} a commencé à partager son écran`);
              }
            } else {
              // Si c'est le participant qui partageait qui a arrêté
              if (screenSharingUser && screenSharingUser.socketId === socketId) {
                setScreenSharingUser(null);

                // Notification seulement si ce n'est pas nous qui arrêtons de partager
                if (socketId !== socketRef.current.id) {
                  toast.info(`${userName} a arrêté de partager son écran`);
                }
              }
            }

            // Mettre à jour l'état du participant
            setParticipants(prev => {
              return prev.map(p => {
                if (p.socketId === socketId) {
                  return { ...p, isScreenSharing: isSharing };
                }
                return p;
              });
            });
          });

          // Gérer les conflits de partage d'écran
          socketRef.current.on('screen-sharing-conflict', ({ message }) => {
            console.log(`Conflit de partage d'écran: ${message}`);

            // Arrêter notre tentative de partage d'écran
            setIsScreenSharing(false);

            // Arrêter toutes les pistes de partage d'écran
            if (localVideoRef.current && localVideoRef.current.srcObject) {
              const currentTracks = localVideoRef.current.srcObject.getTracks();
              currentTracks.forEach(track => {
                if (track.kind === 'video' && track.label && track.label.includes('screen')) {
                  console.log('Arrêt de la piste de partage d\'écran suite à un conflit:', track.label);
                  track.stop();
                }
              });
            }

            // Restaurer la vidéo locale
            if (localStream && localVideoRef.current) {
              localVideoRef.current.srcObject = localStream;
            }

            // Notification
            toast.warning(message);
          });

          // Gérer les changements de nom d'utilisateur
          socketRef.current.on('user-name-changed', ({ socketId, oldName, newName }) => {
            console.log(`Changement de nom pour ${socketId}: ${oldName} -> ${newName}`);

            // Mettre à jour l'état du participant
            setParticipants(prev => {
              return prev.map(p => {
                if (p.socketId === socketId) {
                  return { ...p, name: newName };
                }
                return p;
              });
            });

            // Notification
            toast.info(`${oldName} s'appelle maintenant ${newName}`);

            // Mettre à jour les messages de chat avec le nouveau nom
            setChatMessages(prev => {
              return prev.map(msg => {
                if (msg.socketId === socketId) {
                  return { ...msg, sender: newName };
                }
                return msg;
              });
            });
          });

          // Écouter les messages de chat
          socketRef.current.on('chat-message', (message) => {
            console.log('Message de chat reçu:', message);

            if (!message || !message.text) {
              console.error('Format de message invalide:', message);
              return;
            }

            // Extraire les données du message
            const { sender, senderId, socketId, text, timestamp } = message;

            console.log(`Message reçu de ${sender || 'Inconnu'}: ${text}`);

            // Générer un ID unique pour le message pour éviter les doublons
            const messageId = `${socketId || senderId}-${timestamp}-${text.substring(0, 10)}`;

            // Ajouter le message à la liste
            setChatMessages(prev => {
              // Vérifier si le message existe déjà (éviter les doublons)
              const exists = prev.some(m =>
                // Vérifier par ID unique si disponible
                (m.messageId === messageId) ||
                // Sinon, vérifier par contenu et expéditeur
                ((m.senderId === senderId || m.socketId === socketId) &&
                  m.text === text &&
                  m.timestamp === timestamp)
              );

              if (exists) {
                console.log('Message déjà présent, ignoré');
                return prev;
              }

              console.log('Ajout du message à la liste');

              // Ajouter le message avec toutes les informations nécessaires
              return [...prev, {
                messageId,
                sender,
                senderId,
                socketId: socketId || null,
                text,
                timestamp,
                isRead: false // Marquer comme non lu initialement
              }];
            });

            // Notification si le chat n'est pas ouvert
            if (!isChatOpen) {
              // Notification visuelle (badge)
              // La notification est gérée par le CSS via le rendu conditionnel

              // Notification toast seulement si le message vient d'un autre utilisateur
              if (socketId !== socketRef.current?.id) {
                toast.info(`Nouveau message de ${sender || 'Inconnu'}`);

                // Jouer un son de notification
                try {
                  const audio = new Audio('/assets/sounds/message.mp3');
                  audio.volume = 0.5;
                  audio.play().catch(e => console.log('Impossible de jouer le son de notification:', e));
                } catch (error) {
                  console.log('Erreur lors de la lecture du son:', error);
                }
              }
            } else {
              // Si le chat est ouvert, marquer le message comme lu
              setTimeout(() => {
                setChatMessages(prev =>
                  prev.map(msg =>
                    msg.messageId === messageId ? { ...msg, isRead: true } : msg
                  )
                );
              }, 2000);
            }

            // Faire défiler vers le bas
            if (chatMessagesRef.current) {
              setTimeout(() => {
                chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
              }, 100);
            }
          });
        }
      }).catch(error => {
        console.error('Erreur lors de l\'accès aux périphériques média:', error);
        setLoading(false);
        toast.error('Impossible d\'accéder à la caméra ou au microphone');
      });

      // Gérer les erreurs de connexion socket
      socketRef.current.on('connect_error', (error) => {
        console.error('Erreur de connexion socket:', error);
        toast.error('Problème de connexion au serveur de réunion. Tentative de reconnexion...');
      });

      socketRef.current.on('connect_timeout', () => {
        console.error('Timeout de connexion socket');
        toast.error('La connexion au serveur a expiré. Tentative de reconnexion...');
      });

      socketRef.current.on('reconnect', (attemptNumber) => {
        console.log(`Reconnecté au serveur après ${attemptNumber} tentatives`);
        toast.success('Reconnecté au serveur de réunion');
      });

      socketRef.current.on('reconnect_failed', () => {
        console.error('Échec de reconnexion socket');
        toast.error('Impossible de se reconnecter au serveur. Veuillez rafraîchir la page.');
      });

      socketRef.current.on('error', (error) => {
        console.error('Erreur socket:', error);
        toast.error(`Erreur de communication: ${error.message || 'Erreur inconnue'}`);
      });

      // Écouter les erreurs spécifiques à la réunion
      socketRef.current.on('meeting-error', (error) => {
        console.error('Erreur de réunion:', error);

        // Afficher un message d'erreur adapté
        switch (error.code) {
          case 'MEETING_NOT_FOUND':
            toast.error('Cette réunion n\'existe pas ou a été terminée');
            setTimeout(() => navigate('/'), 3000);
            break;

          case 'MEETING_ENDED':
            toast.error('Cette réunion est déjà terminée. Tentative de réactivation...');
            // Attendre un peu puis recharger la page pour réessayer
            setTimeout(() => {
              window.location.reload();
            }, 3000);
            break;

          case 'MEETING_REACTIVATION_ERROR':
            toast.error('Impossible de réactiver la réunion. Veuillez en créer une nouvelle.');
            setTimeout(() => navigate('/'), 3000);
            break;

          case 'MEETING_CREATION_ERROR':
            toast.error('Impossible de créer la réunion automatiquement');
            setTimeout(() => navigate('/'), 3000);
            break;

          case 'SERVER_ERROR':
            toast.error('Erreur serveur lors de la connexion à la réunion');
            // Tenter de se reconnecter après un délai
            setTimeout(() => {
              toast.info('Tentative de reconnexion...');
              window.location.reload();
            }, 5000);
            break;

          default:
            toast.error(error.message || 'Erreur lors de la connexion à la réunion');
        }
      });

      socketRef.current.on('disconnect', (reason) => {
        console.log('Socket déconnecté:', reason);
        toast.warning('Déconnecté du serveur de réunion');
      });
    });

    // Nettoyage à la déconnexion
    return () => {
      console.log('Nettoyage des ressources lors de la déconnexion...');

      // Fermer toutes les connexions peer
      Object.values(peerConnectionsRef.current).forEach(connection => {
        if (connection) {
          try {
            console.log(`Fermeture de la connexion peer: ${connection.connectionState || 'état inconnu'}`);
            connection.close();
          } catch (error) {
            console.error('Erreur lors de la fermeture de la connexion peer:', error);
          }
        }
      });

      // Vider la référence des connexions peer
      peerConnectionsRef.current = {};

      // Nettoyer les ressources média
      cleanupMediaResources();

      // Déconnecter le socket
      if (socketRef.current) {
        try {
          console.log('Déconnexion du socket:', socketRef.current.id);
          socketRef.current.disconnect();
          socketRef.current = null;
        } catch (error) {
          console.error('Erreur lors de la déconnexion du socket:', error);
        }
      }

      // Réinitialiser les états
      setParticipants([]);
      setChatMessages([]);
      setScreenSharingUser(null);
      setIsScreenSharing(false);

      console.log('Nettoyage des ressources terminé');
    };
  }, [meetingId, navigate]);

  // Effet pour faire défiler le chat vers le bas à chaque nouveau message
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Fonction pour envoyer un message
  const sendMessage = (e) => {
    e.preventDefault();

    const messageText = newMessage.trim();
    if (messageText === '') return;

    console.log('Tentative d\'envoi de message:', messageText);

    // Générer un timestamp unique
    const timestamp = new Date().toISOString();

    // Générer un ID unique pour le message
    const messageId = `${socketRef.current?.id || 'local'}-${timestamp}-${messageText.substring(0, 10)}`;

    const messageData = {
      messageId,
      sender: user.name || 'Utilisateur',
      senderId: user._id || 'anonymous',
      socketId: socketRef.current?.id, // Ajouter le socketId pour identifier l'expéditeur
      text: messageText,
      timestamp
    };

    try {
      // Vérifier si le socket est connecté
      if (!socketRef.current) {
        throw new Error('Socket non initialisé');
      }

      if (!socketRef.current.connected) {
        throw new Error('Socket non connecté');
      }

      console.log('Émission du message via socket:', messageData);

      // Ajouter immédiatement le message à la liste locale pour une meilleure réactivité
      // Il sera remplacé par la version du serveur quand elle sera reçue
      setChatMessages(prev => [...prev, {
        ...messageData,
        isLocal: true, // Marquer comme message local en attente de confirmation
        isRead: true
      }]);

      // Envoyer le message à tous les participants (y compris soi-même)
      socketRef.current.emit('chat-message', {
        meetingId,
        message: messageData
      });

      console.log('Message envoyé avec succès');

      // Réinitialiser le champ de saisie
      setNewMessage('');

      // Le message sera mis à jour dans la liste lorsqu'il sera reçu via l'événement 'chat-message'
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);

      // En cas d'erreur, ajouter quand même le message localement
      setChatMessages(prev => [...prev, {
        ...messageData,
        error: true, // Marquer comme ayant échoué
        errorMessage: error.message
      }]);

      toast.error(`Problème lors de l'envoi du message: ${error.message}`);

      // Réinitialiser le champ de saisie
      setNewMessage('');
    }
  };

  // Rendu du chat avec gestion d'erreurs
  const renderChat = () => {
    return (
      <div className={`chat-panel ${isChatOpen ? 'open' : 'closed'}`}>
        <div className="chat-header">
          <h3>Chat de réunion</h3>
          <button className="close-chat" onClick={() => setIsChatOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="chat-messages" ref={chatMessagesRef}>
          {chatMessages.length === 0 ? (
            <div className="no-messages">Aucun message pour le moment</div>
          ) : (
            chatMessages.map((msg, index) => {
              // Déterminer si le message a été envoyé par l'utilisateur actuel
              const isCurrentUser = msg.socketId === socketRef.current?.id ||
                (user._id && msg.senderId === user._id) ||
                msg.isLocal;

              // Déterminer les classes CSS supplémentaires
              const messageClasses = [
                'message',
                isCurrentUser ? 'sent' : 'received',
                msg.error ? 'error' : '',
                msg.isLocal && !msg.error ? 'pending' : '',
                !msg.isRead ? 'unread' : ''
              ].filter(Boolean).join(' ');

              return (
                <div
                  key={msg.messageId || index}
                  className={messageClasses}
                >
                  <div className="message-sender">
                    {isCurrentUser ? 'Vous' : msg.sender}
                    {msg.isLocal && !msg.error && (
                      <span className="message-status"> (envoi en cours...)</span>
                    )}
                    {msg.error && (
                      <span className="message-status error"> (échec d'envoi)</span>
                    )}
                  </div>
                  <div className="message-text">{msg.text}</div>
                  <div className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  {msg.error && (
                    <div className="message-error-info">
                      {msg.errorMessage || "Erreur d'envoi"}
                      <button
                        className="retry-button"
                        onClick={() => {
                          // Retenter l'envoi du message
                          if (socketRef.current && socketRef.current.connected) {
                            // Supprimer le message en erreur
                            setChatMessages(prev => prev.filter(m => m.messageId !== msg.messageId));

                            // Créer un nouveau message avec le même texte
                            const newMessage = {
                              ...msg,
                              messageId: `${socketRef.current.id}-${new Date().toISOString()}-${msg.text.substring(0, 10)}`,
                              timestamp: new Date().toISOString(),
                              error: false,
                              errorMessage: undefined
                            };

                            // Envoyer le nouveau message
                            socketRef.current.emit('chat-message', {
                              meetingId,
                              message: newMessage
                            });
                          }
                        }}
                      >
                        Réessayer
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <form className="chat-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="chat-input"
          />
          <button
            type="submit"
            className="send-button"
            disabled={newMessage.trim() === ''}
            title="Envoyer le message"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>

        {/* Indicateur de statut de connexion */}
        <div className={`connection-status ${socketRef.current?.connected ? 'connected' : 'disconnected'}`}>
          {socketRef.current?.connected ? 'Connecté' : 'Déconnecté'}
        </div>
      </div>
    );
  };

  // Fonction pour activer/désactiver l'audio avec gestion d'erreurs améliorée
  const toggleAudio = async () => {
    console.log('Tentative de basculement de l\'état du microphone');

    try {
      // Si nous n'avons pas de flux local, créer un nouveau
      if (!localStream) {
        console.log('Aucun flux local disponible, création d\'un nouveau flux');

        try {
          // Obtenir un nouveau flux audio uniquement d'abord
          const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            },
            video: false
          });

          // Puis obtenir un flux vidéo si nécessaire
          let combinedStream;

          if (videoEnabled) {
            try {
              const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });

              // Créer un nouveau MediaStream combiné
              combinedStream = new MediaStream();

              // Ajouter toutes les pistes audio
              audioStream.getAudioTracks().forEach(track => {
                combinedStream.addTrack(track);
              });

              // Ajouter toutes les pistes vidéo
              videoStream.getVideoTracks().forEach(track => {
                combinedStream.addTrack(track);
              });
            } catch (videoError) {
              console.error('Erreur lors de l\'obtention du flux vidéo:', videoError);
              // Utiliser uniquement le flux audio en cas d'échec
              combinedStream = audioStream;
            }
          } else {
            combinedStream = audioStream;
          }

          // Mettre à jour le flux local
          setLocalStream(combinedStream);

          // Mettre à jour la vidéo locale
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = combinedStream;

            // Forcer la lecture
            try {
              await localVideoRef.current.play();
              console.log('Lecture de la vidéo locale démarrée avec succès');
            } catch (playError) {
              console.error('Erreur lors de la lecture de la vidéo locale:', playError);
            }
          }

          // Activer l'audio
          setAudioEnabled(true);

          // Informer les autres participants
          if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit('media-state-change', {
              audio: true,
              video: videoEnabled
            });
          }

          toast.success('Microphone activé avec succès');
          return;
        } catch (error) {
          console.error('Erreur lors de la création d\'un nouveau flux:', error);
          toast.error(`Impossible d'accéder au microphone: ${error.message}`);
          return;
        }
      }

      // Obtenir les pistes audio
      const audioTracks = localStream.getAudioTracks();

      // Si nous n'avons pas de pistes audio, en obtenir de nouvelles
      if (audioTracks.length === 0) {
        console.log('Aucune piste audio trouvée, tentative d\'obtention d\'une nouvelle piste');

        try {
          // Obtenir un nouveau flux audio uniquement
          const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          });

          // Ajouter les pistes audio au flux existant
          audioStream.getAudioTracks().forEach(track => {
            localStream.addTrack(track);
          });

          // Activer l'audio
          setAudioEnabled(true);

          // Informer les autres participants
          if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit('media-state-change', {
              audio: true,
              video: videoEnabled
            });
          }

          toast.success('Microphone activé avec succès');
          return;
        } catch (error) {
          console.error('Erreur lors de l\'obtention d\'une nouvelle piste audio:', error);
          toast.error(`Impossible d'accéder au microphone: ${error.message}`);
          return;
        }
      }

      // Inverser l'état de l'audio
      const newAudioState = !audioEnabled;

      // Appliquer le nouvel état à toutes les pistes audio
      audioTracks.forEach(track => {
        track.enabled = newAudioState;
        console.log(`Piste audio ${track.label} ${newAudioState ? 'activée' : 'désactivée'}`);
      });

      // Mettre à jour l'état global
      setAudioEnabled(newAudioState);

      // Informer les autres participants
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('media-state-change', {
          audio: newAudioState,
          video: videoEnabled
        });
      }

      // Feedback visuel
      toast.info(`Microphone ${newAudioState ? 'activé' : 'désactivé'}`);

    } catch (error) {
      console.error('Erreur lors du basculement de l\'état du microphone:', error);
      toast.error(`Erreur: ${error.message}`);
    }
  };

  // Fonction pour activer/désactiver la vidéo avec gestion d'erreurs améliorée
  const toggleVideo = async () => {
    console.log('Tentative de basculement de l\'état de la caméra');

    try {
      // Si nous n'avons pas de flux local, créer un nouveau
      if (!localStream) {
        console.log('Aucun flux local disponible, création d\'un nouveau flux');

        try {
          // Obtenir un nouveau flux vidéo uniquement d'abord
          const videoStream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              frameRate: { ideal: 30 }
            },
            audio: false
          });

          // Puis obtenir un flux audio si nécessaire
          let combinedStream;

          if (audioEnabled) {
            try {
              const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                  echoCancellation: true,
                  noiseSuppression: true,
                  autoGainControl: true
                }
              });

              // Créer un nouveau MediaStream combiné
              combinedStream = new MediaStream();

              // Ajouter toutes les pistes vidéo
              videoStream.getVideoTracks().forEach(track => {
                combinedStream.addTrack(track);
              });

              // Ajouter toutes les pistes audio
              audioStream.getAudioTracks().forEach(track => {
                combinedStream.addTrack(track);
              });
            } catch (audioError) {
              console.error('Erreur lors de l\'obtention du flux audio:', audioError);
              // Utiliser uniquement le flux vidéo en cas d'échec
              combinedStream = videoStream;
            }
          } else {
            combinedStream = videoStream;
          }

          // Mettre à jour le flux local
          setLocalStream(combinedStream);

          // Mettre à jour la vidéo locale
          if (localVideoRef.current) {
            // Arrêter toute lecture en cours
            if (!localVideoRef.current.paused) {
              localVideoRef.current.pause();
            }

            // Définir la nouvelle source
            localVideoRef.current.srcObject = combinedStream;

            // Forcer la lecture avec gestion d'erreur
            try {
              await localVideoRef.current.play();
              console.log('Lecture de la vidéo locale démarrée avec succès');
            } catch (playError) {
              console.error('Erreur lors de la lecture de la vidéo locale:', playError);
              // Réessayer après un court délai
              setTimeout(async () => {
                try {
                  await localVideoRef.current.play();
                  console.log('Lecture de la vidéo locale démarrée avec succès (2e tentative)');
                } catch (retryError) {
                  console.error('Échec de la seconde tentative de lecture vidéo:', retryError);
                }
              }, 500);
            }
          }

          // Activer la vidéo
          setVideoEnabled(true);

          // Informer les autres participants
          if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit('media-state-change', {
              audio: audioEnabled,
              video: true
            });
          }

          toast.success('Caméra activée avec succès');
          return;
        } catch (error) {
          console.error('Erreur lors de la création d\'un nouveau flux:', error);
          toast.error(`Impossible d'accéder à la caméra: ${error.message}`);
          return;
        }
      }

      // Obtenir les pistes vidéo
      const videoTracks = localStream.getVideoTracks();

      // Si nous n'avons pas de pistes vidéo, en obtenir de nouvelles
      if (videoTracks.length === 0) {
        console.log('Aucune piste vidéo trouvée, tentative d\'obtention d\'une nouvelle piste');

        try {
          // Obtenir un nouveau flux vidéo uniquement
          const videoStream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              frameRate: { ideal: 30 }
            }
          });

          // Ajouter les pistes vidéo au flux existant
          videoStream.getVideoTracks().forEach(track => {
            localStream.addTrack(track);
          });

          // Mettre à jour l'élément vidéo
          if (localVideoRef.current) {
            // Arrêter toute lecture en cours
            if (!localVideoRef.current.paused) {
              localVideoRef.current.pause();
            }

            // Définir la nouvelle source
            localVideoRef.current.srcObject = localStream;

            // Forcer la lecture avec gestion d'erreur
            try {
              await localVideoRef.current.play();
              console.log('Lecture de la vidéo locale démarrée avec succès');
            } catch (playError) {
              console.error('Erreur lors de la lecture de la vidéo locale:', playError);
            }
          }

          // Activer la vidéo
          setVideoEnabled(true);

          // Informer les autres participants
          if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit('media-state-change', {
              audio: audioEnabled,
              video: true
            });
          }

          toast.success('Caméra activée avec succès');
          return;
        } catch (error) {
          console.error('Erreur lors de l\'obtention d\'une nouvelle piste vidéo:', error);
          toast.error(`Impossible d'accéder à la caméra: ${error.message}`);
          return;
        }
      }

      // Inverser l'état de la vidéo
      const newVideoState = !videoEnabled;

      // Appliquer le nouvel état à toutes les pistes vidéo
      videoTracks.forEach(track => {
        track.enabled = newVideoState;
        console.log(`Piste vidéo ${track.label} ${newVideoState ? 'activée' : 'désactivée'}`);
      });

      // Mettre à jour l'état global
      setVideoEnabled(newVideoState);

      // Informer les autres participants
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('media-state-change', {
          audio: audioEnabled,
          video: newVideoState
        });
      }

      // Feedback visuel
      toast.info(`Caméra ${newVideoState ? 'activée' : 'désactivée'}`);

    } catch (error) {
      console.error('Erreur lors du basculement de l\'état de la caméra:', error);
      toast.error(`Erreur: ${error.message}`);
    }
  };



  // Fonction pour quitter la réunion
  const leaveMeeting = () => {
    // Enregistrer la fin de la réunion dans la base de données
    if (socketRef.current) {
      socketRef.current.emit('leave-meeting', { meetingId });
    }

    // Arrêter tous les tracks du stream local
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }

    // Notification
    toast.success('Vous avez quitté la réunion');

    // Redirection
    navigate('/profile');
  };

  // Fonction pour partager l'écran
  const shareScreen = async () => {
    try {
      // Si déjà en train de partager l'écran, arrêter le partage
      if (isScreenSharing) {
        stopScreenSharing();
        return;
      }

      console.log('Tentative de partage d\'écran...');

      // Demander à l'utilisateur de sélectionner l'écran à partager
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false // L'audio du partage d'écran peut causer des problèmes d'écho
      });

      console.log('Flux de partage d\'écran obtenu:', screenStream);

      // Sauvegarder une référence au flux de la caméra
      const originalStream = localStream;

      // Obtenir la piste vidéo du partage d'écran
      const screenVideoTrack = screenStream.getVideoTracks()[0];

      if (!screenVideoTrack) {
        throw new Error('Aucune piste vidéo trouvée dans le flux de partage d\'écran');
      }

      // Créer un nouveau flux qui combine l'audio original et la vidéo du partage d'écran
      const combinedStream = new MediaStream();

      // Ajouter la piste vidéo du partage d'écran
      combinedStream.addTrack(screenVideoTrack);

      // Ajouter les pistes audio du flux original (microphone)
      if (originalStream) {
        originalStream.getAudioTracks().forEach(track => {
          combinedStream.addTrack(track);
        });
      }

      // Mettre à jour l'état
      setIsScreenSharing(true);

      // Remplacer la piste vidéo dans toutes les connexions peer
      Object.values(peerConnectionsRef.current).forEach(pc => {
        try {
          console.log('Connexion peer:', pc);
          console.log('État de la connexion:', pc.connectionState);
          console.log('État de la signalisation:', pc.signalingState);

          // Vérifier si la connexion est active
          if (pc.connectionState === 'connected' || pc.connectionState === 'connecting' || !pc.connectionState) {
            const senders = pc.getSenders();
            console.log('Émetteurs disponibles:', senders.length);

            // Trouver l'émetteur vidéo
            const videoSender = senders.find(s => s.track && s.track.kind === 'video');

            if (videoSender) {
              console.log('Émetteur vidéo trouvé, remplacement de la piste par le partage d\'écran');
              console.log('Ancienne piste:', videoSender.track.label);
              console.log('Nouvelle piste:', screenVideoTrack.label);

              // Remplacer la piste
              videoSender.replaceTrack(screenVideoTrack)
                .then(() => {
                  console.log('Piste vidéo remplacée avec succès');

                  // Renégocier la connexion pour s'assurer que les changements sont appliqués
                  try {
                    pc.createOffer()
                      .then(offer => pc.setLocalDescription(offer))
                      .then(() => {
                        console.log('Description locale mise à jour après remplacement de piste');

                        // Envoyer la nouvelle offre au destinataire
                        const recipientId = Object.keys(peerConnectionsRef.current).find(key => peerConnectionsRef.current[key] === pc);
                        if (recipientId && socketRef.current) {
                          socketRef.current.emit('offer', {
                            to: recipientId,
                            offer: pc.localDescription
                          });
                          console.log('Nouvelle offre envoyée après remplacement de piste');
                        }
                      })
                      .catch(err => console.error('Erreur lors de la renégociation après remplacement:', err));
                  } catch (renegotiationError) {
                    console.error('Erreur lors de la tentative de renégociation:', renegotiationError);
                  }
                })
                .catch(err => {
                  console.error('Erreur lors du remplacement de la piste:', err);

                  // En cas d'échec, essayer d'ajouter une nouvelle piste
                  try {
                    pc.addTrack(screenVideoTrack, combinedStream);
                    console.log('Piste de partage d\'écran ajoutée après échec de remplacement');
                  } catch (addError) {
                    console.error('Erreur lors de l\'ajout de la piste après échec de remplacement:', addError);
                  }
                });
            } else {
              console.warn('Aucun émetteur vidéo trouvé, tentative d\'ajout de la piste');

              // Tenter d'ajouter la piste si aucun émetteur n'est trouvé
              try {
                const sender = pc.addTrack(screenVideoTrack, combinedStream);
                console.log('Piste de partage d\'écran ajoutée à la connexion:', sender);

                // Renégocier la connexion
                pc.createOffer()
                  .then(offer => pc.setLocalDescription(offer))
                  .then(() => {
                    console.log('Description locale mise à jour après ajout de piste');

                    // Envoyer la nouvelle offre au destinataire
                    const recipientId = Object.keys(peerConnectionsRef.current).find(key => peerConnectionsRef.current[key] === pc);
                    if (recipientId && socketRef.current) {
                      socketRef.current.emit('offer', {
                        to: recipientId,
                        offer: pc.localDescription
                      });
                      console.log('Nouvelle offre envoyée après ajout de piste');
                    }
                  })
                  .catch(err => console.error('Erreur lors de la renégociation après ajout:', err));
              } catch (addTrackError) {
                console.error('Erreur lors de l\'ajout de la piste:', addTrackError);
              }
            }
          } else {
            console.warn(`La connexion est dans l'état ${pc.connectionState}, impossible de modifier les pistes`);
          }
        } catch (error) {
          console.error('Erreur lors de la manipulation des pistes:', error);
        }
      });

      // Mettre à jour la vidéo locale
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = combinedStream;
      }

      // Informer les autres participants du partage d'écran
      if (socketRef.current && socketRef.current.connected) {
        console.log('Envoi de l\'événement screen-sharing au serveur');
        socketRef.current.emit('screen-sharing', {
          isSharing: true,
          meetingId
        });
      } else {
        console.warn('Socket non connecté, impossible d\'informer les autres participants');
      }

      // Gérer la fin du partage d'écran
      screenVideoTrack.onended = () => {
        console.log('Événement onended déclenché pour la piste de partage d\'écran');
        stopScreenSharing(originalStream);
      };

      toast.success('Partage d\'écran démarré');
    } catch (error) {
      console.error('Erreur lors du partage d\'écran:', error);
      setIsScreenSharing(false);
      toast.error(`Impossible de partager l'écran: ${error.message}`);
    }
  };

  // Fonction pour arrêter le partage d'écran
  const stopScreenSharing = (originalStream = localStream) => {
    try {
      console.log('Arrêt du partage d\'écran');

      // Arrêter toutes les pistes de partage d'écran
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const currentTracks = localVideoRef.current.srcObject.getTracks();
        currentTracks.forEach(track => {
          if (track.kind === 'video') {
            console.log('Arrêt de la piste de partage d\'écran:', track.label);
            track.stop();
          }
        });
      }

      // Revenir à la caméra
      if (originalStream) {
        const cameraTrack = originalStream.getVideoTracks()[0];

        if (cameraTrack) {
          console.log('Utilisation de la piste caméra:', cameraTrack.label);

          // Remplacer la piste vidéo dans toutes les connexions peer
          Object.values(peerConnectionsRef.current).forEach(pc => {
            try {
              console.log('Connexion peer (arrêt partage):', pc);
              console.log('État de la connexion:', pc.connectionState);
              console.log('État de la signalisation:', pc.signalingState);

              // Vérifier si la connexion est active
              if (pc.connectionState === 'connected' || pc.connectionState === 'connecting' || !pc.connectionState) {
                const senders = pc.getSenders();
                console.log('Émetteurs disponibles:', senders.length);

                // Trouver l'émetteur vidéo
                const videoSender = senders.find(s => s.track && s.track.kind === 'video');

                if (videoSender) {
                  console.log('Émetteur vidéo trouvé, remplacement du partage d\'écran par la caméra');
                  console.log('Ancienne piste:', videoSender.track.label);
                  console.log('Nouvelle piste:', cameraTrack ? cameraTrack.label : 'aucune');

                  if (cameraTrack) {
                    // Remplacer la piste
                    videoSender.replaceTrack(cameraTrack)
                      .then(() => {
                        console.log('Piste vidéo remplacée avec succès');

                        // Renégocier la connexion pour s'assurer que les changements sont appliqués
                        try {
                          pc.createOffer()
                            .then(offer => pc.setLocalDescription(offer))
                            .then(() => {
                              console.log('Description locale mise à jour après remplacement de piste');

                              // Envoyer la nouvelle offre au destinataire
                              const recipientId = Object.keys(peerConnectionsRef.current).find(key => peerConnectionsRef.current[key] === pc);
                              if (recipientId && socketRef.current) {
                                socketRef.current.emit('offer', {
                                  to: recipientId,
                                  offer: pc.localDescription
                                });
                                console.log('Nouvelle offre envoyée après remplacement de piste');
                              }
                            })
                            .catch(err => console.error('Erreur lors de la renégociation après remplacement:', err));
                        } catch (renegotiationError) {
                          console.error('Erreur lors de la tentative de renégociation:', renegotiationError);
                        }
                      })
                      .catch(err => {
                        console.error('Erreur lors du remplacement de la piste:', err);

                        // En cas d'échec, essayer d'ajouter une nouvelle piste
                        try {
                          pc.addTrack(cameraTrack, originalStream);
                          console.log('Piste caméra ajoutée après échec de remplacement');
                        } catch (addError) {
                          console.error('Erreur lors de l\'ajout de la piste après échec de remplacement:', addError);
                        }
                      });
                  } else {
                    console.warn('Aucune piste caméra disponible pour remplacer le partage d\'écran');
                  }
                } else {
                  console.warn('Aucun émetteur vidéo trouvé, tentative d\'ajout de la piste caméra');

                  // Tenter d'ajouter la piste si aucun émetteur n'est trouvé
                  if (cameraTrack) {
                    try {
                      const sender = pc.addTrack(cameraTrack, originalStream);
                      console.log('Piste caméra ajoutée à la connexion:', sender);

                      // Renégocier la connexion
                      pc.createOffer()
                        .then(offer => pc.setLocalDescription(offer))
                        .then(() => {
                          console.log('Description locale mise à jour après ajout de piste');

                          // Envoyer la nouvelle offre au destinataire
                          const recipientId = Object.keys(peerConnectionsRef.current).find(key => peerConnectionsRef.current[key] === pc);
                          if (recipientId && socketRef.current) {
                            socketRef.current.emit('offer', {
                              to: recipientId,
                              offer: pc.localDescription
                            });
                            console.log('Nouvelle offre envoyée après ajout de piste');
                          }
                        })
                        .catch(err => console.error('Erreur lors de la renégociation après ajout:', err));
                    } catch (addTrackError) {
                      console.error('Erreur lors de l\'ajout de la piste:', addTrackError);
                    }
                  } else {
                    console.warn('Aucune piste caméra disponible pour ajouter');
                  }
                }
              } else {
                console.warn(`La connexion est dans l'état ${pc.connectionState}, impossible de modifier les pistes`);
              }
            } catch (error) {
              console.error('Erreur lors de la manipulation des pistes:', error);
            }
          });

          // Restaurer la vidéo locale
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = originalStream;
          }
        } else {
          console.warn('Aucune piste vidéo trouvée dans le flux original');
        }
      } else {
        console.warn('Aucun flux original disponible');
      }

      // Mettre à jour l'état
      setIsScreenSharing(false);

      // Informer les autres participants de la fin du partage d'écran
      if (socketRef.current && socketRef.current.connected) {
        console.log('Envoi de l\'événement screen-sharing (fin) au serveur');
        socketRef.current.emit('screen-sharing', {
          isSharing: false,
          meetingId
        });
      } else {
        console.warn('Socket non connecté, impossible d\'informer les autres participants');
      }

      toast.info('Partage d\'écran terminé');
    } catch (error) {
      console.error('Erreur lors de l\'arrêt du partage d\'écran:', error);
      setIsScreenSharing(false);
    }
  };

  // Rendu des participants distants
  const renderParticipants = () => {
    return participants.map(participant => (
      <div
        key={participant.socketId}
        className={`participant-video-container ${participant.isScreenSharing ? 'screen-sharing' : ''}`}
      >
        {participant.stream ? (
          <video
            ref={el => {
              if (el && participant.stream && el.srcObject !== participant.stream) {
                el.srcObject = participant.stream;

                // Forcer la lecture de la vidéo
                el.play().catch(error => {
                  console.error(`Erreur lors de la lecture de la vidéo pour ${participant.name}:`, error);

                  // Réessayer après un court délai
                  setTimeout(() => {
                    el.play().catch(e =>
                      console.error(`Échec de la seconde tentative de lecture pour ${participant.name}:`, e)
                    );
                  }, 1000);
                });
              }
            }}
            autoPlay
            playsInline
            muted={false}
            className={`participant-video ${!participant.video ? 'video-off' : ''} ${participant.isScreenSharing ? 'screen-sharing-video' : ''}`}
          />
        ) : (
          <div className="no-video-placeholder">
            <span>{participant.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <div className="participant-info">
          <span>
            {participant.name}
            {participant.isScreenSharing && <span className="sharing-indicator"> (Partage d'écran)</span>}
          </span>
          <div className="media-indicators">
            {!participant.audio && <i className="fas fa-microphone-slash"></i>}
            {!participant.video && <i className="fas fa-video-slash"></i>}
            {participant.isScreenSharing && <i className="fas fa-desktop"></i>}
          </div>
        </div>
      </div>
    ));
  };

  // État pour le bouton de copie
  const [isCopied, setIsCopied] = useState(false);

  // Fonction pour copier l'ID de la réunion
  const copyMeetingId = () => {
    navigator.clipboard.writeText(meetingId)
      .then(() => {
        setIsCopied(true);
        toast.success('ID de réunion copié !');
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Erreur lors de la copie:', err);
        // Méthode alternative
        const tempInput = document.createElement('input');
        tempInput.value = meetingId;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          const success = document.execCommand('copy');
          if (success) {
            setIsCopied(true);
            toast.success('ID de réunion copié !');
            setTimeout(() => setIsCopied(false), 2000);
          } else {
            toast.error('Impossible de copier l\'ID');
          }
        } catch (e) {
          toast.error('Impossible de copier l\'ID');
        }
        document.body.removeChild(tempInput);
      });
  };

  // Fonction pour partager le lien de la réunion
  const shareMeetingLink = () => {
    const meetingUrl = window.location.href;

    // Vérifier si l'API de partage est disponible
    if (navigator.share) {
      navigator.share({
        title: 'Rejoindre ma réunion',
        text: 'Rejoignez ma réunion en ligne',
        url: meetingUrl
      })
        .then(() => console.log('Lien partagé avec succès'))
        .catch((error) => {
          console.error('Erreur lors du partage:', error);
          fallbackShare(meetingUrl);
        });
    } else {
      fallbackShare(meetingUrl);
    }
  };

  // Fonction de partage alternative
  const fallbackShare = (url) => {
    try {
      navigator.clipboard.writeText(url)
        .then(() => {
          toast.success('Lien de réunion copié dans le presse-papiers !');
        })
        .catch(err => {
          console.error('Erreur lors de la copie:', err);
          // Méthode alternative
          const tempInput = document.createElement('input');
          tempInput.value = url;
          document.body.appendChild(tempInput);
          tempInput.select();
          try {
            const success = document.execCommand('copy');
            if (success) {
              toast.success('Lien de réunion copié dans le presse-papiers !');
            } else {
              toast.error('Impossible de copier le lien');
            }
          } catch (e) {
            toast.error('Impossible de copier le lien');
          }
          document.body.removeChild(tempInput);
        });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
      toast.error('Impossible de partager le lien');
    }
  };

  // Fonction pour formater la durée
  const formatDuration = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Rendu du composant
  return (
    <div className="meeting-container">
      <div className="meeting-header">
        <div className="meeting-info">
          <h1 className="meeting-title">Réunion en cours</h1>
          <div className="meeting-id">
            ID: {meetingId}
            <button
              className={`copy-button ${isCopied ? 'copied' : ''}`}
              onClick={copyMeetingId}
              title="Copier l'ID de la réunion"
            >
              <i className="fas fa-copy"></i>
            </button>
          </div>
          {meetingStartTime && (
            <div className="meeting-timer">
              <i className="fas fa-clock"></i>
              {formatDuration(new Date() - new Date(meetingStartTime))}
            </div>
          )}
        </div>
        <div className="meeting-actions">
          <button className="share-button" onClick={shareMeetingLink}>
            <i className="fas fa-user-plus"></i> Inviter
          </button>
        </div>
      </div>

      <div className="meeting-content">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Connexion à la réunion...</p>
          </div>
        ) : (
          <div className={`video-grid ${screenSharingUser ? 'has-screen-sharing' : ''}`}>
            {/* Afficher d'abord le partage d'écran s'il y en a un */}
            {screenSharingUser && (
              <>
                {/* Trouver le participant qui partage son écran */}
                {isScreenSharing ? (
                  // Si c'est nous qui partageons
                  <div className="local-video-container screen-sharing">
                    <video
                      ref={localVideoRef}
                      autoPlay={true}
                      playsInline={true}
                      muted={true}
                      controls={false}
                      width="100%"
                      height="100%"
                      className="local-video screen-sharing-video"
                      onLoadedMetadata={(e) => {
                        console.log('Vidéo de partage d\'écran chargée, tentative de lecture');
                        e.target.play().catch(err => console.error('Erreur lors de la lecture de la vidéo de partage d\'écran:', err));
                      }}
                    />
                    <div className="local-info">
                      <span>
                        {user.name || 'Vous'}
                        <span className="sharing-indicator"> (Partage d'écran)</span>
                      </span>
                      <div className="media-indicators">
                        {!audioEnabled && <i className="fas fa-microphone-slash"></i>}
                        <i className="fas fa-desktop"></i>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Si c'est un autre participant qui partage
                  participants.filter(p => p.socketId === screenSharingUser.socketId).map(participant => (
                    <div key={participant.socketId} className="participant-video-container screen-sharing">
                      <video
                        ref={el => {
                          if (el && participant.stream && el.srcObject !== participant.stream) {
                            console.log(`Attachement du flux du participant ${participant.name} à l'élément vidéo`);
                            el.srcObject = participant.stream;

                            // Ajouter des gestionnaires d'événements pour détecter les problèmes et succès
                            el.onerror = (e) => console.error(`Erreur de lecture vidéo pour ${participant.name}:`, e);
                            el.onloadedmetadata = () => {
                              console.log(`Métadonnées chargées pour la vidéo de ${participant.name}, tentative de lecture`);
                              el.play()
                                .then(() => console.log(`Lecture démarrée pour ${participant.name}`))
                                .catch(e => {
                                  console.error(`Erreur lors de la lecture pour ${participant.name}:`, e);
                                  // Nouvelle tentative après un court délai
                                  setTimeout(() => {
                                    console.log(`Nouvelle tentative de lecture pour ${participant.name}`);
                                    el.play().catch(err => console.error(`Échec de la nouvelle tentative pour ${participant.name}:`, err));
                                  }, 1000);
                                });
                            };
                          }
                        }}
                        autoPlay={true}
                        playsInline={true}
                        muted={false}
                        controls={false}
                        width="100%"
                        height="100%"
                        className="participant-video screen-sharing-video"
                      />
                      <div className="participant-info">
                        <span>
                          {participant.name}
                          <span className="sharing-indicator"> (Partage d'écran)</span>
                        </span>
                        <div className="media-indicators">
                          {!participant.audio && <i className="fas fa-microphone-slash"></i>}
                          <i className="fas fa-desktop"></i>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Notification de partage d'écran */}
                <div className="screen-sharing-notification">
                  <i className="fas fa-desktop"></i>
                  <span>{isScreenSharing ? 'Vous partagez votre écran' : `${screenSharingUser.name} partage son écran`}</span>
                </div>

                {/* Conteneur pour les autres participants */}
                <div className="other-participants">
                  {/* Notre vidéo locale si nous ne partageons pas */}
                  {!isScreenSharing && (
                    <div className="local-video-container">
                      <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`local-video ${!videoEnabled ? 'video-off' : ''}`}
                      />
                      {!videoEnabled && (
                        <div className="no-video-placeholder">
                          <span>{user.name ? user.name.charAt(0).toUpperCase() : 'V'}</span>
                        </div>
                      )}
                      <div className="local-info">
                        <span>{user.name || 'Vous'}</span>
                        <div className="media-indicators">
                          {!audioEnabled && <i className="fas fa-microphone-slash"></i>}
                          {!videoEnabled && <i className="fas fa-video-slash"></i>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Autres participants qui ne partagent pas */}
                  {participants
                    .filter(p => p.socketId !== screenSharingUser.socketId)
                    .map(participant => (
                      <div key={participant.socketId} className="participant-video-container">
                        {participant.stream ? (
                          <video
                            ref={el => {
                              if (el && participant.stream && el.srcObject !== participant.stream) {
                                console.log(`Attachement du flux pour ${participant.name} à l'élément vidéo`);
                                el.srcObject = participant.stream;
                                el.play().catch(error => {
                                  console.error(`Erreur lors de la lecture de la vidéo pour ${participant.name}:`, error);
                                });
                              }
                            }}
                            autoPlay
                            playsInline
                            muted={false}
                            className={`participant-video ${!participant.video ? 'video-off' : ''}`}
                          />
                        ) : (
                          <div className="no-video-placeholder">
                            <span>{participant.name.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div className="participant-info">
                          <span>{participant.name}</span>
                          <div className="media-indicators">
                            {!participant.audio && <i className="fas fa-microphone-slash"></i>}
                            {!participant.video && <i className="fas fa-video-slash"></i>}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </>
            )}

            {/* Affichage normal quand il n'y a pas de partage d'écran */}
            {!screenSharingUser && (
              <>
                <div className="local-video-container">
                  <video
                    ref={localVideoRef}
                    autoPlay={true}
                    playsInline={true}
                    muted={true}
                    controls={false}
                    width="100%"
                    height="100%"
                    className={`local-video ${!videoEnabled ? 'video-off' : ''}`}
                    onLoadedMetadata={(e) => {
                      console.log('Vidéo locale chargée, tentative de lecture');
                      e.target.play().catch(err => console.error('Erreur lors de la lecture de la vidéo locale:', err));
                    }}
                  />
                  {videoEnabled && faceDetectionEnabled && (
                    <FaceDetection
                      videoRef={localVideoRef}
                      onExpressionDetected={(expression, probability) => {
                        console.log(`Expression détectée: ${expression} avec une probabilité de ${probability}`);
                        setDetectedExpression(expression);
                      }}
                    />
                  )}
                  {!videoEnabled && (
                    <div className="no-video-placeholder">
                      <span>{user.name ? user.name.charAt(0).toUpperCase() : 'V'}</span>
                    </div>
                  )}
                  <div className="local-info">
                    <span>{user.name || 'Vous'}</span>
                    <div className="media-indicators">
                      {!audioEnabled && <i className="fas fa-microphone-slash"></i>}
                      {!videoEnabled && <i className="fas fa-video-slash"></i>}
                      {faceDetectionEnabled && <i className="fas fa-smile" title="Détection faciale activée"></i>}
                      {detectedExpression && (
                        <span className="detected-expression" title={`Expression détectée: ${detectedExpression}`}>
                          {detectedExpression === 'happy' && '😊'}
                          {detectedExpression === 'sad' && '😢'}
                          {detectedExpression === 'angry' && '😠'}
                          {detectedExpression === 'fearful' && '😨'}
                          {detectedExpression === 'disgusted' && '🤢'}
                          {detectedExpression === 'surprised' && '😲'}
                          {detectedExpression === 'neutral' && '😐'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {renderParticipants()}
              </>
            )}
          </div>
        )}

        <div className="meeting-controls">
          <button
            className={`control-button ${!audioEnabled ? 'active' : ''}`}
            onClick={toggleAudio}
            title={audioEnabled ? "Couper le micro" : "Activer le micro"}
          >
            <i className={`fas ${audioEnabled ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
          </button>

          <button
            className={`control-button ${!videoEnabled ? 'active' : ''}`}
            onClick={toggleVideo}
            title={videoEnabled ? "Couper la caméra" : "Activer la caméra"}
          >
            <i className={`fas ${videoEnabled ? 'fa-video' : 'fa-video-slash'}`}></i>
          </button>

          <button
            className={`control-button ${isScreenSharing ? 'active' : ''}`}
            onClick={shareScreen}
            title={isScreenSharing ? "Arrêter le partage d'écran" : "Partager l'écran"}
          >
            <i className={`fas ${isScreenSharing ? 'fa-stop' : 'fa-desktop'}`}></i>
            {isScreenSharing && <span className="button-text">Arrêter</span>}
          </button>

          <button
            className={`control-button ${isChatOpen ? 'active' : ''}`}
            onClick={() => setIsChatOpen(!isChatOpen)}
            title={isChatOpen ? "Fermer le chat" : "Ouvrir le chat"}
          >
            <i className="fas fa-comments"></i>
            {!isChatOpen && chatMessages.length > 0 && (
              <span className="chat-notification"></span>
            )}
          </button>

          <button
            className={`control-button ${isAssistantOpen ? 'active' : ''}`}
            onClick={() => setIsAssistantOpen(!isAssistantOpen)}
            title={isAssistantOpen ? "Fermer l'assistant" : "Ouvrir l'assistant de réunion"}
          >
            <i className="fas fa-robot"></i>
          </button>

          <button
            className="share-button"
            onClick={shareMeetingLink}
            title="Inviter des participants"
          >
            <i className="fas fa-user-plus"></i>
          </button>

          <button
            className={`control-button ${faceDetectionEnabled ? 'active' : ''}`}
            onClick={() => {
              setFaceDetectionEnabled(!faceDetectionEnabled);
              toast.info(`Détection faciale ${!faceDetectionEnabled ? 'activée' : 'désactivée'}`);
            }}
            title={faceDetectionEnabled ? "Désactiver la détection faciale" : "Activer la détection faciale"}
          >
            <i className="fas fa-smile"></i>
          </button>

          <button
            className="control-button end-call"
            onClick={leaveMeeting}
            title="Quitter la réunion"
          >
            <i className="fas fa-phone-slash"></i>
          </button>
        </div>
      </div>

      {renderChat()}

      {/* Assistant contextuel IA */}
      <MeetingAssistant
        meetingId={meetingId}
        messages={chatMessages}
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};

// Composant pour afficher la durée de la réunion
function MeetingTimer({ startTime }) {
  const [duration, setDuration] = useState('00:00:00');

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = now - startTime;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setDuration(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return <div className="timer">Durée: {duration}</div>;
}

export default MeetingRoom;

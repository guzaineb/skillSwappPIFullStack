import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaPhoneSlash, FaComments, FaUserPlus, FaRobot, FaBrain } from 'react-icons/fa';
import '../styles/meetingRoom.css';
import MeetingAssistant from '../components/MeetingAssistant';

// URL du serveur socket - utilise l'URL de l'API depuis l'environnement ou par défaut
const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL || window.location.origin.replace(/:\d+$/, ':5000');

// Configuration des options de socket
const SOCKET_OPTIONS = {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
  transports: ['websocket', 'polling'] // Préférer WebSocket, fallback sur polling
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
    bundlePolicy: 'max-bundle',
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

                  // Créer une nouvelle offre
                  newPeerConnection.createOffer()
                    .then(offer => newPeerConnection.setLocalDescription(offer))
                    .then(() => {
                      socketRef.current.emit('offer', {
                        to: participantSocketId,
                        offer: newPeerConnection.localDescription
                      });
                      console.log(`Nouvelle offre envoyée à ${participantSocketId}`);
                    })
                    .catch(error => {
                      console.error(`Erreur lors de la création de l'offre pour ${participantSocketId}:`, error);
                    });
                } else {
                  // Réutiliser la connexion existante
                  console.log(`Réutilisation de la connexion existante pour ${participantSocketId}`);

                  // Créer une nouvelle offre
                  peerConnectionsRef.current[participantSocketId].createOffer()
                    .then(offer => peerConnectionsRef.current[participantSocketId].setLocalDescription(offer))
                    .then(() => {
                      socketRef.current.emit('offer', {
                        to: participantSocketId,
                        offer: peerConnectionsRef.current[participantSocketId].localDescription
                      });
                      console.log(`Nouvelle offre envoyée à ${participantSocketId}`);
                    })
                    .catch(error => {
                      console.error(`Erreur lors de la reconnexion avec ${participantSocketId}:`, error);
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

        if (!event.streams || !event.streams[0]) {
          console.error(`Aucun flux reçu de ${participantSocketId}`);

          // Créer un nouveau flux si aucun n'est fourni
          const syntheticStream = new MediaStream();
          syntheticStream.addTrack(event.track);

          console.log(`Flux synthétique créé pour ${participantSocketId} avec la piste ${event.track.kind}`);

          // Ajouter un identifiant au flux pour le retrouver facilement
          syntheticStream.socketId = participantSocketId;

          // Mettre à jour l'état des participants avec le flux
          updateParticipantStream(participantSocketId, syntheticStream);
          return;
        }

        const remoteStream = event.streams[0];

        // Ajouter un identifiant au flux pour le retrouver facilement
        remoteStream.socketId = participantSocketId;

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
            // Si le participant n'existe pas encore, l'ajouter
            return [...prev, {
              socketId: socketId,
              name: `Participant ${socketId.substring(0, 5)}`,
              stream: stream,
              audio: true,
              video: true,
              isScreenSharing: isScreenShare
            }];
          }

          // Mettre à jour le participant existant
          return prev.map(p => {
            if (p.socketId === socketId) {
              console.log(`Mise à jour du flux pour ${p.name} (${socketId})`);

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

  // Initialiser la connexion
  useEffect(() => {
    // Référence au socket
    console.log(`Connexion au serveur socket: ${SOCKET_SERVER_URL}`);
    socketRef.current = io(SOCKET_SERVER_URL, SOCKET_OPTIONS);

    // Vérifier la connexion du socket
    socketRef.current.on('connect', () => {
      console.log('Socket connecté:', socketRef.current.id);
      toast.success('Connecté au serveur de réunion');

      // Demander l'accès à la caméra et au micro après la connexion socket
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })
        .then(stream => {
          console.log('Flux média obtenu:', stream);
          console.log('Pistes audio:', stream.getAudioTracks().map(track => ({
            label: track.label,
            enabled: track.enabled,
            muted: track.muted
          })));

          // S'assurer que les pistes audio sont activées par défaut
          stream.getAudioTracks().forEach(track => {
            track.enabled = true;
          });

          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }

          setLoading(false);
          setMeetingStartTime(new Date());

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

                peerConnection.createOffer()
                  .then(offer => {
                    console.log(`Offre créée pour ${participant.socketId}:`, offer);
                    return peerConnection.setLocalDescription(offer);
                  })
                  .then(() => {
                    console.log(`Description locale définie pour ${participant.socketId}`);
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
              console.log(`Ajout du participant ${participant.name} à la liste`);
              return [...prev, participant];
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
              const peerConnection = peerConnectionsRef.current[from];

              if (!peerConnection) {
                throw new Error(`Aucune connexion trouvée pour ${from}`);
              }

              if (!candidate) {
                throw new Error(`Candidat ICE invalide reçu de ${from}`);
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
          socketRef.current.on('screen-sharing-conflict', ({ message, sharerSocketId }) => {
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
        })
        .catch(error => {
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
      // Fermer toutes les connexions peer
      Object.values(peerConnectionsRef.current).forEach(connection => {
        if (connection) {
          connection.close();
        }
      });

      // Arrêter tous les tracks du stream local
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }

      // Déconnecter le socket
      if (socketRef.current) {
        console.log('Déconnexion du socket');
        socketRef.current.disconnect();
      }
    };
  }, [meetingId]);

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

  // Fonction pour activer/désactiver l'audio
  const toggleAudio = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      console.log('Pistes audio avant toggle:', audioTracks.map(track => ({
        label: track.label,
        enabled: track.enabled,
        muted: track.muted
      })));

      if (audioTracks.length > 0) {
        const audioTrack = audioTracks[0];

        // Inverser l'état d'activation
        const newAudioState = !audioEnabled;
        audioTrack.enabled = newAudioState;
        setAudioEnabled(newAudioState);

        console.log(`Microphone ${newAudioState ? 'activé' : 'désactivé'}`);
        console.log('Nouvel état de la piste audio:', {
          label: audioTrack.label,
          enabled: audioTrack.enabled,
          muted: audioTrack.muted
        });

        // Informer les autres participants
        if (socketRef.current && socketRef.current.connected) {
          socketRef.current.emit('media-state-change', {
            audio: newAudioState,
            video: videoEnabled
          });
        }

        // Feedback visuel
        toast.info(`Microphone ${newAudioState ? 'activé' : 'désactivé'}`);
      } else {
        console.error('Aucune piste audio trouvée dans le flux local');
        toast.error('Impossible de trouver le microphone');
      }
    } else {
      console.error('Aucun flux média local disponible');
      toast.error('Flux audio non disponible');
    }
  };

  // Fonction pour activer/désactiver la vidéo
  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoEnabled;
        setVideoEnabled(!videoEnabled);

        // Informer les autres participants
        socketRef.current.emit('media-state-change', {
          audio: audioEnabled,
          video: !videoEnabled
        });

        // Feedback visuel
        toast.info(`Caméra ${!videoEnabled ? 'activée' : 'désactivée'}`);
      }
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
                      autoPlay
                      playsInline
                      muted
                      className="local-video screen-sharing-video"
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
                            el.srcObject = participant.stream;

                            // Ajouter un gestionnaire d'événements pour détecter les problèmes de lecture
                            el.onerror = (e) => console.error('Erreur de lecture vidéo:', e);

                            // Forcer la lecture
                            el.play().catch(e => console.error('Erreur lors de la lecture:', e));
                          }
                        }}
                        autoPlay
                        playsInline
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
                                el.srcObject = participant.stream;
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
            className="control-button end-call"
            onClick={leaveMeeting}
            title="Quitter la réunion"
          >
            <i className="fas fa-phone-slash"></i>
          </button>
        </div>
      </div>

      {renderChat()}

      {/* Assistant contextuel */}
      <MeetingAssistant
        messages={chatMessages}
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};

// Composant pour afficher la durée de la réunion
const MeetingTimer = ({ startTime }) => {
  const [duration, setDuration] = useState('00:00:00');

  useEffect(() => {
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
};

export default MeetingRoom;

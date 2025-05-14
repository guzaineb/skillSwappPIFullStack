const Meeting = require('../models/meeting.model');

// Map pour stocker les participants par réunion
const meetingRooms = new Map();

const initializeMeetingSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Nouvelle connexion socket: ${socket.id}`);

    // Rejoindre une réunion
    socket.on('join-meeting', async ({ meetingId, user }) => {
      try {
        console.log(`${user.name} (${socket.id}) rejoint la réunion ${meetingId}`);
        // Vérifier si la réunion existe
        let meeting = await Meeting.findOne({ meetingId });
        // Si la réunion n'existe pas, la créer automatiquement
        if (!meeting) {
          console.log(`Réunion ${meetingId} non trouvée, création automatique`);

          try {
            // Créer un ObjectId valide pour l'hôte anonyme
            const mongoose = require('mongoose');
            const anonymousHostId = new mongoose.Types.ObjectId();

            // Créer une nouvelle réunion
            const newMeeting = new Meeting({
              meetingId,
              title: `Réunion ${meetingId}`,
              hostId: user._id && user._id !== 'anonymous' ? user._id : anonymousHostId,
              settings: {
                allowScreenShare: true,
                allowChat: true,
                waitingRoom: false
              },
              isActive: true
            });

            // Ajouter le participant sans userId si c'est un utilisateur anonyme
            if (user._id && user._id !== 'anonymous') {
              newMeeting.participants.push({
                userId: user._id,
                email: user.email || 'utilisateur@exemple.com',
                name: user.name || 'Utilisateur',
                joinTime: new Date()
              });
            } else {
              newMeeting.participants.push({
                email: user.email || 'anonyme@exemple.com',
                name: user.name || 'Invité',
                joinTime: new Date()
              });
            }

            await newMeeting.save();
            console.log(`Réunion ${meetingId} créée automatiquement`);

            meeting = newMeeting;
          } catch (createError) {
            console.error(`Erreur lors de la création automatique de la réunion ${meetingId}:`, createError);
            socket.emit('meeting-error', {
              code: 'MEETING_CREATION_ERROR',
              message: 'Impossible de créer la réunion automatiquement'
            });
            return;
          }
        }

        // Si la réunion est marquée comme terminée, la réactiver automatiquement
        if (!meeting.isActive) {
          console.log(`Réunion ${meetingId} marquée comme terminée, réactivation automatique`);

          try {
            // Réactiver la réunion
            meeting.isActive = true;
            meeting.endTime = null; // Effacer la date de fin
            await meeting.save();

            console.log(`Réunion ${meetingId} réactivée avec succès`);
          } catch (reactivateError) {
            console.error(`Erreur lors de la réactivation de la réunion ${meetingId}:`, reactivateError);
            socket.emit('meeting-error', {
              code: 'MEETING_REACTIVATION_ERROR',
              message: 'Impossible de réactiver la réunion'
            });
            return;
          }
        }

        // Stocker les données utilisateur dans l'objet socket
        socket.data = {
          userId: user._id,
          name: user.name,
          meetingId: meetingId
        };

        // Rejoindre la salle Socket.io
        socket.join(meetingId);

        // Initialiser la map des participants si nécessaire
        if (!meetingRooms.has(meetingId)) {
          meetingRooms.set(meetingId, new Map());
        }

        // Ajouter le participant à la map avec des états média explicites
        const initialAudio = user.audio !== undefined ? user.audio : true;
        const initialVideo = user.video !== undefined ? user.video : true;

        console.log(`Ajout du participant ${user.name} (${socket.id}) à la réunion ${meetingId} avec audio=${initialAudio}, video=${initialVideo}`);

        meetingRooms.get(meetingId).set(socket.id, {
          socketId: socket.id,
          userId: user._id,
          name: user.name,
          audio: initialAudio,
          video: initialVideo,
          deviceStatus: {
            hasCamera: true,
            hasMicrophone: true,
            cameraActive: initialVideo,
            microphoneActive: initialAudio
          }
        });

        // Informer le nouveau participant des participants existants
        const participants = Array.from(meetingRooms.get(meetingId).values());
        socket.emit('meeting-participants', participants);

        // Informer les autres participants de l'arrivée du nouveau participant
        socket.to(meetingId).emit('user-joined', {
          socketId: socket.id,
          userId: user._id,
          name: user.name,
          audio: true,
          video: true
        });

        // Mettre à jour ou créer la réunion dans la base de données
        try {
          // Vérifier si l'utilisateur a un ID valide
          if (user._id && user._id !== 'anonymous') {
            // Vérifier si le participant existe déjà par son ID
            const participantExists = meeting.participants.some(
              p => p.userId && p.userId.toString() === user._id.toString()
            );

            if (!participantExists) {
              // Ajouter un participant authentifié
              await Meeting.updateOne(
                { meetingId },
                {
                  $push: {
                    participants: {
                      userId: user._id,
                      email: user.email || 'utilisateur@exemple.com',
                      name: user.name || 'Utilisateur',
                      joinTime: new Date()
                    }
                  }
                }
              );
              console.log(`Participant authentifié ${user.name} (${user._id}) ajouté à la réunion ${meetingId}`);
            } else {
              console.log(`Participant authentifié ${user.name} (${user._id}) déjà présent dans la réunion ${meetingId}`);
            }
          } else {
            // Utilisateur anonyme - vérifier s'il existe déjà par son socket ID
            const socketIdExists = meeting.participants.some(
              p => p.socketId === socket.id
            );

            if (!socketIdExists) {
              // Ajouter un participant anonyme sans userId
              console.log(`Participant anonyme (${socket.id}) rejoint la réunion ${meetingId}`);

              await Meeting.updateOne(
                { meetingId },
                {
                  $push: {
                    participants: {
                      socketId: socket.id, // Utiliser le socket ID comme identifiant
                      email: user.email || 'anonyme@exemple.com',
                      name: user.name || 'Invité',
                      joinTime: new Date()
                    }
                  }
                }
              );
            } else {
              console.log(`Participant anonyme (${socket.id}) déjà présent dans la réunion ${meetingId}`);
            }
          }
        } catch (dbError) {
          console.error('Erreur de base de données lors de la mise à jour des participants:', dbError);
          console.error(dbError);
          // Ne pas bloquer la connexion en cas d'erreur de base de données
        }
      } catch (error) {
        console.error('Erreur lors de la gestion de join-meeting:', error);
        socket.emit('meeting-error', {
          code: 'SERVER_ERROR',
          message: 'Erreur lors de la connexion à la réunion'
        });
      }
    });

    // Gérer les messages de chat
    socket.on('chat-message', ({ meetingId, message }) => {
      try {
        console.log(`Message reçu dans la réunion ${meetingId} de ${socket.id}:`, message);

        // Vérifier si le message est valide
        if (!message || !message.text) {
          console.error('Format de message invalide:', message);
          socket.emit('error', { message: 'Format de message invalide' });
          return;
        }

        // Vérifier si la réunion existe
        if (!meetingRooms.has(meetingId)) {
          console.log(`Création d'une nouvelle salle pour ${meetingId}`);
          meetingRooms.set(meetingId, new Map());
        }

        // Ajouter un horodatage s'il n'existe pas
        if (!message.timestamp) {
          message.timestamp = new Date().toISOString();
        }

        // Ajouter l'ID du socket si nécessaire
        if (!message.socketId) {
          message.socketId = socket.id;
        }

        // Ajouter un ID unique au message s'il n'en a pas
        if (!message.messageId) {
          message.messageId = `${socket.id}-${message.timestamp}-${message.text.substring(0, 10)}`;
        }

        // Récupérer les informations du participant
        const participant = meetingRooms.get(meetingId).get(socket.id);

        // Mettre à jour le nom de l'expéditeur si nécessaire
        if (participant && participant.name && (!message.sender || message.sender === 'Utilisateur' || message.sender.startsWith('Invité_'))) {
          message.sender = participant.name;
        }

        // Diffuser le message à TOUS les participants (y compris l'expéditeur pour confirmation)
        console.log(`Diffusion du message à tous les participants de la réunion ${meetingId}`);

        // Ajouter un délai artificiel pour simuler la latence réseau (à supprimer en production)
        // setTimeout(() => {
        io.to(meetingId).emit('chat-message', message);
        // }, 500);

        // Enregistrer le message dans la base de données
        try {
          Meeting.findOneAndUpdate(
            { meetingId },
            {
              $push: {
                messages: {
                  messageId: message.messageId,
                  senderId: message.senderId,
                  socketId: message.socketId,
                  sender: message.sender,
                  text: message.text,
                  timestamp: message.timestamp
                }
              }
            }
          ).exec();

          console.log(`Message enregistré dans la base de données pour la réunion ${meetingId}`);
        } catch (dbError) {
          console.error('Erreur lors de l\'enregistrement du message dans la base de données:', dbError);
          // Ne pas bloquer l'envoi du message en cas d'erreur de base de données
        }

        console.log(`Message diffusé avec succès à tous les participants de la réunion ${meetingId}`);
      } catch (error) {
        console.error('Erreur lors de la gestion du chat-message:', error);
        socket.emit('error', { message: 'Erreur lors de l\'envoi du message' });
      }
    });

    // Signalisation WebRTC
    socket.on('offer', ({ to, offer }) => {
      console.log(`Relais d'offre de ${socket.id} à ${to}`);
      socket.to(to).emit('offer', {
        from: socket.id,
        offer
      });
    });

    socket.on('answer', ({ to, answer }) => {
      console.log(`Relais de réponse de ${socket.id} à ${to}`);
      socket.to(to).emit('answer', {
        from: socket.id,
        answer
      });
    });

    socket.on('ice-candidate', ({ to, candidate }) => {
      socket.to(to).emit('ice-candidate', {
        from: socket.id,
        candidate
      });
    });

    // Mise à jour de l'état audio/vidéo
    socket.on('media-state-change', ({ audio, video }) => {
      const { meetingId } = socket.data || {};
      console.log(`Changement d'état média pour ${socket.id}: audio=${audio}, video=${video}, meetingId=${meetingId}`);

      if (meetingId && meetingRooms.has(meetingId)) {
        const participant = meetingRooms.get(meetingId).get(socket.id);

        if (participant) {
          // Mettre à jour l'état du participant
          participant.audio = audio;
          participant.video = video;

          console.log(`État du participant ${participant.name} mis à jour: audio=${audio}, video=${video}`);

          // Informer les autres participants du changement
          socket.to(meetingId).emit('user-media-changed', {
            socketId: socket.id,
            audio,
            video
          });

          // Enregistrer l'événement dans la base de données
          try {
            Meeting.findOneAndUpdate(
              { meetingId },
              {
                $push: {
                  events: {
                    type: 'media-change',
                    userId: participant.userId || null,
                    socketId: socket.id,
                    userName: participant.name || 'Utilisateur',
                    audio,
                    video,
                    timestamp: new Date()
                  }
                }
              }
            ).exec();
            console.log(`Événement de changement média enregistré pour ${socket.id} dans la réunion ${meetingId}`);
          } catch (dbError) {
            console.error('Erreur lors de l\'enregistrement de l\'événement de changement média:', dbError);
          }
        } else {
          console.warn(`Participant ${socket.id} non trouvé dans la réunion ${meetingId}`);
        }
      } else {
        console.warn(`Réunion ${meetingId} non trouvée pour le changement d'état média`);
      }
    });

    // Gestion du partage d'écran
    socket.on('screen-sharing', ({ isSharing, meetingId }) => {
      console.log(`Partage d'écran ${isSharing ? 'démarré' : 'arrêté'} par ${socket.id} dans la réunion ${meetingId}`);

      if (meetingId && meetingRooms.has(meetingId)) {
        const participants = meetingRooms.get(meetingId);
        const participant = participants.get(socket.id);

        if (participant) {
          // Si un autre participant partage déjà son écran et que ce participant veut commencer à partager
          if (isSharing) {
            // Vérifier si un autre participant partage déjà son écran
            let existingSharer = null;
            for (const [id, p] of participants.entries()) {
              if (id !== socket.id && p.isScreenSharing) {
                existingSharer = p;
                break;
              }
            }

            // Si quelqu'un d'autre partage déjà son écran, informer ce participant
            if (existingSharer) {
              console.log(`Un autre participant (${existingSharer.name}) partage déjà son écran dans la réunion ${meetingId}`);

              // Informer le participant qui essaie de partager son écran
              socket.emit('screen-sharing-conflict', {
                message: `${existingSharer.name || 'Un autre participant'} partage déjà son écran.`,
                sharerSocketId: existingSharer.socketId
              });

              // Ne pas continuer le traitement
              return;
            }
          }

          // Mettre à jour l'état du partage d'écran pour ce participant
          participant.isScreenSharing = isSharing;

          // Créer un objet avec les informations du partage d'écran
          const sharingInfo = {
            socketId: socket.id,
            isSharing,
            userName: participant.name || 'Utilisateur',
            timestamp: new Date().toISOString()
          };

          // Informer TOUS les participants (y compris l'émetteur) du changement
          io.to(meetingId).emit('screen-sharing-changed', sharingInfo);

          console.log(`Notification de partage d'écran envoyée à tous les participants de la réunion ${meetingId}`);

          // Enregistrer l'événement de partage d'écran dans la base de données
          try {
            Meeting.findOneAndUpdate(
              { meetingId },
              {
                $push: {
                  events: {
                    type: 'screen-sharing',
                    userId: participant.userId || null,
                    socketId: socket.id,
                    userName: participant.name || 'Utilisateur',
                    isSharing,
                    timestamp: new Date()
                  }
                }
              }
            ).exec();
          } catch (dbError) {
            console.error('Erreur lors de l\'enregistrement de l\'événement de partage d\'écran:', dbError);
          }
        } else {
          console.warn(`Participant ${socket.id} non trouvé dans la réunion ${meetingId}`);
          socket.emit('error', { message: 'Vous n\'êtes pas un participant de cette réunion' });
        }
      } else {
        console.warn(`Réunion ${meetingId} non trouvée`);
        socket.emit('error', { message: 'Réunion non trouvée' });
      }
    });

    // Gestion du changement de nom d'utilisateur
    socket.on('user-name-change', ({ meetingId, name }) => {
      console.log(`Changement de nom pour ${socket.id} dans la réunion ${meetingId}: ${name}`);

      if (meetingId && meetingRooms.has(meetingId)) {
        const participants = meetingRooms.get(meetingId);
        const participant = participants.get(socket.id);

        if (participant) {
          // Sauvegarder l'ancien nom pour la notification
          const oldName = participant.name || 'Utilisateur';

          // Mettre à jour le nom du participant
          participant.name = name;

          // Informer tous les autres participants du changement
          socket.to(meetingId).emit('user-name-changed', {
            socketId: socket.id,
            oldName,
            newName: name
          });

          console.log(`Notification de changement de nom envoyée aux participants de la réunion ${meetingId}`);

          // Mettre à jour le nom dans la base de données si l'utilisateur est authentifié
          if (participant.userId) {
            try {
              Meeting.findOneAndUpdate(
                { meetingId, 'participants.userId': participant.userId },
                { $set: { 'participants.$.name': name } }
              ).exec();
            } catch (dbError) {
              console.error('Erreur lors de la mise à jour du nom dans la base de données:', dbError);
            }
          } else if (participant.socketId) {
            // Utilisateur anonyme - rechercher par socketId
            try {
              Meeting.findOneAndUpdate(
                { meetingId, 'participants.socketId': socket.id },
                { $set: { 'participants.$.name': name } }
              ).exec();
            } catch (dbError) {
              console.error('Erreur lors de la mise à jour du nom dans la base de données:', dbError);
            }
          }
        }
      }
    });

    // Gérer la déconnexion
    socket.on('disconnect', async () => {
      try {
        console.log(`Socket déconnecté: ${socket.id}`);

        // Trouver la réunion à laquelle le socket participait
        for (const [meetingId, participants] of meetingRooms.entries()) {
          if (participants.has(socket.id)) {
            // Récupérer les données du participant
            const participant = participants.get(socket.id);

            // Supprimer le participant de la map
            participants.delete(socket.id);

            // Si plus personne dans la réunion, supprimer la réunion de la map
            if (participants.size === 0) {
              console.log(`Plus aucun participant dans la réunion ${meetingId}, suppression de la map`);
              meetingRooms.delete(meetingId);

              // Ne pas marquer la réunion comme terminée automatiquement
              // Cela permet aux utilisateurs de rejoindre la réunion plus tard
              console.log(`La réunion ${meetingId} reste active dans la base de données`);

              // Si vous souhaitez marquer la réunion comme terminée après un certain temps,
              // vous pouvez implémenter un mécanisme de timeout ici
            }

            // Informer les autres participants
            socket.to(meetingId).emit('user-left', {
              socketId: socket.id,
              userId: participant?.userId
            });

            // Mettre à jour la base de données
            if (participant?.userId) {
              // Utilisateur authentifié
              await Meeting.findOneAndUpdate(
                { meetingId, 'participants.userId': participant.userId },
                { $set: { 'participants.$.leaveTime': new Date() } }
              );
              console.log(`Participant authentifié ${participant.userId} a quitté la réunion ${meetingId}`);
            } else {
              // Utilisateur anonyme - rechercher par socketId
              await Meeting.findOneAndUpdate(
                { meetingId, 'participants.socketId': socket.id },
                { $set: { 'participants.$.leaveTime': new Date() } }
              );
              console.log(`Participant anonyme ${socket.id} a quitté la réunion ${meetingId}`);
            }

            break;
          }
        }
      } catch (error) {
        console.error('Erreur lors de la gestion de la déconnexion:', error);
      }
    });
  });
};

module.exports = initializeMeetingSocket;



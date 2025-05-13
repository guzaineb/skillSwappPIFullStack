import React from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaUser } from 'react-icons/fa';

const MeetingParticipants = ({ participants, localUser }) => {
  console.log('Participants dans MeetingParticipants:', participants);
  console.log('Utilisateur local:', localUser);
  
  // Vérifier si participants est un tableau et s'il contient des éléments
  const hasParticipants = Array.isArray(participants) && participants.length > 0;
  
  return (
    <div className="meeting-participants">
      <div className="participant-count">
        Participants ({hasParticipants ? participants.length + 1 : 1})
      </div>
      
      <div className="participant-item local-user">
        <div className="participant-avatar">
          <FaUser size={24} />
        </div>
        <div className="participant-info">
          <span className="participant-name">{localUser.name || 'Vous'} (Vous)</span>
          <div className="participant-status">
            {localUser.audio ? (
              <FaMicrophone className="status-icon audio-on" />
            ) : (
              <FaMicrophoneSlash className="status-icon audio-off" />
            )}
            
            {localUser.video ? (
              <FaVideo className="status-icon video-on" />
            ) : (
              <FaVideoSlash className="status-icon video-off" />
            )}
          </div>
        </div>
      </div>
      
      {hasParticipants ? (
        participants.map((participant, index) => (
          <div key={participant.socketId || index} className="participant-item">
            <div className="participant-avatar">
              <FaUser size={24} />
            </div>
            <div className="participant-info">
              <span className="participant-name">{participant.name || 'Utilisateur'}</span>
              <div className="participant-status">
                {participant.audio ? (
                  <FaMicrophone className="status-icon audio-on" />
                ) : (
                  <FaMicrophoneSlash className="status-icon audio-off" />
                )}
                
                {participant.video ? (
                  <FaVideo className="status-icon video-on" />
                ) : (
                  <FaVideoSlash className="status-icon video-off" />
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-participants">
          <p>Vous êtes seul dans cette réunion</p>
          <p>Partagez l'ID de la réunion pour inviter d'autres personnes</p>
        </div>
      )}
    </div>
  );
};

export default MeetingParticipants;


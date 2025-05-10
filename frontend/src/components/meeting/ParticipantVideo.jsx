import React, { useRef, useEffect } from 'react';
import { FaVideoSlash, FaMicrophoneSlash } from 'react-icons/fa';

const ParticipantVideo = ({ participant }) => {
  const videoRef = useRef();
  
  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);
  
  return (
    <div className="participant-video-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`participant-video ${!participant.video ? 'video-off' : ''}`}
      />
      {!participant.video && (
        <div className="video-off-indicator">
          <FaVideoSlash size={32} />
        </div>
      )}
      {!participant.audio && (
        <div className="audio-off-indicator">
          <FaMicrophoneSlash size={16} />
        </div>
      )}
      <div className="video-label">{participant.name}</div>
    </div>
  );
};

export default ParticipantVideo;
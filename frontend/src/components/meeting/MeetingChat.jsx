import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const MeetingChat = ({ messages, sendMessage }) => {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);
  
  // Faire défiler automatiquement vers le bas lorsque de nouveaux messages arrivent
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput('');
    }
  };
  
  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error('Erreur de formatage de l\'heure:', error);
      return '00:00';
    }
  };
  
  console.log('Messages dans MeetingChat:', messages);
  
  return (
    <div className="meeting-chat">
      <div className="chat-messages">
        {!messages || messages.length === 0 ? (
          <div className="no-messages">
            <p>Aucun message pour le moment</p>
            <p>Soyez le premier à envoyer un message!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`chat-message ${message.senderId === 'you' ? 'own-message' : ''}`}
            >
              <div className="message-header">
                <span className="sender-name">{message.senderName || 'Utilisateur'}</span>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Écrivez un message..."
          className="chat-input"
        />
        <button type="submit" className="send-button">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default MeetingChat;

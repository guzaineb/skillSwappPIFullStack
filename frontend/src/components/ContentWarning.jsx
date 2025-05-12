import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const ContentWarning = ({ message, onClose }) => {
  const [speechEnded, setSpeechEnded] = useState(false);

  useEffect(() => {
    let speech = null;
    
    // Synthèse vocale améliorée
    if ('speechSynthesis' in window) {
      // Annuler toute synthèse vocale en cours
      window.speechSynthesis.cancel();
      
      // Créer un nouvel objet de synthèse vocale
      speech = new SpeechSynthesisUtterance();
      speech.text = "Attention! " + message;
      speech.lang = 'fr-FR';
      speech.rate = 0.9; // Légèrement plus lent pour une meilleure compréhension
      speech.volume = 1.0; // Volume maximum
      
      // Événement de fin de parole
      speech.onend = () => {
        setSpeechEnded(true);
      };
      
      // Essayer de trouver une voix française
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(voice => voice.lang.includes('fr'));
      if (frenchVoice) {
        speech.voice = frenchVoice;
      }
      
      // Si les voix ne sont pas encore chargées
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          const updatedVoices = window.speechSynthesis.getVoices();
          const frVoice = updatedVoices.find(voice => voice.lang.includes('fr'));
          if (frVoice) {
            speech.voice = frVoice;
          }
          window.speechSynthesis.speak(speech);
        };
      } else {
        window.speechSynthesis.speak(speech);
      }
    }
    
    // Fermer automatiquement après que la synthèse vocale soit terminée ou après 8 secondes
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, speechEnded ? 1000 : 8000);
    
    return () => {
      clearTimeout(timer);
      if (speech) {
        window.speechSynthesis.cancel();
      }
    };
  }, [message, onClose, speechEnded]);

  return (
    <div className="content-warning-overlay">
      <div className="content-warning-modal">
        <div className="warning-icon">
          <AlertTriangle size={48} color="#ef4444" />
        </div>
        <h3>Contenu inapproprié détecté</h3>
        <p>{message}</p>
        <button 
          className="btn btn-danger" 
          onClick={onClose}
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          Fermer
        </button>
      </div>
      
      <style jsx>{`
        .content-warning-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        
        .content-warning-modal {
          background-color: white;
          border-radius: 8px;
          padding: 24px;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .warning-icon {
          margin-bottom: 16px;
        }
        
        h3 {
          color: #ef4444;
          margin-bottom: 12px;
        }
        
        p {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default ContentWarning;

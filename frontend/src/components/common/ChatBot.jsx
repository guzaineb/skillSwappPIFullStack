import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { User, Bot, Send, MessageCircle, X } from 'lucide-react';
import './ChatBot.css';
import { useAuthStore } from '../../store/authStore';

// Créer une instance axios configurée
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { user } = useAuthStore();

  // Ajouter un message de bienvenue au chargement
  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        text: `Bonjour ! Je suis votre assistant SkillSwapp. Comment puis-je vous aider aujourd'hui ?`,
        isBot: true,
        timestamp: new Date().toISOString()
      }
    ]);
  }, []);

  // Scroll automatique vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Fonction pour basculer l'état du chatbot (ouvert/fermé)
  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Focus sur l'input quand on ouvre le chat
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      isBot: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    inputRef.current?.focus();
    setIsTyping(true);

    try {
      // Utiliser notre API de chatbot
      const response = await api.post('/chatbot/chat', {
        message: input,
        userId: user?._id || 'anonymous',
        username: user?.name || 'Invité',
        context: {
          page: window.location.pathname
        }
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply || "Je suis désolé, je n'ai pas pu traiter votre demande.",
        isBot: true,
        timestamp: new Date().toISOString(),
        isOpenAI: !response.data.fallback // Indiquer si la réponse vient d'OpenAI ou du système de secours
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      const errorMessage = {
        id: Date.now() + 1,
        text: "Désolé, une erreur s'est produite. Veuillez réessayer plus tard.",
        isBot: true,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Fonction pour formater la date
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="chatbot-container">
      {/* Bouton pour ouvrir/fermer le chatbot */}
      <button
        className="chatbot-toggle"
        onClick={toggleChat}
        aria-label={isOpen ? 'Fermer le chatbot' : 'Ouvrir le chatbot'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Interface du chatbot */}
      {isOpen && (
        <div className="chatbox">
          <header className="chatbox-header">
            <span>Assistant SkillSwapp</span>
            <button
              className="close-button"
              onClick={toggleChat}
              aria-label="Fermer le chatbot"
            >
              <X size={18} />
            </button>
          </header>

          <div className="chatbox-body">
            {messages.map(message => (
              <div
                key={message.id}
                className={`chat-message ${message.isBot ? 'bot' : 'user'}`}
              >
                {!message.isBot && <div className="avatar user-avatar"><User size={18} /></div>}
                <div className="bubble">
                  <p>{message.text}</p>
                  {message.timestamp && (
                    <span className="timestamp">{formatTimestamp(message.timestamp)}</span>
                  )}
                </div>
                {message.isBot && (
                  <div className="avatar bot-avatar" title={message.isOpenAI === false ? "Réponse générée localement" : "Réponse OpenAI"}>
                    <Bot size={18} color={message.isOpenAI === false ? "#ff9800" : "#0078d7"} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="chat-message bot typing">
                <div className="bubble">Le bot écrit...</div>
                <div className="avatar bot-avatar"><Bot size={18} /></div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chatbox-input" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrire un message..."
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              aria-label="Envoyer le message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

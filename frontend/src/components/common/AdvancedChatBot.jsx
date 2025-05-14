import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { User, Bot, Send, X, Trash2, RefreshCw, Info, Settings } from 'lucide-react';
import './AdvancedChatBot.css';
import ChatbotSettings from './ChatbotSettings';

const AdvancedChatBot = ({ userId = 'anonymous' }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    fontSize: 'medium',
    soundEnabled: true,
    autoOpen: false,
    language: 'fr',
    bubblePosition: 'right'
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messageSound = useRef(new Audio('/message-sound.mp3'));

  // Charger l'historique des messages au chargement
  useEffect(() => {
    if (isOpen) {
      loadHistory();
      loadSuggestions();
    }
  }, [isOpen]);

  // Charger les paramètres depuis localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('chatbotSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
      }
    }

    // Ouvrir automatiquement le chatbot si configuré
    if (settings.autoOpen) {
      setTimeout(() => setIsOpen(true), 2000);
    }
  }, []);

  // Faire défiler vers le bas lorsque de nouveaux messages arrivent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Charger l'historique des messages
  const loadHistory = async () => {
    try {
      // Nous utilisons maintenant le modèle ChatbotMessage via notre API de chatbot
      const response = await axios.get(`http://localhost:5000/api/chatbot/history/${userId}`);
      if (response.data && Array.isArray(response.data)) {
        const formattedMessages = response.data.map(msg => ({
          text: msg.content,
          isBot: msg.role === 'assistant',
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formattedMessages);
      } else {
        // Si aucun historique n'est disponible, afficher un message de bienvenue
        setMessages([{
          text: "Bienvenue sur l'Assistant SkillExchange ! Comment puis-je vous aider aujourd'hui ?",
          isBot: true,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
      // En cas d'erreur, afficher un message de bienvenue
      setMessages([{
        text: "Bienvenue sur l'Assistant SkillExchange ! Comment puis-je vous aider aujourd'hui ?",
        isBot: true,
        timestamp: new Date()
      }]);
    }
  };

  // Charger les suggestions
  const loadSuggestions = async () => {
    // Utiliser des suggestions statiques puisque nous n'avons plus d'endpoint spécifique
    const defaultSuggestions = [
      { text: "Comment fonctionne SkillExchange ?" },
      { text: "Je veux apprendre le JavaScript" },
      { text: "Je propose des cours de piano" },
      { text: "Quelles compétences sont disponibles ?" },
      { text: "Comment suivre ma progression ?" }
    ];
    setSuggestions(defaultSuggestions);
  };

  // Envoyer un message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    inputRef.current?.focus();
    setIsTyping(true);
    setShowSuggestions(false);

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot/chat', {
        message: input,
        userId,
        username: 'Utilisateur',
        context: {
          page: window.location.pathname
        }
      });

      const botMessage = {
        text: response.data.reply,
        isBot: true,
        timestamp: new Date(),
        isOpenAI: !response.data.fallback // Indiquer si la réponse vient d'OpenAI ou du système de secours
      };

      setMessages(prev => [...prev, botMessage]);

      // Jouer le son de notification
      playNotificationSound();
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        text: 'Désolé, une erreur est survenue. Veuillez réessayer plus tard.',
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Utiliser une suggestion
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.text);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Effacer l'historique
  const clearHistory = async () => {
    try {
      // Nous utilisons maintenant notre API de chatbot
      await axios.delete(`http://localhost:5000/api/chatbot/history/${userId}`);
      setMessages([{
        text: "Historique effacé. Comment puis-je vous aider aujourd'hui ?",
        isBot: true,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique:', error);
      // Afficher un message d'erreur à l'utilisateur
      setMessages(prev => [...prev, {
        text: "Désolé, je n'ai pas pu effacer l'historique. Veuillez réessayer plus tard.",
        isBot: true,
        timestamp: new Date()
      }]);
    }
  };

  // Formater la date
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Ouvrir/fermer le chatbot
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Ouvrir/fermer les paramètres
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Sauvegarder les paramètres
  const saveSettings = async (newSettings) => {
    setSettings(newSettings);
    // Ici, vous pourriez enregistrer les paramètres dans localStorage ou les envoyer au serveur
    localStorage.setItem('chatbotSettings', JSON.stringify(newSettings));
    return Promise.resolve();
  };

  // Jouer un son de notification
  const playNotificationSound = () => {
    if (settings.soundEnabled && messageSound.current) {
      messageSound.current.play().catch(e => console.error('Erreur lors de la lecture du son:', e));
    }
  };

  return (
    <>
      {showSettings && (
        <ChatbotSettings
          onClose={toggleSettings}
          settings={settings}
          onSave={saveSettings}
        />
      )}

      {!isOpen ? (
        <button
          className="chatbot-toggle"
          onClick={toggleChatbot}
          style={{ [settings.bubblePosition]: '20px' }}
        >
          <Bot size={24} />
        </button>
      ) : (
        <div className={`advanced-chatbox ${settings.darkMode ? 'dark-mode' : ''} font-${settings.fontSize}`}>
          <header className="advanced-chatbox-header">
            <div className="header-title">
              <Bot size={20} />
              <span>Assistant SkillExchange</span>
            </div>
            <div className="header-actions">
              <button className="icon-button" onClick={toggleSettings} title="Paramètres">
                <Settings size={18} />
              </button>
              <button className="icon-button" onClick={clearHistory} title="Effacer l'historique">
                <Trash2 size={18} />
              </button>
              <button className="icon-button" onClick={loadHistory} title="Rafraîchir">
                <RefreshCw size={18} />
              </button>
              <button className="icon-button" onClick={toggleChatbot} title="Fermer">
                <X size={18} />
              </button>
            </div>
          </header>

          <div className="advanced-chatbox-body">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <Bot size={48} />
                <h3>Bienvenue sur l'Assistant SkillExchange</h3>
                <p>Comment puis-je vous aider aujourd'hui ?</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.isBot ? 'bot' : 'user'}`}>
                  {!msg.isBot && <div className="avatar user-avatar"><User size={18} /></div>}
                  <div className="message-content">
                    <div className="bubble">{msg.text}</div>
                    <div className="message-time">{formatTime(msg.timestamp)}</div>
                  </div>
                  {msg.isBot && (
                    <div className="avatar bot-avatar" title={msg.isOpenAI === false ? "Réponse générée localement" : "Réponse OpenAI"}>
                      <Bot size={18} color={msg.isOpenAI === false ? "#ff9800" : "#0078d7"} />
                    </div>
                  )}
                </div>
              ))
            )}

            {isTyping && (
              <div className="chat-message bot typing">
                <div className="avatar bot-avatar"><Bot size={18} /></div>
                <div className="message-content">
                  <div className="bubble typing-bubble">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-container">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-button"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.text}
                </button>
              ))}
            </div>
          )}

          <form className="advanced-chatbox-footer" onSubmit={handleSubmit}>
            <button
              type="button"
              className="icon-button suggestion-toggle"
              onClick={() => setShowSuggestions(!showSuggestions)}
              title="Suggestions"
            >
              <Info size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message..."
              ref={inputRef}
              className="message-input"
            />
            <button type="submit" className="send-button" disabled={!input.trim()}>
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AdvancedChatBot;

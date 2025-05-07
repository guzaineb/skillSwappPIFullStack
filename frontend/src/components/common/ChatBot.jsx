import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { User, Bot, Send } from 'lucide-react';
import './ChatBot.css';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    inputRef.current?.focus();
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5000/api/openai/chat', {
        message: input,
      });
      const botMessage = { text: response.data.reply, isBot: true };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: 'Erreur serveur.', isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbox">
      <header className="chatbox-header">Assistant Virtuel</header>

      <div className="chatbox-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.isBot ? 'bot' : 'user'}`}>
            {!msg.isBot && <div className="avatar user-avatar"><User size={18} /></div>}
            <div className="bubble">{msg.text}</div>
            {msg.isBot && <div className="avatar bot-avatar"><Bot size={18} /></div>}
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
        <button type="submit" disabled={isTyping}><Send size={18} /></button>
      </form>
    </div>
  );
};

export default ChatBot;

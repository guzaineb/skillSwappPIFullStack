import React, { useState, useRef } from 'react';
import axios from 'axios';
import { User, Bot, Send } from 'lucide-react';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isBot: false }]);

    try {
      const response = await axios.post('http://localhost:5000/api/openai/chat', { message: input });

      setMessages(prev => [...prev, { text: response.data.reply, isBot: true }]);
      setInput('');
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: 'Error communicating with AI', isBot: true }]);
    }
  };

  return (
    <div className="flex flex-col h-[500px] max-w-md mx-auto bg-gray-50 rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Chat Assistant</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            {msg.isBot && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-blue-600" />
              </div>
            )}
            <div className={`px-4 py-2 rounded-2xl max-w-[75%] ${msg.isBot ? 'bg-white border border-gray-200 text-gray-800 rounded-bl-none' : 'bg-blue-600 text-white rounded-br-none'}`}>
              <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
            </div>
            {!msg.isBot && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white p-3 border-t border-gray-200">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;

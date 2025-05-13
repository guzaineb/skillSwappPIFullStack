import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdvancedChatBot from '../components/common/AdvancedChatBot';
import { User, Bot, MessageSquare, BarChart2 } from 'lucide-react';
import './ChatbotDemo.css';

const ChatbotDemo = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('anonymous');

  // Charger les statistiques du chatbot
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/advanced-chatbot/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Simuler un utilisateur connecté
    const randomUserId = `user_${Math.floor(Math.random() * 1000)}`;
    setUserId(randomUserId);
  }, []);

  return (
    <div className="chatbot-demo-container">
      <div className="chatbot-demo-header">
        <h1>Démonstration du Chatbot Avancé</h1>
        <p>Interagissez avec notre assistant virtuel intelligent pour obtenir de l'aide sur la plateforme SkillExchange</p>
      </div>

      <div className="chatbot-demo-content">
        <div className="chatbot-demo-info">
          <div className="info-card">
            <div className="info-icon">
              <Bot size={32} />
            </div>
            <div className="info-content">
              <h3>Assistant IA</h3>
              <p>Notre chatbot utilise l'intelligence artificielle avancée pour comprendre vos questions et y répondre de manière naturelle.</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <MessageSquare size={32} />
            </div>
            <div className="info-content">
              <h3>Conversations Contextuelles</h3>
              <p>Le chatbot se souvient de vos conversations précédentes pour vous offrir une expérience personnalisée.</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <User size={32} />
            </div>
            <div className="info-content">
              <h3>Assistance Personnalisée</h3>
              <p>Obtenez des réponses adaptées à vos besoins spécifiques sur la plateforme SkillExchange.</p>
            </div>
          </div>
        </div>

        {!loading && stats && (
          <div className="chatbot-stats">
            <h2>Statistiques du Chatbot</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{stats.totalMessages}</h3>
                <p>Messages Totaux</p>
              </div>
              <div className="stat-card">
                <h3>{stats.userMessages}</h3>
                <p>Questions Utilisateurs</p>
              </div>
              <div className="stat-card">
                <h3>{stats.assistantMessages}</h3>
                <p>Réponses Assistant</p>
              </div>
              <div className="stat-card">
                <h3>{stats.recentMessages}</h3>
                <p>Messages (24h)</p>
              </div>
            </div>
          </div>
        )}

        <div className="chatbot-examples">
          <h2>Exemples de Questions</h2>
          <div className="examples-list">
            <div className="example-item">
              <span className="example-tag">Général</span>
              <p>Comment fonctionne SkillExchange ?</p>
            </div>
            <div className="example-item">
              <span className="example-tag">Compétences</span>
              <p>Quelles compétences sont disponibles sur la plateforme ?</p>
            </div>
            <div className="example-item">
              <span className="example-tag">Apprentissage</span>
              <p>Je veux apprendre le JavaScript, comment faire ?</p>
            </div>
            <div className="example-item">
              <span className="example-tag">Enseignement</span>
              <p>Comment puis-je proposer mes compétences en piano ?</p>
            </div>
            <div className="example-item">
              <span className="example-tag">Compte</span>
              <p>Comment créer un compte sur SkillExchange ?</p>
            </div>
            <div className="example-item">
              <span className="example-tag">Aide</span>
              <p>J'ai besoin d'aide pour trouver un mentor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Intégration du chatbot */}
      <AdvancedChatBot userId={userId} />
    </div>
  );
};

export default ChatbotDemo;

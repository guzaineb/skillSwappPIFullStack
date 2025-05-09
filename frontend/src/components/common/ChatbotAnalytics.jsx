import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Bot, MessageSquare, Users, Clock } from 'lucide-react';
import './ChatbotAnalytics.css';

const ChatbotAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('week'); // 'day', 'week', 'month'

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/advanced-chatbot/stats?range=${timeRange}`);
      setStats(response.data);
      setError(null);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      setError('Impossible de charger les statistiques du chatbot');
    } finally {
      setLoading(false);
    }
  };

  // Données fictives pour la démonstration
  const mockData = {
    totalMessages: 1245,
    userMessages: 623,
    assistantMessages: 622,
    recentMessages: 87,
    averageResponseTime: '1.2s',
    messagesByDay: [
      { day: 'Lun', count: 42 },
      { day: 'Mar', count: 53 },
      { day: 'Mer', count: 76 },
      { day: 'Jeu', count: 48 },
      { day: 'Ven', count: 65 },
      { day: 'Sam', count: 38 },
      { day: 'Dim', count: 27 }
    ],
    intentDistribution: [
      { name: 'Information', value: 35 },
      { name: 'Aide', value: 25 },
      { name: 'Apprentissage', value: 20 },
      { name: 'Autre', value: 20 }
    ]
  };

  // Utiliser les données réelles ou les données fictives
  const data = stats || mockData;

  if (loading) {
    return (
      <div className="chatbot-analytics-container loading">
        <div className="loading-spinner"></div>
        <p>Chargement des statistiques...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chatbot-analytics-container error">
        <div className="error-message">
          <span>⚠️</span>
          <p>{error}</p>
          <button onClick={fetchStats}>Réessayer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chatbot-analytics-container">
      <div className="analytics-header">
        <h2>Statistiques du Chatbot</h2>
        <div className="time-range-selector">
          <button 
            className={timeRange === 'day' ? 'active' : ''} 
            onClick={() => setTimeRange('day')}
          >
            Jour
          </button>
          <button 
            className={timeRange === 'week' ? 'active' : ''} 
            onClick={() => setTimeRange('week')}
          >
            Semaine
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''} 
            onClick={() => setTimeRange('month')}
          >
            Mois
          </button>
        </div>
      </div>

      <div className="analytics-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <MessageSquare size={24} />
          </div>
          <div className="summary-content">
            <h3>{data.totalMessages}</h3>
            <p>Messages Totaux</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <Users size={24} />
          </div>
          <div className="summary-content">
            <h3>{data.userMessages}</h3>
            <p>Questions Utilisateurs</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <Bot size={24} />
          </div>
          <div className="summary-content">
            <h3>{data.assistantMessages}</h3>
            <p>Réponses Assistant</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <Clock size={24} />
          </div>
          <div className="summary-content">
            <h3>{data.averageResponseTime}</h3>
            <p>Temps de Réponse Moyen</p>
          </div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-container">
          <h3>Messages par Jour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.messagesByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Messages" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Distribution des Intentions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.intentDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.intentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChatbotAnalytics;

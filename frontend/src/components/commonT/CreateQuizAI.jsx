import React, { useState } from 'react';
import axios from 'axios';

export default function CreateQuizAI({ onQuizGenerated }) {
  const [config, setConfig] = useState({
    topic: '',
    difficulty: 'medium',
    questionCount: 5
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleGenerate = async () => {
    if (!config.topic.trim()) {
      setError('Veuillez saisir un sujet valide');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/ai-quiz/generate',
        {
          ...config,
          creatorEmail: localStorage.getItem('userEmail') || 'user@example.com'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          timeout: 15000
        }
      );

      if (res.data?.quiz?.questions) {
        setSuccess(`Quiz généré avec ${res.data.quiz.questions.length} questions!`);
        if (typeof onQuizGenerated === 'function') {
          onQuizGenerated(res.data.quiz);
        }
      } else {
        throw new Error('Format de réponse inattendu');
      }
    } catch (error) {
      let errorMessage = 'Erreur lors de la génération';
      
      if (error.response) {
        errorMessage = error.response.data?.error || errorMessage;
        if (error.response.data?.details) {
          errorMessage += `: ${error.response.data.details}`;
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Timeout - Le serveur a mis trop de temps à répondre';
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: name === 'questionCount' 
        ? Math.min(Math.max(parseInt(value) || 1, 1), 20) 
        : value
    }));
  };

  return (
    <div className="ai-quiz-generator">
      <h3>Générateur de Quiz Wikipedia</h3>
      
      <div className="form-control">
        <label>Sujet *</label>
        <input
          type="text"
          name="topic"
          value={config.topic}
          onChange={handleInputChange}
          placeholder="Ex: Révolution française"
          disabled={isLoading}
        />
      </div>

      <div className="form-control">
        <label>Difficulté</label>
        <select
          name="difficulty"
          value={config.difficulty}
          onChange={handleInputChange}
          disabled={isLoading}
        >
          <option value="easy">Facile</option>
          <option value="medium">Moyen</option>
          <option value="hard">Difficile</option>
        </select>
      </div>

      <div className="form-control">
        <label>Nombre de questions (1-20)</label>
        <input
          type="number"
          name="questionCount"
          min="1"
          max="20"
          value={config.questionCount}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="alert error">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="alert success">
          <p>{success}</p>
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={isLoading || !config.topic.trim()}
        className={`btn-generate ${isLoading ? 'loading' : ''}`}
      >
        {isLoading ? 'Génération...' : 'Générer le Quiz'}
      </button>

      <style jsx>{`
        .ai-quiz-generator {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .form-control {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        input, select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        .alert {
          padding: 1rem;
          margin: 1rem 0;
          border-radius: 4px;
        }
        .error {
          background: #ffebee;
          border: 1px solid #f44336;
          color: #d32f2f;
        }
        .success {
          background: #e8f5e9;
          border: 1px solid #4caf50;
          color: #2e7d32;
        }
        .btn-generate {
          width: 100%;
          padding: 1rem;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .btn-generate:hover:not(:disabled) {
          background: #388e3c;
        }
        .btn-generate:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }
        .loading {
          position: relative;
          pointer-events: none;
        }
        .loading::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          margin: -10px 0 0 -10px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
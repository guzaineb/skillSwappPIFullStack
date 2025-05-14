import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-toastify';
import './SkillResponses.css';

const SkillResponses = ({ skillId }) => {
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuthStore();

  // Récupérer les réponses au chargement du composant
  useEffect(() => {
    if (skillId) {
      fetchResponses();
    }
  }, [skillId]);

  // Fonction pour récupérer les réponses
  const fetchResponses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:5000/api/skill-response/skill/${skillId}`);
      setResponses(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des réponses:', err);
      setError('Impossible de charger les réponses. Veuillez réessayer plus tard.');
      setLoading(false);
    }
  };

  // Fonction pour ajouter une réponse
  const handleAddResponse = async (e) => {
    e.preventDefault();
    if (!newResponse.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        'http://localhost:5000/api/skill-response/create',
        {
          skillId,
          text: newResponse
        },
        {
          withCredentials: true
        }
      );
      setResponses([response.data, ...responses]);
      setNewResponse('');
      setLoading(false);
      toast.success('Votre réponse a été ajoutée avec succès!');
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la réponse:', err);
      setError('Impossible d\'ajouter votre réponse. Veuillez réessayer plus tard.');
      setLoading(false);
      toast.error('Erreur lors de l\'ajout de la réponse');
    }
  };

  // Fonction pour ajouter une réponse à une réponse
  const handleAddReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !replyingTo) return;

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        `http://localhost:5000/api/skill-response/reply/${replyingTo}`,
        {
          text: replyText
        },
        {
          withCredentials: true
        }
      );

      // Mettre à jour la liste des réponses
      const updatedResponses = responses.map(resp =>
        resp._id === response.data._id ? response.data : resp
      );

      setResponses(updatedResponses);
      setReplyText('');
      setReplyingTo(null);
      setLoading(false);
      toast.success('Votre réponse a été ajoutée avec succès!');
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la réponse:', err);
      setError('Impossible d\'ajouter votre réponse. Veuillez réessayer plus tard.');
      setLoading(false);
      toast.error('Erreur lors de l\'ajout de la réponse');
    }
  };

  // Fonction pour supprimer une réponse
  const handleDeleteResponse = async (responseId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette réponse ?')) return;

    try {
      setLoading(true);
      setError(null);
      await axios.delete(
        `http://localhost:5000/api/skill-response/${responseId}`,
        {
          withCredentials: true
        }
      );

      // Mettre à jour la liste des réponses
      const updatedResponses = responses.filter(resp => resp._id !== responseId);
      setResponses(updatedResponses);
      setLoading(false);
      toast.success('Réponse supprimée avec succès!');
    } catch (err) {
      console.error('Erreur lors de la suppression de la réponse:', err);
      setError('Impossible de supprimer la réponse. Veuillez réessayer plus tard.');
      setLoading(false);
      toast.error('Erreur lors de la suppression de la réponse');
    }
  };

  // Formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="skill-responses-container">
      <h3 className="responses-title">Réponses et Questions</h3>

      {isAuthenticated ? (
        <form className="response-form" onSubmit={handleAddResponse}>
          <textarea
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
            placeholder="Posez une question ou partagez votre expérience avec ce skill..."
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
      ) : (
        <p className="login-prompt">Connectez-vous pour poser une question ou partager votre expérience.</p>
      )}

      {error && <div className="error-message">{error}</div>}

      {loading && !replyingTo && <div className="loading">Chargement...</div>}

      <div className="responses-list">
        {responses.length === 0 ? (
          <p className="no-responses">Aucune réponse pour le moment. Soyez le premier à partager votre expérience !</p>
        ) : (
          responses.map(response => (
            <div key={response._id} className="response-item">
              <div className="response-header">
                <div className="user-info">
                  <img
                    src={response.user?.profileImg || '/default-avatar.png'}
                    alt={response.user?.name || 'Utilisateur'}
                    className="user-avatar"
                  />
                  <span className="username">{response.user?.name || 'Utilisateur'}</span>
                </div>
                <span className="response-date">{formatDate(response.createdAt)}</span>
              </div>

              <div className="response-content">
                <p>{response.text}</p>
              </div>

              <div className="response-actions">
                {isAuthenticated && (
                  <>
                    <button
                      className="reply-button"
                      onClick={() => setReplyingTo(response._id)}
                    >
                      Répondre
                    </button>

                    {user && (user.id === response.user?._id || user._id === response.user?._id) && (
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteResponse(response._id)}
                      >
                        Supprimer
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Formulaire de réponse */}
              {replyingTo === response._id && (
                <form className="reply-form" onSubmit={handleAddReply}>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Votre réponse..."
                    required
                  />
                  <div className="reply-actions">
                    <button type="submit" disabled={loading}>
                      {loading ? 'Envoi...' : 'Répondre'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}

              {/* Réponses imbriquées */}
              {response.replies && response.replies.length > 0 && (
                <div className="replies-container">
                  {response.replies.map((reply, index) => (
                    <div key={index} className="reply-item">
                      <div className="reply-header">
                        <div className="user-info">
                          <img
                            src={reply.user?.profileImg || '/default-avatar.png'}
                            alt={reply.user?.name || 'Utilisateur'}
                            className="user-avatar small"
                          />
                          <span className="username">{reply.user?.name || 'Utilisateur'}</span>
                        </div>
                        <span className="reply-date">{formatDate(reply.createdAt)}</span>
                      </div>
                      <div className="reply-content">
                        <p>{reply.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillResponses;

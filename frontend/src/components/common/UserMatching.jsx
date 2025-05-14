import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-toastify';
import './UserMatching.css';

// Configuration globale d'axios pour les requêtes
axios.defaults.withCredentials = true;

const UserMatching = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [usersByCategory, setUsersByCategory] = useState([]);
  const [similarUsers, setSimilarUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState({
    categories: false,
    usersByCategory: false,
    similarUsers: false,
    following: false,
    followers: false,
    matches: false,
    generatingMatches: false,
    updatingProfile: false
  });
  const [userProfile, setUserProfile] = useState(null);

  // Récupérer les catégories au chargement du composant
  useEffect(() => {
    if (isAuthenticated) {
      fetchCategories();
      fetchSimilarUsers();
      fetchFollowing();
      fetchFollowers();
      fetchUserMatches();
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  // Récupérer les utilisateurs lorsqu'une catégorie est sélectionnée
  useEffect(() => {
    if (selectedCategory) {
      fetchUsersByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Récupérer les catégories
  const fetchCategories = async () => {
    setLoading(prev => ({ ...prev, categories: true }));
    try {
      // Récupérer le token d'authentification
      const token = localStorage.getItem('authToken') || document.cookie.match(/jwt=([^;]+)/)?.[1];

      // Utiliser l'URL complète pour éviter les problèmes de préfixe
      const response = await axios.get('http://localhost:5000/api/category/categories', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        withCredentials: true
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      toast.error('Erreur lors de la récupération des catégories');
    } finally {
      setLoading(prev => ({ ...prev, categories: false }));
    }
  };

  // Récupérer les utilisateurs par catégorie
  const fetchUsersByCategory = async (categoryId) => {
    setLoading(prev => ({ ...prev, usersByCategory: true }));
    try {
      // Récupérer le token d'authentification
      const token = localStorage.getItem('authToken') || document.cookie.match(/jwt=([^;]+)/)?.[1];

      if (!token) {
        toast.error('Vous devez être connecté pour voir les utilisateurs par catégorie');
        setLoading(prev => ({ ...prev, usersByCategory: false }));
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/matching/category/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
      setUsersByCategory(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs par catégorie:', error);
      toast.error('Erreur lors de la récupération des utilisateurs');
    } finally {
      setLoading(prev => ({ ...prev, usersByCategory: false }));
    }
  };

  // Récupérer les utilisateurs similaires
  const fetchSimilarUsers = async () => {
    setLoading(prev => ({ ...prev, similarUsers: true }));
    try {
      // Récupérer le token d'authentification
      const token = localStorage.getItem('authToken') || document.cookie.match(/jwt=([^;]+)/)?.[1];

      if (!token) {
        toast.error('Vous devez être connecté pour voir les utilisateurs similaires');
        setLoading(prev => ({ ...prev, similarUsers: false }));
        return;
      }

      const response = await axios.get('http://localhost:5000/api/matching/similar', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
      setSimilarUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs similaires:', error);
      toast.error('Erreur lors de la récupération des utilisateurs similaires');
    } finally {
      setLoading(prev => ({ ...prev, similarUsers: false }));
    }
  };

  // Récupérer les utilisateurs suivis
  const fetchFollowing = async () => {
    setLoading(prev => ({ ...prev, following: true }));
    try {
      // Récupérer le token d'authentification
      const token = localStorage.getItem('authToken') || document.cookie.match(/jwt=([^;]+)/)?.[1];

      if (!token) {
        toast.error('Vous devez être connecté pour voir les utilisateurs que vous suivez');
        setLoading(prev => ({ ...prev, following: false }));
        return;
      }

      const response = await axios.get('http://localhost:5000/api/matching/following', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
      setFollowing(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs suivis:', error);
      toast.error('Erreur lors de la récupération des utilisateurs suivis');
    } finally {
      setLoading(prev => ({ ...prev, following: false }));
    }
  };

  // Récupérer les followers
  const fetchFollowers = async () => {
    setLoading(prev => ({ ...prev, followers: true }));
    try {
      // Récupérer le token d'authentification
      const token = localStorage.getItem('authToken') || document.cookie.match(/jwt=([^;]+)/)?.[1];

      if (!token) {
        toast.error('Vous devez être connecté pour voir vos followers');
        setLoading(prev => ({ ...prev, followers: false }));
        return;
      }

      const response = await axios.get('http://localhost:5000/api/matching/followers', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
      setFollowers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des followers:', error);
      toast.error('Erreur lors de la récupération des followers');
    } finally {
      setLoading(prev => ({ ...prev, followers: false }));
    }
  };

  // Suivre/Ne plus suivre un utilisateur
  const handleFollowToggle = async (userId) => {
    try {
      // Récupérer le token d'authentification
      const token = localStorage.getItem('authToken') || document.cookie.match(/jwt=([^;]+)/)?.[1];

      if (!token) {
        toast.error('Vous devez être connecté pour suivre un utilisateur');
        return;
      }

      // Envoyer la requête avec le token d'authentification
      await axios.post(`http://localhost:5000/api/users/follow/${userId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });

      // Mettre à jour les listes
      fetchFollowing();
      fetchFollowers();

      // Si l'utilisateur est dans la liste des utilisateurs par catégorie, mettre à jour son statut
      if (usersByCategory.some(u => u._id === userId)) {
        fetchUsersByCategory(selectedCategory);
      }

      // Si l'utilisateur est dans la liste des utilisateurs similaires, mettre à jour son statut
      if (similarUsers.some(u => u._id === userId)) {
        fetchSimilarUsers();
      }

      toast.success('Statut de suivi mis à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de suivi:', error);
      toast.error('Erreur lors de la mise à jour du statut de suivi');
    }
  };

  // Récupérer les matchs de l'utilisateur
  const fetchUserMatches = async () => {
    setLoading(prev => ({ ...prev, matches: true }));
    try {
      // Récupérer le token d'authentification
      const token = localStorage.getItem('authToken') || document.cookie.match(/jwt=([^;]+)/)?.[1];

      if (!token) {
        toast.error('Vous devez être connecté pour voir vos matchs');
        setLoading(prev => ({ ...prev, matches: false }));
        return;
      }

      const response = await axios.get('http://localhost:5000/api/matching/matches', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setMatches(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des matchs:', error);
      toast.error('Erreur lors de la récupération des matchs');
    } finally {
      setLoading(prev => ({ ...prev, matches: false }));
    }
  };

  // Récupérer le profil utilisateur pour le matching
  const fetchUserProfile = async () => {
    setLoading(prev => ({ ...prev, updatingProfile: true }));
    try {
      // Récupérer le token d'authentification
      const token = localStorage.getItem('authToken') || document.cookie.match(/jwt=([^;]+)/)?.[1];

      if (!token) {
        toast.error('Vous devez être connecté pour voir votre profil');
        setLoading(prev => ({ ...prev, updatingProfile: false }));
        return;
      }

      const response = await axios.get('http://localhost:5000/api/matching/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUserProfile(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      toast.error('Erreur lors de la récupération du profil');
    } finally {
      setLoading(prev => ({ ...prev, updatingProfile: false }));
    }
  };

  // Générer des matchs basés sur l'IA
  const handleGenerateMatches = async () => {
    setLoading(prev => ({ ...prev, generatingMatches: true }));
    try {
      const token = localStorage.getItem('authToken') || document.cookie.match(/jwt=([^;]+)/)?.[1];

      if (!token) {
        toast.error('Vous devez être connecté pour générer des matchs');
        setLoading(prev => ({ ...prev, generatingMatches: false }));
        return;
      }

      const response = await axios.post('http://localhost:5000/api/matching/generate-matches', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setMatches(response.data.matches);
      toast.success('Matchs générés avec succès');
    } catch (error) {
      console.error('Erreur lors de la génération des matchs:', error);
      toast.error('Erreur lors de la génération des matchs');
    } finally {
      setLoading(prev => ({ ...prev, generatingMatches: false }));
    }
  };

  // Répondre à un match (accepter/refuser)
  const handleMatchResponse = async (matchId, status) => {
    try {
      const token = localStorage.getItem('authToken') || document.cookie.match(/jwt=([^;]+)/)?.[1];

      if (!token) {
        toast.error('Vous devez être connecté pour répondre à un match');
        return;
      }

      await axios.put(`http://localhost:5000/api/matching/match/${matchId}`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Mettre à jour la liste des matchs
      fetchUserMatches();

      toast.success(`Match ${status === 'accepted' ? 'accepté' : 'refusé'} avec succès`);
    } catch (error) {
      console.error('Erreur lors de la réponse au match:', error);
      toast.error('Erreur lors de la réponse au match');
    }
  };

  // Vérifier si l'utilisateur est suivi
  const isFollowing = (userId) => {
    return following.some(f => f._id === userId);
  };

  // Rendu des utilisateurs
  const renderUsers = (users, title, emptyMessage) => {
    return (
      <div className="user-list-section">
        <h3>{title}</h3>
        {users.length === 0 ? (
          <p className="empty-message">{emptyMessage}</p>
        ) : (
          <div className="user-cards">
            {users.map(user => (
              <div key={user._id} className="user-card">
                <div className="user-card-header">
                  <img
                    src={user.profileImg || 'https://via.placeholder.com/50'}
                    alt={user.name}
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <span className="user-role">{user.role}</span>
                  </div>
                </div>
                {user.bio && <p className="user-bio">{user.bio}</p>}
                <button
                  className={`follow-button ${isFollowing(user._id) ? 'following' : ''}`}
                  onClick={() => handleFollowToggle(user._id)}
                >
                  {isFollowing(user._id) ? 'Ne plus suivre' : 'Suivre'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Rendu des matchs
  const renderMatches = () => {
    return (
      <div className="matches-list">
        {matches.map(match => (
          <div key={match._id} className="match-card">
            <div className="match-user-info">
              <img
                src={match.matchedUser.profileImg || 'https://via.placeholder.com/50'}
                alt={match.matchedUser.name}
                className="user-avatar"
              />
              <div className="user-details">
                <h4>{match.matchedUser.name}</h4>
                <span className="match-score">Score de compatibilité: {(match.score.total * 100).toFixed(0)}%</span>
                <p className="match-reason">
                  {match.matchReason === 'similar_skills' && 'Compétences similaires'}
                  {match.matchReason === 'complementary_skills' && 'Compétences complémentaires'}
                  {match.matchReason === 'similar_interests' && 'Intérêts similaires'}
                  {match.matchReason === 'learning_buddy' && 'Partenaire d\'apprentissage'}
                  {match.matchReason === 'mentor_mentee' && 'Relation mentor/mentoré'}
                </p>
              </div>
            </div>
            <div className="match-actions">
              <button
                className="accept-match"
                onClick={() => handleMatchResponse(match._id, 'accepted')}
              >
                Accepter
              </button>
              <button
                className="reject-match"
                onClick={() => handleMatchResponse(match._id, 'rejected')}
              >
                Refuser
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="user-matching-container">
      <h2>Découvrir des utilisateurs</h2>

      {/* Section de matching IA */}
      <div className="ai-matching-section">
        <h3>Matchs basés sur l'IA</h3>
        <p className="matching-description">
          Notre système de matching intelligent utilise l'intelligence artificielle pour vous connecter avec des utilisateurs compatibles en fonction de vos compétences, intérêts et style d'apprentissage.
        </p>
        <button
          className="generate-matches-button"
          onClick={handleGenerateMatches}
          disabled={loading.generatingMatches}
        >
          {loading.generatingMatches ? 'Génération en cours...' : 'Générer des matchs intelligents'}
        </button>

        {loading.matches ? (
          <div className="loading">Chargement des matchs...</div>
        ) : matches.length > 0 ? (
          renderMatches()
        ) : (
          <p className="empty-message">Aucun match généré. Cliquez sur le bouton pour trouver des utilisateurs compatibles.</p>
        )}
      </div>

      {/* Section des utilisateurs similaires */}
      {loading.similarUsers ? (
        <div className="loading">Chargement des utilisateurs similaires...</div>
      ) : (
        renderUsers(
          similarUsers,
          'Utilisateurs avec des intérêts similaires',
          'Aucun utilisateur avec des intérêts similaires trouvé'
        )
      )}

      {/* Section des utilisateurs par catégorie */}
      <div className="category-section">
        <h3>Utilisateurs par catégorie</h3>
        <div className="category-selector">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={loading.categories}
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          loading.usersByCategory ? (
            <div className="loading">Chargement des utilisateurs...</div>
          ) : (
            renderUsers(
              usersByCategory,
              `Utilisateurs dans cette catégorie`,
              'Aucun utilisateur trouvé dans cette catégorie'
            )
          )
        )}
      </div>

      {/* Section des utilisateurs suivis */}
      {loading.following ? (
        <div className="loading">Chargement des utilisateurs suivis...</div>
      ) : (
        renderUsers(
          following,
          'Utilisateurs que vous suivez',
          'Vous ne suivez aucun utilisateur'
        )
      )}

      {/* Section des followers */}
      {loading.followers ? (
        <div className="loading">Chargement des followers...</div>
      ) : (
        renderUsers(
          followers,
          'Utilisateurs qui vous suivent',
          'Aucun utilisateur ne vous suit'
        )
      )}
    </div>
  );
};

export default UserMatching;

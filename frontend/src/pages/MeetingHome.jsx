import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaVideo, FaUsers, FaPlus, FaArrowRight, FaHistory } from 'react-icons/fa';
import '../styles/meeting.css';
import authService from '../services/authService';
import { toast } from 'react-toastify';

const MeetingHome = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [joinMeetingId, setJoinMeetingId] = useState('');
  const [recentMeetings, setRecentMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour simuler des données de réunion pour les tests
    const loadMockMeetings = () => {
      console.log('Chargement de réunions simulées pour les tests');

      // Données de réunion simulées
      const mockMeetings = [
        {
          _id: '1',
          meetingId: 'test123',
          title: 'Réunion de test 1',
          createdAt: new Date().toISOString(),
          hostId: 'user1'
        },
        {
          _id: '2',
          meetingId: 'test456',
          title: 'Réunion de test 2',
          createdAt: new Date(Date.now() - 86400000).toISOString(), // Hier
          hostId: 'user1'
        },
        {
          _id: '3',
          meetingId: 'test789',
          title: 'Réunion de test 3',
          createdAt: new Date(Date.now() - 172800000).toISOString(), // Avant-hier
          hostId: 'user2'
        }
      ];

      setRecentMeetings(mockMeetings);
      console.log('Réunions simulées chargées:', mockMeetings.length);
    };

    // Essayer de charger les vraies réunions, sinon utiliser des données simulées
    const loadRealOrMockMeetings = async () => {
      try {
        console.log('Tentative de chargement des réunions réelles');
        const token = authService.getToken();

        if (token) {
          console.log('Token trouvé, tentative de chargement des réunions réelles');
          await fetchUserMeetings();
        } else {
          console.log('Aucun token trouvé, chargement de réunions simulées');
          loadMockMeetings();
        }
      } catch (error) {
        console.error('Erreur lors du chargement des réunions réelles:', error);
        console.log('Chargement de réunions simulées à la place');
        loadMockMeetings();
      }
    };

    // Charger les réunions (réelles ou simulées)
    loadRealOrMockMeetings();

    // Configurer un intervalle pour actualiser les réunions toutes les 30 secondes
    const refreshInterval = setInterval(() => {
      console.log('Actualisation automatique des réunions');
      loadRealOrMockMeetings();
    }, 30000); // 30 secondes

    // Nettoyer l'intervalle lors du démontage du composant
    return () => {
      clearInterval(refreshInterval);
    };
  }, [navigate]);

  const fetchUserMeetings = async () => {
    try {
      const token = authService.getToken();

      console.log('Récupération des meetings avec le token:', token ? 'Token présent' : 'Token absent');

      if (!token) {
        console.error('Aucun token disponible pour récupérer les réunions');
        // Ne pas rediriger, utiliser des données simulées à la place
        throw new Error('Aucun token disponible');
      }

      console.log('Envoi de la requête API pour récupérer les réunions');

      // Vérifier d'abord si l'API est disponible
      try {
        // Tester si le serveur est en ligne
        await axios.get('http://localhost:5000', { timeout: 5000 });
      } catch (serverError) {
        console.error('Serveur backend non disponible:', serverError.message);
        toast.error('Serveur non disponible. Utilisation de données simulées.');
        throw new Error('Serveur non disponible');
      }

      // Essayer de récupérer les réunions
      const response = await axios.get('http://localhost:5000/api/meetings/user/meetings', {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        timeout: 15000 // Timeout augmenté à 15 secondes
      });

      console.log('Réponse API meetings:', response.data);

      if (!response.data.success) {
        console.error('Erreur API:', response.data.message);
        toast.error('Erreur lors du chargement des réunions: ' + response.data.message);
        throw new Error('Erreur API: ' + response.data.message);
      }

      const { hostedMeetings = [], participatedMeetings = [] } = response.data;

      console.log('Réunions hébergées:', hostedMeetings.length);
      console.log('Réunions participées:', participatedMeetings.length);

      // Vérifier si les données sont valides
      if (!Array.isArray(hostedMeetings) || !Array.isArray(participatedMeetings)) {
        console.error('Format de données invalide:', response.data);
        toast.error('Format de données invalide reçu du serveur');
        throw new Error('Format de données invalide');
      }

      // Combiner et trier par date
      const allMeetings = [...hostedMeetings, ...participatedMeetings]
        .sort((a, b) => new Date(b.startTime || b.createdAt) - new Date(a.startTime || a.createdAt))
        .slice(0, 5); // Limiter aux 5 plus récentes

      console.log('Réunions combinées:', allMeetings.length);
      console.log('Données des réunions:', allMeetings);

      setRecentMeetings(allMeetings);
    } catch (error) {
      console.error('Erreur lors du chargement des réunions:', error);

      if (error.response) {
        console.error('Détails de l\'erreur:', error.response.data);

        if (error.response.status === 401) {
          console.log('Erreur 401: Non autorisé');
          toast.error('Session expirée. Veuillez vous reconnecter.');
          authService.logout();
          navigate('/signin');
        } else if (error.response.status === 403) {
          console.log('Erreur 403: Accès interdit');
          toast.error('Vous n\'avez pas les droits nécessaires pour accéder à cette ressource');
        } else if (error.response.status === 404) {
          console.log('Erreur 404: Ressource non trouvée');
          toast.error('La ressource demandée n\'existe pas');
        } else {
          toast.error(`Erreur: ${error.response.data.message || 'Problème lors du chargement des réunions'}`);
        }
      } else if (error.code === 'ECONNABORTED') {
        console.error('Timeout de la requête');
        toast.error('La requête a pris trop de temps. Veuillez réessayer.');
      } else if (error.request) {
        console.error('Pas de réponse du serveur:', error.request);
        toast.error('Impossible de contacter le serveur. Vérifiez votre connexion internet.');
      } else {
        console.error('Erreur de configuration:', error.message);
        toast.error('Erreur lors de la préparation de la requête.');
      }
    }
  };

  const createMeeting = async (e) => {
    e.preventDefault();

    if (!meetingTitle.trim()) {
      toast.warning('Veuillez saisir un titre pour la réunion');
      return;
    }

    try {
      setIsCreating(true);

      // Générer un ID de réunion aléatoire pour le mode test
      const generateTestMeetingId = () => {
        return Math.random().toString(36).substring(2, 10);
      };

      // Vérifier si le serveur est disponible
      let serverAvailable = false;
      try {
        await axios.get('http://localhost:5000', { timeout: 3000 });
        serverAvailable = true;
      } catch (error) {
        console.log('Serveur non disponible, utilisation du mode test');
        serverAvailable = false;
      }

      // Si le serveur n'est pas disponible ou pas de token, utiliser le mode test
      const token = authService.getToken();
      if (!serverAvailable || !token) {
        console.log('Mode test activé pour la création de réunion');

        // Simuler un délai de création
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Créer une réunion de test
        const testMeetingId = generateTestMeetingId();
        console.log('Réunion de test créée avec ID:', testMeetingId);

        // Ajouter la réunion à la liste des réunions récentes
        const newMeeting = {
          _id: Date.now().toString(),
          meetingId: testMeetingId,
          title: meetingTitle,
          createdAt: new Date().toISOString(),
          hostId: 'test-user'
        };

        setRecentMeetings(prevMeetings => [newMeeting, ...prevMeetings].slice(0, 5));

        toast.success('Réunion créée avec succès (mode test)');

        // Naviguer vers la salle de réunion
        navigate(`/meeting/${testMeetingId}`);
        return;
      }

      console.log('Envoi de la requête de création de réunion avec titre:', meetingTitle);

      const response = await axios.post('http://localhost:5000/api/meetings', {
        title: meetingTitle,
        settings: {
          allowScreenShare: true,
          allowChat: true,
          waitingRoom: false
        }
      }, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        timeout: 15000 // Timeout augmenté à 15 secondes
      });

      console.log('Réponse de création de réunion:', response.data);

      if (response.data && response.data.meeting && response.data.meeting.meetingId) {
        const { meetingId } = response.data.meeting;
        console.log('Réunion créée avec ID:', meetingId);
        toast.success('Réunion créée avec succès');

        // Actualiser la liste des réunions avant de naviguer
        await fetchUserMeetings();

        // Naviguer vers la salle de réunion
        navigate(`/meeting/${meetingId}`);
      } else {
        console.error('Format de réponse inattendu:', response.data);
        toast.error('Format de réponse inattendu. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la réunion:', error);

      if (error.code === 'ECONNABORTED') {
        toast.error('La connexion au serveur a pris trop de temps. Veuillez réessayer.');
      } else if (!error.response) {
        toast.error('Impossible de se connecter au serveur. Vérifiez votre connexion internet.');
      } else if (error.response) {
        console.error('Détails de l\'erreur:', error.response.data);

        if (error.response.status === 401) {
          toast.error('Votre session a expiré. Veuillez vous reconnecter.');
          authService.logout();
          navigate('/signin');
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message || 'Données invalides. Vérifiez les informations saisies.');
        } else if (error.response.status === 429) {
          toast.error('Trop de requêtes. Veuillez attendre quelques instants avant de réessayer.');
        } else {
          toast.error(`Erreur: ${error.response?.data?.message || 'Impossible de créer la réunion'}`);
        }
      } else {
        toast.error(`Erreur inattendue: ${error.message}`);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const joinMeeting = (e) => {
    e.preventDefault();

    const meetingIdTrimmed = joinMeetingId.trim();

    if (!meetingIdTrimmed) {
      toast.warning('Veuillez saisir un ID de réunion');
      return;
    }

    // Validation basique du format de l'ID
    if (meetingIdTrimmed.length < 6) {
      toast.warning('L\'ID de réunion semble invalide (trop court)');
      return;
    }

    navigate(`/meeting/${meetingIdTrimmed}`);
  };

  return (
    <div className="meeting-home-container">
      <div className="meeting-home-header">
        <h1>Visioconférence SkillExchange</h1>
        <p>Connectez-vous avec d'autres apprenants et mentors en temps réel</p>
      </div>

      <div className="meeting-home-content">
        <div className="meeting-actions-card">
          <div className="meeting-action new-meeting">
            <div className="action-icon">
              <FaVideo size={32} />
            </div>
            <h3>Nouvelle réunion</h3>
            <form onSubmit={createMeeting}>
              <input
                type="text"
                placeholder="Titre de la réunion"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                required
              />
              <button type="submit" disabled={isCreating} className="create-btn">
                {isCreating ? 'Création...' : 'Créer'}
                <FaPlus size={16} />
              </button>
            </form>
          </div>

          <div className="meeting-action join-meeting">
            <div className="action-icon">
              <FaUsers size={32} />
            </div>
            <h3>Rejoindre une réunion</h3>
            <form onSubmit={joinMeeting}>
              <input
                type="text"
                placeholder="ID de la réunion"
                value={joinMeetingId}
                onChange={(e) => setJoinMeetingId(e.target.value)}
                required
              />
              <button type="submit" className="join-btn">
                Rejoindre
                <FaArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {recentMeetings.length > 0 && (
          <div className="recent-meetings">
            <h3><FaHistory size={20} /> Réunions récentes</h3>
            <ul className="meetings-list">
              {recentMeetings.map((meeting) => (
                <li key={meeting._id} className="meeting-item">
                  <div className="meeting-info">
                    <h4>{meeting.title}</h4>
                    <p>ID: {meeting.meetingId}</p>
                    <p>Date: {new Date(meeting.createdAt).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/meeting/${meeting.meetingId}`)}
                    className="join-recent-btn"
                  >
                    Rejoindre <FaArrowRight size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingHome;








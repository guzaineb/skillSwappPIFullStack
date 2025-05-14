import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import scheduledSessionService from '../services/scheduledSessionService';
import { useAuthStore } from '../store/authStore';
import '../styles/scheduledSessions.css';
import { FaCalendarAlt, FaPlus, FaFilter, FaSearch, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import CreateSessionModal from '../components/sessions/CreateSessionModal';
import SessionCard from '../components/sessions/SessionCard';
import JoinSessionModal from '../components/sessions/JoinSessionModal';

const ScheduledSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [mySessions, setMySessions] = useState([]);
  const [myInvitations, setMyInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    subject: '',
    upcoming: true,
    past: false
  });

  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Charger les sessions
  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        // Vérifier si l'utilisateur est connecté
        if (!user) {
          console.log('Utilisateur non connecté, impossible de charger les sessions personnalisées');
          // Récupérer uniquement les sessions publiques
          const upcomingResponse = await scheduledSessionService.getSessions({ upcoming: true, isPublic: true });
          setSessions(upcomingResponse.sessions || []);
          setMySessions([]);
          setMyInvitations([]);
          setError(null);
          return;
        }

        // Récupérer toutes les sessions à venir
        const upcomingResponse = await scheduledSessionService.getSessions({ upcoming: true });
        setSessions(upcomingResponse.sessions || []);

        // Récupérer les sessions créées par l'utilisateur
        const mySessionsResponse = await scheduledSessionService.getMySessions();
        setMySessions(mySessionsResponse.sessions || []);

        // Récupérer les invitations
        const invitationsResponse = await scheduledSessionService.getMyInvitations();
        setMyInvitations(invitationsResponse.sessions || []);

        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des sessions:', err);
        setError(err.message || 'Erreur lors du chargement des sessions');
        toast.error('Erreur lors du chargement des sessions');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [user]); // Ajouter user comme dépendance pour recharger les sessions quand l'utilisateur change

  // Filtrer les sessions en fonction de l'onglet actif
  const getFilteredSessions = () => {
    let filteredSessions = [];

    // Vérifier si les sessions sont valides
    const validateSession = (session) => {
      return session &&
        session._id &&
        session.title &&
        session.learningSubject &&
        session.scheduledDate &&
        session.creator;
    };

    // Filtrer les sessions invalides
    const validSessions = sessions.filter(validateSession);
    const validMySessions = mySessions.filter(validateSession);
    const validMyInvitations = myInvitations.filter(validateSession);

    switch (activeTab) {
      case 'upcoming':
        filteredSessions = validSessions.filter(session => new Date(session.scheduledDate) > new Date());
        break;
      case 'mySessions':
        filteredSessions = validMySessions;
        break;
      case 'myInvitations':
        filteredSessions = validMyInvitations;
        break;
      case 'past':
        filteredSessions = validSessions.filter(session => new Date(session.scheduledDate) < new Date());
        break;
      default:
        filteredSessions = validSessions;
    }

    // Appliquer la recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredSessions = filteredSessions.filter(
        session =>
          (session.title && session.title.toLowerCase().includes(term)) ||
          (session.learningSubject && session.learningSubject.toLowerCase().includes(term))
      );
    }

    return filteredSessions;
  };

  // Gérer la création d'une nouvelle session
  const handleCreateSession = async (sessionData) => {
    try {
      // Vérifier si l'utilisateur est connecté
      if (!user || !user._id) {
        toast.error('Vous devez être connecté pour créer une session');
        return;
      }

      const response = await scheduledSessionService.createSession(sessionData);
      toast.success('Session créée avec succès');

      // Vérifier si la réponse contient une session valide
      if (response && response.session && response.session._id) {
        // Mettre à jour la liste des sessions
        setMySessions([...mySessions, response.session]);
        setSessions([...sessions, response.session]);
      } else {
        console.warn('Réponse de création de session invalide:', response);
      }

      setShowCreateModal(false);
    } catch (err) {
      console.error('Erreur lors de la création de la session:', err);
      toast.error(err.message || 'Erreur lors de la création de la session');
    }
  };

  // Gérer la participation à une session avec un code
  const handleJoinSession = async (meetCode) => {
    try {
      // Vérifier si l'utilisateur est connecté
      if (!user || !user._id) {
        toast.error('Vous devez être connecté pour rejoindre une session');
        return;
      }

      const response = await scheduledSessionService.joinSessionWithCode(meetCode);
      toast.success('Vous avez rejoint la session avec succès');

      // Vérifier si la réponse contient une session valide
      if (response && response.session && response.session._id) {
        // Mettre à jour la liste des invitations
        setMyInvitations([...myInvitations, response.session]);
      } else {
        console.warn('Réponse de participation à la session invalide:', response);
      }

      setShowJoinModal(false);
    } catch (err) {
      console.error('Erreur lors de la tentative de rejoindre la session:', err);
      toast.error(err.message || 'Code de session invalide');
    }
  };

  // Gérer la réponse à une invitation
  const handleRespondToInvitation = async (sessionId, status) => {
    try {
      console.log('Réponse à l\'invitation - Paramètres:', { sessionId, status });

      // Vérifier si l'utilisateur est connecté
      if (!user || !user._id) {
        console.error('Utilisateur non connecté:', user);
        toast.error('Vous devez être connecté pour répondre à une invitation');
        return;
      }

      console.log('Utilisateur connecté:', { id: user._id, email: user.email });

      // Vérifier si la session existe
      if (!sessionId) {
        console.error('ID de session invalide');
        toast.error('ID de session invalide');
        return;
      }

      console.log('Envoi de la requête au serveur...');
      const response = await scheduledSessionService.respondToInvitation(sessionId, status);
      console.log('Réponse du serveur:', response);

      // Mettre à jour la liste des invitations
      console.log('Mise à jour des invitations locales...');
      console.log('Invitations avant mise à jour:', myInvitations);

      const updatedInvitations = myInvitations.map(session => {
        if (session && session._id === sessionId) {
          console.log('Session trouvée pour mise à jour:', session);
          const updatedParticipants = session.participants ? session.participants.map(p => {
            if ((p.userId && user._id && p.userId === user._id) || (p.email && user.email && p.email === user.email)) {
              console.log('Participant trouvé pour mise à jour:', p);
              return { ...p, status };
            }
            return p;
          }) : [];
          return { ...session, participants: updatedParticipants };
        }
        return session;
      });

      console.log('Invitations après mise à jour:', updatedInvitations);
      setMyInvitations(updatedInvitations);

      toast.success(`Invitation ${status === 'accepted' ? 'acceptée' : 'refusée'} avec succès`);
    } catch (err) {
      console.error('Erreur lors de la réponse à l\'invitation:', err);
      toast.error(err.message || 'Erreur lors de la réponse à l\'invitation');
    }
  };

  // Rejoindre une session
  const joinMeeting = (meetCode) => {
    navigate(`/meeting/${meetCode}`);
  };

  return (
    <div className="scheduled-sessions-container">
      <div className="sessions-header">
        <h1><FaCalendarAlt /> Sessions d'apprentissage planifiées</h1>
        <div className="sessions-actions">
          <button className="create-session-btn" onClick={() => setShowCreateModal(true)}>
            <FaPlus /> Créer une session
          </button>
          <button className="join-session-btn" onClick={() => setShowJoinModal(true)}>
            Rejoindre avec un code
          </button>
        </div>
      </div>

      <div className="sessions-search-bar">
        <div className="search-input">
          <FaSearch />
          <input
            type="text"
            placeholder="Rechercher par titre ou sujet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="sessions-tabs">
        <button
          className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          À venir
        </button>
        <button
          className={`tab ${activeTab === 'mySessions' ? 'active' : ''}`}
          onClick={() => setActiveTab('mySessions')}
        >
          <FaChalkboardTeacher /> Mes sessions
        </button>
        <button
          className={`tab ${activeTab === 'myInvitations' ? 'active' : ''}`}
          onClick={() => setActiveTab('myInvitations')}
        >
          <FaUserGraduate /> Mes invitations
        </button>
        <button
          className={`tab ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Sessions passées
        </button>
      </div>

      {loading ? (
        <div className="sessions-loading">
          <div className="spinner"></div>
          <p>Chargement des sessions...</p>
        </div>
      ) : error ? (
        <div className="sessions-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Réessayer</button>
        </div>
      ) : (
        <div className="sessions-grid">
          {getFilteredSessions().length > 0 ? (
            getFilteredSessions().map(session => (
              <SessionCard
                key={session._id}
                session={session}
                isCreator={session.creator && user ? session.creator._id === user._id : false}
                isInvited={session.participants && user ? session.participants.some(p => (p.userId && user._id && p.userId === user._id) || (p.email && user.email && p.email === user.email)) : false}
                onJoin={joinMeeting}
                onRespond={handleRespondToInvitation}
              />
            ))
          ) : (
            <div className="no-sessions">
              <p>Aucune session trouvée</p>
              {activeTab === 'upcoming' && (
                <button onClick={() => setShowCreateModal(true)}>
                  <FaPlus /> Créer une session
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {showCreateModal && (
        <CreateSessionModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateSession}
        />
      )}

      {showJoinModal && (
        <JoinSessionModal
          onClose={() => setShowJoinModal(false)}
          onJoin={handleJoinSession}
        />
      )}
    </div>
  );
};

export default ScheduledSessions;

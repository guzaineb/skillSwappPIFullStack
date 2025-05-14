import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Fonction pour récupérer le token d'authentification
const getAuthToken = () => {
  // Essayer de récupérer le token depuis différentes sources
  const localStorageToken = localStorage.getItem('authToken');
  const jwtCookie = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, "$1");
  const tokenCookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

  // Essayer de récupérer le token depuis le store d'authentification
  const authStore = useAuthStore.getState();
  const isAuthenticated = authStore.isAuthenticated;
  const user = authStore.user;

  console.log('État d\'authentification:', {
    isAuthenticated,
    hasUser: !!user,
    userId: user?._id
  });

  console.log('Tokens disponibles:', {
    localStorage: localStorageToken ? 'présent' : 'absent',
    jwtCookie: jwtCookie ? 'présent' : 'absent',
    tokenCookie: tokenCookie ? 'présent' : 'absent'
  });

  return localStorageToken || jwtCookie || tokenCookie;
};

// Créer une instance Axios configurée pour les sessions planifiées
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ajouter un intercepteur pour inclure le token d'authentification dans chaque requête
axiosInstance.interceptors.request.use(
  config => {
    const token = getAuthToken();
    console.log('Intercepteur - Configuration de la requête:', {
      url: config.url,
      method: config.method,
      hasToken: !!token
    });

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Token ajouté aux en-têtes de la requête');
    } else {
      console.warn('Aucun token disponible pour authentifier la requête');
    }

    return config;
  },
  error => {
    console.error('Erreur dans l\'intercepteur de requête:', error);
    return Promise.reject(error);
  }
);

// Ajouter un intercepteur pour gérer les réponses
axiosInstance.interceptors.response.use(
  response => {
    console.log('Réponse reçue:', {
      url: response.config.url,
      status: response.status,
      statusText: response.statusText
    });
    return response;
  },
  error => {
    console.error('Erreur de réponse:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Utiliser l'URL sans le préfixe /api pour éviter la duplication
const API_ENDPOINT = '/scheduled-sessions';

/**
 * Service pour gérer les sessions planifiées
 */
const scheduledSessionService = {
  /**
   * Créer une nouvelle session planifiée
   * @param {Object} sessionData - Données de la session
   * @returns {Promise} - Réponse de l'API
   */
  createSession: async (sessionData) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINT, sessionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la création de la session' };
    }
  },

  /**
   * Récupérer toutes les sessions planifiées avec filtres optionnels
   * @param {Object} filters - Filtres (status, subject, upcoming, past, creator, participant)
   * @returns {Promise} - Réponse de l'API
   */
  getSessions: async (filters = {}) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINT, { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des sessions' };
    }
  },

  /**
   * Récupérer les sessions créées par l'utilisateur connecté
   * @returns {Promise} - Réponse de l'API
   */
  getMySessions: async () => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINT}/my-sessions`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération de vos sessions' };
    }
  },

  /**
   * Récupérer les sessions auxquelles l'utilisateur est invité
   * @returns {Promise} - Réponse de l'API
   */
  getMyInvitations: async () => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINT}/my-invitations`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération de vos invitations' };
    }
  },

  /**
   * Récupérer une session spécifique
   * @param {string} sessionId - ID de la session
   * @returns {Promise} - Réponse de l'API
   */
  getSession: async (sessionId) => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINT}/${sessionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération de la session' };
    }
  },

  /**
   * Mettre à jour une session
   * @param {string} sessionId - ID de la session
   * @param {Object} sessionData - Nouvelles données de la session
   * @returns {Promise} - Réponse de l'API
   */
  updateSession: async (sessionId, sessionData) => {
    try {
      const response = await axiosInstance.put(`${API_ENDPOINT}/${sessionId}`, sessionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la mise à jour de la session' };
    }
  },

  /**
   * Supprimer une session
   * @param {string} sessionId - ID de la session
   * @returns {Promise} - Réponse de l'API
   */
  deleteSession: async (sessionId) => {
    try {
      const response = await axiosInstance.delete(`${API_ENDPOINT}/${sessionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la suppression de la session' };
    }
  },

  /**
   * Répondre à une invitation
   * @param {string} sessionId - ID de la session
   * @param {string} status - Statut de la réponse ('accepted' ou 'declined')
   * @returns {Promise} - Réponse de l'API
   */
  respondToInvitation: async (sessionId, status) => {
    try {
      console.log('Service - Réponse à l\'invitation:', { sessionId, status });
      console.log('URL de la requête:', `${API_ENDPOINT}/${sessionId}/respond`);

      const response = await axiosInstance.post(`${API_ENDPOINT}/${sessionId}/respond`, { status });
      console.log('Service - Réponse du serveur:', response.data);

      return response.data;
    } catch (error) {
      console.error('Service - Erreur lors de la réponse à l\'invitation:', error);
      console.error('Détails de l\'erreur:', error.response?.data || error.message);

      throw error.response?.data || { message: 'Erreur lors de la réponse à l\'invitation' };
    }
  },

  /**
   * Rejoindre une session avec un code
   * @param {string} meetCode - Code de la réunion
   * @returns {Promise} - Réponse de l'API
   */
  joinSessionWithCode: async (meetCode) => {
    try {
      const response = await axiosInstance.post(`${API_ENDPOINT}/join/${meetCode}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la tentative de rejoindre la session' };
    }
  }
};

export default scheduledSessionService;

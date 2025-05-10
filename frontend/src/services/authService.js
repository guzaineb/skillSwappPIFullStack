import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000/api/auth';

// Récupérer le token depuis les cookies ou localStorage
const getToken = () => {
  return Cookies.get('jwt') || Cookies.get('token') || localStorage.getItem('authToken');
};

// Définir le token dans les cookies et localStorage pour assurer la compatibilité
const setToken = (token) => {
  if (!token) return;

  // Stocker dans les cookies (pour les requêtes HTTP)
  Cookies.set('jwt', token, { expires: 1 }); // expire dans 1 jour

  // Stocker dans localStorage (pour la persistance)
  localStorage.setItem('authToken', token);

  return true;
};

// Vérifier si l'utilisateur est authentifié
const isAuthenticated = () => {
  const token = getToken();

  if (!token) {
    console.log('Aucun token trouvé dans isAuthenticated');
    return false;
  }

  try {
    // Vérifier si le token est au format JWT valide
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Format de token invalide');
      logout();
      return false;
    }

    // Vérifier si le token est expiré
    const payload = JSON.parse(atob(parts[1]));
    console.log('Payload du token:', payload);

    if (!payload.exp) {
      console.error('Token sans date d\'expiration');
      return true; // On considère valide si pas d'expiration
    }

    const expirationTime = payload.exp * 1000; // Convertir en millisecondes
    const currentTime = Date.now();

    console.log('Expiration du token:', new Date(expirationTime).toLocaleString());
    console.log('Heure actuelle:', new Date(currentTime).toLocaleString());

    if (currentTime >= expirationTime) {
      console.log('Token expiré dans isAuthenticated');
      logout(); // Nettoyer les tokens expirés
      return false;
    }

    console.log('Token valide dans isAuthenticated');
    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    logout(); // Nettoyer en cas d'erreur
    return false;
  }
};

// Vérifier la validité du token auprès du serveur
const checkAuth = async () => {
  try {
    const token = getToken();

    if (!token) {
      console.log('Aucun token trouvé dans checkAuth');
      return { authenticated: false };
    }

    console.log('Envoi de la requête de vérification d\'authentification avec token');

    const response = await axios.get(`${API_URL}/check-auth`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Réponse de vérification d\'authentification:', response.data);

    // Vérifier si la réponse contient des données
    if (response.data) {
      console.log('Données de réponse reçues:', Object.keys(response.data));

      // Si la réponse contient success=true ou user, considérer comme authentifié
      if (response.data.success === true || response.data.user) {
        console.log('Authentification réussie via API');
        return {
          authenticated: true,
          success: true,
          user: response.data.user,
          token: response.data.token
        };
      }
    }

    console.log('Réponse reçue mais authentification échouée');
    return { authenticated: false, success: false };
  } catch (error) {
    console.error('Erreur de vérification d\'authentification:', error);

    // Si erreur 401, nettoyer les tokens
    if (error.response && error.response.status === 401) {
      console.log('Erreur 401, déconnexion');
      logout();
    }

    return { authenticated: false };
  }
};

// Déconnexion
const logout = () => {
  Cookies.remove('jwt');
  Cookies.remove('token');
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// Connexion
const login = async (email, password) => {
  try {
    console.log('Tentative de connexion avec email:', email);

    const response = await axios.post(`${API_URL}/login`, { email, password }, {
      withCredentials: true
    });

    console.log('Réponse de connexion:', response.data);

    // Vérifier si le token est dans la réponse
    if (response.data.token) {
      console.log('Token reçu dans la réponse');
      setToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    // Si le token n'est pas dans la réponse mais dans les cookies
    else if (response.data.success) {
      console.log('Connexion réussie, mais pas de token dans la réponse');
      // Récupérer le token depuis les cookies
      const token = Cookies.get('token') || Cookies.get('jwt');
      if (token) {
        console.log('Token trouvé dans les cookies');
        setToken(token);
      }

      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    throw error;
  }
};

export default {
  getToken,
  setToken,
  isAuthenticated,
  checkAuth,
  login,
  logout
};



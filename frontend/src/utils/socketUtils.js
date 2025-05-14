/**
 * Utilitaires pour la gestion des connexions Socket.IO
 */
import io from 'socket.io-client';

/**
 * Crée une connexion Socket.IO avec gestion d'erreurs améliorée
 * @param {string} url - URL du serveur Socket.IO
 * @param {Object} options - Options de configuration Socket.IO
 * @param {Function} onConnect - Callback appelé lors de la connexion
 * @param {Function} onError - Callback appelé en cas d'erreur
 * @returns {Object} - Instance Socket.IO
 */
export const createSocketConnection = (url, options = {}, onConnect = null, onError = null) => {
  console.log(`Tentative de connexion Socket.IO à ${url}`);
  console.log('Options:', options);
  
  // Options par défaut
  const defaultOptions = {
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    transports: ['polling', 'websocket'],
    upgrade: true,
    forceNew: true,
    autoConnect: true
  };
  
  // Fusionner les options par défaut avec les options fournies
  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    // Créer la connexion socket
    const socket = io(url, mergedOptions);
    
    // Gérer les événements de connexion
    socket.on('connect', () => {
      console.log('Socket.IO connecté avec succès:', socket.id);
      console.log('Transport utilisé:', socket.io.engine.transport.name);
      
      // Surveiller les mises à niveau de transport
      socket.io.engine.on('upgrade', (transport) => {
        console.log(`Transport mis à niveau vers: ${transport.name}`);
      });
      
      // Appeler le callback de connexion si fourni
      if (onConnect && typeof onConnect === 'function') {
        onConnect(socket);
      }
    });
    
    // Gérer les erreurs de connexion
    socket.on('connect_error', (error) => {
      console.error('Erreur de connexion Socket.IO:', error);
      
      // Appeler le callback d'erreur si fourni
      if (onError && typeof onError === 'function') {
        onError(error);
      }
      
      // Si l'erreur est liée à WebSocket, essayer avec polling uniquement
      if (error.message && error.message.includes('websocket')) {
        console.log('Erreur WebSocket détectée, tentative de reconnexion avec polling uniquement...');
        
        // Fermer la connexion actuelle
        socket.close();
        
        // Créer une nouvelle connexion avec polling uniquement
        const pollingOptions = {
          ...mergedOptions,
          transports: ['polling']
        };
        
        console.log('Nouvelles options (polling uniquement):', pollingOptions);
        return io(url, pollingOptions);
      }
    });
    
    // Gérer les autres événements importants
    socket.on('disconnect', (reason) => {
      console.log(`Socket.IO déconnecté: ${reason}`);
    });
    
    socket.on('reconnect', (attemptNumber) => {
      console.log(`Socket.IO reconnecté après ${attemptNumber} tentatives`);
    });
    
    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`Tentative de reconnexion Socket.IO #${attemptNumber}`);
    });
    
    socket.on('reconnect_error', (error) => {
      console.error('Erreur lors de la tentative de reconnexion Socket.IO:', error);
    });
    
    socket.on('reconnect_failed', () => {
      console.error('Échec de reconnexion Socket.IO après toutes les tentatives');
    });
    
    socket.on('error', (error) => {
      console.error('Erreur Socket.IO:', error);
    });
    
    return socket;
  } catch (error) {
    console.error('Exception lors de la création de la connexion Socket.IO:', error);
    
    // Appeler le callback d'erreur si fourni
    if (onError && typeof onError === 'function') {
      onError(error);
    }
    
    // Retourner null en cas d'erreur
    return null;
  }
};

/**
 * Vérifie si une connexion Socket.IO est active
 * @param {Object} socket - Instance Socket.IO
 * @returns {boolean} - true si la connexion est active
 */
export const isSocketConnected = (socket) => {
  return socket && socket.connected;
};

/**
 * Ferme proprement une connexion Socket.IO
 * @param {Object} socket - Instance Socket.IO
 */
export const closeSocketConnection = (socket) => {
  if (socket) {
    console.log('Fermeture de la connexion Socket.IO');
    socket.close();
  }
};

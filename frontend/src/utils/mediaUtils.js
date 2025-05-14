/**
 * Utilitaires pour la gestion des médias (caméra, microphone, partage d'écran)
 */

/**
 * Demande l'accès à la caméra et au microphone avec gestion d'erreurs améliorée
 * @param {boolean} videoEnabled - Activer la vidéo
 * @param {boolean} audioEnabled - Activer l'audio
 * @param {Object} videoConstraints - Contraintes vidéo spécifiques (optionnel)
 * @param {Object} audioConstraints - Contraintes audio spécifiques (optionnel)
 * @returns {Promise<MediaStream>} - Flux média
 */
export const requestUserMedia = async (
  videoEnabled = true,
  audioEnabled = true,
  videoConstraints = null,
  audioConstraints = null
) => {
  console.log(`Demande d'accès aux périphériques média: vidéo=${videoEnabled}, audio=${audioEnabled}`);
  
  try {
    // Options de configuration pour les contraintes média
    const constraints = {
      audio: audioEnabled ? (audioConstraints || {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }) : false,
      video: videoEnabled ? (videoConstraints || {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: "user"
      }) : false
    };
    
    console.log('Contraintes média:', constraints);
    
    // Demander l'accès aux périphériques
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    
    console.log('Flux média obtenu avec succès');
    logMediaTracks(stream);
    
    return stream;
  } catch (error) {
    console.error('Erreur lors de l\'accès aux périphériques média:', error);
    
    // Analyser l'erreur pour fournir des informations plus précises
    const errorInfo = analyzeMediaError(error);
    
    // Relancer l'erreur avec des informations supplémentaires
    const enhancedError = new Error(errorInfo.message);
    enhancedError.name = error.name;
    enhancedError.originalError = error;
    enhancedError.code = errorInfo.code;
    enhancedError.solution = errorInfo.solution;
    
    throw enhancedError;
  }
};

/**
 * Analyse une erreur d'accès aux médias et fournit des informations supplémentaires
 * @param {Error} error - Erreur d'accès aux médias
 * @returns {Object} - Informations sur l'erreur
 */
export const analyzeMediaError = (error) => {
  let code = 'UNKNOWN_ERROR';
  let message = error.message || 'Erreur inconnue lors de l\'accès aux périphériques média';
  let solution = 'Rafraîchissez la page et réessayez.';
  
  switch (error.name) {
    case 'NotAllowedError':
    case 'PermissionDeniedError':
      code = 'PERMISSION_DENIED';
      message = 'Accès à la caméra ou au microphone refusé.';
      solution = 'Veuillez autoriser l\'accès dans les paramètres de votre navigateur.';
      break;
      
    case 'NotFoundError':
    case 'DevicesNotFoundError':
      code = 'DEVICES_NOT_FOUND';
      message = 'Aucun périphérique média (caméra/microphone) détecté.';
      solution = 'Veuillez connecter une caméra ou un microphone et réessayer.';
      break;
      
    case 'NotReadableError':
    case 'TrackStartError':
      code = 'DEVICE_IN_USE';
      message = 'Impossible d\'accéder à la caméra ou au microphone.';
      solution = 'Un autre programme utilise peut-être ces périphériques. Fermez les autres applications et réessayez.';
      break;
      
    case 'OverconstrainedError':
      code = 'OVERCONSTRAINED';
      message = 'Impossible de satisfaire les contraintes média requises.';
      solution = 'Essayez avec des paramètres moins exigeants.';
      break;
      
    case 'TypeError':
      code = 'TYPE_ERROR';
      message = 'Paramètres de contraintes média invalides.';
      solution = 'Vérifiez les paramètres de configuration des médias.';
      break;
      
    case 'AbortError':
      code = 'ABORTED';
      message = 'Opération d\'accès aux médias annulée.';
      solution = 'Réessayez l\'opération.';
      break;
      
    case 'SecurityError':
      code = 'SECURITY_ERROR';
      message = 'L\'utilisation des médias n\'est pas autorisée dans ce contexte.';
      solution = 'Assurez-vous d\'utiliser HTTPS ou localhost.';
      break;
  }
  
  return { code, message, solution };
};

/**
 * Affiche des informations détaillées sur les pistes média
 * @param {MediaStream} stream - Flux média
 */
export const logMediaTracks = (stream) => {
  if (!stream) {
    console.warn('Aucun flux média à analyser');
    return;
  }
  
  // Informations sur les pistes vidéo
  const videoTracks = stream.getVideoTracks();
  console.log(`Pistes vidéo (${videoTracks.length}):`);
  videoTracks.forEach((track, index) => {
    console.log(`  Piste vidéo ${index + 1}:`);
    console.log(`    Label: ${track.label}`);
    console.log(`    Activée: ${track.enabled}`);
    console.log(`    Muette: ${track.muted}`);
    console.log(`    ID: ${track.id}`);
    
    // Paramètres détaillés
    const settings = track.getSettings();
    console.log('    Paramètres:', settings);
    
    // Contraintes
    const constraints = track.getConstraints();
    console.log('    Contraintes:', constraints);
  });
  
  // Informations sur les pistes audio
  const audioTracks = stream.getAudioTracks();
  console.log(`Pistes audio (${audioTracks.length}):`);
  audioTracks.forEach((track, index) => {
    console.log(`  Piste audio ${index + 1}:`);
    console.log(`    Label: ${track.label}`);
    console.log(`    Activée: ${track.enabled}`);
    console.log(`    Muette: ${track.muted}`);
    console.log(`    ID: ${track.id}`);
    
    // Paramètres détaillés
    const settings = track.getSettings();
    console.log('    Paramètres:', settings);
    
    // Contraintes
    const constraints = track.getConstraints();
    console.log('    Contraintes:', constraints);
  });
};

/**
 * Arrête toutes les pistes d'un flux média
 * @param {MediaStream} stream - Flux média à arrêter
 */
export const stopMediaStream = (stream) => {
  if (!stream) return;
  
  stream.getTracks().forEach(track => {
    track.stop();
    console.log(`Piste ${track.kind} arrêtée: ${track.label}`);
  });
};

/**
 * Vérifie si les périphériques média sont disponibles
 * @returns {Promise<Object>} - État de disponibilité des périphériques
 */
export const checkMediaDevices = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    
    const hasCamera = devices.some(device => device.kind === 'videoinput');
    const hasMicrophone = devices.some(device => device.kind === 'audioinput');
    
    return {
      hasCamera,
      hasMicrophone,
      devices
    };
  } catch (error) {
    console.error('Erreur lors de la vérification des périphériques:', error);
    return {
      hasCamera: false,
      hasMicrophone: false,
      devices: [],
      error
    };
  }
};

// Script pour désactiver les rapports d'erreur Sentry
(function() {
  // Vérifier si Sentry est défini
  if (window.Sentry) {
    console.log('Désactivation de Sentry...');
    
    // Désactiver Sentry
    window.Sentry.init({
      enabled: false,
      dsn: ''
    });
    
    console.log('Sentry désactivé avec succès');
  } else {
    // Si Sentry n'est pas encore chargé, intercepter sa définition
    console.log('Préparation à la désactivation de Sentry...');
    
    // Sauvegarder la méthode originale
    const originalDefineProperty = Object.defineProperty;
    
    // Remplacer la méthode pour intercepter la définition de Sentry
    Object.defineProperty = function(obj, prop, descriptor) {
      if (prop === 'Sentry' && obj === window) {
        console.log('Tentative de définition de Sentry interceptée');
        
        // Modifier le descripteur pour désactiver Sentry
        if (descriptor && descriptor.value) {
          const originalValue = descriptor.value;
          descriptor.value = {
            ...originalValue,
            init: function(options) {
              console.log('Initialisation de Sentry interceptée et désactivée');
              return originalValue.init({
                ...options,
                enabled: false,
                dsn: ''
              });
            }
          };
        }
      }
      
      // Appeler la méthode originale
      return originalDefineProperty.call(this, obj, prop, descriptor);
    };
  }
  
  // Intercepter les requêtes vers sentry.ekance.com
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    if (url && typeof url === 'string' && url.includes('sentry.ekance.com')) {
      console.log('Requête Sentry bloquée:', url);
      return Promise.resolve(new Response('', { status: 200 }));
    }
    return originalFetch.apply(this, arguments);
  };
  
  // Intercepter les requêtes XMLHttpRequest vers sentry.ekance.com
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    if (url && typeof url === 'string' && url.includes('sentry.ekance.com')) {
      console.log('Requête XMLHttpRequest Sentry bloquée:', url);
      // Rediriger vers une URL vide
      url = 'about:blank';
    }
    return originalOpen.call(this, method, url, ...args);
  };
  
  console.log('Protection contre les erreurs Sentry activée');
})();

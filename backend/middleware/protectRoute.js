
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protectRoute = async (req, res, next) => {
  try {
    console.log('Vérification d\'authentification...');
    
    // Récupérer le token depuis différentes sources
    let token;
    
    // 1. Vérifier dans les cookies
    if (req.cookies && (req.cookies.jwt || req.cookies.token)) {
      token = req.cookies.jwt || req.cookies.token;
      console.log('Token trouvé dans les cookies');
    } 
    // 2. Vérifier dans l'en-tête Authorization
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token trouvé dans l\'en-tête Authorization');
    }
    
    // Si aucun token n'est trouvé
    if (!token) {
      console.log('Aucun token trouvé');
      return res.status(401).json({
        success: false,
        message: 'Vous n\'êtes pas connecté. Veuillez vous connecter pour accéder à cette ressource.'
      });
    }
    
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token décodé:', { userId: decoded.id || decoded.userId });
    
    // Trouver l'utilisateur correspondant
    const user = await User.findById(decoded.id || decoded.userId).select('-password');
    
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(401).json({
        success: false,
        message: 'L\'utilisateur appartenant à ce token n\'existe plus.'
      });
    }
    
    // Ajouter l'utilisateur à la requête
    req.user = user;
    console.log('Utilisateur authentifié:', user.email);
    next();
  } catch (error) {
    console.log('Erreur d\'authentification:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token invalide. Veuillez vous reconnecter.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Votre session a expiré. Veuillez vous reconnecter.'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Non autorisé. Veuillez vous reconnecter.'
    });
  }
};

module.exports = protectRoute;



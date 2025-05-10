const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    console.log('Vérification du token pour la route:', req.originalUrl);

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

    if (!token) {
      console.log('Aucun token trouvé');
      return res.status(401).json({
        success: false,
        message: "No authentication token found"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Normaliser l'ID utilisateur pour qu'il soit accessible via req.user.id et req.user._id
    req.user = {
      ...decoded,
      id: decoded.id || decoded._id || decoded.userId,
      _id: decoded.id || decoded._id || decoded.userId
    };

    console.log("Token vérifié pour l'utilisateur:", {
      userId: req.user.id,
      route: req.originalUrl
    });

    next();
  } catch (error) {
    console.error("Échec de la vérification du token:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token"
    });
  }
};

module.exports = verifyToken;

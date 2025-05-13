const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "No authentication token found" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier que decoded contient l'ID utilisateur
    if (!decoded.userId && !decoded._id && !decoded.id) {
      console.error("Token decoded but no user ID found:", decoded);
      return res.status(401).json({
        success: false,
        message: "Invalid token format"
      });
    }
    
    // Utiliser l'ID utilisateur, quelle que soit sa clé
    req.user = {
      _id: decoded.userId || decoded._id || decoded.id
    };
    
    console.log("Token verified for user:", {
      userId: req.user._id,
      route: req.originalUrl
    });
    
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ 
      success: false, 
      message: "Invalid authentication token" 
    });
  }
};

module.exports = verifyToken;
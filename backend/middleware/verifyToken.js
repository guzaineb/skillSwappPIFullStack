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
    req.user = decoded;
    
    console.log("Token verified for user:", {
      userId: decoded.id,
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

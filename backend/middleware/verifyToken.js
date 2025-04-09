const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    // Si aucun token n'est trouvé dans les cookies
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
    }

    try {
        // Décodage du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
        }

        // Utilisation de l'attribut id au lieu de userId
        req.user = decoded; // Tu peux directement attacher l'utilisateur décodé à req.user
        next(); // Appel du prochain middleware ou contrôleur
    } catch (error) {
        console.log("Error in verifyToken ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = verifyToken;

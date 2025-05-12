const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, userId) => {
    // S'assurer que userId est une chaîne de caractères
    const userIdStr = userId.toString();
    
    console.log("Generating token for user ID:", userIdStr);
    
    // Inclure l'ID utilisateur sous plusieurs clés pour assurer la compatibilité
    const token = jwt.sign({ 
        userId: userIdStr,
        _id: userIdStr,
        id: userIdStr
    }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    // Définir un cookie sécurisé avec le jeton
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });

    return token;
};

module.exports = generateTokenAndSetCookie;  // Exporter la fonction



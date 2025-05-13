const jwt = require('jsonwebtoken');  // Importation de jwt

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
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
const { PASSWORD_RESET_REQUEST_TEMPLATE } = require('../mailtrap/emailTemplate');
const sendEmail = require('../config/nodemail'); // Assurez-vous que le chemin est correct


const sendPasswordResetEmail = async (email, resetCode) => {
    try {
        await sendEmail(
            email,
            "Password Reset Code",
            null,
            PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetCode}", resetCode)
        );
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Failed to send password reset email");
    }
};

module.exports = { sendPasswordResetEmail };
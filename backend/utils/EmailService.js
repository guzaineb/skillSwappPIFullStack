const { PASSWORD_RESET_REQUEST_TEMPLATE } = require('../mailtrap/emailTemplate');
const sendEmail = require('../config/nodemail'); // Assurez-vous que le chemin est correct

const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        await sendEmail(
            email,
            "Reset your password",
            null,
            PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
        );
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email', error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

module.exports = { sendPasswordResetEmail };

const { PASSWORD_RESET_REQUEST_TEMPLATE ,PASSWORD_RESET_SUCCESS_TEMPLATE} = require('../mailtrap/emailTemplate');
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

const sendResetSuccessEmail = async (email) => {


	try {
        await sendEmail(
            email,
            "Password Reset Success Email",
            null,
			PASSWORD_RESET_SUCCESS_TEMPLATE ,
		
		);

		console.log("Password reset email sent successfully");
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};





module.exports = { sendPasswordResetEmail,sendResetSuccessEmail };

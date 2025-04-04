// const { mailtrapClient, sender } = require('./mailtrap.config');
// const VERIFICATION_EMAIL_TEMPLATE = require('./emailTemplate');

// async function sendVerificationEmail(email, verificationToken) {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: 'Verify your email',
// 			html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
// 			category: 'Email Verification',
// 		});

// 		console.log('Email sent successfully', response);
// 	} catch (error) {
// 		console.error('Error sending verification', error);
// 		throw new Error(`Error sending verification email: ${error}`);
// 	}
// }

// async function sendWelcomeEmail(email, name) {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			template_uuid: 'f12381ae-dd0f-441a-8380-6b7e125c35ec',
// 			template_variables: {
// 				company_info_name: 'SkillSwap',
// 				name: name,
// 			},
// 		});

// 		console.log('Welcome email sent successfully', response);
// 	} catch (error) {
// 		console.error('Error sending welcome email', error);
// 		throw new Error(`Error sending welcome email: ${error}`);
// 	}
// }

// module.exports = { sendVerificationEmail, sendWelcomeEmail };

const {VERIFICATION_EMAIL_TEMPLATE,WELCOME_EMAIL,PASSWORD_RESET_REQUEST_TEMPLATE , PASSWORD_RESET_SUCCESS_TEMPLATE} = require('./emailTemplate');

const sendEmail = require("../config/nodemail");

const  sendVerificationEmail= async (userEmail,name,verificationToken) => {
 try{    sendEmail(
        userEmail,
        "Verify your email",
        null,
        `${VERIFICATION_EMAIL_TEMPLATE.replace('{name}', name).replace("{verificationCode}", verificationToken)}`

    );


   }catch(error){
    console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
   }
};


const sendWelcomeEmail = async  (email, name) => {
    try{    sendEmail(
        email,
        "Welcome email",
        null,
        `${WELCOME_EMAIL.replace("{name}", name)}`

    );


   }catch(error){
    console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
   }
};


async function sendPasswordResetEmail (email,resetURL) {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};





module.exports ={
    sendVerificationEmail,

    sendWelcomeEmail,

    sendWelcomeEmail,sendPasswordResetEmail ,sendResetSuccessEmail 

 }
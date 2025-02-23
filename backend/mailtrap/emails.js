const { mailtrapClient, sender } = require('./mailtrap.config');
const VERIFICATION_EMAIL_TEMPLATE = require('./emailTemplate');

async function sendVerificationEmail(email, verificationToken) {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: 'Verify your email',
			html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
			category: 'Email Verification',
		});

		console.log('Email sent successfully', response);
	} catch (error) {
		console.error('Error sending verification', error);
		throw new Error(`Error sending verification email: ${error}`);
	}
}

async function sendWelcomeEmail(email, name) {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: 'f12381ae-dd0f-441a-8380-6b7e125c35ec',
			template_variables: {
				company_info_name: 'SkillSwapp',
				name: name,
			},
		});

		console.log('Welcome email sent successfully', response);
	} catch (error) {
		console.error('Error sending welcome email', error);
		throw new Error(`Error sending welcome email: ${error}`);
	}
}

module.exports = { sendVerificationEmail, sendWelcomeEmail };

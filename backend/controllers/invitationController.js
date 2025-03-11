const { mailtrapClient, sender } = require("../mailtrap/mailtrap.config.js")
const {INVITATION_EMAIL} = require("../mailtrap/emailTemplate.js")
const sendInvitationEmail = async (req, res) => {
	try { 
		mailtrapClient.send({from:{email:sender.email , name:sender.name	}, to:[{email:req.body.email}], subject: "Invitation", text: INVITATION_EMAIL})
		res.status(200).json({ success: true, message: "Email sent successfully" });
	} catch (error) {
	  console.error("Error sending invitation email", error);
	  throw new Error(`Error sending invitation email: ${error}`);
	}
  };

  module.exports = {sendInvitationEmail};
const twilio = require('twilio');

// Hardcoded Twilio credentials
const accountSid = 'AC6410e33a9f983e149b2bdc57c1228a1c';
const authToken = '04278057323141c9ebd36f2adf23687e';
const twilioPhoneNumber = '+18596366355';

// Hardcoded recipient number
const recipientNumber = '+21652150980';

const client = twilio(accountSid, authToken);

const sendQuizNotification = async () => {  // Removed parameters since everything is hardcoded
  console.log("🟡 Starting SMS notification process");
  
  try {
    // Hardcoded professional message
    const messageBody = `Dear Learner,\n\nA teacher has published a new quiz.\n\nPlease log in to your SkillSwapp account to complete it.\n\nBest regards,\nSkillSwapp Team`;

    console.log(`✉️ Attempting to send to ${recipientNumber}`);
    
    const message = await client.messages.create({
      body: messageBody,
      from: twilioPhoneNumber,
      to: recipientNumber
    });

    console.log(`✅ SMS sent successfully, SID: ${message.sid}`);
    return { success: true, sid: message.sid };

  } catch (error) {
    console.error('❌ Failed to send SMS:', {
      code: error.code,
      message: error.message,
      moreInfo: error.more_info
    });
    throw error;
  }
};

module.exports = { sendQuizNotification };
require('dotenv').config();
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

(async () => {
  try {
    console.log("Testing Twilio directly...");
    const message = await client.messages.create({
      body: 'Direct test SMS',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+21652150980'
    });
    console.log('✅ Success! Message SID:', message.sid);
  } catch (error) {
    console.error('❌ Direct Twilio Error:', {
      code: error.code,
      message: error.message,
      moreInfo: error.more_info,
      stack: error.stack
    });
  }
})();
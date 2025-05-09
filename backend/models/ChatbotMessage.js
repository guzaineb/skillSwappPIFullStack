const mongoose = require('mongoose');

const MessageChatbotSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous' },
  role: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('chartbotMessage', MessageChatbotSchema);

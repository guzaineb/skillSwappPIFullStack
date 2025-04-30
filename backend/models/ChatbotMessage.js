const mongoose = require('mongoose');

const MessageChatbotSchema = new mongoose.Schema({
  role: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('chartbotMessage', MessageChatbotSchema);

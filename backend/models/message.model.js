const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    image: {
      type: String,
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  content: {
    type: String,
    default: ''
  },
  fileUrl: {
    type: String,
    default: null
  },
  fileType: {
    type: String,
    enum: ['image', 'audio', 'document', null],
    default: null
  },
  fileName: {
    type: String,
    default: null
  },
  messageType: {
    type: String,
    enum: ['sender', 'receiver'],
    default: 'sender'
  },
  delivered: {
    type: Boolean,
    default: false
  },
  read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
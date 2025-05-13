const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  certificateId: { type: String, required: true },
  dateIssued: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Certificate', certificateSchema);

const mongoose = require('mongoose');

const matchingResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  matchedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    total: { type: Number, required: true },
    skillSimilarity: { type: Number, default: 0 },
    interestOverlap: { type: Number, default: 0 },
    learningStyleCompatibility: { type: Number, default: 0 },
    availabilityMatch: { type: Number, default: 0 }
  },
  matchReason: {
    type: String,
    enum: ['similar_skills', 'complementary_skills', 'similar_interests', 'learning_buddy', 'mentor_mentee'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'expired'],
    default: 'pending'
  },
  userInteraction: {
    viewed: { type: Boolean, default: false },
    viewedAt: Date,
    responded: { type: Boolean, default: false },
    respondedAt: Date
  },
  matchedUserInteraction: {
    viewed: { type: Boolean, default: false },
    viewedAt: Date,
    responded: { type: Boolean, default: false },
    respondedAt: Date
  },
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 7*24*60*60*1000); // 7 jours par défaut
    }
  }
}, { timestamps: true });

// Index pour rechercher rapidement les matchs d'un utilisateur
matchingResultSchema.index({ user: 1, status: 1 });
matchingResultSchema.index({ matchedUser: 1, status: 1 });

// Index pour rechercher les matchs par score
matchingResultSchema.index({ 'score.total': -1 });

module.exports = mongoose.model('MatchingResult', matchingResultSchema);

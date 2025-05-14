const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skills: [{
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill'
    },
    proficiencyLevel: {
      type: Number,
      min: 1,
      max: 5,
      default: 1
    },
    interest: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    }
  }],
  interests: [{
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    interestLevel: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    }
  }],
  learningStyle: {
    visual: { type: Number, min: 0, max: 10, default: 5 },
    auditory: { type: Number, min: 0, max: 10, default: 5 },
    reading: { type: Number, min: 0, max: 10, default: 5 },
    kinesthetic: { type: Number, min: 0, max: 10, default: 5 }
  },
  availability: {
    mornings: { type: Boolean, default: false },
    afternoons: { type: Boolean, default: false },
    evenings: { type: Boolean, default: false },
    weekends: { type: Boolean, default: false }
  },
  preferredLearningPace: {
    type: String,
    enum: ['slow', 'moderate', 'fast'],
    default: 'moderate'
  },
  goals: [{
    description: String,
    targetDate: Date,
    completed: { type: Boolean, default: false }
  }],
  lastActive: {
    type: Date,
    default: Date.now
  },
  matchingPreferences: {
    similarSkills: { type: Boolean, default: true },
    complementarySkills: { type: Boolean, default: false },
    sameExperienceLevel: { type: Boolean, default: false },
    sameAvailability: { type: Boolean, default: true }
  },
  embeddings: {
    skillVector: [Number], // Vecteur d'embeddings pour les compétences (généré par ML)
    interestVector: [Number], // Vecteur d'embeddings pour les intérêts (généré par ML)
    behaviorVector: [Number] // Vecteur d'embeddings pour le comportement (généré par ML)
  }
}, { timestamps: true });

// Index pour rechercher rapidement les profils par utilisateur
userProfileSchema.index({ user: 1 });

module.exports = mongoose.model('UserProfile', userProfileSchema);

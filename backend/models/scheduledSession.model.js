const mongoose = require('mongoose');

const ScheduledSessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  learningSubject: {
    type: String,
    required: true,
    trim: true
  },
  scheduledDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(date) {
        return date > new Date(); // La date doit être dans le futur
      },
      message: 'La date de la session doit être dans le futur'
    }
  },
  duration: {
    type: Number, // Durée en minutes
    default: 60,
    min: 15,
    max: 240
  },
  meetCode: {
    type: String,
    required: true,
    unique: true
  },
  meetLink: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    email: String,
    name: String,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending'
    },
    notified: {
      type: Boolean,
      default: false
    }
  }],
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  notificationsSent: {
    type: Boolean,
    default: false
  },
  remindersSent: {
    type: [{
      type: String,
      enum: ['24h', '1h', '15min']
    }],
    default: []
  },
  tags: [String],
  skillLevel: {
    type: String,
    enum: ['débutant', 'intermédiaire', 'avancé'],
    default: 'intermédiaire'
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Méthode pour générer un code de réunion unique
ScheduledSessionSchema.statics.generateMeetCode = async function() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let meetCode;
  let isUnique = false;
  
  // Générer un code jusqu'à ce qu'il soit unique
  while (!isUnique) {
    meetCode = '';
    for (let i = 0; i < 6; i++) {
      meetCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Vérifier si le code existe déjà
    const existingSession = await this.findOne({ meetCode });
    if (!existingSession) {
      isUnique = true;
    }
  }
  
  return meetCode;
};

// Méthode pour générer un lien de réunion
ScheduledSessionSchema.methods.generateMeetLink = function() {
  return `${process.env.CLIENT_URL || 'http://localhost:5173'}/meeting/${this.meetCode}`;
};

// Index pour faciliter les recherches
ScheduledSessionSchema.index({ scheduledDate: 1 });
ScheduledSessionSchema.index({ creator: 1 });
ScheduledSessionSchema.index({ learningSubject: 'text' });

module.exports = mongoose.model('ScheduledSession', ScheduledSessionSchema);

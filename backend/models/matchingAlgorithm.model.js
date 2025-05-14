const mongoose = require('mongoose');

const matchingAlgorithmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  version: {
    type: String,
    required: true
  },
  description: String,
  parameters: {
    skillWeight: { type: Number, default: 0.4 },
    interestWeight: { type: Number, default: 0.3 },
    learningStyleWeight: { type: Number, default: 0.2 },
    availabilityWeight: { type: Number, default: 0.1 },
    similarityThreshold: { type: Number, default: 0.6 },
    maxResults: { type: Number, default: 10 },
    useML: { type: Boolean, default: true },
    additionalParams: mongoose.Schema.Types.Mixed
  },
  performance: {
    averageMatchScore: Number,
    userSatisfactionRate: Number,
    acceptanceRate: Number,
    lastEvaluated: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  mlModel: {
    modelType: {
      type: String,
      enum: ['collaborative_filtering', 'content_based', 'hybrid', 'neural_network', 'none'],
      default: 'hybrid'
    },
    modelPath: String,
    lastTrained: Date,
    accuracy: Number,
    featureImportance: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

module.exports = mongoose.model('MatchingAlgorithm', matchingAlgorithmSchema);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const lessonSchema = new mongoose.Schema({
   title: { type: String, required: true, trim: true },
   content: { type: String, required: true, trim: true },
   duration: { type: Number, required: true, min: 0 },

});

const skillSchema = new mongoose.Schema({
  skillname: { type: String, required: true, trim: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true} ,
  description: { type: String, trim: true },
  pricingType: { type: String, enum: ['free', 'paid'], required: true },
  price: { type: Number, min: 0, required: true },
  image: { type: String, trim: true },
  createdDate: { type: Date }, // Supprimé le `default` pour `createdDate`
  status: { type: String, enum: ['active', 'inactive', 'pending'], required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  lessons: [lessonSchema],

});

// Middleware pour garantir la cohérence entre `pricingType` et `price`
skillSchema.pre('save', function (next) {
  if (this.pricingType === 'free') {
    this.price = 0; // Forcer le prix à 0 si gratuit
  } else if (this.price > 0) {
    this.pricingType = 'paid'; // Si le prix est > 0, c'est payant
  }
  next();
});

module.exports = mongoose.model("Skill", skillSchema);


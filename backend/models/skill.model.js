const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  skillname: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  prive: { type: Number }, // 'prive' semble être une faute de frappe — voulais-tu dire 'price' ou 'private' ?
  image: { type: String },
  createdDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'active' },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
});

module.exports = mongoose.model("Skill", skillSchema);

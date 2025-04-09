const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const skillSchema = new mongoose.Schema({
  skillname: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  pricingType: { type: String, enum: ["free", "paid"], default: "free" },
  price: { type: Number, min: 0, default: 0 },
  image: { type: String, trim: true },
  createdDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "active",
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lessons: [lessonSchema],
});

// Middleware pour garantir la cohérence entre pricingType et price
skillSchema.pre("save", function (next) {
  if (this.pricingType === "free") {
    this.price = 0; // Forcer le prix à 0 si gratuit
  } else if (this.price > 0) {
    this.pricingType = "paid"; // Si le prix est > 0, c'est payant
  }
  next();
});

module.exports = mongoose.model("Skill", skillSchema);

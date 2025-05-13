const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  candidate_cv: {
    type: String,
  },
});

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;

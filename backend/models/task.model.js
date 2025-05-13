const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: String,
  compensation: Number,
  state: {
    type: String,
    enum: ["open", "in_progress", "completed"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;

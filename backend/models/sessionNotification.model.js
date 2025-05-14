const mongoose = require('mongoose');

const sessionNotificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["session_accepted", "session_declined", "session_invitation"],
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ScheduledSession",
      required: true
    },
    read: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SessionNotification", sessionNotificationSchema);

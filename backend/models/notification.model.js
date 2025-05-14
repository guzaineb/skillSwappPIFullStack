const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
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
			enum: [
				// Types de notifications sociales
				"follow", "like", "comment",
				// Types de notifications de session
				"session_accepted", "session_declined", "session_invitation",
				// Types de notifications de réunion
				"meeting_invitation", "meeting_started", "meeting_reminder",
				// Types de notifications d'expression faciale
				"facial_expression"
			],
		},
		// Champ pour les notifications liées aux posts
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			// Requis uniquement pour les notifications de type "like" et "comment"
			required: function () {
				return this.type === "like" || this.type === "comment";
			}
		},
		// Champ pour les notifications liées aux sessions
		session: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ScheduledSession",
			// Requis uniquement pour les notifications de type session
			required: function () {
				return ["session_accepted", "session_declined", "session_invitation"].includes(this.type);
			}
		},
		// Champ pour les notifications liées aux réunions
		meeting: {
			type: String, // ID de la réunion
			required: function () {
				return ["meeting_invitation", "meeting_started", "meeting_reminder"].includes(this.type);
			}
		},
		// Champ pour les expressions faciales détectées
		expression: {
			type: String,
			enum: ["happy", "sad", "angry", "fearful", "disgusted", "surprised", "neutral"],
			required: function () {
				return this.type === "facial_expression";
			}
		},
		// Message personnalisé pour la notification
		message: {
			type: String,
			required: false
		},
		// État de lecture de la notification
		read: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);

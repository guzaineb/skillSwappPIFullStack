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
			enum: ["follow", "like", "comment"],
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			// Requis uniquement pour les notifications de type "like" et "comment"
			required: function () {
				return this.type === "like" || this.type === "comment";
			}
		},
		read: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);



module.exports = mongoose.model("Notification", notificationSchema);

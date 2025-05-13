

const Notification = require("../models/notification.model.js");

async function getNotifications(req, res) {
	try {
		// Get user ID from the token (verifyToken middleware sets req.user)
		const userId = req.user.id;

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		const notifications = await Notification.find({ to: userId })
			.populate({
				path: "from",
				select: "username name profileImg",
			})
			.populate({
				path: "post",
				select: "text img",
			});

		await Notification.updateMany({ to: userId }, { read: true });

		// Process notifications to ensure username is available
		const processedNotifications = notifications.map(notification => {
			// Create a plain JavaScript object from the Mongoose document
			const plainNotification = notification.toObject();

			// Ensure from user has a username (use name if username is not available)
			if (plainNotification.from) {
				if (!plainNotification.from.username) {
					plainNotification.from.username = plainNotification.from.name;
				}
			}

			return plainNotification;
		});

		console.log(`Returning ${processedNotifications.length} notifications`);

		res.status(200).json(processedNotifications);
	} catch (error) {
		console.log("Error in getNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

async function deleteNotifications(req, res) {
	try {
		const userId = req.user.id;

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		await Notification.deleteMany({ to: userId });

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		console.log("Error in deleteNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
module.exports = {
	getNotifications,
	deleteNotifications,
};
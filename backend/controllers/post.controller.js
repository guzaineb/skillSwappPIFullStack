
const Notification = require('../models/notification.model.js');
const Post = require('../models/post.model.js');
const User = require('../models/user.model.js');
const cloudinary = require('../lib/cloudinary');

// Vérifier que le modèle Notification est correctement importé
console.log("Modèle Notification importé:", !!Notification);

const createPost = async (req, res) => {
	try {
		const { text } = req.body;
		const userId = req.user.id;

		console.log("Creating post for user ID:", userId);

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		const user = await User.findById(userId);
		if (!user) {
			console.log("User not found with ID:", userId);
			return res.status(404).json({ message: "User not found" });
		}

		console.log("Found user:", user.username || user.name);

		// Check if there's text or an image file
		if (!text && !req.file) {
			return res.status(400).json({ error: "Post must have text or image" });
		}

		let imgUrl = null;
		// Handle image upload if present
		if (req.file) {
			try {
				console.log("Uploading file to Cloudinary:", req.file.path);
				// If using cloudinary, upload the file
				const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
					folder: "posts",
				});
				imgUrl = uploadedResponse.secure_url;
				console.log("Cloudinary upload successful:", imgUrl);

				// Remove the file from local storage after upload
				const fs = require('fs');
				fs.unlinkSync(req.file.path);
			} catch (uploadError) {
				console.log("Error uploading image to Cloudinary:", uploadError);
				// Continue without the image if upload fails
			}
		}

		const newPost = new Post({
			user: userId,
			text,
			img: imgUrl,
		});

		await newPost.save();
		console.log("Post saved with ID:", newPost._id);

		// Populate user data before returning
		const populatedPost = await Post.findById(newPost._id)
			.populate({
				path: "user",
				select: "-password",
			});

		if (!populatedPost.user) {
			console.log("Warning: User not populated in post");
		} else {
			console.log("Post populated with user:", populatedPost.user.username || populatedPost.user.name);
		}

		res.status(201).json(populatedPost);
	} catch (error) {
		console.log("Error in createPost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const deletePost = async (req, res) => {
	try {
		const userId = req.user.id;

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		if (post.user.toString() !== userId.toString()) {
			return res.status(401).json({ error: "You are not authorized to delete this post" });
		}

		if (post.img) {
			const imgId = post.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

		await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (error) {
		console.log("Error in deletePost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const commentOnPost = async (req, res) => {
	try {
		const { text } = req.body;
		const postId = req.params.id;
		const userId = req.user.id;

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}
		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const comment = { user: userId, text };

		post.comments.push(comment);
		await post.save();

		// Créer une notification pour le propriétaire du post (seulement si ce n'est pas l'utilisateur lui-même)
		if (post.user.toString() !== userId.toString()) {
			try {
				const notification = new Notification({
					from: userId,
					to: post.user,
					type: "comment",
					post: postId
				});
				await notification.save();
				console.log("Notification de commentaire créée avec succès");
			} catch (notifError) {
				console.log("Erreur lors de la création de la notification de commentaire:", notifError);
				// On continue même si la notification échoue
			}
		}

		// Populate the user data for the new comment
		const updatedPost = await Post.findById(postId)
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		res.status(200).json(updatedPost);
	} catch (error) {
		console.log("Error in commentOnPost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const likeUnlikePost = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id: postId } = req.params;

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLikedPost = post.likes.includes(userId);

		if (userLikedPost) {
			// Unlike post
			await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
			await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

			const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
			res.status(200).json(updatedLikes);
		} else {
			// Like post
			post.likes.push(userId);
			await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
			await post.save();

			const notification = new Notification({
				from: userId,
				to: post.user,
				type: "like",
				post: postId
			});
			await notification.save();

			const updatedLikes = post.likes;
			res.status(200).json(updatedLikes);
		}
	} catch (error) {
		console.log("Error in likeUnlikePost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getAllPosts = async (req, res) => {
	try {
		console.log("Getting all posts");

		const posts = await Post.find()
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			})
			.populate({
				path: "comments.replies.user",
				select: "-password",
			});

		console.log(`Found ${posts.length} posts`);

		if (posts.length === 0) {
			console.log("No posts found, returning empty array");
			return res.status(200).json([]);
		}

		// Process posts to ensure username is available
		const processedPosts = posts.map(post => {
			// Create a plain JavaScript object from the Mongoose document
			const plainPost = post.toObject();

			// Ensure user has a username (use name if username is not available)
			if (plainPost.user) {
				if (!plainPost.user.username) {
					plainPost.user.username = plainPost.user.name;
				}
			}

			// Process comments to ensure username is available
			if (plainPost.comments && plainPost.comments.length > 0) {
				plainPost.comments = plainPost.comments.map(comment => {
					if (comment.user && !comment.user.username) {
						comment.user.username = comment.user.name;
					}
					return comment;
				});
			}

			return plainPost;
		});

		// Log the first post to see its structure
		if (processedPosts.length > 0) {
			console.log("First processed post:", {
				id: processedPosts[0]._id,
				text: processedPosts[0].text,
				user: processedPosts[0].user ? {
					id: processedPosts[0].user._id,
					username: processedPosts[0].user.username || processedPosts[0].user.name
				} : 'No user data'
			});
		}

		res.status(200).json(processedPosts);
	} catch (error) {
		console.log("Error in getAllPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getLikedPosts = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		res.status(200).json(likedPosts);
	} catch (error) {
		console.log("Error in getLikedPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getFollowingPosts = async (req, res) => {
	try {
		const userId = req.user.id;

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		const following = user.following;

		const feedPosts = await Post.find({ user: { $in: following } })
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			})
			.populate({
				path: "comments.replies.user",
				select: "-password",
			});

		console.log(`Found ${feedPosts.length} following posts`);

		// Process posts to ensure username is available
		const processedPosts = feedPosts.map(post => {
			// Create a plain JavaScript object from the Mongoose document
			const plainPost = post.toObject();

			// Ensure user has a username (use name if username is not available)
			if (plainPost.user) {
				if (!plainPost.user.username) {
					plainPost.user.username = plainPost.user.name;
				}
			}

			// Process comments to ensure username is available
			if (plainPost.comments && plainPost.comments.length > 0) {
				plainPost.comments = plainPost.comments.map(comment => {
					if (comment.user && !comment.user.username) {
						comment.user.username = comment.user.name;
					}
					return comment;
				});
			}

			return plainPost;
		});

		res.status(200).json(processedPosts);
	} catch (error) {
		console.log("Error in getFollowingPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getUserPosts = async (req, res) => {
	try {
		const { username } = req.params;
		console.log(`Getting posts for username: ${username}`);

		// Try to find user by username first
		let user = await User.findOne({ username });

		// If not found, try to find by name (since we're using name as username)
		if (!user) {
			console.log(`User not found by username, trying name: ${username}`);
			user = await User.findOne({ name: username });
		}

		if (!user) {
			console.log(`User not found with username or name: ${username}`);
			return res.status(404).json({ error: "User not found" });
		}

		console.log(`Found user: ${user.name} with ID: ${user._id}`);

		const posts = await Post.find({ user: user._id })
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			})
			.populate({
				path: "comments.replies.user",
				select: "-password",
			});

		console.log(`Found ${posts.length} posts for user ${username}`);

		// Process posts to ensure username is available
		const processedPosts = posts.map(post => {
			// Create a plain JavaScript object from the Mongoose document
			const plainPost = post.toObject();

			// Ensure user has a username (use name if username is not available)
			if (plainPost.user) {
				if (!plainPost.user.username) {
					plainPost.user.username = plainPost.user.name;
				}
			}

			// Process comments to ensure username is available
			if (plainPost.comments && plainPost.comments.length > 0) {
				plainPost.comments = plainPost.comments.map(comment => {
					if (comment.user && !comment.user.username) {
						comment.user.username = comment.user.name;
					}
					return comment;
				});
			}

			return plainPost;
		});

		res.status(200).json(processedPosts);
	} catch (error) {
		console.log("Error in getUserPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Fonction pour liker/unliker un commentaire
const likeUnlikeComment = async (req, res) => {
	try {
		const userId = req.user.id;
		const { postId, commentId } = req.params;

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		// Vérifier si le post existe
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		// Trouver le commentaire
		const comment = post.comments.id(commentId);
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		}

		// Initialiser les tableaux de likes et dislikes s'ils n'existent pas
		if (!comment.likes) comment.likes = [];
		if (!comment.dislikes) comment.dislikes = [];

		// Vérifier si l'utilisateur a déjà liké le commentaire
		const userLikedComment = comment.likes.includes(userId);
		const userDislikedComment = comment.dislikes.includes(userId);

		if (userLikedComment) {
			// Retirer le like
			comment.likes = comment.likes.filter(id => id.toString() !== userId.toString());
		} else {
			// Ajouter le like et retirer le dislike s'il existe
			comment.likes.push(userId);
			if (userDislikedComment) {
				comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId.toString());
			}
		}

		await post.save();

		// Créer une notification pour l'auteur du commentaire (si ce n'est pas l'utilisateur lui-même)
		if (comment.user.toString() !== userId && !userLikedComment) {
			try {
				const notification = new Notification({
					from: userId,
					to: comment.user,
					type: "like",
					post: postId
				});
				await notification.save();
			} catch (notifError) {
				console.log("Erreur lors de la création de la notification:", notifError);
				// Continuer même si la notification échoue
			}
		}

		// Récupérer le post mis à jour avec les données utilisateur
		const updatedPost = await Post.findById(postId)
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		res.status(200).json(updatedPost);
	} catch (error) {
		console.log("Error in likeUnlikeComment controller:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Fonction pour disliker/undisliker un commentaire
const dislikeUnlikeComment = async (req, res) => {
	try {
		const userId = req.user.id;
		const { postId, commentId } = req.params;

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		// Vérifier si le post existe
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		// Trouver le commentaire
		const comment = post.comments.id(commentId);
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		}

		// Initialiser les tableaux de likes et dislikes s'ils n'existent pas
		if (!comment.likes) comment.likes = [];
		if (!comment.dislikes) comment.dislikes = [];

		// Vérifier si l'utilisateur a déjà disliké le commentaire
		const userDislikedComment = comment.dislikes.includes(userId);
		const userLikedComment = comment.likes.includes(userId);

		if (userDislikedComment) {
			// Retirer le dislike
			comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId.toString());
		} else {
			// Ajouter le dislike et retirer le like s'il existe
			comment.dislikes.push(userId);
			if (userLikedComment) {
				comment.likes = comment.likes.filter(id => id.toString() !== userId.toString());
			}
		}

		await post.save();

		// Récupérer le post mis à jour avec les données utilisateur
		const updatedPost = await Post.findById(postId)
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		res.status(200).json(updatedPost);
	} catch (error) {
		console.log("Error in dislikeUnlikeComment controller:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Fonction pour répondre à un commentaire
const replyToComment = async (req, res) => {
	try {
		const { text } = req.body;
		const { postId, commentId } = req.params;
		const userId = req.user.id;

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}

		// Vérifier si le post existe
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		// Trouver le commentaire
		const comment = post.comments.id(commentId);
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		}

		// Créer la réponse
		const reply = {
			text,
			user: userId,
			createdAt: new Date(),
			likes: [],
			dislikes: []
		};

		// Ajouter la réponse au commentaire
		if (!comment.replies) {
			comment.replies = [];
		}
		comment.replies.push(reply);
		await post.save();

		// Créer une notification pour l'auteur du commentaire (si ce n'est pas l'utilisateur lui-même)
		if (comment.user.toString() !== userId) {
			try {
				const notification = new Notification({
					from: userId,
					to: comment.user,
					type: "comment",
					post: postId
				});
				await notification.save();
				console.log("Notification de réponse créée avec succès");
			} catch (notifError) {
				console.log("Erreur lors de la création de la notification de réponse:", notifError);
				// Continuer même si la notification échoue
			}
		}

		// Récupérer le post mis à jour avec les données utilisateur
		const updatedPost = await Post.findById(postId)
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			})
			.populate({
				path: "comments.replies.user",
				select: "-password",
			});

		res.status(200).json(updatedPost);
	} catch (error) {
		console.log("Error in replyToComment controller:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Fonction pour liker/unliker une réponse à un commentaire
const likeUnlikeReply = async (req, res) => {
	try {
		const userId = req.user.id;
		const { postId, commentId, replyId } = req.params;

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		// Vérifier si le post existe
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		// Trouver le commentaire
		const comment = post.comments.id(commentId);
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		}

		// Trouver la réponse
		const reply = comment.replies.id(replyId);
		if (!reply) {
			return res.status(404).json({ error: "Reply not found" });
		}

		// Initialiser les tableaux de likes et dislikes s'ils n'existent pas
		if (!reply.likes) reply.likes = [];
		if (!reply.dislikes) reply.dislikes = [];

		// Vérifier si l'utilisateur a déjà liké la réponse
		const userLikedReply = reply.likes.includes(userId);
		const userDislikedReply = reply.dislikes.includes(userId);

		if (userLikedReply) {
			// Retirer le like
			reply.likes = reply.likes.filter(id => id.toString() !== userId.toString());
		} else {
			// Ajouter le like et retirer le dislike s'il existe
			reply.likes.push(userId);
			if (userDislikedReply) {
				reply.dislikes = reply.dislikes.filter(id => id.toString() !== userId.toString());
			}
		}

		await post.save();

		// Récupérer le post mis à jour avec les données utilisateur
		const updatedPost = await Post.findById(postId)
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			})
			.populate({
				path: "comments.replies.user",
				select: "-password",
			});

		res.status(200).json(updatedPost);
	} catch (error) {
		console.log("Error in likeUnlikeReply controller:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Fonction pour disliker/undisliker une réponse à un commentaire
const dislikeUnlikeReply = async (req, res) => {
	try {
		const userId = req.user.id;
		const { postId, commentId, replyId } = req.params;

		if (!userId) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		// Vérifier si le post existe
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		// Trouver le commentaire
		const comment = post.comments.id(commentId);
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		}

		// Trouver la réponse
		const reply = comment.replies.id(replyId);
		if (!reply) {
			return res.status(404).json({ error: "Reply not found" });
		}

		// Initialiser les tableaux de likes et dislikes s'ils n'existent pas
		if (!reply.likes) reply.likes = [];
		if (!reply.dislikes) reply.dislikes = [];

		// Vérifier si l'utilisateur a déjà disliké la réponse
		const userDislikedReply = reply.dislikes.includes(userId);
		const userLikedReply = reply.likes.includes(userId);

		if (userDislikedReply) {
			// Retirer le dislike
			reply.dislikes = reply.dislikes.filter(id => id.toString() !== userId.toString());
		} else {
			// Ajouter le dislike et retirer le like s'il existe
			reply.dislikes.push(userId);
			if (userLikedReply) {
				reply.likes = reply.likes.filter(id => id.toString() !== userId.toString());
			}
		}

		await post.save();

		// Récupérer le post mis à jour avec les données utilisateur
		const updatedPost = await Post.findById(postId)
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			})
			.populate({
				path: "comments.replies.user",
				select: "-password",
			});

		res.status(200).json(updatedPost);
	} catch (error) {
		console.log("Error in dislikeUnlikeReply controller:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	getFollowingPosts,
	getUserPosts,
	getLikedPosts,
	getAllPosts,
	likeUnlikePost,
	commentOnPost,
	deletePost,
	createPost,
	likeUnlikeComment,
	dislikeUnlikeComment,
	replyToComment,
	likeUnlikeReply,
	dislikeUnlikeReply,
};

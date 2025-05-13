import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './PostList.css';

const PostList = ({ type = 'all' }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [activeCommentInput, setActiveCommentInput] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState({ postId: null, commentId: null });
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchPosts();
  }, [type, user]);

  const fetchPosts = async () => {
    try {
      console.log(`Fetching posts with type: ${type}`);
      setLoading(true);
      let response;

      // Configuration commune pour toutes les requêtes
      const config = {
        withCredentials: true
      };

      switch (type) {
        case 'following':
          if (!user) {
            throw new Error('User not authenticated');
          }
          console.log('Fetching following posts');
          response = await axios.get('http://localhost:5000/api/post/following', config);
          break;
        case 'user':
          if (!user || !user.username) {
            throw new Error('User not authenticated or username not available');
          }
          console.log(`Fetching user posts for ${user.username}`);
          response = await axios.get(`http://localhost:5000/api/post/user/${user.username}`, config);
          break;
        case 'likes':
          if (!user) {
            throw new Error('User not authenticated');
          }
          const userId = user._id || user.id;
          if (!userId) {
            throw new Error('User ID not available');
          }
          console.log(`Fetching liked posts for user ID ${userId}`);
          response = await axios.get(`http://localhost:5000/api/post/likes/${userId}`, config);
          break;
        case 'all':
        default:
          console.log('Fetching all posts');
          response = await axios.get('http://localhost:5000/api/post/all', config);
          break;
      }

      console.log('API response:', response.data);

      // Vérifier que les données sont valides avant de les définir
      const validPosts = Array.isArray(response.data) ? response.data.filter(post => {
        // Check if post and user exist
        const hasPost = post && post.user;
        if (!hasPost) {
          console.warn('Invalid post found (missing post or user):', post);
          return false;
        }

        // If username is missing, use name instead
        if (!post.user.username && post.user.name) {
          console.log('Post has name but no username, using name instead:', post.user.name);
          post.user.username = post.user.name;
          return true;
        }

        // Check if username or name exists
        const isValid = post.user.username || post.user.name;
        if (!isValid) {
          console.warn('Invalid post found (missing username and name):', post);
        }
        return isValid;
      }) : [];

      console.log(`Found ${validPosts.length} valid posts`);

      setPosts(validPosts);
      setLoading(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching posts:', error);

      // Afficher un message d'erreur plus convivial
      if (error.message === 'User not authenticated') {
        setError('Please log in to view these posts');
      } else if (error.message === 'User not authenticated or username not available') {
        setError('Please log in to view your posts');
      } else if (error.message === 'User ID not available') {
        setError('Please log in to view your liked posts');
      } else if (error.response && error.response.status === 404) {
        setError('The requested posts could not be found');
      } else if (error.response && error.response.status === 401) {
        setError('Please log in to view these posts');
      } else {
        setError('Failed to load posts. Please try again later.');
      }

      // Set empty posts array on error
      setPosts([]);
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/post/like/${postId}`, {}, {
        withCredentials: true
      });

      // Update the posts state with the new likes array
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return { ...post, likes: response.data };
        }
        return post;
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText.trim()) return;

    try {
      const response = await axios.post(`http://localhost:5000/api/post/comment/${postId}`, {
        text: commentText
      }, {
        withCredentials: true
      });

      // Update the posts state with the new comments
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return response.data;
        }
        return post;
      }));

      // Reset comment input
      setCommentText('');
      setActiveCommentInput(null);
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/post/${postId}`, {
        withCredentials: true
      });

      // Remove the deleted post from state
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const isLiked = (post) => {
    if (!user) return false;
    const userId = user._id || user.id;
    if (!userId) return false;
    return post.likes.includes(userId);
  };

  const isCommentLiked = (comment) => {
    if (!user) return false;
    const userId = user._id || user.id;
    if (!userId) return false;
    return comment.likes && comment.likes.includes(userId);
  };

  const isCommentDisliked = (comment) => {
    if (!user) return false;
    const userId = user._id || user.id;
    if (!userId) return false;
    return comment.dislikes && comment.dislikes.includes(userId);
  };

  const handleCommentLike = async (postId, commentId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/post/comment/${postId}/${commentId}/like`, {}, {
        withCredentials: true
      });

      // Update the posts state with the updated post
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return response.data;
        }
        return post;
      }));
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleCommentDislike = async (postId, commentId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/post/comment/${postId}/${commentId}/dislike`, {}, {
        withCredentials: true
      });

      // Update the posts state with the updated post
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return response.data;
        }
        return post;
      }));
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  const handleReplyToComment = async (postId, commentId) => {
    if (!replyText.trim()) return;

    try {
      const response = await axios.post(`http://localhost:5000/api/post/comment/${postId}/${commentId}/reply`, {
        text: replyText
      }, {
        withCredentials: true
      });

      // Update the posts state with the updated post
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return response.data;
        }
        return post;
      }));

      // Reset reply input
      setReplyText('');
      setReplyingTo({ postId: null, commentId: null });
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  const handleReplyLike = async (postId, commentId, replyId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/post/comment/${postId}/${commentId}/reply/${replyId}/like`, {}, {
        withCredentials: true
      });

      // Update the posts state with the updated post
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return response.data;
        }
        return post;
      }));
    } catch (error) {
      console.error('Error liking reply:', error);
    }
  };

  const handleReplyDislike = async (postId, commentId, replyId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/post/comment/${postId}/${commentId}/reply/${replyId}/dislike`, {}, {
        withCredentials: true
      });

      // Update the posts state with the updated post
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return response.data;
        }
        return post;
      }));
    } catch (error) {
      console.error('Error disliking reply:', error);
    }
  };

  const isReplyLiked = (reply) => {
    if (!user) return false;
    const userId = user._id || user.id;
    if (!userId) return false;
    return reply.likes && reply.likes.includes(userId);
  };

  const isReplyDisliked = (reply) => {
    if (!user) return false;
    const userId = user._id || user.id;
    if (!userId) return false;
    return reply.dislikes && reply.dislikes.includes(userId);
  };

  if (loading) {
    return (
      <div className="posts-loading">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-error">
        <p>{error}</p>
        {error === 'Please log in to view these posts' ? (
          <Link to="/login" className="login-button">
            Log In
          </Link>
        ) : (
          <button onClick={fetchPosts}>Try Again</button>
        )}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="no-posts">
        <div className="empty-icon">
          <i className="fas fa-file-alt"></i>
        </div>
        <p>No posts found</p>
        {type === 'following' && (
          <p className="sub-message">Follow some users to see their posts here</p>
        )}
      </div>
    );
  }

  return (
    <div className="posts-list">
      {posts.map(post => (
        <div key={post._id} className="post-card">
          <div className="post-header">
            <div className="post-user">
              <img
                src={post.user.profileImg || '/default-avatar.png'}
                alt={post.user.username || post.user.name || 'User'}
                className="user-avatar"
              />
              <div>
                <h3 className="username">{post.user.username || post.user.name}</h3>
                <span className="post-date">{formatDate(post.createdAt)}</span>
              </div>
            </div>

            {user && (
              (post.user._id === user._id || post.user._id === user.id || post.user.id === user._id || post.user.id === user.id) && (
                <button
                  className="delete-post-btn"
                  onClick={() => handleDelete(post._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              )
            )}
          </div>

          <div className="post-content">
            {post.text && <p className="post-text">{post.text}</p>}
            {post.img && (
              <img src={post.img} alt="Post" className="post-image" />
            )}
          </div>

          <div className="post-stats">
            <span>{post.likes.length} like{post.likes.length !== 1 ? 's' : ''}</span>
            <span>{post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="post-actions">
            {isAuthenticated ? (
              <>
                <button
                  className={`like-btn ${isLiked(post) ? 'liked' : ''}`}
                  onClick={() => handleLike(post._id)}
                >
                  <i className={`${isLiked(post) ? 'fas' : 'far'} fa-heart`}></i>
                  <span>{post.likes.length}</span>
                </button>

                <button
                  className="comment-btn"
                  onClick={() => setActiveCommentInput(activeCommentInput === post._id ? null : post._id)}
                >
                  <i className="far fa-comment"></i>
                  <span>{post.comments.length}</span>
                </button>
              </>
            ) : (
              <>
                <div className="like-btn disabled">
                  <i className="far fa-heart"></i>
                  <span>{post.likes.length}</span>
                </div>
                <div className="comment-btn disabled">
                  <i className="far fa-comment"></i>
                  <span>{post.comments.length}</span>
                </div>
              </>
            )}
          </div>

          {activeCommentInput === post._id && (
            <div className="comment-input-container">
              <textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="comment-input"
              />
              <button
                className="comment-submit-btn"
                onClick={() => handleComment(post._id)}
                disabled={!commentText.trim()}
              >
                Post
              </button>
            </div>
          )}

          {post.comments.length > 0 && (
            <div className="comments-section">
              <h4>Comments</h4>
              {post.comments.map(comment => (
                <div key={comment._id} className="comment">
                  <div className="comment-user">
                    <img
                      src={comment.user.profileImg || '/default-avatar.png'}
                      alt={comment.user.username || comment.user.name || 'User'}
                      className="comment-avatar"
                    />
                    <span className="comment-username">{comment.user.username || comment.user.name}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                  <div className="comment-footer">
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>

                    {isAuthenticated && (
                      <div className="comment-actions">
                        <button
                          className={`comment-like-btn ${isCommentLiked(comment) ? 'active' : ''}`}
                          onClick={() => handleCommentLike(post._id, comment._id)}
                        >
                          <i className={`${isCommentLiked(comment) ? 'fas' : 'far'} fa-thumbs-up`}></i>
                          <span>{comment.likes ? comment.likes.length : 0}</span>
                        </button>

                        <button
                          className={`comment-dislike-btn ${isCommentDisliked(comment) ? 'active' : ''}`}
                          onClick={() => handleCommentDislike(post._id, comment._id)}
                        >
                          <i className={`${isCommentDisliked(comment) ? 'fas' : 'far'} fa-thumbs-down`}></i>
                          <span>{comment.dislikes ? comment.dislikes.length : 0}</span>
                        </button>

                        <button
                          className="reply-btn"
                          onClick={() => {
                            if (replyingTo.postId === post._id && replyingTo.commentId === comment._id) {
                              setReplyingTo({ postId: null, commentId: null });
                            } else {
                              setReplyingTo({ postId: post._id, commentId: comment._id });
                              setReplyText('');
                            }
                          }}
                        >
                          <i className="fas fa-reply"></i>
                          <span>Reply</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Formulaire de réponse */}
                  {isAuthenticated && replyingTo.postId === post._id && replyingTo.commentId === comment._id && (
                    <div className="reply-form">
                      <textarea
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="reply-input"
                      />
                      <div className="reply-form-actions">
                        <button
                          className="reply-submit-btn"
                          onClick={() => handleReplyToComment(post._id, comment._id)}
                          disabled={!replyText.trim()}
                        >
                          Reply
                        </button>
                        <button
                          className="reply-cancel-btn"
                          onClick={() => setReplyingTo({ postId: null, commentId: null })}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Affichage des réponses */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="replies-container">
                      {comment.replies.map((reply, index) => (
                        <div key={reply._id || index} className="reply">
                          <div className="reply-user">
                            <img
                              src={reply.user.profileImg || '/default-avatar.png'}
                              alt={reply.user.username || reply.user.name || 'User'}
                              className="reply-avatar"
                            />
                            <span className="reply-username">{reply.user.username || reply.user.name}</span>
                          </div>
                          <p className="reply-text">{reply.text}</p>
                          <div className="reply-footer">
                            <span className="reply-date">{formatDate(reply.createdAt)}</span>

                            {isAuthenticated && (
                              <div className="reply-actions">
                                <button
                                  className={`reply-like-btn ${isReplyLiked(reply) ? 'active' : ''}`}
                                  onClick={() => handleReplyLike(post._id, comment._id, reply._id)}
                                >
                                  <i className={`${isReplyLiked(reply) ? 'fas' : 'far'} fa-thumbs-up`}></i>
                                  <span>{reply.likes ? reply.likes.length : 0}</span>
                                </button>

                                <button
                                  className={`reply-dislike-btn ${isReplyDisliked(reply) ? 'active' : ''}`}
                                  onClick={() => handleReplyDislike(post._id, comment._id, reply._id)}
                                >
                                  <i className={`${isReplyDisliked(reply) ? 'fas' : 'far'} fa-thumbs-down`}></i>
                                  <span>{reply.dislikes ? reply.dislikes.length : 0}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;

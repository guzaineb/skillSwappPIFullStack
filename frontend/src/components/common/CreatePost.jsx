import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import './CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setImage(file);
    setError(null);

    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postText.trim() && !image) {
      setError('Please add some text or an image to your post');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('text', postText);
      if (image) {
        formData.append('image', image);
      }

      console.log('Submitting post with text:', postText);
      console.log('Image attached:', image ? image.name : 'No image');

<<<<<<< HEAD
      const response = await axios.post('http://localhost:5000/api/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
=======
      // Récupérer le token depuis les cookies ou localStorage
      const token = document.cookie.split('; ').find(row => row.startsWith('token=') || row.startsWith('jwt='))?.split('=')[1]
        || localStorage.getItem('authToken');

      console.log('Token disponible pour la requête:', token ? 'Oui' : 'Non');

      const response = await axios.post('http://localhost:5000/api/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : ''
>>>>>>> origin/tasks
        },
        withCredentials: true
      });

      console.log('Post created successfully:', response.data);

      // Reset form
      setPostText('');
      setImage(null);
      setImagePreview(null);
      setLoading(false);

      // Notify parent component
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      const errorMessage = error.response?.data?.error || 'Failed to create post. Please try again.';
      console.error('Error details:', errorMessage);
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-header">
        <img
          src={user?.profileImg || '/default-avatar.png'}
          alt={user?.username}
          className="user-avatar"
        />
        <h3>Create Post</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          className="post-textarea"
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />

        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Preview" className="image-preview" />
            <button
              type="button"
              className="remove-image-btn"
              onClick={removeImage}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="post-actions">
          <div className="post-attachments">
            <label className="attachment-btn">
              <i className="fas fa-image"></i>
              <span>Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <button
            type="submit"
            className="post-submit-btn"
            disabled={loading || (!postText.trim() && !image)}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
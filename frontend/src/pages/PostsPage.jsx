import React, { useState } from 'react';
import CreatePost from '../components/common/CreatePost';
import PostList from '../components/common/PostList';
import { useAuthStore } from '../store/authStore';
import './PostsPage.css';

const PostsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { user, isAuthenticated } = useAuthStore();

  // Réinitialiser l'onglet actif si l'utilisateur n'est pas authentifié
  React.useEffect(() => {
    if (!isAuthenticated && (activeTab === 'following' || activeTab === 'my-posts')) {
      setActiveTab('all');
    }
  }, [isAuthenticated, activeTab]);

  const handlePostCreated = (newPost) => {
    // Trigger a refresh of the post list
    console.log('Post created, refreshing post list:', newPost);
    setRefreshTrigger(prev => prev + 1);

    // If we're not on the "all" tab, switch to it to show the new post
    if (activeTab !== 'all') {
      setActiveTab('all');
    }
  };

  return (
    <div className="posts-page">
      <div className="posts-container">
        <h1>Posts</h1>
        <p className="page-description">
          Share your thoughts and connect with other users
        </p>

        {isAuthenticated ? (
          <CreatePost onPostCreated={handlePostCreated} />
        ) : (
          <div className="login-prompt">
            <p>Log in to create posts and interact with the community</p>
            <a href="/signin" className="login-button">Log In</a>
          </div>
        )}

        <div className="posts-tabs">
          <button
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Posts
          </button>
          {isAuthenticated && (
            <button
              className={`tab-button ${activeTab === 'following' ? 'active' : ''}`}
              onClick={() => setActiveTab('following')}
            >
              Following
            </button>
          )}
          {isAuthenticated && user && user.username && (
            <button
              className={`tab-button ${activeTab === 'my-posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-posts')}
            >
              My Posts
            </button>
          )}
        </div>

        {activeTab === 'all' && <PostList type="all" key={`all-${refreshTrigger}`} />}
        {activeTab === 'following' && isAuthenticated && <PostList type="following" key={`following-${refreshTrigger}`} />}
        {activeTab === 'my-posts' && isAuthenticated && user && user.username &&
          <PostList type="user" key={`user-${refreshTrigger}`} />}
      </div>
    </div>
  );
};

export default PostsPage;

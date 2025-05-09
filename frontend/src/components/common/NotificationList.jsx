import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './NotificationList.css';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, [user]); // Ajouter user comme dépendance

  const fetchNotifications = async () => {
    // Ne pas faire de requête si l'utilisateur n'est pas authentifié
    if (!user) {
      setNotifications([]);
      setLoading(false);
      setError('Please log in to view notifications');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/notification/getNotifications', {
        withCredentials: true
      });
      setNotifications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);

      // Afficher un message d'erreur plus convivial
      if (error.response && error.response.status === 401) {
        setError('Please log in to view notifications');
      } else if (error.response && error.response.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Failed to load notifications');
      }

      setNotifications([]);
      setLoading(false);
    }
  };

  const clearAllNotifications = async () => {
    // Ne pas faire de requête si l'utilisateur n'est pas authentifié
    if (!user) {
      setNotifications([]);
      return;
    }

    try {
      await axios.delete('http://localhost:5000/api/notification/deleteNotifications', {
        withCredentials: true
      });
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing notifications:', error);
      setError('Failed to clear notifications');
    }
  };

  const handleNotificationClick = (notification) => {
    // Navigate based on notification type
    if (notification.type === 'follow') {
      navigate(`/profile/${notification.from.username}`);
    } else if (notification.type === 'like') {
      // Navigate to the post that was liked
      // This would require additional data in the notification model
      navigate('/posts');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
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

  if (loading) {
    return (
      <div className="notification-loading">
        <div className="spinner"></div>
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notification-error">
        <p>{error}</p>
        <button onClick={fetchNotifications}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="notification-list-container">
      <div className="notification-header">
        <h2>Notifications</h2>
        {notifications.length > 0 && (
          <button
            className="clear-all-btn"
            onClick={clearAllNotifications}
          >
            Clear All
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="no-notifications">
          <div className="empty-icon">
            <i className="fas fa-bell-slash"></i>
          </div>
          <p>You don't have any notifications yet</p>
        </div>
      ) : (
        <div className="notifications-container">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`notification-item ${!notification.read ? 'unread' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notification-avatar">
                <img
                  src={notification.from.profileImg || '/default-avatar.png'}
                  alt={notification.from.username}
                />
              </div>
              <div className="notification-content">
                <p className="notification-text">
                  <strong>{notification.from.username}</strong>
                  {notification.type === 'follow' ? ' started following you' : ' liked your post'}
                </p>
                <span className="notification-time">{formatTime(notification.createdAt)}</span>
              </div>
              {!notification.read && <div className="unread-indicator"></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;

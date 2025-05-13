import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './NotificationDropdown.css';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Fetch notifications when component mounts or when authentication status changes
    fetchNotifications();

    // Set up interval to fetch notifications every minute
    const interval = setInterval(fetchNotifications, 60000);

    // Add click event listener to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up
    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAuthenticated]); // Ajouter isAuthenticated comme dépendance

  const fetchNotifications = async () => {
    // Ne pas faire de requête si l'utilisateur n'est pas authentifié
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching notifications...');

      const response = await axios.get('http://localhost:5000/api/notification/getNotifications', {
        withCredentials: true
      });

      console.log('Notifications received:', response.data);

      // Filter out notifications with missing from data
      const validNotifications = response.data.filter(notification =>
        notification && notification.from && (notification.from.username || notification.from.name)
      );

      if (validNotifications.length !== response.data.length) {
        console.warn(`Filtered out ${response.data.length - validNotifications.length} invalid notifications`);
      }

      // Process notifications to ensure username is available
      const processedNotifications = validNotifications.map(notification => {
        // Create a copy of the notification
        const processedNotification = { ...notification };

        // Ensure from user has a username (use name if username is not available)
        if (processedNotification.from) {
          if (!processedNotification.from.username && processedNotification.from.name) {
            processedNotification.from.username = processedNotification.from.name;
          }
        }

        return processedNotification;
      });

      console.log('Processed notifications:', processedNotifications);

      setNotifications(processedNotifications);

      // Count unread notifications
      const unread = processedNotifications.filter(notification => !notification.read).length;
      setUnreadCount(unread);

      setLoading(false);
      setError(null); // Clear any previous errors
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

      // Réinitialiser les notifications et le compteur
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
    }
  };

  const handleNotificationClick = (notification) => {
    // Navigate based on notification type
    if (notification.type === 'follow') {
      if (notification.from && (notification.from.username || notification.from.name)) {
        // Use username if available, otherwise use name
        const username = notification.from.username || notification.from.name;
        navigate(`/profile/${username}`);
      } else {
        // If no username or name is available, just go to the posts page
        navigate('/posts');
      }
    } else if (notification.type === 'like' || notification.type === 'comment') {
      // Navigate to the post that was liked or commented on
      if (notification.post && notification.post._id) {
        // Si nous avons un ID de post spécifique, nous pourrions naviguer vers ce post
        // Pour l'instant, nous allons simplement naviguer vers la page des posts
        navigate('/posts');

        // Dans une future implémentation, nous pourrions naviguer vers le post spécifique
        // navigate(`/post/${notification.post._id}`);
      } else {
        navigate('/posts');
      }
    }

    setIsOpen(false);
  };

  const clearAllNotifications = async () => {
    // Ne pas faire de requête si l'utilisateur n'est pas authentifié
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      setIsOpen(false);
      return;
    }

    try {
      await axios.delete('http://localhost:5000/api/notification/deleteNotifications', {
        withCredentials: true
      });
      setNotifications([]);
      setUnreadCount(0);
      setIsOpen(false);
    } catch (error) {
      console.error('Error clearing notifications:', error);
      setError('Failed to clear notifications');
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
      return `${minutes}m`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <button
        className="notification-icon"
        onClick={() => {
          console.log('Notification icon clicked, toggling dropdown');
          setIsOpen(!isOpen);
        }}
      >
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="dropdown-menu" style={{ display: 'block', visibility: 'visible' }}>
          <div className="dropdown-header">
            <h3>Notifications</h3>
            {notifications.length > 0 && (
              <button
                className="clear-all"
                onClick={clearAllNotifications}
              >
                Clear All
              </button>
            )}
          </div>

          <div className="dropdown-content">
            {loading ? (
              <div className="loading">Loading...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : notifications.length === 0 ? (
              <div className="empty">No notifications</div>
            ) : (
              notifications.slice(0, 5).map(notification => (
                <div
                  key={notification._id}
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-avatar">
                    <img
                      src={(notification.from && notification.from.profileImg) || '/default-avatar.png'}
                      alt={(notification.from && (notification.from.username || notification.from.name)) || 'User'}
                    />
                  </div>
                  <div className="notification-content">
                    <p>
                      <strong>{notification.from ? (notification.from.username || notification.from.name) : 'Someone'}</strong>
                      {notification.type === 'follow'
                        ? ' started following you'
                        : notification.type === 'like'
                          ? ' liked your post'
                          : ' commented on your post'}
                    </p>
                    <span className="notification-time">{formatTime(notification.createdAt)}</span>
                  </div>
                  {!notification.read && <div className="unread-dot"></div>}
                </div>
              ))
            )}
          </div>

          {notifications.length > 5 && (
            <div className="dropdown-footer">
              <Link to="/notifications" onClick={() => setIsOpen(false)}>
                View All
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

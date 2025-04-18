
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function ProfileIcon() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout, isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("Verifying authentication...");
        const result = await checkAuth();
        console.log("Authentication result:", result);
      } catch (error) {
        console.error("Authentication verification failed:", error);
      }
    };

    if (!isAuthenticated || !user?._id) {
      verifyAuth();
    }
  }, [isAuthenticated, user, checkAuth]);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/index';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Force reload of profile image by appending timestamp
  const profilePicUrl = user?.profilePic
    ? user?.avatar
    : "/avatar.png";

  return (
    <div className="nav-item user-nav">
      <a 
        href="#" 
        className="dropdown-toggle" 
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <span className="user-img">
          <img src={ user?.profilePic || user?.avatar || "/avatar.png"} alt="Profile" />
          <span className="status online" />
        </span>
      </a>
      <div className={`users dropdown-menu dropdown-menu-right ${isDropdownOpen ? 'show' : ''}`}>
        <div className="user-header">
          <div className="user-text">
            <h4>{user?.name}</h4>
            <p>{user?.role}</p>
          </div>
        </div>
        <a className="dropdown-item" href="/Dah">
          <i className="feather-home me-1" /> Dashboard
        </a>
        <a className="dropdown-item" href="/Profile">
          <i className="feather-star me-1" /> Edit Profile
        </a>
        <button className="dropdown-item" onClick={handleLogout}>
          <i className="feather-log-out me-1" /> Logout
        </button>
      </div>
    </div>
  );
}

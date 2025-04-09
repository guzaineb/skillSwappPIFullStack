import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function ProfileIcon() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuthStore();
  const { user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/index';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="nav-item user-nav">
      <a 
        href="#" 
        className="dropdown-toggle" 
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <span className="user-img">
        <img src={user?.profilePic || "/avatar.png"} alt="Profile" />
        <span className="status online" />
        </span>
      </a>
      <div className={`users dropdown-menu dropdown-menu-right ${isDropdownOpen ? 'show' : ''}`}>
        <div className="user-header">
          <div className="avatar avatar-sm">
            <img src="assets/img/user/user-17.jpg" alt="User" className="avatar-img rounded-circle" />
          </div>
          <div className="user-text">
            <h6>Eugene Andre</h6>
            <p className="text-muted mb-0">Instructor</p>
          </div>
        </div>
        <a className="dropdown-item" href="instructor-dashboard.html">
          <i className="feather-home me-1" /> Dashboard
        </a>
        <a className="dropdown-item" href="instructor-settings.html">
          <i className="feather-star me-1" /> Edit Profile
        </a>
        <button className="dropdown-item" onClick={handleLogout}>
          <i className="feather-log-out me-1" /> Logout
        </button>
      </div>
    </div>
  );
}

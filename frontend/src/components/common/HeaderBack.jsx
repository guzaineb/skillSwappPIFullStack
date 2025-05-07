import React, { useState, useEffect } from 'react';
import { useAuthStore } from "../../store/authStore"; // Importation du store (Zustand ou autre)

export default function HeaderBack() {
  const { user } = useAuthStore(state => state); // Récupère les données de l'utilisateur depuis le store

  return (
    <>
      <header className="header header-page">
        <div className="header-fixed">
          <nav className="navbar navbar-expand-lg header-nav scroll-sticky">
            <div className="container">
              <div className="navbar-header">
                <button id="mobile_btn" onClick={(e) => e.preventDefault()} aria-label="Toggle mobile menu">
                  <span className="bar-icon">
                    <span />
                    <span />
                    <span />
                  </span>
                </button>
                <a href="index-2.html" className="navbar-brand logo">
                  <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
                </a>
              </div>
              <div className="main-menu-wrapper">
                <div className="menu-header">
                  <a href="index-2.html" className="menu-logo">
                    <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
                  </a>
                  <button id="menu_close" className="menu-close" onClick={(e) => e.preventDefault()} aria-label="Close menu">
                    <i className="fas fa-times" />
                  </button>
                </div>
                <ul className="main-nav">
                  {/* Navigation items go here */}
                </ul>
              </div>
              <ul className="nav header-navbar-rht">
                <li className="nav-item user-nav">
                  <div>
                    <button onClick={() => { }} id="dark-mode-toggle" className="dark-mode-toggle" aria-label="Activate dark mode">
                      <i className="fa-solid fa-moon" />
                    </button>
                    <button onClick={() => { }} id="light-mode-toggle" className="dark-mode-toggle" aria-label="Activate light mode">
                      <i className="fa-solid fa-sun" />
                    </button>
                  </div>
                </li>
                <li className="nav-item user-nav">
                  <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                    <span className="user-img">
                      <img 
                        src={user?.profilePic || "assets/img/user/user-17.jpg"} // Utilisation de l'image du store ou image par défaut
                        alt="Img"
                      />
                      <span className="status online" />
                    </span>
                  </a>
                  <div className="users dropdown-menu dropdown-menu-right" data-popper-placement="bottom-end">
                    <div className="user-header">
                      <div className="avatar avatar-sm">
                        <img 
                          src={user?.profilePic || "assets/img/user/user-17.jpg"} // Idem pour l'avatar
                          alt="User Image"
                          className="avatar-img rounded-circle" 
                        />
                      </div>
                      <div className="user-text">
                        <h6>{user?.name || "Eugene Andre"}</h6> {/* Nom de l'utilisateur dynamique */}
                        <p className="text-muted mb-0">Instructor</p>
                      </div>
                    </div>
                    <a className="dropdown-item" href="instructor-dashboard.html"><i className="feather-home me-1" /> Dashboard</a>
                    <a className="dropdown-item" href="instructor-settings.html"><i className="feather-star me-1" /> Edit Profile</a>
                    <a className="dropdown-item" href="index-2.html"><i className="feather-log-out me-1" /> Logout</a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title">Settings</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Profile</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

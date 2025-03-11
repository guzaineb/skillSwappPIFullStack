import { useEffect, useState } from 'react';
import { useAuthStore } from "../../store/authStore";
import ProfileIcon from './ProfileIcon';

function Header() {
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await checkAuth();
        console.log("Response from checkAuth:", result); // Debugging log
        setIsLoggedIn(result.success);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
        setIsLoggedIn(false); // Handle errors by setting logged in status to false
      }
    };

    if (!isAuthenticated) { // Check only if user is not authenticated already
      verifyUser();
    }
  }, [isAuthenticated, checkAuth]); // Dependency array to rerun effect when isAuthenticated changes

  return (
    <div className="header-fixed">
      <nav className="navbar navbar-expand-lg header-nav scroll-sticky">
        <div className="container">
          {/* Logo et Bouton Mobile */}
          <div className="navbar-header">
            <button id="mobile_btn" className="btn">
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

          {/* Menu Principal */}
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <a href="index-2.html" className="menu-logo">
                <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
              </a>
              <button id="menu_close" className="menu-close btn">
                <i className="fas fa-times" />
              </button>
            </div>

            <ul className="main-nav">
              <li className="has-submenu">
                <a href="#">Home <i className="fas fa-chevron-down" /></a>
                <ul className="submenu">
                  <li><a href="index-2.html">Home</a></li>
                  <li><a href="index-two.html">Home Two</a></li>
                  <li><a href="index-three.html">Home Three</a></li>
                  <li><a href="index-four.html">Home Four</a></li>
                </ul>
              </li>
              {/* Other menu items */}
            </ul>
          </div>

          {/* Barre de droite : Dark Mode & Profil */}
          <ul className="nav header-navbar-rht">
            <li className="nav-item">
              <button id="dark-mode-toggle" className="dark-mode-toggle btn">
                <i className="fa-solid fa-moon" />
              </button>
              <button id="light-mode-toggle" className="dark-mode-toggle btn">
                <i className="fa-solid fa-sun" />
              </button>
            </li>

            {/* Conditional Rendering of Profile or SignIn/SignUp */}
            <li className="nav-item">
              {isLoggedIn ? (
                <ProfileIcon />
              ) : (
                <>
                  <a className="nav-link header-sign" href="/signin">Signin</a>
                  <a className="nav-link header-login" href="/signup">Signup</a>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;

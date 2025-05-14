import { useEffect, useState } from 'react';
import { useAuthStore } from "../../store/authStore";
import ProfileIcon from './ProfileIcon';
import NotificationDropdown from './NotificationDropdown';
// Assuming you have a CSS file for styles

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
      <nav className="navbar navbar-expand-lg navbar-white bg-white header sticky-top">
        <div className="container-fluid">
          {/* Logo et Bouton Mobile */}
          <div className="navbar-header">
            <button id="mobile_btn" className="btn navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a href="index-2.html" className="navbar-brand logo">
              <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
            </a>
          </div>

          {/* Menu Principal */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="homeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Home
                </a>
                <ul className="dropdown-menu" aria-labelledby="homeDropdown">
                  <li><a className="dropdown-item" href="/index">Home</a></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="instructorDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Instructor
                </a>
                <ul className="dropdown-menu" aria-labelledby="instructorDropdown">
                  <li><a className="dropdown-item" href="instructor-list.html">Instructor</a></li>
                  <li><a className="dropdown-item" href="instructor-dashboard.html">Dashboard</a></li>
                  <li><a className="dropdown-item" href="instructor-profile.html">My Profile</a></li>
                  <li><a className="dropdown-item" href="instructor-course.html">My Course</a></li>

                  {/* Add more items as needed */}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="studentDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Student
                </a>
                <ul className="dropdown-menu" aria-labelledby="studentDropdown">
                  <li><a className="dropdown-item" href="students-list.html">Student</a></li>
                  <li><a className="dropdown-item" href="student-dashboard.html">Student Dashboard</a></li>
                  {/* Add more items as needed */}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Pages
                </a>
                <ul className="dropdown-menu" aria-labelledby="pagesDropdown">
                  <li><a className="dropdown-item" href="/notifications">Notifications</a></li>
                  <li><a className="dropdown-item" href="/posts">Posts</a></li>
                  <li><a className="dropdown-item" href="pricing-plan.html">Pricing Plan</a></li>
                  <li><a className="dropdown-item" href="wishlist.html">Wishlist</a></li>
                  <li><a className="dropdown-item" href="course-list.html">Course List</a></li>
                 
                                   <li><a className="dropdown-item" href="/tasks">Tasks</a></li>
 {/* Add more items as needed */}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="blogDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Blog
                </a>
                <ul className="dropdown-menu" aria-labelledby="blogDropdown">
                  <li><a className="dropdown-item" href="blog-list.html">Blog List</a></li>
                  <li><a className="dropdown-item" href="blog-grid.html">Blog Grid</a></li>
                  {/* Add more items as needed */}
                </ul>
              </li>

              {/* Other menu items */}
            </ul>
          </div>

          {/* Barre de droite : Notifications & Profil */}
          <ul className="navbar-nav ms-3">

            {/* Conditional Rendering of Profile or SignIn/SignUp */}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NotificationDropdown />
                </li>
                <li className="nav-item">
                  <ProfileIcon />
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link header-sign" href="/signin">Signin</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link header-login" href="/signup">Signup</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
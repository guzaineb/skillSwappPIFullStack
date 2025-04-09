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
              <li class="has-submenu">
									<a href="#">Instructor <i class="fas fa-chevron-down"></i></a>
									<ul class="submenu">
										<li class="has-submenu">
											<a href="instructor-list.html">Instructor</a>
											<ul class="submenu">
												<li><a href="instructor-list.html">List</a></li>
												<li><a href="instructor-grid.html">Grid</a></li>
											</ul>
										</li>
										<li><a href="instructor-dashboard.html">Dashboard</a></li>
										<li><a href="instructor-profile.html">My Profile</a></li>
										<li><a href="instructor-course.html">My Course</a></li>
										<li><a href="instructor-wishlist.html">Wishlist</a></li>
										<li><a href="instructor-reviews.html">Reviews</a></li>
										<li><a href="instructor-quiz.html">My Quiz Attempts</a></li>
										<li><a href="instructor-orders.html">Orders</a></li>
										<li><a href="instructor-qa.html">Question & Answer</a></li>
										<li><a href="instructor-referral.html">Referrals</a></li>
										<li><a href="instructor-chat.html">Messages</a></li>
										<li><a href="instructor-tickets.html">Support Ticket</a></li>
										<li><a href="instructor-notifications.html">Notifications</a></li>
										<li><a href="instructor-settings.html">Settings</a></li>
									</ul>
								</li>
								<li class="has-submenu">
									<a href="#">Student <i class="fas fa-chevron-down"></i></a>
									<ul class="submenu first-submenu">
										<li class="has-submenu">
											<a href="students-list.html">Student</a>
											<ul class="submenu">
												<li><a href="students-list.html">List</a></li>
												<li><a href="students-grid.html">Grid</a></li>
											</ul>
										</li>
										<li><a href="student-dashboard.html">Student Dashboard</a></li>
										<li><a href="student-profile.html">My Profile</a></li>
										<li><a href="student-courses.html">Enrolled Courses</a></li>
										<li><a href="student-wishlist.html">Wishlist</a></li>
										<li><a href="student-reviews.html">Reviews</a></li>
										<li><a href="student-quiz.html">My Quiz Attempts</a></li>
										<li><a href="student-order-history.html">Orders</a></li>
										<li><a href="student-qa.html">Question & Answer</a></li>
										<li><a href="student-referral.html">Referrals</a></li>
										<li><a href="student-messages.html">Messages</a></li>
										<li><a href="student-tickets.html">Support Ticket</a></li>
										<li><a href="student-settings.html">Settings</a></li>
									</ul>
								</li>
								<li class="has-submenu">
									<a href="#">Pages <i class="fas fa-chevron-down"></i></a>
									<ul class="submenu">
										<li><a href="notifications.html">Notification</a></li>
										<li><a href="pricing-plan.html">Pricing Plan</a></li>
										<li><a href="wishlist.html">Wishlist</a></li>
										<li class="has-submenu">
											<a href="course-list.html">Course</a>
											<ul class="submenu">
												<li><a href="add-course.html">Add Course</a></li>
												<li><a href="course-list.html">Course List</a></li>
												<li><a href="course-grid.html">Course Grid</a></li>
												<li><a href="course-details.html">Course Details</a></li>
											</ul>
										</li>
										<li class="has-submenu">
											<a href="come-soon.html">Error</a>
											<ul class="submenu">
												<li><a href="come-soon.html">Coming Soon</a></li>
												<li><a href="error-404.html">404</a></li>
												<li><a href="error-500.html">500</a></li>
												<li><a href="under-construction.html">Under Construction</a></li>
											</ul>
										</li>
										<li><a href="faq.html">FAQ</a></li>
										<li><a href="support.html">Support</a></li>
										<li><a href="job-category.html">Category</a></li>
										<li><a href="cart.html">Cart</a></li>
										<li><a href="checkout.html">Checkout</a></li>
										<li><a href="login.html">Login</a></li>
										<li><a href="register.html">Register</a></li>
										<li><a href="forgot-password.html">Forgot Password</a></li>
									</ul>
								</li>
								<li class="has-submenu">
									<a href="#">Blog <i class="fas fa-chevron-down"></i></a>
									<ul class="submenu">
										<li><a href="blog-list.html">Blog List</a></li>
										<li><a href="blog-grid.html">Blog Grid</a></li>
										<li><a href="blog-masonry.html">Blog Masonry</a></li>
										<li><a href="blog-modern.html">Blog Modern</a></li>
										<li><a href="blog-details.html">Blog Details</a></li>
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

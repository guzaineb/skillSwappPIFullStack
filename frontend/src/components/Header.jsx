function Header() {
  return (
    <>
      {/* Header */}
      <header className="header header-page">
        <div className="header-fixed">
          <nav className="navbar navbar-expand-lg header-nav scroll-sticky">
            <div className="container header-container">
              <div className="navbar-header">
                <a id="mobile_btn" href="javascript:void(0);">
                  <span className="bar-icon">
                    <span />
                    <span />
                    <span />
                  </span>
                </a>
                <a href="index-2.html" className="navbar-brand logo">
                  <img
                    src="assets/img/logo.svg"
                    className="img-fluid"
                    alt="Logo"
                    width={120}
                    height={120}
                  />
                </a>
              </div>
              <div className="main-menu-wrapper">
                <div className="menu-header">
                  <a href="index-2.html" className="menu-logo">
                    <img
                      src="assets/img/logo.svg"
                      className="img-fluid"
                      alt="Logo"
                    />
                  </a>
                  <a
                    id="menu_close"
                    className="menu-close"
                    href="javascript:void(0);"
                  >
                    <i className="fas fa-times" />
                  </a>
                </div>
                <ul className="main-nav">
                  <li className="has-submenu">
                    <a href="#">
                      Home <i className="fas fa-chevron-down" />
                    </a>
                    <ul className="submenu">
                      <li>
                        <a href="index-2.html">Home</a>
                      </li>
                      <li>
                        <a href="index-two.html">Home Two</a>
                      </li>
                      <li>
                        <a href="index-three.html">Home Three</a>
                      </li>
                      <li>
                        <a href="index-four.html">Home Four</a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu">
                    <a href="#">
                      Instructor <i className="fas fa-chevron-down" />
                    </a>
                    <ul className="submenu">
                      <li className="has-submenu">
                        <a href="instructor-list.html">Instructor</a>
                        <ul className="submenu">
                          <li>
                            <a href="instructor-list.html">List</a>
                          </li>
                          <li>
                            <a href="instructor-grid.html">Grid</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="instructor-dashboard.html">Dashboard</a>
                      </li>
                      <li>
                        <a href="instructor-profile.html">My Profile</a>
                      </li>
                      <li>
                        <a href="instructor-course.html">My Course</a>
                      </li>
                      <li>
                        <a href="instructor-wishlist.html">Wishlist</a>
                      </li>
                      <li>
                        <a href="instructor-reviews.html">Reviews</a>
                      </li>
                      <li>
                        <a href="instructor-quiz.html">All Quizzes</a>
                      </li>
                      <li>
                        <a href="instructor-orders.html">Orders</a>
                      </li>
                      <li>
                        <a href="instructor-qa.html">Question &amp; Answer</a>
                      </li>
                      <li>
                        <a href="instructor-referral.html">Referrals</a>
                      </li>
                      <li>
                        <a href="instructor-chat.html">Messages</a>
                      </li>
                      <li>
                        <a href="instructor-tickets.html">Support Ticket</a>
                      </li>
                      <li>
                        <a href="instructor-notifications.html">
                          Notifications
                        </a>
                      </li>
                      <li>
                        <a href="instructor-settings.html">Settings</a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu ">
                    <a href="#">
                      Student <i className="fas fa-chevron-down" />
                    </a>
                    <ul className="submenu first-submenu">
                      <li className="has-submenu">
                        <a href="students-list.html">Student</a>
                        <ul className="submenu">
                          <li>
                            <a href="students-list.html">List</a>
                          </li>
                          <li>
                            <a href="students-grid.html">Grid</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="Dashboard">Student Dashboard</a>
                      </li>
                      <li>
                        <a href="Profile">My Profile</a>
                      </li>
                      <li>
                        <a href="student-courses.html">Enrolled Courses</a>
                      </li>
                      
                      
                      <li>
                        <a href="Question">Question &amp; Answer</a>
                      </li>
                      
                    </ul>
                  </li>

                  <li className="has-submenu active">
                    <a href="#">
                      Admin <i className="fas fa-chevron-down" />
                    </a>
                    <ul className="submenu first-submenu">
                      <li className="">
                        <a href="Dashboard">Admin Dashboard</a>
                      </li>
                      <li>
                        <a href="Profile">My Profile</a>
                      </li>
                      
                      
                      <li>
                        <a href="Reviews">Reviews</a>
                      </li>
                      <li>
                        <a href="Quiz">All Quizzes</a>
                      </li>
                      <li>
                        <a href="OrderHistory">Orders</a>
                      </li>
                      <li>
                        <a href="Question">Question &amp; Answer</a>
                      </li>
                      <li>
                        <a href="Referral">Referrals</a>
                      </li>
                      <li>
                        <a href="Message">Messages</a>
                      </li>
                      <li>
                        <a href="Tickets">Support Ticket</a>
                      </li>
                      <li>
                        <a href="Settings">Settings</a>
                      </li>
                    </ul>
                  </li>

                  <li className="has-submenu">
                    <a href="#">
                      Teacher <i className="fas fa-chevron-down" />
                    </a>
                    <ul className="submenu first-submenu">
                      <li className="">
                        <a href="Dashboard">teacher Dashboard</a>
                      </li>
                      <li>
                        <a href="Profile">My Profile</a>
                      </li>
                      <li>
                        <a href="Cours">Enrolled Courses</a>
                      </li>
                      <li>
                        <a href="Wishlist">Wishlist</a>
                      </li>
                      <li>
                        <a href="Reviews">Reviews</a>
                      </li>
                      <li>
                        <a href="Quiz">All Quizzes</a>
                      </li>
                      <li>
                        <a href="OrderHistory">Orders</a>
                      </li>
                      <li>
                        <a href="Question">Question &amp; Answer</a>
                      </li>
                      
                      <li>
                        <a href="Message">Messages</a>
                      </li>
                     
                    </ul>
                  </li>

                  <li className="has-submenu">
                    <a href="#">
                      Pages <i className="fas fa-chevron-down" />
                    </a>
                    <ul className="submenu">
                      <li>
                        <a href="notifications.html">Notification</a>
                      </li>
                      <li>
                        <a href="pricing-plan.html">Pricing Plan</a>
                      </li>
                      <li>
                        <a href="wishlist.html">Wishlist</a>
                      </li>
                      <li className="has-submenu">
                        <a href="course-list.html">Course</a>
                        <ul className="submenu">
                          <li>
                            <a href="add-course.html">Add Course</a>
                          </li>
                          <li>
                            <a href="course-list.html">Course List</a>
                          </li>
                          <li>
                            <a href="course-grid.html">Course Grid</a>
                          </li>
                          <li>
                            <a href="course-details.html">Course Details</a>
                          </li>
                        </ul>
                      </li>
                      <li className="has-submenu">
                        <a href="come-soon.html">Error</a>
                        <ul className="submenu">
                          <li>
                            <a href="come-soon.html">Coming Soon</a>
                          </li>
                          <li>
                            <a href="error-404.html">404</a>
                          </li>
                          <li>
                            <a href="error-500.html">500</a>
                          </li>
                          <li>
                            <a href="under-construction.html">
                              Under Construction
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="faq.html">FAQ</a>
                      </li>
                      <li>
                        <a href="support.html">Support</a>
                      </li>
                      <li>
                        <a href="job-category.html">Category</a>
                      </li>
                      <li>
                        <a href="cart.html">Cart</a>
                      </li>
                      <li>
                        <a href="checkout.html">Checkout</a>
                      </li>
                      <li>
                        <a href="login.html">Login</a>
                      </li>
                      <li>
                        <a href="register.html">Register</a>
                      </li>
                      <li>
                        <a href="forgot-password.html">Forgot Password</a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu">
                    <a href="#">
                      Blog <i className="fas fa-chevron-down" />
                    </a>
                    <ul className="submenu">
                      <li>
                        <a href="blog-list.html">Blog List</a>
                      </li>
                      <li>
                        <a href="blog-grid.html">Blog Grid</a>
                      </li>
                      <li>
                        <a href="blog-masonry.html">Blog Masonry</a>
                      </li>
                      <li>
                        <a href="blog-modern.html">Blog Modern</a>
                      </li>
                      <li>
                        <a href="blog-details.html">Blog Details</a>
                      </li>
                    </ul>
                  </li>
                  <li className="login-link">
                    <a href="login.html">Login / Signup</a>
                  </li>
                </ul>
              </div>
              <ul className="nav header-navbar-rht">
                <li className="nav-item user-nav">
                  <div>
                    <a
                      href="javascript:void(0);"
                      id="dark-mode-toggle"
                      className="dark-mode-toggle  "
                    >
                      <i className="fa-solid fa-moon" />
                    </a>
                    <a
                      href="javascript:void(0);"
                      id="light-mode-toggle"
                      className="dark-mode-toggle "
                    >
                      <i className="fa-solid fa-sun" />
                    </a>
                  </div>
                </li>
                <li className="nav-item user-nav">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <span className="user-img">
                      <img src="assets/img/user/user16.jpg" alt="Img" />
                      <span className="status online" />
                    </span>
                  </a>
                  <div
                    className="users dropdown-menu dropdown-menu-right"
                    data-popper-placement="bottom-end"
                  >
                    <div className="user-header">
                      <div className="avatar ava tar-sm">
                        <img
                          src="assets/img/user/user16.jpg"
                          alt="User Image"
                          className="avatar-img rounded-circle"
                        />
                      </div>
                      <div className="user-text">
                        <h6>Rolands R</h6>
                        <p className="text-muted mb-0">Student</p>
                      </div>
                    </div>
                    
                    <a className="dropdown-item" href="Settings">
                      <i className="feather-user me-1" /> Profile
                    </a>
                    <a
                      className="dropdown-item"
                      href="setting-student-subscription.html"
                    >
                      <i className="feather-star me-1" /> Subscription
                    </a>
                    <a className="dropdown-item" href="Logout">
                      <i className="feather-log-out me-1" /> Logout
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* /Header */}
    </>
  );
}

export default Header;

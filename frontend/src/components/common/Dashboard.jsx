import React from 'react'

function Dashboard() {
  return (
<>
<div className="main-wrapper">
  {/* Header */}
  <header className="header header-page">
    <div className="header-fixed">
      <nav className="navbar navbar-expand-lg header-nav scroll-sticky">
        <div className="container">
          <div className="navbar-header">
            <a id="mobile_btn" href="javascript:void(0);">
              <span className="bar-icon">
                <span />
                <span />
                <span />
              </span>
            </a>
            <a href="index-2.html" className="navbar-brand logo">
              <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
            </a>
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <a href="index-2.html" className="menu-logo">
                <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
              </a>
              <a id="menu_close" className="menu-close" href="javascript:void(0);">
                <i className="fas fa-times" />
              </a>
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
              <li className="has-submenu">
                <a href="#">Instructor <i className="fas fa-chevron-down" /></a>
                <ul className="submenu">
                  <li className="has-submenu">
                    <a href="instructor-list.html">Instructor</a>
                    <ul className="submenu">
                      <li><a href="instructor-list.html">List</a></li>
                      <li><a href="instructor-grid.html">Grid</a></li>
                    </ul>
                  </li>
                  <li><a href="instructor-dashboard.html">Dashboard</a></li>
                  <li><a href="Profile">My Profile</a></li>
                  <li><a href="instructor-course.html">My Course</a></li>
                  <li><a href="instructor-wishlist.html">Wishlist</a></li>
                  <li><a href="instructor-reviews.html">Reviews</a></li>
                  <li><a href="instructor-quiz.html">My Quiz Attempts</a></li>
                  <li><a href="instructor-orders.html">Orders</a></li>
                  <li><a href="instructor-qa.html">Question &amp; Answer</a></li>
                  <li><a href="instructor-referral.html">Referrals</a></li>
                  <li><a href="instructor-chat.html">Messages</a></li>
                  <li><a href="instructor-tickets.html">Support Ticket</a></li>
                  <li><a href="instructor-notifications.html">Notifications</a></li>
                  <li><a href="instructor-settings.html">Settings</a></li>
                </ul>
              </li>
              <li className="has-submenu active">
                <a href="#">Student <i className="fas fa-chevron-down" /></a>
                <ul className="submenu first-submenu">
                  <li className="has-submenu">
                    <a href="students-list.html">Student</a>
                    <ul className="submenu">
                      <li><a href="students-list.html">List</a></li>
                      <li><a href="students-grid.html">Grid</a></li>
                    </ul>
                  </li>
                  <li className="active"><a href="student-dashboard.html">Student Dashboard</a></li>
                  <li><a href="Profile">My Profile</a></li>
                  <li><a href="student-courses.html">Enrolled Courses</a></li>
                  <li><a href="student-wishlist.html">Wishlist</a></li>
                  <li><a href="student-reviews.html">Reviews</a></li>
                  <li><a href="student-quiz.html">My Quiz Attempts</a></li>
                  <li><a href="student-order-history.html">Orders</a></li>
                  <li><a href="student-qa.html">Question &amp; Answer</a></li>
                  <li><a href="student-referral.html">Referrals</a></li>
                  <li><a href="student-messages.html">Messages</a></li>
                  <li><a href="student-tickets.html">Support Ticket</a></li>
                  <li><a href="student-settings.html">Settings</a></li>
                </ul>
              </li>
              <li className="has-submenu">
                <a href="#">Pages <i className="fas fa-chevron-down" /></a>
                <ul className="submenu">
                  <li><a href="notifications.html">Notification</a></li>
                  <li><a href="pricing-plan.html">Pricing Plan</a></li>
                  <li><a href="wishlist.html">Wishlist</a></li>
                  <li className="has-submenu">
                    <a href="course-list.html">Course</a>
                    <ul className="submenu">
                      <li><a href="add-course.html">Add Course</a></li>
                      <li><a href="course-list.html">Course List</a></li>
                      <li><a href="course-grid.html">Course Grid</a></li>
                      <li><a href="course-details.html">Course Details</a></li>
                    </ul>
                  </li>
                  <li className="has-submenu">
                    <a href="come-soon.html">Error</a>
                    <ul className="submenu">
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
              <li className="has-submenu">
                <a href="#">Blog <i className="fas fa-chevron-down" /></a>
                <ul className="submenu">
                  <li><a href="blog-list.html">Blog List</a></li>
                  <li><a href="blog-grid.html">Blog Grid</a></li>
                  <li><a href="blog-masonry.html">Blog Masonry</a></li>
                  <li><a href="blog-modern.html">Blog Modern</a></li>
                  <li><a href="blog-details.html">Blog Details</a></li>
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
                <a href="javascript:void(0);" id="dark-mode-toggle" className="dark-mode-toggle  ">
                  <i className="fa-solid fa-moon" />
                </a>
                <a href="javascript:void(0);" id="light-mode-toggle" className="dark-mode-toggle ">
                  <i className="fa-solid fa-sun" />
                </a>
              </div>
            </li>
            <li className="nav-item user-nav">
              <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                <span className="user-img">
                  <img src="assets/img/user/user16.jpg" alt="Img" />
                  <span className="status online" />
                </span>
              </a>
              <div className="users dropdown-menu dropdown-menu-right" data-popper-placement="bottom-end">
                <div className="user-header">
                  <div className="avatar avatar-sm">
                    <img src="assets/img/user/user16.jpg" alt="User Image" className="avatar-img rounded-circle" />
                  </div>
                  <div className="user-text">
                    <h6>Rolands R</h6>
                    <p className="text-muted mb-0">Student</p>
                  </div>
                </div>
                <a className="dropdown-item" href="student-dashboard.html"><i className="feather-home me-1" /> Dashboard</a>
                <a className="dropdown-item" href="student-settings.html"><i className="feather-user me-1" /> Profile</a>
                <a className="dropdown-item" href="setting-student-subscription.html"><i className="feather-star me-1" /> Subscription</a>
                <a className="dropdown-item" href="index-2.html"><i className="feather-log-out me-1" />
                  Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
  {/* /Header */}
  {/* Breadcrumb */}
  <div className="breadcrumb-bar breadcrumb-bar-info">
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-12">
          <div className="breadcrumb-list">
            <h2 className="breadcrumb-title">Dashboard</h2>
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Page Content */}
  <div className="page-content">
    <div className="container">
      <div className="row">
        {/* sidebar */}
        <div className="col-xl-3 col-lg-3 theiaStickySidebar">
          <div className="settings-widget dash-profile">
            <div className="settings-menu">
              <div className="profile-bg">
                <div className="profile-img">
                  <a href="Profile"><img src="assets/img/user/user16.jpg" alt="Img" /></a>
                </div>
              </div>
              <div className="profile-group">
                <div className="profile-name text-center">
                  <h4><a href="Profile">Rolands Richard</a></h4>
                  <p>Student</p>
                </div>
              </div>
            </div>
          </div>
          <div className="settings-widget account-settings">
            <div className="settings-menu">
              <h3>Dashboard</h3>
              <ul>
                <li className="nav-item active">
                  <a href="student-dashboard.html" className="nav-link">
                    <i className="bx bxs-tachometer" />Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a href="Profile" className="nav-link">
                    <i className="bx bxs-user" />My Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-courses.html" className="nav-link">
                    <i className="bx bxs-graduation" />Enrolled Courses
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-wishlist.html" className="nav-link">
                    <i className="bx bxs-heart" />Wishlist
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-reviews.html" className="nav-link">
                    <i className="bx bxs-star" />Reviews
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-quiz.html" className="nav-link">
                    <i className="bx bxs-shapes" />My Quiz Attempts
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-order-history.html" className="nav-link">
                    <i className="bx bxs-cart" />Order History
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-qa.html" className="nav-link">
                    <i className="bx bxs-bookmark-alt" />Question &amp; Answer
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-referral.html" className="nav-link">
                    <i className="bx bxs-user-plus" />Referrals
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-messages.html" className="nav-link">
                    <i className="bx bxs-chat" />Messages
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-tickets.html" className="nav-link">
                    <i className="bx bxs-coupon" />Support Tickets
                  </a>
                </li>
              </ul>
              <h3>Account Settings</h3>
              <ul>
                <li className="nav-item">
                  <a href="student-settings.html" className="nav-link ">
                    <i className="bx bxs-cog" />Settings
                  </a>
                </li>
                <li className="nav-item">
                  <a href="index-2.html" className="nav-link">
                    <i className="bx bxs-log-out" />Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Sidebar */}
        {/* Student Dashboard */}
        <div className="col-xl-9 col-lg-9">
          {/* Dashboard Grid */}
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="card dash-info flex-fill">
                <div className="card-body">
                  <h5>Enrolled Courses</h5>
                  <h2>12</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="card dash-info flex-fill">
                <div className="card-body">
                  <h5>Active Courses</h5>
                  <h2>03</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="card dash-info flex-fill">
                <div className="card-body">
                  <h5>Completed Courses</h5>
                  <h2>13</h2>
                </div>
              </div>
            </div>
          </div>
          {/* /Dashboard Grid */}
          <div className="dashboard-title">
            <h4>Recently Enrolled Courses</h4>
          </div>
          <div className="row">
            {/* Course Grid */}
            <div className="col-xxl-4 col-md-6 d-flex">
              <div className="course-box flex-fill">
                <div className="product">
                  <div className="product-img">
                    <a href="course-details.html">
                      <img className="img-fluid" alt="Img" src="assets/img/course/course-02.jpg" />
                    </a>
                    <div className="price">
                      <h3>$80 <span>$99.00</span></h3>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="course-group d-flex">
                      <div className="course-group-img d-flex">
                        <a href="instructor-profile.html"><img src="assets/img/user/user2.jpg" alt="Img" className="img-fluid" /></a>
                        <div className="course-name">
                          <h4><a href="instructor-profile.html">Cooper</a></h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div className="course-share d-flex align-items-center justify-content-center">
                        <a href="#"><i className="fa-regular fa-heart" /></a>
                      </div>
                    </div>
                    <h3 className="title instructor-text"><a href="course-details.html">Wordpress
                        for Beginners - Master Wordpress Quickly</a></h3>
                    <div className="course-info d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <img src="assets/img/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <img src="assets/img/icon/icon-02.svg" alt="Img" />
                        <p>70hr 30min</p>
                      </div>
                    </div>
                    <div className="rating mb-0">
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <span className="d-inline-block average-rating"><span>5.0</span> (20)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Course Grid */}
            {/* Course Grid */}
            <div className="col-xxl-4 col-md-6 d-flex">
              <div className="course-box flex-fill">
                <div className="product">
                  <div className="product-img">
                    <a href="course-details.html">
                      <img className="img-fluid" alt="Img" src="assets/img/course/course-03.jpg" />
                    </a>
                    <div className="price combo">
                      <h3>FREE</h3>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="course-group d-flex">
                      <div className="course-group-img d-flex">
                        <a href="instructor-profile.html"><img src="assets/img/user/user5.jpg" alt="Img" className="img-fluid" /></a>
                        <div className="course-name">
                          <h4><a href="instructor-profile.html">Jenny</a></h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div className="course-share d-flex align-items-center justify-content-center">
                        <a href="#"><i className="fa-regular fa-heart" /></a>
                      </div>
                    </div>
                    <h3 className="title instructor-text"><a href="course-details.html">Sketch from
                        A to Z (2024): Become an app designer</a></h3>
                    <div className="course-info d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <img src="assets/img/icon/icon-01.svg" alt="Img" />
                        <p>10+ Lesson</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <img src="assets/img/icon/icon-02.svg" alt="Img" />
                        <p>40hr 10min</p>
                      </div>
                    </div>
                    <div className="rating mb-0">
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <span className="d-inline-block average-rating"><span>3.0</span> (18)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Course Grid */}
            {/* Course Grid */}
            <div className="col-xxl-4 col-md-6 d-flex">
              <div className="course-box flex-fill">
                <div className="product">
                  <div className="product-img">
                    <a href="course-details.html">
                      <img className="img-fluid" alt="Img" src="assets/img/course/course-04.jpg" />
                    </a>
                    <div className="price">
                      <h3>$65 <span>$70.00</span></h3>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="course-group d-flex">
                      <div className="course-group-img d-flex">
                        <a href="instructor-profile.html"><img src="assets/img/user/user4.jpg" alt="Img" className="img-fluid" /></a>
                        <div className="course-name">
                          <h4><a href="instructor-profile.html">Nicole Brown</a></h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div className="course-share d-flex align-items-center justify-content-center">
                        <a href="#"><i className="fa-regular fa-heart" /></a>
                      </div>
                    </div>
                    <h3 className="title instructor-text"><a href="course-details.html">Learn
                        Angular Fundamentals From beginning to advance lavel</a></h3>
                    <div className="course-info d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <img src="assets/img/icon/icon-01.svg" alt="Img" />
                        <p>15+ Lesson</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <img src="assets/img/icon/icon-02.svg" alt="Img" />
                        <p>80hr 40min</p>
                      </div>
                    </div>
                    <div className="rating mb-0">
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star" />
                      <span className="d-inline-block average-rating"><span>4.0</span> (10)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Course Grid */}
            {/* Course Grid */}
            <div className="col-xxl-4 col-md-6 d-flex">
              <div className="course-box flex-fill">
                <div className="product">
                  <div className="product-img">
                    <a href="course-details.html">
                      <img className="img-fluid" alt="Img" src="assets/img/course/course-05.jpg" />
                    </a>
                    <div className="price combo">
                      <h3>FREE</h3>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="course-group d-flex">
                      <div className="course-group-img d-flex">
                        <a href="instructor-profile.html"><img src="assets/img/user/user3.jpg" alt="Img" className="img-fluid" /></a>
                        <div className="course-name">
                          <h4><a href="instructor-profile.html">John Smith</a></h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div className="course-share d-flex align-items-center justify-content-center">
                        <a href="#"><i className="fa-regular fa-heart" /></a>
                      </div>
                    </div>
                    <h3 className="title instructor-text"><a href="course-details.html">Build
                        Responsive Real World Websites with Crash Course</a></h3>
                    <div className="course-info d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <img src="assets/img/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <img src="assets/img/icon/icon-02.svg" alt="Img" />
                        <p>70hr 30min</p>
                      </div>
                    </div>
                    <div className="rating mb-0">
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star" />
                      <span className="d-inline-block average-rating"><span>4.0</span> (15)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Course Grid */}
            {/* Course Grid */}
            <div className="col-xxl-4 col-md-6 d-flex">
              <div className="course-box flex-fill">
                <div className="product">
                  <div className="product-img">
                    <a href="course-details.html">
                      <img className="img-fluid" alt="Img" src="assets/img/course/course-07.jpg" />
                    </a>
                    <div className="price">
                      <h3>$70 <span>$80.00</span></h3>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="course-group d-flex">
                      <div className="course-group-img d-flex">
                        <a href="instructor-profile.html"><img src="assets/img/user/user6.jpg" alt="Img" className="img-fluid" /></a>
                        <div className="course-name">
                          <h4><a href="instructor-profile.html">Stella Johnson</a></h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div className="course-share d-flex align-items-center justify-content-center">
                        <a href="#"><i className="fa-regular fa-heart" /></a>
                      </div>
                    </div>
                    <h3 className="title instructor-text"><a href="course-details.html">Learn
                        JavaScript and Express to become a Expert</a></h3>
                    <div className="course-info d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <img src="assets/img/icon/icon-01.svg" alt="Img" />
                        <p>15+ Lesson</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <img src="assets/img/icon/icon-02.svg" alt="Img" />
                        <p>70hr 30min</p>
                      </div>
                    </div>
                    <div className="rating mb-0">
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star" />
                      <span className="d-inline-block average-rating"><span>4.6</span> (15)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Course Grid */}
            {/* Course Grid */}
            <div className="col-xxl-4 col-md-6 d-flex">
              <div className="course-box flex-fill">
                <div className="product">
                  <div className="product-img">
                    <a href="course-details.html">
                      <img className="img-fluid" alt="Img" src="assets/img/course/course-08.jpg" />
                    </a>
                    <div className="price combo">
                      <h3>FREE</h3>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="course-group d-flex">
                      <div className="course-group-img d-flex">
                        <a href="instructor-profile.html"><img src="assets/img/user/user1.jpg" alt="Img" className="img-fluid" /></a>
                        <div className="course-name">
                          <h4><a href="instructor-profile.html">Nicole Brown</a></h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div className="course-share d-flex align-items-center justify-content-center">
                        <a href="#"><i className="fa-regular fa-heart" /></a>
                      </div>
                    </div>
                    <h3 className="title instructor-text"><a href="course-details.html">Introduction
                        to Programming- Python &amp; Java</a></h3>
                    <div className="course-info d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <img src="assets/img/icon/icon-01.svg" alt="Img" />
                        <p>10+ Lesson</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <img src="assets/img/icon/icon-02.svg" alt="Img" />
                        <p>70hr 30min</p>
                      </div>
                    </div>
                    <div className="rating mb-0">
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <span className="d-inline-block average-rating"><span>5.0</span> (13)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Course Grid */}
          </div>
          <div className="dash-pagination">
            <div className="row align-items-center">
              <div className="col-6">
                <p>Page 1 of 2</p>
              </div>
              <div className="col-6">
                <ul className="pagination">
                  <li className="active">
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#"><i className="bx bx-chevron-right" /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Student Dashboard */}
      </div>
    </div>
  </div>
  {/* /Page Content */}
  {/* Footer */}
  <footer className="footer">
    {/* Footer Top */}
    <div className="footer-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            {/* Footer Widget */}
            <div className="footer-widget footer-about">
              <div className="footer-logo">
                <img src="assets/img/logo.svg" alt="logo" />
              </div>
              <div className="footer-about-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat mauris
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat mauris</p>
              </div>
            </div>
            {/* /Footer Widget */}
          </div>
          <div className="col-lg-2 col-md-6">
            {/* Footer Widget */}
            <div className="footer-widget footer-menu">
              <h2 className="footer-title">For Instructor</h2>
              <ul>
                <li><a href="instructor-profile.html">Profile</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
                <li><a href="instructor-list.html">Instructor</a></li>
                <li><a href="instructor-dashboard.html"> Dashboard</a></li>
              </ul>
            </div>
            {/* /Footer Widget */}
          </div>
          <div className="col-lg-2 col-md-6">
            {/* Footer Widget */}
            <div className="footer-widget footer-menu">
              <h2 className="footer-title">For Student</h2>
              <ul>
                <li><a href="Profile">Profile</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
                <li><a href="students-list.html">Student</a></li>
                <li><a href="student-dashboard.html"> Dashboard</a></li>
              </ul>
            </div>
            {/* /Footer Widget */}
          </div>
          <div className="col-lg-4 col-md-6">
            {/* Footer Widget */}
            <div className="footer-widget footer-contact">
              <h2 className="footer-title">News letter</h2>
              <div className="news-letter">
                <form>
                  <input type="text" className="form-control" placeholder="Enter your email address" name="email" />
                </form>
              </div>
              <div className="footer-contact-info">
                <div className="footer-address">
                  <img src="assets/img/icon/icon-20.svg" alt="Img" className="img-fluid" />
                  <p> 3556 Beech Street, San Francisco,<br /> California, CA 94108 </p>
                </div>
                <p>
                  <img src="assets/img/icon/icon-19.svg" alt="Img" className="img-fluid" />
                  <a href="https://dreamslms.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="e88c9a8d89859b84859ba88d90898598848dc68b8785">[email&nbsp;protected]</a>
                </p>
                <p className="mb-0">
                  <img src="assets/img/icon/icon-21.svg" alt="Img" className="img-fluid" />
                  +19 123-456-7890
                </p>
              </div>
            </div>
            {/* /Footer Widget */}
          </div>
        </div>
      </div>
    </div>
    {/* /Footer Top */}
    {/* Footer Bottom */}
    <div className="footer-bottom">
      <div className="container">
        {/* Copyright */}
        <div className="copyright">
          <div className="row">
            <div className="col-md-6">
              <div className="privacy-policy">
                <ul>
                  <li><a href="term-condition.html">Terms</a></li>
                  <li><a href="privacy-policy.html">Privacy</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="copyright-text">
                <p className="mb-0">© 2024 DreamsLMS. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
        {/* /Copyright */}
      </div>
    </div>
    {/* /Footer Bottom */}
  </footer>
  {/* /Footer */}
</div>

</>  
)
}

export default Dashboard
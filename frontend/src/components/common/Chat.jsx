import React from 'react'

function Chat() {
  return (
    <>
    
   <div className="main-wrapper chat-wrapper">
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
                  <li><a href="instructor-profile.html">My Profile</a></li>
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
                  <li><a href="student-dashboard.html">Student Dashboard</a></li>
                  <li><a href="student-profile.html">My Profile</a></li>
                  <li><a href="student-courses.html">Enrolled Courses</a></li>
                  <li><a href="student-wishlist.html">Wishlist</a></li>
                  <li><a href="student-reviews.html">Reviews</a></li>
                  <li><a href="student-quiz.html">My Quiz Attempts</a></li>
                  <li><a href="student-order-history.html">Orders</a></li>
                  <li><a href="student-qa.html">Question &amp; Answer</a></li>
                  <li><a href="student-referral.html">Referrals</a></li>
                  <li className="active"><a href="student-messages.html">Messages</a></li>
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
                <a className="dropdown-item" href="index-2.html"><i className="feather-log-out me-1" /> Logout</a>
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
            <h2 className="breadcrumb-title">Messages</h2>
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Messages</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Breadcrumb */}	
  {/* Page Content */}
  <div className="page-content chat-page-wrapper">
    <div className="container">
      <div className="row">
        {/* sidebar */}
        <div className="col-xl-3 col-lg-3 ">
          <div className="settings-widget dash-profile">
            <div className="settings-menu">
              <div className="profile-bg">
                <div className="profile-img">
                  <a href="student-profile.html"><img src="assets/img/user/user16.jpg" alt="Img" /></a>
                </div>
              </div>
              <div className="profile-group">
                <div className="profile-name text-center">
                  <h4><a href="student-profile.html">Rolands Richard</a></h4>
                  <p>Student</p>
                </div>
              </div>
            </div>
          </div>
          <div className="settings-widget account-settings">
            <div className="settings-menu">
              <h3>Dashboard</h3>
              <ul>
                <li className="nav-item ">
                  <a href="student-dashboard.html" className="nav-link">
                    <i className="bx bxs-tachometer" />Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-profile.html" className="nav-link">
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
                <li className="nav-item active">
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
        {/* Student Profile */}
        <div className="col-xl-9 col-lg-9 theiaStickySidebar">	
          <div className="settings-widget card-details mb-0">
            <div className="settings-menu p-0">
              <div className="profile-heading">
                <h3>Message</h3>
              </div>
              <div className="checkout-form">
                {/* sidebar group */}
                <div className="content">
                  <div className="sidebar-group left-sidebar chat_sidebar">
                    {/* Chats sidebar */}
                    <div id="chats" className="left-sidebar-wrap sidebar active slimscroll">
                      <div className="slimscroll">
                        {/* Left Chat Title */}
                        <div className="left-chat-title all-chats d-flex justify-content-between align-items-center">
                          <div className="select-group-chat">
                            <div className="dropdown">
                              <a href="javascript:void(0);">
                                All Chats
                              </a>
                            </div>
                          </div>
                          <div className="add-section">
                            
                            {/* Chat Search */}
                            <div className="user-chat-search">
                              <form>
                                <span className="form-control-feedback"><i className="feather-search" /></span>
                                <input type="text" name="chat-search" placeholder="Search" className="form-control" />
                                <div className="user-close-btn-chat"><i className="feather-x" /></div>
                              </form>
                            </div>
                            {/* /Chat Search */}
                          </div>
                        </div>
                        {/* /Left Chat Title */}
                        {/* Top Online Contacts */}
                        <div className="top-online-contacts">
                          <div className="fav-title">
                            <h6>Online Now</h6>
                            <a href="#" className="view-all-chat-profiles">View All</a>
                          </div>
                          <div className="swiper-container">
                            <div className="swiper-wrapper">
                              <div className="swiper-slide">
                                <div className="top-contacts-box">
                                  <div className="profile-img online">
                                    <a href="#"><img src="assets/img/user/user12.jpg" alt="Image" /></a>
                                  </div>
                                </div>
                              </div>
                              <div className="swiper-slide">
                                <div className="top-contacts-box">
                                  <div className="profile-img online">
                                    <a href="#"><img src="assets/img/user/user2.jpg" alt="Image" /></a>
                                  </div>
                                </div>
                              </div>
                              <div className="swiper-slide">
                                <div className="top-contacts-box">
                                  <div className="profile-img online">
                                    <a href="#"><img src="assets/img/user/user3.jpg" alt="Image" /></a>
                                  </div>
                                </div>
                              </div>
                              <div className="swiper-slide">
                                <div className="top-contacts-box">
                                  <div className="profile-img online">
                                    <a href="#"><img src="assets/img/user/user3.jpg" alt="Image" /></a>
                                  </div>
                                </div>
                              </div>
                              <div className="swiper-slide">
                                <div className="top-contacts-box">
                                  <div className="profile-img online">
                                    <a href="#"><img src="assets/img/user/user5.jpg" alt="Image" /></a>
                                  </div>
                                </div>
                              </div>
                              <div className="swiper-slide">
                                <div className="top-contacts-box">
                                  <div className="profile-img online">
                                    <a href="#"><img src="assets/img/user/user6.jpg" alt="Image" /></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /Top Online Contacts */}
                        <div className="sidebar-body chat-body" id="chatsidebar">
                          {/* Left Chat Title */}
                          <div className="d-flex justify-content-between align-items-center ps-0 pe-0">
                            <div className="fav-title pin-chat">
                              <h6>Pinned Chat</h6>
                            </div>
                          </div>
                          {/* /Left Chat Title */}
                          <ul className="user-list space-chat">
                            <li className="user-list-item chat-user-list">
                              <a href="javascript:void(0);" className="status-active">
                                <div className="avatar avatar-online">
                                  <img src="assets/img/user/user12.jpg" className="rounded-circle" alt="image" />
                                </div>
                                <div className="users-list-body">
                                  <div>
                                    <h5>Mark Villiams</h5>
                                    <p>Have you called them?</p>
                                  </div>
                                  <div className="last-chat-time">
                                    <small className="text-muted">10:20 PM</small>
                                    <div className="chat-pin">
                                      <i className="fa-solid fa-thumbtack me-2" />
                                      <i className="fa-solid fa-check-double" />
                                    </div>
                                  </div>    
                                </div>
                              </a>
                              <div className="chat-hover ms-1">
                                <div className="chat-action-col">
                                  <span className="d-flex" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-ellipsis-vertical" />
                                  </span>
                                  <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                    <span className="dropdown-item "><span><i className="bx bx-archive-in" /></span>Archive Chat </span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><span><i className="bx bx-volume-mute" /></span>Mute Notification</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#change-chat"><span><i className="bx bx-log-out" /></span>Delete Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-pin" /></span>Unpin Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-check-square" /></span>Mark as Unread</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-list-item chat-user-list">
                              <a href="javascript:void(0);">
                                <div>
                                  <div className="avatar ">
                                    <img src="assets/img/user/user5.jpg" className="rounded-circle" alt="image" />
                                  </div>
                                </div>
                                <div className="users-list-body">
                                  <div>
                                    <h5>Elizabeth Sosa</h5>
                                    <p><span className="animate-typing-col">Typing
                                        <span className="dot" />
                                        <span className="dot" />
                                        <span className="dot" />
                                      </span>
                                    </p>
                                  </div>
                                  <div className="last-chat-time">
                                    <small className="text-muted">Yesterday</small>
                                    <div className="chat-pin">
                                      <i className="fa-solid fa-thumbtack" />
                                    </div>
                                  </div>
                                </div>
                              </a>
                              <div className="chat-hover">
                                <div className="chat-action-col">
                                  <span className="d-flex" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-ellipsis-vertical" />
                                  </span>
                                  <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                    <span className="dropdown-item "><span><i className="bx bx-archive-in" /></span>Archive Chat </span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><span><i className="bx bx-volume-mute" /></span>Mute Notification</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#change-chat"><span><i className="bx bx-log-out" /></span>Delete Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-pin" /></span>Unpin Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-check-square" /></span>Mark as Unread</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-list-item chat-user-list">
                              <a href="javascript:void(0);">
                                <div className="avatar avatar-online">
                                  <img src="assets/img/user/user3.jpg" className="rounded-circle" alt="image" />
                                </div>
                                <div className="users-list-body">
                                  <div>
                                    <h5>Michael Howard</h5>
                                    <p>Thank you</p>
                                  </div>
                                  <div className="last-chat-time">
                                    <small className="text-muted">10:20 PM</small>
                                    <div className="chat-pin">
                                      <i className="fa-solid fa-thumbtack me-2" />
                                      <i className="fa-solid fa-check-double check" />
                                    </div>
                                  </div>    
                                </div>
                              </a>
                              <div className="chat-hover ms-1">
                                <div className="chat-action-col">
                                  <span className="d-flex" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-ellipsis-vertical" />
                                  </span>
                                  <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                    <span className="dropdown-item "><span><i className="bx bx-archive-in" /></span>Archive Chat </span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><span><i className="bx bx-volume-mute" /></span>Mute Notification</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#change-chat"><span><i className="bx bx-log-out" /></span>Delete Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-pin" /></span>Unpin Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-check-square" /></span>Mark as Unread</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                          {/* Left Chat Title */}
                          <div className="d-flex justify-content-between align-items-center ps-0 pe-0">
                            <div className="fav-title pin-chat">
                              <h6>Recent Chat</h6>
                            </div>
                          </div>
                          {/* /Left Chat Title */}
                          <ul className="user-list">
                            <li className="user-list-item chat-user-list">
                              <a href="javascript:void(0);">
                                <div className="avatar avatar-online">
                                  <img src="assets/img/user/user11.jpg" className="rounded-circle" alt="image" />
                                </div>
                                <div className="users-list-body">
                                  <div>
                                    <h5>Horace Keene</h5>
                                    <p>Have you called them?</p>
                                  </div>
                                  <div className="last-chat-time">
                                    <small className="text-muted">Just Now</small>
                                    <div className="chat-pin">
                                      <span className="count-message">5</span>
                                    </div>
                                  </div>    
                                </div>
                              </a>
                              <div className="chat-hover ms-1">
                                <div className="chat-action-col">
                                  <span className="d-flex" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-ellipsis-vertical" />
                                  </span>
                                  <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                    <span className="dropdown-item "><span><i className="bx bx-archive-in" /></span>Archive Chat </span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><span><i className="bx bx-volume-mute" /></span>Mute Notification</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#change-chat"><span><i className="bx bx-trash" /></span>Delete Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-pin" /></span>Pin Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-check-square" /></span>Mark as Read</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#block-user"><span><i className="bx bx-block" /></span>Block</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-list-item chat-user-list">
                              <a href="javascript:void(0);">
                                <div>
                                  <div className="avatar avatar-online">
                                    <img src="assets/img/user/user4.jpg" className="rounded-circle" alt="image" />
                                  </div>
                                </div>
                                <div className="users-list-body">
                                  <div>
                                    <h5>Hollis Tran</h5>
                                    <p><i className="bx bx-video me-1" />Video</p>
                                  </div>
                                  <div className="last-chat-time">
                                    <small className="text-muted">Yesterday</small>
                                    <div className="chat-pin">
                                      <i className="fa-solid fa-check" />
                                    </div>
                                  </div>
                                </div>
                              </a>
                              <div className="chat-hover ms-1">
                                <div className="chat-action-col">
                                  <span className="d-flex" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-ellipsis-vertical" />
                                  </span>
                                  <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                    <span className="dropdown-item "><span><i className="bx bx-archive-in" /></span>Archive Chat </span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><span><i className="bx bx-volume-mute" /></span>Mute Notification</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#change-chat"><span><i className="bx bx-trash" /></span>Delete Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-pin" /></span>Pin Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-check-square" /></span>Mark as Unread</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#block-user"><span><i className="bx bx-block" /></span>Block</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-list-item chat-user-list">
                              <a href="javascript:void(0);">
                                <div className="avatar">
                                  <img src="assets/img/user/user.jpg" className="rounded-circle" alt="image" />
                                </div>
                                <div className="users-list-body">
                                  <div>
                                    <h5>James Albert</h5>
                                    <p><i className="bx bx-file me-1" />Project Tools.doc</p>
                                  </div>
                                  <div className="last-chat-time">
                                    <small className="text-muted">10:20 PM</small>                                               
                                  </div>    
                                </div>
                              </a>
                              <div className="chat-hover ms-1">
                                <div className="chat-action-col">
                                  <span className="d-flex" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-ellipsis-vertical" />
                                  </span>
                                  <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                    <span className="dropdown-item "><span><i className="bx bx-archive-in" /></span>Archive Chat </span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><span><i className="bx bx-volume-mute" /></span>Mute Notification</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#change-chat"><span><i className="bx bx-trash" /></span>Delete Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-pin" /></span>Pin Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-check-square" /></span>Mark as Unread</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#block-user"><span><i className="bx bx-block" /></span>Block</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-list-item chat-user-list">
                              <a href="javascript:void(0);">
                                <div>
                                  <div className="avatar avatar-online">
                                    <img src="assets/img/user/user6.jpg" className="rounded-circle" alt="image" />
                                  </div>
                                </div>
                                <div className="users-list-body">
                                  <div>
                                    <h5>Debra Jones</h5>
                                    <p><i className="bx bx-microphone me-1" />Audio</p>
                                  </div>
                                  <div className="last-chat-time">
                                    <small className="text-muted">12:30 PM</small>
                                    <div className="chat-pin">
                                      <i className="fa-solid fa-check-double check" />
                                    </div>
                                  </div>
                                </div>
                              </a>
                              <div className="chat-hover ms-1">
                                <div className="chat-action-col">
                                  <span className="d-flex" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-ellipsis-vertical" />
                                  </span>
                                  <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                    <span className="dropdown-item "><span><i className="bx bx-archive-in" /></span>Archive Chat </span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><span><i className="bx bx-volume-mute" /></span>Mute Notification</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#change-chat"><span><i className="bx bx-trash" /></span>Delete Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-pin" /></span>Pin Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-check-square" /></span>Mark as Unread</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#block-user"><span><i className="bx bx-block" /></span>Block</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-list-item chat-user-list">
                              <a href="javascript:void(0);">
                                <div>
                                  <div className="avatar ">
                                    <img src="assets/img/user/user1.jpg" className="rounded-circle" alt="image" />
                                  </div>
                                </div>
                                <div className="users-list-body">
                                  <div>
                                    <h5>Dina Brown</h5>
                                    <p>Have you called them?</p>
                                  </div>
                                  <div className="last-chat-time">
                                    <small className="text-muted">Yesterday</small>
                                    <div className="chat-pin">
                                      <i className="fa-solid fa-microphone-slash" />
                                    </div>
                                  </div>
                                </div>
                              </a>
                              <div className="chat-hover ms-1">
                                <div className="chat-action-col">
                                  <span className="d-flex" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-ellipsis-vertical" />
                                  </span>
                                  <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                    <span className="dropdown-item "><span><i className="bx bx-archive-in" /></span>Archive Chat </span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><span><i className="bx bx-volume-mute" /></span>Mute Notification</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#change-chat"><span><i className="bx bx-trash" /></span>Delete Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-pin" /></span>Pin Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-check-square" /></span>Mark as Unread</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#block-user"><span><i className="bx bx-block" /></span>Block</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-list-item chat-user-list">
                              <a href="javascript:void(0);">
                                <div>
                                  <div className="avatar avatar-online">
                                    <img src="assets/img/user/user13.jpg" className="rounded-circle" alt="image" />
                                  </div>
                                </div>
                                <div className="users-list-body">
                                  <div>
                                    <h5>Judy Mercer</h5>
                                    <p className="missed-call-col"><i className="bx bx-phone-incoming me-1" />Missed Call</p>
                                  </div>
                                  <div className="last-chat-time">
                                    <small className="text-muted">25/July/23</small>
                                  </div>
                                </div>
                              </a>
                              <div className="chat-hover ms-1">
                                <div className="chat-action-col">
                                  <span className="d-flex" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-ellipsis-vertical" />
                                  </span>
                                  <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                    <span className="dropdown-item "><span><i className="bx bx-archive-in" /></span>Archive Chat </span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><span><i className="bx bx-volume-mute" /></span>Mute Notification</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#change-chat"><span><i className="bx bx-trash" /></span>Delete Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-pin" /></span>Pin Chat</span>
                                    <span className="dropdown-item"><span><i className="bx bx-check-square" /></span>Mark as Unread</span>
                                    <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#block-user"><span><i className="bx bx-block" /></span>Block</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* / Chats sidebar */}
                  </div>
                  {/* /Sidebar group */}
                  {/* Chat */}
                  <div className="chat chat-messages" id="middle">
                    <div className="h-100">
                      <div className="chat-header">
                        <div className="user-details mb-0">
                          <div className="d-lg-none">
                            <ul className="list-inline mt-2 me-2">
                              <li className="list-inline-item">
                                <a className="text-muted px-0 left_sides" href="javascript:void(0);" data-chat="open">
                                  <i className="fas fa-arrow-left" />
                                </a>
                              </li>
                            </ul>
                          </div>
                          <figure className="avatar mb-0">
                            <img src="assets/img/user/user12.jpg" className="rounded-circle" alt="image" />
                          </figure>
                          <div className="mt-1">
                            <h5>Mark Villiams</h5>
                            <small className="last-seen">
                              Last Seen at 07:15 PM
                            </small>
                          </div>
                        </div>
                        <div className="chat-options ">
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <a href="javascript:void(0)" className="btn btn-outline-light chat-search-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Search">
                                <i className="feather-search" />
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a className="btn btn-outline-light no-bg" href="javascript:void(0);" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a href="index-2.html" className="dropdown-item "><span><i className="bx bx-x" /></span>Close Chat </a>
                                <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><span><i className="bx bx-volume-mute" /></span>Mute Notification</a>
                                <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#disappearing-messages"><span><i className="bx bx-time-five" /></span>Disappearing Message</a>
                                <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#clear-chat"><span><i className="bx bx-brush-alt" /></span>Clear Message</a>
                                <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#change-chat"><span><i className="bx bx-trash" /></span>Delete Chat</a>
                                <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#report-user"><span><i className="bx bx-dislike" /></span>Report</a>
                                <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#block-user"><span><i className="bx bx-block" /></span>Block</a>
                              </div>
                            </li>
                          </ul>
                        </div>
                        {/* Chat Search */}
                        <div className="chat-search">
                          <form>
                            <span className="form-control-feedback"><i className="bx bx-search" /></span>
                            <input type="text" name="chat-search" placeholder="Search Chats" className="form-control" />
                            <div className="close-btn-chat"><i className="feather-x" /></div>
                          </form>
                        </div>
                        {/* /Chat Search */}
                      </div>
                      <div className="chat-body chat-page-group slimscroll">
                        <div className="messages">
                          <div className="chats">
                            <div className="chat-avatar">
                              <img src="assets/img/user/user12.jpg" className="rounded-circle dreams_chat" alt="image" />
                            </div>
                            <div className="chat-content">
                              <div className="chat-profile-name">
                                <h6>Mark Villiams<span>8:16 PM</span><span className="check-star msg-star d-none"><i className="bx bxs-star" /></span></h6>
                                <div className="chat-action-btns ms-2">
                                  <div className="chat-action-col">
                                    <a className="#" href="javascript:void(0);" data-bs-toggle="dropdown">
                                      <i className="fa-solid fa-ellipsis" />    
                                    </a>
                                    <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                      <a href="javascript:void(0);" className="dropdown-item message-info-left"><span><i className="bx bx-info-circle" /></span>Message Info </a>
                                      <a href="javascript:void(0);" className="dropdown-item reply-button"><span><i className="bx bx-share" /></span>Reply</a>
                                      <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-smile" /></span>React</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#forward-message"><span><i className="bx bx-reply" /></span>Forward</a>
                                      <a href="javascript:void(0);" className="dropdown-item click-star"><span><i className="bx bx-star" /></span><span className="star-msg">Star Message</span></a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#report-user"><span><i className="bx bx-dislike" /></span>Report</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-message"><span><i className="bx bx-trash" /></span>Delete</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="message-content">
                                Hello <a href="javascript:void(0);">@Alex</a> Thank you for the beautiful web design ahead schedule.
                              </div>
                            </div>
                          </div>
                          <div className="chat-line">
                            <span className="chat-date">Today, July 24</span>
                          </div>
                          <div className="chats chats-right">
                            <div className="chat-content">
                              <div className="chat-profile-name text-end">
                                <h6>Alex Smith<span>8:16 PM</span><span className="check-star msg-star-one d-none"><i className="bx bxs-star" /></span></h6>
                                <div className="chat-action-btns ms-2">
                                  <div className="chat-action-col">
                                    <a className="#" href="javascript:void(0);" data-bs-toggle="dropdown">
                                      <i className="fa-solid fa-ellipsis" />
                                    </a>
                                    <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                      <a href="javascript:void(0);" className="dropdown-item message-info-left"><span><i className="bx bx-info-circle" /></span>Message Info </a>
                                      <a href="javascript:void(0);" className="dropdown-item reply-button"><span><i className="bx bx-share" /></span>Reply</a>
                                      <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-smile" /></span>React</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#forward-message"><span><i className="bx bx-reply" /></span>Forward</a>
                                      <a href="javascript:void(0);" className="dropdown-item click-star-one"><span><i className="bx bx-star" /></span><span className="star-msg-one">Star Message</span></a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#edit-message"><span><i className="bx bx-edit-alt" /></span>Edit</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-message"><span><i className="bx bx-trash" /></span>Delete</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="message-content ">
                                <div className="chat-voice-group">
                                  <ul>
                                    <li><a href="javascript:void(0);"><span><img src="assets/img/icon/play-01.svg" alt="image" /></span></a></li>
                                    <li><img src="assets/img/icon/voice.svg" className="img-fluid" alt="image" /></li>
                                    <li>0:05</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="chat-avatar">
                              <img src="assets/img/user/user2.jpg" className="rounded-circle dreams_chat" alt="image" />
                            </div>
                          </div>
                          <div className="chats">
                            <div className="chat-avatar">
                              <img src="assets/img/user/user12.jpg" className="rounded-circle dreams_chat" alt="image" />
                            </div>
                            <div className="chat-content">
                              <div className="chat-profile-name">
                                <h6>Mark Villiams<span>8:16 PM</span><span className="check-star msg-star-three d-none"><i className="bx bxs-star" /></span></h6>
                                <div className="chat-action-btns ms-2">
                                  <div className="chat-action-col">
                                    <a className="#" href="javascript:void(0);" data-bs-toggle="dropdown">
                                      <i className="fa-solid fa-ellipsis" />
                                    </a>
                                    <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                      <a href="javascript:void(0);" className="dropdown-item message-info-left"><span><i className="bx bx-info-circle" /></span>Message Info </a>
                                      <a href="javascript:void(0);" className="dropdown-item reply-button"><span><i className="bx bx-share" /></span>Reply</a>
                                      <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-smile" /></span>React</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#forward-message"><span><i className="bx bx-reply" /></span>Forward</a>
                                      <a href="javascript:void(0);" className="dropdown-item click-star-three"><span><i className="bx bx-star" /></span><span className="star-msg-three">Star Message</span></a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#report-user"><span><i className="bx bx-dislike" /></span>Report</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-message"><span><i className="bx bx-trash" /></span>Delete</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="message-content award-link chat-award-link">
                                <a href="javascript:void(0);">https://www.youtube.com/watch?v=GCmL3mS0Psk</a>
                                <img src="assets/img/chat-img-01.jpg" className="img-fluid" alt="img" />										</div>
                            </div>
                          </div>
                          <div className="chats chats-right">
                            <div className="chat-content">
                              <div className="chat-profile-name text-end">
                                <h6>Alex Smith<span>8:16 PM</span><span className="check-star msg-star-one d-none"><i className="bx bxs-star" /></span></h6>
                                <div className="chat-action-btns ms-2">
                                  <div className="chat-action-col">
                                    <a className="#" href="javascript:void(0);" data-bs-toggle="dropdown">
                                      <i className="fa-solid fa-ellipsis" />
                                    </a>
                                    <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                      <a href="javascript:void(0);" className="dropdown-item message-info-left"><span><i className="bx bx-info-circle" /></span>Message Info </a>
                                      <a href="javascript:void(0);" className="dropdown-item reply-button"><span><i className="bx bx-share" /></span>Reply</a>
                                      <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-smile" /></span>React</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#forward-message"><span><i className="bx bx-reply" /></span>Forward</a>
                                      <a href="javascript:void(0);" className="dropdown-item click-star-one"><span><i className="bx bx-star" /></span><span className="star-msg-one">Star Message</span></a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#edit-message"><span><i className="bx bx-edit-alt" /></span>Edit</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-message"><span><i className="bx bx-trash" /></span>Delete</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="message-content ">
                                Thankyou for the notes sir. Will you send me the location where I could bought?
                              </div>
                            </div>
                            <div className="chat-avatar">
                              <img src="assets/img/user/user2.jpg" className="rounded-circle dreams_chat" alt="image" />
                            </div>
                          </div>
                          <div className="chats">
                            <div className="chat-avatar">
                              <img src="assets/img/user/user12.jpg" className="rounded-circle dreams_chat" alt="image" />
                            </div>
                            <div className="chat-content">
                              <div className="chat-profile-name">
                                <h6>Mark Villiams<span>8:16 PM</span><span className="check-star msg-star-five d-none"><i className="bx bxs-star" /></span></h6>
                                <div className="chat-action-btns ms-2">
                                  <div className="chat-action-col">
                                    <a className="#" href="javascript:void(0);" data-bs-toggle="dropdown">
                                      <i className="fa-solid fa-ellipsis" />
                                    </a>
                                    <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                      <a href="javascript:void(0);" className="dropdown-item message-info-left"><span><i className="bx bx-info-circle" /></span>Message Info </a>
                                      <a href="javascript:void(0);" className="dropdown-item reply-button"><span><i className="bx bx-share" /></span>Reply</a>
                                      <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-smile" /></span>React</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#forward-message"><span><i className="bx bx-reply" /></span>Forward</a>
                                      <a href="javascript:void(0);" className="dropdown-item click-star-five"><span><i className="bx bx-star" /></span><span className="star-msg-five">Star Message</span></a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#report-user"><span><i className="bx bx-dislike" /></span>Report</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-message"><span><i className="bx bx-trash" /></span>Delete</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="message-content">
                                <div className="location-sharing">
                                  <div className="sharing-location-icon">
                                    <i className="fa-solid fa-location-dot" />
                                  </div>
                                  <h6>My Location <a href="#">Download</a></h6>
                                </div>
                              </div>
                              <div className="like-chat-grp">
                                <ul>
                                  <li className="like-chat"><a href="javascript:void(0);">2<img src="assets/img/icon/like.svg" alt="Icon" /></a></li>
                                  <li className="comment-chat"><a href="javascript:void(0);">2<img src="assets/img/icon/heart.svg" alt="Icon" /></a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="chats">
                            <div className="chat-avatar">
                              <img src="assets/img/user/user12.jpg" className="rounded-circle dreams_chat" alt="image" />
                            </div>
                            <div className="chat-content">
                              <div className="chat-profile-name">
                                <h6>Mark Villiams<span>8:16 PM</span><span className="check-star msg-star d-none"><i className="bx bxs-star" /></span></h6>
                                <div className="chat-action-btns ms-2">
                                  <div className="chat-action-col">
                                    <a className="#" href="javascript:void(0);" data-bs-toggle="dropdown">
                                      <i className="fa-solid fa-ellipsis" />
                                    </a>
                                    <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                      <a href="javascript:void(0);" className="dropdown-item message-info-left"><span><i className="bx bx-info-circle" /></span>Message Info </a>
                                      <a href="javascript:void(0);" className="dropdown-item reply-button"><span><i className="bx bx-share" /></span>Reply</a>
                                      <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-smile" /></span>React</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#forward-message"><span><i className="bx bx-reply" /></span>Forward</a>
                                      <a href="javascript:void(0);" className="dropdown-item click-star"><span><i className="bx bx-star" /></span><span className="star-msg">Star Message</span></a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#report-user"><span><i className="bx bx-edit-alt" /></span>Report</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-message"><span><i className="bx bx-trash" /></span>Delete</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="message-content reply-getcontent">
                                Thank you for your support
                              </div>
                            </div>                                    
                          </div>
                        </div>                      
                      </div>
                    </div>
                    <div className="chat-footer">
                      <form>
                        <div className="smile-foot">
                          <div className="chat-action-btns">
                            <div className="chat-action-col">
                              <a className="action-circle" href="javascript:void(0);" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a href="javascript:void(0);" className="dropdown-item "><span><i className="bx bx-file" /></span>Document</a>
                                <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-camera" /></span>Camera</a>
                                <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-image" /></span>Gallery</a>
                                <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-volume-full" /></span>Audio</a>
                                <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-map" /></span>Location</a>
                                <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-user-pin" /></span>Contact</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="smile-foot emoj-action-foot">
                          <a href="javascript:void(0);" className="action-circle"><i className="bx bx-smile" /></a>
                        </div>
                        <div className="smile-foot">
                          <a href="javascript:void(0);" className="action-circle"><i className="bx bx-microphone-off" /></a>
                        </div>
                        <div className="replay-forms">
                          <div className="chats forward-chat-msg reply-div d-none">
                            <div className="contact-close_call text-end">
                              <a href="javascript:void(0);" className="close-replay">
                                <i className="bx bx-x" />
                              </a>
                            </div>
                            <div className="chat-avatar">
                              <img src="assets/img/user/user3.jpg" className="rounded-circle dreams_chat" alt="image" />
                            </div>
                            <div className="chat-content">
                              <div className="chat-profile-name">
                                <h6>Mark Villiams<span>8:16 PM</span></h6>
                                <div className="chat-action-btns ms-2">
                                  <div className="chat-action-col">
                                    <a className="#" href="javascript:void(0);" data-bs-toggle="dropdown">
                                      <i className="fa-solid fa-ellipsis" />
                                    </a>
                                    <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                      <a href="javascript:void(0);" className="dropdown-item message-info-left"><span><i className="bx bx-info-circle" /></span>Message Info </a>
                                      <a href="javascript:void(0);" className="dropdown-item reply-button"><span><i className="bx bx-share" /></span>Reply</a>
                                      <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-smile" /></span>React</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#forward-message"><span><i className="bx bx-reply" /></span>Forward</a>
                                      <a href="javascript:void(0);" className="dropdown-item"><span><i className="bx bx-star" /></span>Star Message</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#report-user"><span><i className="bx bx-dislike" /></span>Report</a>
                                      <a href="javascript:void(0);" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-message"><span><i className="bx bx-trash" /></span>Delete</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="message-content reply-content">
                              </div>
                            </div>
                          </div>
                          <input type="text" className="form-control chat_form" placeholder="Type your message here..." />
                        </div>
                        <div className="form-buttons">
                          <button className="btn send-btn" type="submit">
                            <i className="bx bx-paper-plane" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* /Chat */}
                </div>
              </div>
            </div>
          </div>
        </div>	
        {/* Student Profile */}
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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat mauris Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat mauris</p>
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
                <li><a href="student-profile.html">Profile</a></li>
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
                  <p> 3556  Beech Street, San Francisco,<br /> California, CA 94108 </p>
                </div>
                <p>
                  <img src="assets/img/icon/icon-19.svg" alt="Img" className="img-fluid" />
                  <a href="https://dreamslms.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="46223423272b352a2b3506233e272b362a236825292b">[email&nbsp;protected]</a>
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

export default Chat
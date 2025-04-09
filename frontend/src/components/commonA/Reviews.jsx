import React from "react";
import Sidebar from "../Sidebar";

function Reviews() {
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
                    <img
                      src="assets/img/logo.svg"
                      className="img-fluid"
                      alt="Logo"
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
                          <a href="Cours">Enrolled Courses</a>
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

                    <li className="has-submenu active">
                      <a href="#">
                        Admin <i className="fas fa-chevron-down" />
                      </a>
                      <ul className="submenu first-submenu">
                        <li className="active">
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

                    <li className="has-submenu ">
                      <a href="#">
                        teacher <i className="fas fa-chevron-down" />
                      </a>
                      <ul className="submenu first-submenu">
                        <li className="active">
                          <a href="Dashboard">teacher Dashboard</a>
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
                        <div className="avatar avatar-sm">
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
                      <a className="dropdown-item" href="Dashboard">
                        <i className="feather-home me-1" /> Dashboard
                      </a>
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
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h2 className="breadcrumb-title">Reviews</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Reviews
                      </li>
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
              <Sidebar/>
              {/* /Sidebar */}
              {/* Student Profile */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>Reviews</h3>
                    </div>
                    <div className="checkout-form">
                      {/* Review */}
                      <div className="review-wrap">
                        <div className="review-user-info">
                          <div className="reviewer">
                            <div className="review-img">
                              <a href="javascript:void(0);">
                                <img
                                  src="assets/img/user/user16.jpg"
                                  alt="img"
                                />
                              </a>
                            </div>
                            <div className="reviewer-info">
                              <h6>
                                <a href="javascript:void(0);">Ronald Richard</a>
                              </h6>
                              <p>6 months ago</p>
                            </div>
                          </div>
                          <div className="reviewer-rating">
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                          </div>
                        </div>
                        <div className="review-content">
                          <p>
                            This is the second Photoshop course I have completed
                            with Cristian. Worth every penny and recommend it
                            highly. To get the most out of this course, its best
                            to to take the Beginner to Advanced course first.
                            The sound and video quality is of a good standard.
                            Thank you Cristian.
                          </p>
                          <div className="review-action">
                            <a href="javascript:void(0);">Edit</a>
                            <a href="javascript:void(0);">Delete</a>
                          </div>
                        </div>
                      </div>
                      {/* /Review */}
                      {/* Review */}
                      <div className="review-wrap">
                        <div className="review-user-info">
                          <div className="reviewer">
                            <div className="review-img">
                              <a href="javascript:void(0);">
                                <img
                                  src="assets/img/user/user16.jpg"
                                  alt="img"
                                />
                              </a>
                            </div>
                            <div className="reviewer-info">
                              <h6>
                                <a href="javascript:void(0);">Ronald Richard</a>
                              </h6>
                              <p>8 months ago</p>
                            </div>
                          </div>
                          <div className="reviewer-rating">
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star" />
                          </div>
                        </div>
                        <div className="review-content">
                          <p>
                            I've been using this LMS for several months for my
                            online courses, and it's been a game-changer. The
                            interface is incredibly user-friendly, making it
                            easy for both instructors and students to navigate
                            through the courses. The variety of tools available
                            for creating interactive and engaging content has
                            significantly enhanced the learning experience.
                          </p>
                          <div className="review-action">
                            <a href="javascript:void(0);">Edit</a>
                            <a href="javascript:void(0);">Delete</a>
                          </div>
                        </div>
                      </div>
                      {/* /Review */}
                      {/* Review */}
                      <div className="review-wrap">
                        <div className="review-user-info">
                          <div className="reviewer">
                            <div className="review-img">
                              <a href="javascript:void(0);">
                                <img
                                  src="assets/img/user/user16.jpg"
                                  alt="img"
                                />
                              </a>
                            </div>
                            <div className="reviewer-info">
                              <h6>
                                <a href="javascript:void(0);">Ronald Richard</a>
                              </h6>
                              <p>9 months ago</p>
                            </div>
                          </div>
                          <div className="reviewer-rating">
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star" />
                          </div>
                        </div>
                        <div className="review-content">
                          <p>
                            Any time I've had a question or encountered a minor
                            issue, the customer support team has been quick to
                            respond and incredibly helpful. Moreover, the
                            reliability of this LMS has impressed me—downtime is
                            nearly non-existent, ensuring that students have
                            access to their courses 24/7.
                          </p>
                          <div className="review-action">
                            <a href="javascript:void(0);">Edit</a>
                            <a href="javascript:void(0);">Delete</a>
                          </div>
                        </div>
                      </div>
                      {/* /Review */}
                      {/* Review */}
                      <div className="review-wrap">
                        <div className="review-user-info">
                          <div className="reviewer">
                            <div className="review-img">
                              <a href="javascript:void(0);">
                                <img
                                  src="assets/img/user/user16.jpg"
                                  alt="img"
                                />
                              </a>
                            </div>
                            <div className="reviewer-info">
                              <h6>
                                <a href="javascript:void(0);">Ronald Richard</a>
                              </h6>
                              <p>1 year ago</p>
                            </div>
                          </div>
                          <div className="reviewer-rating">
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star filled" />
                            <i className="fa-solid fa-star" />
                          </div>
                        </div>
                        <div className="review-content">
                          <p>
                            From the onset, my experience with this LMS Website
                            has been nothing short of extraordinary. As a
                            learner who has navigated through various online
                            platforms, the sophistication and user-centric
                            design of this website set a new benchmark for what
                            digital education should look like.
                          </p>
                          <div className="review-action">
                            <a href="javascript:void(0);">Edit</a>
                            <a href="javascript:void(0);">Delete</a>
                          </div>
                        </div>
                      </div>
                      {/* /Review */}
                    </div>
                  </div>
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
                          <a href="#">
                            <i className="bx bx-chevron-right" />
                          </a>
                        </li>
                      </ul>
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
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut consequat mauris Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Ut consequat mauris
                      </p>
                    </div>
                  </div>
                  {/* /Footer Widget */}
                </div>
                <div className="col-lg-2 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-menu">
                    <h2 className="footer-title">For Instructor</h2>
                    <ul>
                      <li>
                        <a href="instructor-profile.html">Profile</a>
                      </li>
                      <li>
                        <a href="login.html">Login</a>
                      </li>
                      <li>
                        <a href="register.html">Register</a>
                      </li>
                      <li>
                        <a href="instructor-list.html">Instructor</a>
                      </li>
                      <li>
                        <a href="instructor-dashboard.html"> Dashboard</a>
                      </li>
                    </ul>
                  </div>
                  {/* /Footer Widget */}
                </div>
                <div className="col-lg-2 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-menu">
                    <h2 className="footer-title">For Student</h2>
                    <ul>
                      <li>
                        <a href="Profile">Profile</a>
                      </li>
                      <li>
                        <a href="login.html">Login</a>
                      </li>
                      <li>
                        <a href="register.html">Register</a>
                      </li>
                      <li>
                        <a href="students-list.html">Student</a>
                      </li>
                      <li>
                        <a href="Dashboard"> Dashboard</a>
                      </li>
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
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your email address"
                          name="email"
                        />
                      </form>
                    </div>
                    <div className="footer-contact-info">
                      <div className="footer-address">
                        <img
                          src="assets/img/icon/icon-20.svg"
                          alt="Img"
                          className="img-fluid"
                        />
                        <p>
                          {" "}
                          3556 Beech Street, San Francisco,
                          <br /> California, CA 94108{" "}
                        </p>
                      </div>
                      <p>
                        <img
                          src="assets/img/icon/icon-19.svg"
                          alt="Img"
                          className="img-fluid"
                        />
                        <a
                          href="https://dreamslms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                          className="__cf_email__"
                          data-cfemail="9afee8fffbf7e9f6f7e9daffe2fbf7eaf6ffb4f9f5f7"
                        >
                          [email&nbsp;protected]
                        </a>
                      </p>
                      <p className="mb-0">
                        <img
                          src="assets/img/icon/icon-21.svg"
                          alt="Img"
                          className="img-fluid"
                        />
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
                        <li>
                          <a href="term-condition.html">Terms</a>
                        </li>
                        <li>
                          <a href="privacy-policy.html">Privacy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="copyright-text">
                      <p className="mb-0">
                        © 2024 DreamsLMS. All rights reserved.
                      </p>
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
  );
}

export default Reviews;

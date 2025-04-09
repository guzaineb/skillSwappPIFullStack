import React from 'react'
import { useAuthStore } from "../../store/authStore";
import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";

export default function updateProfile() {
    const { user, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
  
    // Handle file input change
    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        // Call updateProfile with the new image
        await updateProfile({ profilePic: base64Image });
      };
    };
  
    // Handle image delete (reset to default or remove)
    const handleDeleteImage = () => {
      setSelectedImg(null);
      updateProfile({ profilePic: null }); // You can reset the profile picture to null here or do additional backend logic.
    };
  
      
  return (
    <>

<div className="main-wrapper">
  {/* Header */}
  <header className="header header-page">
    <div className="header-fixed">
      <nav className="navbar navbar-expand-lg header-nav scroll-sticky">
        <div className="container ">
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
              <li className="has-submenu active">
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
                  <li className="active"><a href="instructor-settings.html">Settings</a></li>
                </ul>
              </li>	
              <li className="has-submenu">
                <a href="#">Student <i className="fas fa-chevron-down" /></a>
                <ul className="submenu first-submenu">
                  <li className="has-submenu ">
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
                  <img src="assets/img/user/user-17.jpg" alt="Img" />
                  <span className="status online" />
                </span>
              </a>
              <div className="users dropdown-menu dropdown-menu-right" data-popper-placement="bottom-end">
                <div className="user-header">
                  <div className="avatar avatar-sm">
                    <img src="assets/img/user/user-17.jpg" alt="User Image" className="avatar-img rounded-circle" />
                  </div>
                  <div className="user-text">
                    <h6>Eugene Andre</h6>
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
  {/* /Header */}
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
                  <a href="instructor-profile.html"><img src="assets/img/user/user-17.jpg" alt="Img" /></a>
                </div>
              </div>
              <div className="profile-group">
                <div className="profile-name text-center">
                  <h4><a href="instructor-profile.html">Eugene Andre</a></h4>
                  <p>Instructor</p>
                  <a href="add-course.html" className="add-course btn-primary">Add New Course</a>
                </div>
              </div>
            </div>
          </div>
          <div className="settings-widget account-settings">
            <div className="settings-menu">
              <h3>Dashboard</h3>
              <ul>
                <li className="nav-item">
                  <a href="instructor-dashboard.html" className="nav-link">
                    <i className="bx bxs-tachometer" />Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-profile.html" className="nav-link">
                    <i className="bx bxs-user" />My Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-enrolled-course.html" className="nav-link">
                    <i className="bx bxs-graduation" />Enrolled Courses
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-wishlist.html" className="nav-link">
                    <i className="bx bxs-heart" />Wishlist
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-reviews.html" className="nav-link">
                    <i className="bx bxs-star" />Reviews
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-quiz.html" className="nav-link">
                    <i className="bx bxs-shapes" />My Quiz Attempts
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-orders.html" className="nav-link">
                    <i className="bx bxs-cart" />Order History
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-qa.html" className="nav-link">
                    <i className="bx bxs-bookmark-alt" />Question &amp; Answer
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-referral.html" className="nav-link">
                    <i className="bx bxs-user-plus" />Referrals
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-chat.html" className="nav-link">
                    <i className="bx bxs-chat" />Messages
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-notifications.html" className="nav-link">
                    <i className="bx bxs-bell" />Notifications
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-tickets.html" className="nav-link">
                    <i className="bx bxs-coupon" />Support Tickets
                  </a>
                </li>
              </ul>
              <h3>Instructor</h3>
              <ul>
                <li className="nav-item">
                  <a href="instructor-course.html" className="nav-link ">
                    <i className="bx bxs-rocket" />My Courses
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-announcements.html" className="nav-link">
                    <i className="bx bxs-volume-full" />Announcements
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-withdraw.html" className="nav-link ">
                    <i className="bx bxs-wallet" />Withdrawls
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-quiz-attempts.html" className="nav-link">
                    <i className="bx bxs-shapes" />Quiz Attempts
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-assignment.html" className="nav-link ">
                    <i className="bx bxs-file" />Assignments
                  </a>
                </li>
                <li className="nav-item">
                  <a href="instructor-earnings.html" className="nav-link">
                    <i className="bx bxs-badge-dollar" />Earnings
                  </a>
                </li>
              </ul>
              <h3>Account Settings</h3>
              <ul>
                <li className="nav-item active">
                  <a href="instructor-settings.html" className="nav-link ">
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
        {/* Instructor Settings */}
        <div className="col-xl-9 col-lg-9">	
          <div className="settings-widget card-details">
            <div className="settings-menu p-0">
              <div className="profile-heading">
                <h3>Settings</h3>
                <p>You have full control to manage your own account settings</p>
              </div>
              <div className="settings-page-head">
                <ul className="settings-pg-links">
                  <li><a href="instructor-settings.html" className="active"><i className="bx bx-edit" />Edit Profile</a></li>
                  <li><a href="instructor-change-password.html"><i className="bx bx-lock" />Change Password</a></li>
                  <li><a href="instructor-setting-notifications.html"><i className="bx bx-bell" />Notifications</a></li>
                  <li><a href="instructor-setting-withdraw.html"><i className="bx bx-wallet-alt" />Withdraw</a></li>
                  <li><a href="instructor-delete-account.html"><i className="bx bx-error-alt" />Delete Account</a></li>
                </ul>
              </div>



              <form action="https://dreamslms.dreamstechnologies.com/html/instructor-settings.html">
                <div className="course-group profile-upload-group mb-0 d-flex">									
                  <div className="course-group-img profile-edit-field d-flex align-items-center">
                    <a href="student-profile.html" className="profile-pic"><img src="assets/img/user/user-17.jpg" alt="Img" className="img-fluid" /></a>
                    <div className="profile-upload-head">
                      <h4><a href="instructor-profile.html">Your avatar</a></h4>
                      <p>PNG or JPG no bigger than 800px width and height</p>
                      <div className="new-employee-field">
                        <div className="d-flex align-items-center mt-2">
                          <div className="image-upload mb-0">
                            <input type="file" />
                            <div className="image-uploads">
                              <i className="bx bx-cloud-upload" />
                            </div>
                          </div>
                          <div className="img-delete">
                            <a href="#" className="delete-icon"><i className="bx bx-trash" /></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>											
                </div>
                <div className="checkout-form settings-wrap">
                  <div className="edit-profile-info">
                    <h5>Personal Details</h5>
                    <p>Edit your personal information</p>
                  </div>
                  <div className="row">
                 
                    <div className="col-md-6">
                      <div className="input-block">
                        <label className="form-label"> Name</label>
                        <input type="text" className="form-control" defaultValue={user?.name} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" defaultValue={user?.email} />
                        </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block">
                        <label className="form-label">Phone Number</label>
                        <input type="text" className="form-control" defaultValue={user?.phone} />
                      </div>
                    </div>
                   
                    <div className="col-md-12">
                      <button className="btn btn-primary" type="submit">Update Profile</button>
                    </div>
                  </div>
                </div>
              </form>								
            </div>
          </div>
        </div>	
        {/* /Instructor Settings */}
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
                  <a href="https://dreamslms.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="fa9e889f9b9789969789ba9f829b978a969fd4999597">[email&nbsp;protected]</a>
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

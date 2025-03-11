import React from 'react'
import Header from './Header'

function DashboardUser() {
  return (
    <>
    <Header></Header>
<div className="main-wrapper">
  {/* /Header */}
  {/* Breadcrumb */}
  <div className="breadcrumb-bar breadcrumb-bar-info">
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-12">
          <div className="breadcrumb-list">
            <h2 className="breadcrumb-title">My Courses</h2>
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">My Courses</li>
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
                <li className="nav-item active">
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
                <li className="nav-item">
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
        {/* Instructor Courses */}
        <div className="col-xl-9 col-lg-9">
          <div className="settings-widget card-info">
            <div className="settings-menu p-0">
              <div className="profile-heading">
                <h3>My Courses</h3>
                <p>Manage your courses and its updates</p>
              </div>
              <div className="checkout-form pb-0">
                <div className="wishlist-tab">
                  <ul className="nav">
                    <li className="nav-item">
                      <a href="javascript:void(0);" className="active" data-bs-toggle="tab" data-bs-target="#enroll-courses">Publish (6)</a>
                    </li>
                    <li className="nav-item">
                      <a href="javascript:void(0);" data-bs-toggle="tab" data-bs-target="#active-courses">Pending (2)</a>
                    </li>
                    <li className="nav-item">
                      <a href="javascript:void(0);" data-bs-toggle="tab" data-bs-target="#complete-courses">Draft (1)</a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="enroll-courses">
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
                              <h3 className="title instructor-text"><a href="course-details.html">Wordpress for
                                  Beginners - Master Wordpress Quickly</a></h3>
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
                              <div className="course-edit-btn d-flex align-items-center justify-content-between">
                                <a href="#"><i className="bx bx-edit me-2" />Edit</a>
                                <a href="#"><i className="bx bx-trash me-2" />Delete</a>
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
                              <h3 className="title instructor-text"><a href="course-details.html">Sketch from A to Z
                                  (2024): Become an app designer</a></h3>
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
                              <div className="course-edit-btn d-flex align-items-center justify-content-between">
                                <a href="#"><i className="bx bx-edit me-2" />Edit</a>
                                <a href="#"><i className="bx bx-trash me-2" />Delete</a>
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
                              <h3 className="title instructor-text"><a href="course-details.html">Learn Angular
                                  Fundamentals From beginning to advance lavel</a>
                              </h3>
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
                              <div className="course-edit-btn d-flex align-items-center justify-content-between">
                                <a href="#"><i className="bx bx-edit me-2" />Edit</a>
                                <a href="#"><i className="bx bx-trash me-2" />Delete</a>
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
                              <h3 className="title instructor-text"><a href="course-details.html">Build Responsive Real
                                  World Websites with Crash Course</a></h3>
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
                              <div className="course-edit-btn d-flex align-items-center justify-content-between">
                                <a href="#"><i className="bx bx-edit me-2" />Edit</a>
                                <a href="#"><i className="bx bx-trash me-2" />Delete</a>
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
                              <h3 className="title instructor-text"><a href="course-details.html">Learn JavaScript and
                                  Express to become a Expert</a></h3>
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
                              <div className="course-edit-btn d-flex align-items-center justify-content-between">
                                <a href="#"><i className="bx bx-edit me-2" />Edit</a>
                                <a href="#"><i className="bx bx-trash me-2" />Delete</a>
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
                              <h3 className="title instructor-text"><a href="course-details.html">Introduction to
                                  Programming- Python &amp; Java</a></h3>
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
                              <div className="course-edit-btn d-flex align-items-center justify-content-between">
                                <a href="#"><i className="bx bx-edit me-2" />Edit</a>
                                <a href="#"><i className="bx bx-trash me-2" />Delete</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /Course Grid */}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="active-courses">
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
                              <h3 className="title instructor-text"><a href="course-details.html">Wordpress for
                                  Beginners - Master Wordpress Quickly</a></h3>
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
                              <div className="course-edit-btn d-flex align-items-center justify-content-between">
                                <a href="#"><i className="bx bx-edit me-2" />Edit</a>
                                <a href="#"><i className="bx bx-trash me-2" />Delete</a>
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
                              <h3 className="title instructor-text"><a href="course-details.html">Sketch from A to Z
                                  (2024): Become an app designer</a></h3>
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
                              <div className="course-edit-btn d-flex align-items-center justify-content-between">
                                <a href="#"><i className="bx bx-edit me-2" />Edit</a>
                                <a href="#"><i className="bx bx-trash me-2" />Delete</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /Course Grid */}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="complete-courses">
                    <div className="row">
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
                              <h3 className="title instructor-text"><a href="course-details.html">Learn Angular
                                  Fundamentals From beginning to advance lavel</a>
                              </h3>
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
                              <div className="course-edit-btn d-flex align-items-center justify-content-between">
                                <a href="#"><i className="bx bx-edit me-2" />Edit</a>
                                <a href="#"><i className="bx bx-trash me-2" />Delete</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /Course Grid */}
                    </div>
                  </div>
                </div>
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
                    <a href="#"><i className="bx bx-chevron-right" /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* /Instructor Courses */}
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
                  <p> 3556 Beech Street, San Francisco,<br /> California, CA 94108 </p>
                </div>
                <p>
                  <img src="assets/img/icon/icon-19.svg" alt="Img" className="img-fluid" />
                  <a href="https://dreamslms.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="7b1f091e1a16081716083b1e031a160b171e55181416">[email&nbsp;protected]</a>
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

export default DashboardUser
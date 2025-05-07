import React from "react";


function OrderHistory() {
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
    
        {/* /Header */}
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h2 className="breadcrumb-title">Order History</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Order History
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
            
              {/* /Sidebar */}
              {/* Student Order History */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>Order History</h3>
                    </div>
                    <div className="checkout-form">
                      {/* Order Tabs */}
                      <div className="wishlist-tab order-tab">
                        <ul className="nav">
                          <li className="nav-item">
                            <a
                              href="javascript:void(0);"
                              className="active"
                              data-bs-toggle="tab"
                              data-bs-target="#today"
                            >
                              Today
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="javascript:void(0);"
                              data-bs-toggle="tab"
                              data-bs-target="#month"
                            >
                              Monthly
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="javascript:void(0);"
                              data-bs-toggle="tab"
                              data-bs-target="#year"
                            >
                              Yearly
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* /Order Tabs */}
                      {/* Tab Content */}
                      <div className="tab-content">
                        {/* Today */}
                        <div className="tab-pane show active" id="today">
                          <div className="table-responsive custom-table">
                            <table className="table table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>Order ID</th>
                                  <th>Course Name</th>
                                  <th>Date</th>
                                  <th>Price</th>
                                  <th>Status</th>
                                  <th />
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>#2643</td>
                                  <td>
                                    <span className="title-course">
                                      Build Responsive Real World Websites with
                                      HTML5 and CSS3
                                    </span>
                                  </td>
                                  <td>March 24, 2024</td>
                                  <td>$34</td>
                                  <td>On Hold</td>
                                  <td>
                                    <a
                                      href="javascript:void(0);"
                                      className="action-icon"
                                    >
                                      <i className="bx bxs-download" />
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>#2644</td>
                                  <td>
                                    <span className="title-course">
                                      Sketch from A to Z (2024): Become an app
                                      designer
                                    </span>
                                  </td>
                                  <td>March 26, 2024</td>
                                  <td>$40</td>
                                  <td>On Hold</td>
                                  <td>
                                    <a
                                      href="javascript:void(0);"
                                      className="action-icon"
                                    >
                                      <i className="bx bxs-download" />
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>#2645</td>
                                  <td>
                                    <span className="title-course">
                                      Learn Angular Fundamentals Beginners Guide
                                    </span>
                                  </td>
                                  <td>April 12, 2024</td>
                                  <td>$25</td>
                                  <td>Completed</td>
                                  <td>
                                    <a
                                      href="javascript:void(0);"
                                      className="action-icon"
                                    >
                                      <i className="bx bxs-download" />
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>#2646</td>
                                  <td>
                                    <span className="title-course">
                                      Build Responsive Real World Websites with
                                      HTML5 and CSS3
                                    </span>
                                  </td>
                                  <td>April 16, 2024</td>
                                  <td>$35</td>
                                  <td>On Hold</td>
                                  <td>
                                    <a
                                      href="javascript:void(0);"
                                      className="action-icon"
                                    >
                                      <i className="bx bxs-download" />
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* /Today */}
                        {/* Month */}
                        <div className="tab-pane fade" id="month">
                          <div className="table-responsive custom-table">
                            <table className="table table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>Order ID</th>
                                  <th>Course Name</th>
                                  <th>Date</th>
                                  <th>Price</th>
                                  <th>Status</th>
                                  <th />
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>#2643</td>
                                  <td>
                                    <span className="title-course">
                                      Build Responsive Real World Websites with
                                      HTML5 and CSS3
                                    </span>
                                  </td>
                                  <td>March 24, 2024</td>
                                  <td>$34</td>
                                  <td>On Hold</td>
                                  <td>
                                    <a
                                      href="javascript:void(0);"
                                      className="action-icon"
                                    >
                                      <i className="bx bxs-download" />
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>#2644</td>
                                  <td>
                                    <span className="title-course">
                                      Sketch from A to Z (2024): Become an app
                                      designer
                                    </span>
                                  </td>
                                  <td>March 26, 2024</td>
                                  <td>$40</td>
                                  <td>On Hold</td>
                                  <td>
                                    <a
                                      href="javascript:void(0);"
                                      className="action-icon"
                                    >
                                      <i className="bx bxs-download" />
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* /Month */}
                        {/* Yearly */}
                        <div className="tab-pane fade" id="year">
                          <div className="table-responsive custom-table">
                            <table className="table table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>Order ID</th>
                                  <th>Course Name</th>
                                  <th>Date</th>
                                  <th>Price</th>
                                  <th>Status</th>
                                  <th />
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>#2643</td>
                                  <td>
                                    <span className="title-course">
                                      Build Responsive Real World Websites with
                                      HTML5 and CSS3
                                    </span>
                                  </td>
                                  <td>March 24, 2024</td>
                                  <td>$34</td>
                                  <td>On Hold</td>
                                  <td>
                                    <a
                                      href="javascript:void(0);"
                                      className="action-icon"
                                    >
                                      <i className="bx bxs-download" />
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>#2644</td>
                                  <td>
                                    <span className="title-course">
                                      Sketch from A to Z (2024): Become an app
                                      designer
                                    </span>
                                  </td>
                                  <td>March 26, 2024</td>
                                  <td>$40</td>
                                  <td>On Hold</td>
                                  <td>
                                    <a
                                      href="javascript:void(0);"
                                      className="action-icon"
                                    >
                                      <i className="bx bxs-download" />
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>#2645</td>
                                  <td>
                                    <span className="title-course">
                                      Learn Angular Fundamentals Beginners Guide
                                    </span>
                                  </td>
                                  <td>April 12, 2024</td>
                                  <td>$25</td>
                                  <td>Completed</td>
                                  <td>
                                    <a
                                      href="javascript:void(0);"
                                      className="action-icon"
                                    >
                                      <i className="bx bxs-download" />
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>#2646</td>
                                  <td>
                                    <span className="title-course">
                                      Build Responsive Real World Websites with
                                      HTML5 and CSS3
                                    </span>
                                  </td>
                                  <td>April 16, 2024</td>
                                  <td>$35</td>
                                  <td>On Hold</td>
                                  <td>
                                    <a
                                      href="javascript:void(0);"
                                      className="action-icon"
                                    >
                                      <i className="bx bxs-download" />
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* /Yearly */}
                      </div>
                      {/* /Tab Content */}
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
              {/* /Student Order History */}
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
                        <a href="student-profile.html">Profile</a>
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
                        <a href="student-dashboard.html"> Dashboard</a>
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
                          data-cfemail="57332532363a243b3a2417322f363a273b327934383a"
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

export default OrderHistory;

import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

function Notification() {
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
       <Header />
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
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        notifications
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
             <Sidebar />
              {/* /Sidebar */}
              {/* Student Settings */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>Settings</h3>
                      <p>
                        You have full control to manage your own account
                        settings
                      </p>
                    </div>
                    <div className="settings-page-head">
                      <ul className="settings-pg-links">
                        <li>
                          <a href="Settings">
                            <i className="bx bx-edit" />
                            Edit Profile
                          </a>
                        </li>
                       
                        <li>
                          <a href="LinkedAccounts">
                            <i className="bx bx-link" />
                            Linked Accounts
                          </a>
                        </li>
                        <li>
                          <a href="Notifications" className="active">
                            <i className="bx bx-bell" />
                            Notifications
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="checkout-form settings-wrap">
                      <h5>Choose when and how to be notified</h5>
                      <ul className="settings-noti-lists">
                        <li>
                          <div className="notification-title">
                            <h6>Subscriptions</h6>
                            <p>
                              Notify me about activity from profile I’m
                              subscribe to
                            </p>
                          </div>
                          <div className="status-toggle modal-status">
                            <input
                              type="checkbox"
                              id="user1"
                              className="check"
                              defaultChecked
                            />
                            <label htmlFor="user1" className="checktoggle">
                              {" "}
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="notification-title">
                            <h6>Recommended Courses</h6>
                            <p>Notify me about courses that suits for me</p>
                          </div>
                          <div className="status-toggle modal-status">
                            <input
                              type="checkbox"
                              id="user2"
                              className="check"
                              defaultChecked
                            />
                            <label htmlFor="user2" className="checktoggle">
                              {" "}
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="notification-title">
                            <h6>Reply to my comments</h6>
                            <p>Notify me about replies for my comments</p>
                          </div>
                          <div className="status-toggle modal-status">
                            <input
                              type="checkbox"
                              id="user3"
                              className="check"
                              defaultChecked
                            />
                            <label htmlFor="user3" className="checktoggle">
                              {" "}
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="notification-title">
                            <h6>Activity on my comments</h6>
                            <p>Notify me about replies for my comments</p>
                          </div>
                          <div className="status-toggle modal-status">
                            <input
                              type="checkbox"
                              id="user4"
                              className="check"
                            />
                            <label htmlFor="user4" className="checktoggle">
                              {" "}
                            </label>
                          </div>
                        </li>
                      </ul>
                      <h5>Email Notifications</h5>
                      <ul className="settings-noti-lists email-noti-lists">
                        <li>
                          <div className="notification-title">
                            <h6>Subscriptions</h6>
                            <p>
                              Notify me about activity from profile I’m
                              subscribe to
                            </p>
                          </div>
                          <div className="status-toggle modal-status">
                            <input
                              type="checkbox"
                              id="user5"
                              className="check"
                              defaultChecked
                            />
                            <label htmlFor="user5" className="checktoggle">
                              {" "}
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="notification-title">
                            <h6>Recommended Courses</h6>
                            <p>Notify me about courses that suits for me</p>
                          </div>
                          <div className="status-toggle modal-status">
                            <input
                              type="checkbox"
                              id="user6"
                              className="check"
                              defaultChecked
                            />
                            <label htmlFor="user6" className="checktoggle">
                              {" "}
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="notification-title">
                            <h6>Reply to my comments</h6>
                            <p>Notify me about replies for my comments</p>
                          </div>
                          <div className="status-toggle modal-status">
                            <input
                              type="checkbox"
                              id="user7"
                              className="check"
                              defaultChecked
                            />
                            <label htmlFor="user7" className="checktoggle">
                              {" "}
                            </label>
                          </div>
                        </li>
                      </ul>
                      <a href="#" className="btn btn-primary">
                        Save Changes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Student Settings */}
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
                          data-cfemail="dbbfa9bebab6a8b7b6a89bbea3bab6abb7bef5b8b4b6"
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

export default Notification;

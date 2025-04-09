import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

function Referral() {
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
                  <h2 className="breadcrumb-title">Referrals</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Referrals
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
              {/* Student Referral */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>Referrals</h3>
                    </div>
                    <div className="checkout-form pb-0">
                      <div className="row">
                        <div className="col-xl-3 col-sm-6">
                          <div className="card refer-card">
                            <div className="card-body">
                              <h6>Net Earnings</h6>
                              <h3>$12,000</h3>
                              <p>Earning this month</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                          <div className="card refer-card">
                            <div className="card-body">
                              <h6>Balance</h6>
                              <h3>$15,000</h3>
                              <p>In the Wallet</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                          <div className="card refer-card">
                            <div className="card-body">
                              <h6>Avg Deal Size</h6>
                              <h3>$2,000</h3>
                              <p>Earning this month</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                          <div className="card refer-card">
                            <div className="card-body">
                              <h6>No of Referrals</h6>
                              <h3>10</h3>
                              <p>In this month</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-6 d-flex">
                          <div className="card link-box flex-fill">
                            <div className="card-body">
                              <h5>Your Referral Link</h5>
                              <p>
                                You can earn easily money by copy and share the
                                below link to your friends
                              </p>
                              <div className="input-block">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="https://dreamslmscourse.com/reffer/?refid=345re667877k9"
                                />
                              </div>
                              <a href="javascript:void(0);">Copy link</a>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 d-flex">
                          <div className="card link-box flex-fill">
                            <div className="card-body">
                              <h5>Withdraw Money</h5>
                              <ul>
                                <li>
                                  Withdraw money securily to your bank account.{" "}
                                </li>
                                <li>
                                  Commision is $25 per transaction under $10,000
                                </li>
                              </ul>
                              <a href="javascript:void(0);">Withdraw Money</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="profile-heading d-flex align-items-center justify-content-between">
                      <h3>Referred Users</h3>
                      <div className="icon-form mb-0">
                        <span className="form-icon">
                          <i className="bx bx-calendar-edit" />
                        </span>
                        <input
                          type="text"
                          className="form-control bookingrange"
                          placeholder
                        />
                      </div>
                    </div>
                    <div className="checkout-form">
                      <div className="table-responsive custom-table">
                        <table className="table table-nowrap mb-0">
                          <thead>
                            <tr>
                              <th>Referred ID</th>
                              <th>Referrals</th>
                              <th>URL</th>
                              <th />
                              <th>Visits</th>
                              <th>Total Earned</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>09341</td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="student-profile.html"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user2.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="student-profile.html">
                                    Thompson Hicks
                                  </a>
                                </h2>
                              </td>
                              <td>
                                <span className="text-wrap">
                                  https://dreamslmscourse.com/reffer/?refid=345re667877k9
                                </span>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="action-icon"
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  <i className="bx bx-paste" />
                                </a>
                              </td>
                              <td>10</td>
                              <td>$45.00</td>
                            </tr>
                            <tr>
                              <td>09342</td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="student-profile.html"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user4.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="student-profile.html">
                                    Jennifer Tovar
                                  </a>
                                </h2>
                              </td>
                              <td>
                                <span className="text-wrap">
                                  https://dreamslmscourse.com/reffer/?refid=345re667877k9
                                </span>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="action-icon"
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  <i className="bx bx-paste" />
                                </a>
                              </td>
                              <td>15</td>
                              <td>$75.00</td>
                            </tr>
                            <tr>
                              <td>09343</td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="student-profile.html"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user3.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="student-profile.html">
                                    James Schulte
                                  </a>
                                </h2>
                              </td>
                              <td>
                                <span className="text-wrap">
                                  https://dreamslmscourse.com/reffer/?refid=345re667877k9
                                </span>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="action-icon"
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  <i className="bx bx-paste" />
                                </a>
                              </td>
                              <td>20</td>
                              <td>$100.00</td>
                            </tr>
                            <tr>
                              <td>09344</td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="student-profile.html"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user1.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="student-profile.html">
                                    Kristy Cardona
                                  </a>
                                </h2>
                              </td>
                              <td>
                                <span className="text-wrap">
                                  https://dreamslmscourse.com/reffer/?refid=345re667877k9
                                </span>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="action-icon"
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  <i className="bx bx-paste" />
                                </a>
                              </td>
                              <td>1</td>
                              <td>$44.00</td>
                            </tr>
                            <tr>
                              <td>09345</td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="student-profile.html"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user14.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="student-profile.html">
                                    William Aragon
                                  </a>
                                </h2>
                              </td>
                              <td>
                                <span className="text-wrap">
                                  https://dreamslmscourse.com/reffer/?refid=345re667877k9
                                </span>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="action-icon"
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  <i className="bx bx-paste" />
                                </a>
                              </td>
                              <td>5</td>
                              <td>$25.00</td>
                            </tr>
                            <tr>
                              <td>09346</td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="student-profile.html"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user8.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="student-profile.html">Shirley Lis</a>
                                </h2>
                              </td>
                              <td>
                                <span className="text-wrap">
                                  https://dreamslmscourse.com/reffer/?refid=345re667877k9
                                </span>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="action-icon"
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  <i className="bx bx-paste" />
                                </a>
                              </td>
                              <td>500</td>
                              <td>$160.00</td>
                            </tr>
                            <tr>
                              <td>09347</td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="student-profile.html"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user2.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="student-profile.html">John Brewer</a>
                                </h2>
                              </td>
                              <td>
                                <span className="text-wrap">
                                  https://dreamslmscourse.com/reffer/?refid=345re667877k9
                                </span>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="action-icon"
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  <i className="bx bx-paste" />
                                </a>
                              </td>
                              <td>187</td>
                              <td>$150.00</td>
                            </tr>
                            <tr>
                              <td>09348</td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="student-profile.html"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user5.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="student-profile.html">
                                    Doris Hughes
                                  </a>
                                </h2>
                              </td>
                              <td>
                                <span className="text-wrap">
                                  https://dreamslmscourse.com/reffer/?refid=345re667877k9
                                </span>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="action-icon"
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  <i className="bx bx-paste" />
                                </a>
                              </td>
                              <td>10</td>
                              <td>$45.00</td>
                            </tr>
                            <tr>
                              <td>09349</td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="student-profile.html"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user13.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="student-profile.html">
                                    Arthur Nalley
                                  </a>
                                </h2>
                              </td>
                              <td>
                                <span className="text-wrap">
                                  https://dreamslmscourse.com/reffer/?refid=345re667877k9
                                </span>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="action-icon"
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  <i className="bx bx-paste" />
                                </a>
                              </td>
                              <td>15</td>
                              <td>$10.00</td>
                            </tr>
                            <tr>
                              <td>09350</td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="student-profile.html"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user6.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="student-profile.html">
                                    Sarah Martinez
                                  </a>
                                </h2>
                              </td>
                              <td>
                                <span className="text-wrap">
                                  https://dreamslmscourse.com/reffer/?refid=345re667877k9
                                </span>
                              </td>
                              <td>
                                <a
                                  href="javascript:void(0);"
                                  className="action-icon"
                                  data-bs-toggle="tooltip"
                                  title="Copy"
                                >
                                  <i className="bx bx-paste" />
                                </a>
                              </td>
                              <td>98</td>
                              <td>$10.00</td>
                            </tr>
                          </tbody>
                        </table>
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
                          <a href="#">
                            <i className="bx bx-chevron-right" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Student Referral */}
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
                          data-cfemail="0f6b7d6a6e627c63627c4f6a776e627f636a216c6062"
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

export default Referral;

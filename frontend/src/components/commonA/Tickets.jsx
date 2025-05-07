import React from "react";


function Tickets() {
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
                  <h2 className="breadcrumb-title">Support Tickets</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Support Tickets
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
              {/* Student Tickets */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>Support Tickets</h3>
                    </div>
                    <div className="checkout-form">
                      {/* Support Information */}
                      <div className="row">
                        <div className="col-md-4 col-sm-6">
                          <div className="card support-box">
                            <div className="card-body">
                              <h3>50</h3>
                              <p>Total Tickets</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="card support-box">
                            <div className="card-body">
                              <h3>30</h3>
                              <p>Opened Tickets</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="card support-box">
                            <div className="card-body">
                              <h3>20</h3>
                              <p>Closed Tickets</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /Support Information */}
                      <div className="filter-grp ticket-grp d-flex align-items-center justify-content-between">
                        <div>
                          <h3>Support Tickets</h3>
                          <p>You can find all of your order Invoices.</p>
                        </div>
                       
                      </div>
                      <div className="wishlist-tab">
                        <ul className="nav">
                          <li className="nav-item">
                            <a
                              href="javascript:void(0);"
                              className="active"
                              data-bs-toggle="tab"
                              data-bs-target="#all"
                            >
                              All(30)
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="javascript:void(0);"
                              data-bs-toggle="tab"
                              data-bs-target="#open"
                            >
                              Open(10)
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="javascript:void(0);"
                              data-bs-toggle="tab"
                              data-bs-target="#inprogress"
                            >
                              Inprogress(10)
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="javascript:void(0);"
                              data-bs-toggle="tab"
                              data-bs-target="#closed"
                            >
                              Closed(10)
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* Tab Contant */}
                      <div className="tab-content">
                        {/* All */}
                        <div className="tab-pane show active" id="all">
                          <div className="table-responsive custom-table">
                            {/* Referred Users*/}
                            <table className="table table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>Ticket ID</th>
                                  <th>Date</th>
                                  <th>Subject</th>
                                  <th>Priority</th>
                                  <th>Category</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Ticket#001</td>
                                  <td>March 12, 2024</td>
                                  <td>Need a freelancer software</td>
                                  <td>
                                    <span className="resut-badge badge-light-success">
                                      Low
                                    </span>
                                  </td>
                                  <td>Mailing Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#002</td>
                                  <td>March 18, 2024</td>
                                  <td>I have a problem</td>
                                  <td>
                                    <span className="resut-badge badge-light-danger">
                                      High
                                    </span>
                                  </td>
                                  <td>Language Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-warning">
                                      Inprogress
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#003</td>
                                  <td>March 27, 2024</td>
                                  <td>Account Activation mail not received</td>
                                  <td>
                                    <span className="resut-badge badge-light-danger">
                                      High
                                    </span>
                                  </td>
                                  <td>Mailing Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-danger">
                                      Closed
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#004</td>
                                  <td>April 04, 2024</td>
                                  <td>Enabling SSH service</td>
                                  <td>
                                    <span className="resut-badge badge-light-warning">
                                      Medium
                                    </span>
                                  </td>
                                  <td>Installation Error</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#005</td>
                                  <td>April 24, 2024</td>
                                  <td>Payment Processed but not showed</td>
                                  <td>
                                    <span className="resut-badge badge-light-success">
                                      Low
                                    </span>
                                  </td>
                                  <td>Payment Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-danger">
                                      Closed
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#006</td>
                                  <td>April 28, 2024</td>
                                  <td>When will start the order</td>
                                  <td>
                                    <span className="resut-badge badge-light-danger">
                                      High
                                    </span>
                                  </td>
                                  <td>Demo Problem</td>
                                  <td>
                                    <span className="status-badge badge-soft-warning">
                                      Inprogress
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#007</td>
                                  <td>June 03, 2024</td>
                                  <td>Slow speed while Course Download</td>
                                  <td>
                                    <span className="resut-badge badge-light-danger">
                                      High
                                    </span>
                                  </td>
                                  <td>Server Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#008</td>
                                  <td>June 13, 2024</td>
                                  <td>Unable to access the course </td>
                                  <td>
                                    <span className="resut-badge badge-light-warning">
                                      Medium
                                    </span>
                                  </td>
                                  <td>Demo Problem</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#009</td>
                                  <td>July 15, 2024</td>
                                  <td>Assignment Upload Error files</td>
                                  <td>
                                    <span className="resut-badge badge-light-success">
                                      Low
                                    </span>
                                  </td>
                                  <td>File Error</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#0010</td>
                                  <td>July 23, 2024</td>
                                  <td>Account Recovery Assistance Need</td>
                                  <td>
                                    <span className="resut-badge badge-light-danger">
                                      High
                                    </span>
                                  </td>
                                  <td>Recovery Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* /All */}
                        {/* Open */}
                        <div className="tab-pane fade" id="open">
                          <div className="table-responsive custom-table">
                            {/* Referred Users*/}
                            <table className="table table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>Ticket ID</th>
                                  <th>Date</th>
                                  <th>Subject</th>
                                  <th>Priority</th>
                                  <th>Category</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Ticket#001</td>
                                  <td>March 12, 2024</td>
                                  <td>Need a freelancer software</td>
                                  <td>
                                    <span className="resut-badge badge-light-success">
                                      Low
                                    </span>
                                  </td>
                                  <td>Mailing Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#003</td>
                                  <td>March 27, 2024</td>
                                  <td>Account Activation mail not received</td>
                                  <td>
                                    <span className="resut-badge badge-light-danger">
                                      High
                                    </span>
                                  </td>
                                  <td>Mailing Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-danger">
                                      Closed
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#004</td>
                                  <td>April 04, 2024</td>
                                  <td>Enabling SSH service</td>
                                  <td>
                                    <span className="resut-badge badge-light-warning">
                                      Medium
                                    </span>
                                  </td>
                                  <td>Installation Error</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#007</td>
                                  <td>June 03, 2024</td>
                                  <td>Slow speed while Course Download</td>
                                  <td>
                                    <span className="resut-badge badge-light-danger">
                                      High
                                    </span>
                                  </td>
                                  <td>Server Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#008</td>
                                  <td>June 13, 2024</td>
                                  <td>Unable to access the course </td>
                                  <td>
                                    <span className="resut-badge badge-light-warning">
                                      Medium
                                    </span>
                                  </td>
                                  <td>Demo Problem</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#009</td>
                                  <td>July 15, 2024</td>
                                  <td>Assignment Upload Error files</td>
                                  <td>
                                    <span className="resut-badge badge-light-success">
                                      Low
                                    </span>
                                  </td>
                                  <td>File Error</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#0010</td>
                                  <td>July 23, 2024</td>
                                  <td>Account Recovery Assistance Need</td>
                                  <td>
                                    <span className="resut-badge badge-light-danger">
                                      High
                                    </span>
                                  </td>
                                  <td>Recovery Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-success">
                                      Opened
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* /Open */}
                        {/* Inprogress */}
                        <div className="tab-pane fade" id="inprogress">
                          <div className="table-responsive custom-table">
                            <table className="table table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>Ticket ID</th>
                                  <th>Date</th>
                                  <th>Subject</th>
                                  <th>Priority</th>
                                  <th>Category</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Ticket#002</td>
                                  <td>March 18, 2024</td>
                                  <td>I have a problem</td>
                                  <td>
                                    <span className="resut-badge badge-light-danger">
                                      High
                                    </span>
                                  </td>
                                  <td>Language Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-warning">
                                      Inprogress
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#006</td>
                                  <td>April 28, 2024</td>
                                  <td>When will start the order</td>
                                  <td>
                                    <span className="resut-badge badge-light-danger">
                                      High
                                    </span>
                                  </td>
                                  <td>Demo Problem</td>
                                  <td>
                                    <span className="status-badge badge-soft-warning">
                                      Inprogress
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* /Inprogress */}
                        {/* Close */}
                        <div className="tab-pane fade" id="closed">
                          <div className="table-responsive custom-table">
                            <table className="table table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>Ticket ID</th>
                                  <th>Date</th>
                                  <th>Subject</th>
                                  <th>Priority</th>
                                  <th>Category</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Ticket#003</td>
                                  <td>March 27, 2024</td>
                                  <td>Account Activation mail not received</td>
                                  <td>
                                    <span className="resut-badge badge-light-danger">
                                      High
                                    </span>
                                  </td>
                                  <td>Mailing Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-danger">
                                      Closed
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ticket#005</td>
                                  <td>April 24, 2024</td>
                                  <td>Payment Processed but not showed</td>
                                  <td>
                                    <span className="resut-badge badge-light-success">
                                      Low
                                    </span>
                                  </td>
                                  <td>Payment Issues</td>
                                  <td>
                                    <span className="status-badge badge-soft-danger">
                                      Closed
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* /Close */}
                      </div>
                      {/* Tab Contant */}
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
              {/* Student Tickets */}
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Modal */}
        <div
          className="modalStyle modal fade"
          id="addpaymentMethod"
          tabIndex={-1}
          aria-labelledby="addpaymentMethod"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Payment Method</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa-regular fa-circle-xmark" />
                </button>
              </div>
              <div className="modal-body">
                <div className="addpaymethod-form">
                  <form action="#">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="wallet-method">
                          <label className="radio-inline custom_radio me-4">
                            <input
                              type="radio"
                              name="optradio"
                              defaultChecked
                            />
                            <span className="checkmark" /> Credit or Debit card
                          </label>
                          <label className="radio-inline custom_radio">
                            <input type="radio" name="optradio" />
                            <span className="checkmark" /> PayPal
                          </label>
                        </div>
                        <div className="input-block">
                          <label className="form-control-label">
                            Card Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="XXXX XXXX XXXX XXXX"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="input-block">
                          <label className="form-label">Month</label>
                          <select className="form-select" name="sellist1">
                            <option>Month</option>
                            <option>Brazil</option>
                            <option>French</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="input-block">
                          <label className="form-label">Year</label>
                          <select className="form-select" name="sellist1">
                            <option>Year</option>
                            <option>India</option>
                            <option>America</option>
                            <option>London</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="input-block">
                          <label className="form-control-label">
                            CVV Code{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="XXXX"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-block mb-0">
                          <label className="form-control-label">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer me-auto">
                <button type="button" className="btn btn-modal-style btn-theme">
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-modal-style btn-cancel"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
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
                          data-cfemail="a7c3d5c2c6cad4cbcad4e7c2dfc6cad7cbc289c4c8ca"
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
        <div className="modal fade" id="add-tickets">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header border-0 custom-modal-header">
                    <div className="page-title">
                      <h4>Add New Ticket</h4>
                    </div>
                    <button
                      type="button"
                      className="close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i className="feather-x" />
                    </button>
                  </div>
                  <div className="modal-body custom-modal-body">
                    <form action="https://dreamslms.dreamstechnologies.com/html/Tickets">
                      <div className="tickets-add-list">
                        <div className="settings-inner-blk add-course-info p-0">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="input-block">
                                <label className="form-label">
                                  Ticket Title
                                </label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-block">
                                <label className="form-label">Category</label>
                                <select
                                  className="form-select select country-select"
                                  name="sellist1"
                                >
                                  <option>Choose Category</option>
                                  <option>Mailing Issue</option>
                                  <option>Language Issue</option>
                                  <option>Installation Error</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-block">
                                <label className="form-label">Priority</label>
                                <select
                                  className="form-select select country-select"
                                  name="sellist1"
                                >
                                  <option>Choose Priority</option>
                                  <option>High</option>
                                  <option>Medium</option>
                                  <option>Low</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="input-block">
                                <label className="form-label">
                                  Description
                                </label>
                                <div id="editor" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="input-block ">
                                <label className="form-label">Attachment</label>
                                <div className="file-drop">
                                  <div action="#" className="dropzone">
                                    <p>Drag &amp; Drop files </p>
                                  </div>
                                </div>
                                <div className="accept-drag-file">
                                  <p>
                                    Accept File Type:
                                    doc,docx,jpg,jpeg,png,txt,pdf
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer-btn">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tickets;

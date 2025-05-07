import React from "react";
import QRCode from 'react-qr-code';
function LinkedAccounts() {
  const downloadQR = (platform) => {
    const canvas = document.getElementById(`qr-${platform}`);
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${platform}-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
 
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
                        Linked Accounts
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
                          <a href="LinkedAccounts" className="active">
                            <i className="bx bx-link" />
                            Linked Accounts
                          </a>
                        </li>
                        <li>
                          <a href="Notification">
                            <i className="bx bx-bell" />
                            Notifications
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="checkout-form settings-wrap">
                      <ul className="lined-accounts-list">
                        <li>
                          <div className="account-icon">
                            <img src="assets/img/icon/fb-icon.svg" alt="Facebook" />
                          </div>
                          <div className="account-info">
                            <div className="account-name">
                              <h5>Facebook</h5>
                            </div>
                            <p>
                            
                            </p>
                            <a href="#" className="linked-btn">
                              Remove my facebook account
                            </a>
                          </div>
                          <div className="account-qr">
                            <QRCode 
                              id="qr-facebook"
                              value="https://www.facebook.com/groups/2193383740889412"
                              size={80}
                              level={"H"}
                              includeMargin={true}
                            />
                            <p className="qr-caption">Scan to join group</p>
                            
                          </div>
                        </li>
                        <li>
                          <div className="account-icon">
                            <img
                              src="assets/img/icon/google-icon.svg"
                              alt="Google"
                            />
                          </div>
                          <div className="account-info">
                            <div className="account-name">
                              <h5>Google</h5>
                            </div>
                            <p>
                              
                            </p>
                            <a href="#" className="linked-btn">
                              Link my google account
                            </a>
                          </div>
                          <div className="account-qr">
                            <QRCode 
                              id="qr-google"
                              value="https://accounts.google.com/"
                              size={80}
                              level={"H"}
                              includeMargin={true}
                            />
                            <p className="qr-caption">Scan to link account</p>
                           
                          </div>
                        </li>
                        <li>
                          <div className="account-icon">
                            <img
                              src="assets/img/icon/github-icon.svg"
                              alt="GitHub"
                            />
                          </div>
                          <div className="account-info">
                            <div className="account-name">
                              <h5>Github</h5>
                            </div>
                            <p>
                             
                            </p>
                            <a href="#" className="linked-btn">
                              Link my github account
                            </a>
                          </div>
                          <div className="account-qr">
                            <QRCode 
                              id="qr-github"
                              value="https://github.com/"
                              size={80}
                              level={"H"}
                              includeMargin={true}
                            />
                            <p className="qr-caption">Scan to link account</p>
                            
                          </div>
                        </li>
                        <li>
                          <div className="account-icon">
                            <img
                              src="assets/img/icon/twitter-x-icon.svg"
                              alt="Twitter"
                            />
                          </div>
                          <div className="account-info">
                            <div className="account-name">
                              <h5>Twitter</h5>
                            </div>
                            <p>
                              
                            </p>
                            <a href="#" className="linked-btn">
                              Link my twitter account
                            </a>
                          </div>
                          <div className="account-qr">
                            <QRCode 
                              id="qr-twitter"
                              value="https://twitter.com/"
                              size={80}
                              level={"H"}
                              includeMargin={true}
                            />
                            <p className="qr-caption">Scan to link account</p>
                            
                          </div>
                        </li>
                        <li>
                         
                          
                        </li>
                      </ul>
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
                          data-cfemail="ea8e988f8b8799868799aa8f928b879a868fc4898587"
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

export default LinkedAccounts;
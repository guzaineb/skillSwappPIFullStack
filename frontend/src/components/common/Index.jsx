import React from 'react'
import Header from './Header'

export default function Index() {
  return (
    <>
    
{/* Main Wrapper */}
<div className="main-wrapper">
  {/* Header */}
 <Header></Header>
  <section className="home-slide d-flex align-items-center">
    <div className="container">
        <div className="row">
            <div className="col-md-7">
                <div className="home-slide-face aos" >
                    <div className="home-slide-text">
                        <h5>The Leader in Online Learning</h5>
                        <h1>Engaging & Accessible Online Courses For All</h1>
                        <p>Own your future learning new skills online</p>
                    </div>
                    <div className="banner-content">
                        <form className="form" action="https://dreamslms.dreamstechnologies.com/html/course-list.html">
                            <div className="form-inner">
                                <div className="input-group">
                                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                                    <input type="email" className="form-control"
                                        placeholder="Search School, Online educational centers, etc" />
                                    <span className="drop-detail">
                                        <select className="form-select select">
                                            <option>Category</option>
                                            <option>Angular</option>
                                            <option>Node Js</option>
                                            <option>React</option>
                                            <option>Python</option>
                                        </select>
                                    </span>
                                    <button className="btn btn-primary sub-btn" type="submit">
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="trust-user">
                        <p>Trusted by over 15K Users <br />worldwide since 2024</p>
                        <div className="trust-rating d-flex align-items-center">
                            <div className="rate-head">
                                <h2><span>1000</span>+</h2>
                            </div>
                            <div className="rating d-flex align-items-center">
                                <h2 className="d-inline-block average-rating">4.4</h2>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-5 d-flex align-items-center">
                <div className="girl-slide-img aos">
                    <img src="assets/img/object.png" alt="Img" />
                </div>
            </div>
        </div>
    </div>
</section>


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
                <a href="https://dreamslms.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="82e6f0e7e3eff1eeeff1c2e7fae3eff2eee7ace1edef">[email&nbsp;protected]</a>
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

export default function Footer() {
  return (
    <>
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
                  <div className="footer-contact-info">
                    <div className="footer-address">
                      <img
                        src="assets/img/icon/icon-20.svg"
                        alt="Img"
                        className="img-fluid"
                      />
                      <p>Tunis, Ariana</p>
                    </div>
                    <p>
                      <img
                        src="assets/img/icon/icon-19.svg"
                        alt="Img"
                        className="img-fluid"
                      />
                      <a
                        href="#"
                        className="__cf_email__"
                        data-cfemail="82e6f0e7e3eff1eeeff1c2e7fae3eff2eee7ace1edef"
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
                      +216 20 123 456
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
                    <p className="mb-0">© 2024 SkillSwap</p>
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
    </>
  );
}

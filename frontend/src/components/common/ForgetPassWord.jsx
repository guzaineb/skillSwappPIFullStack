import React from "react";

const ForgotPassWord = () => {
  return (
    <>
      <div className="main-wrapper">
        <div className="row">
          {/* Login Banner */}
          <div className="col-md-6 login-bg">
            <div className="owl-carousel login-slide owl-theme aos" data-aos="fade-up">
              <div className="welcome-login">
                <div className="login-banner">
                  <img src="assets/img/login-img.png" className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h2>Welcome to <br />DreamsLMS Courses.</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
              </div>
              <div className="welcome-login">
                <div className="login-banner">
                  <img src="assets/img/login-img.png" className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h2>Welcome to <br />DreamsLMS Courses.</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
              </div>
              <div className="welcome-login">
                <div className="login-banner">
                  <img src="assets/img/login-img.png" className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h2>Welcome to <br />DreamsLMS Courses.</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
              </div>
            </div>
          </div>
          {/* /Login Banner */}
          <div className="col-md-6 login-wrap-bg">
            {/* Login */}
            <div className="login-wrapper">
              <div className="loginbox">
                <div className="img-logo">
                  <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
                  <div className="back-home">
                    <a href="index-2.html">Back to Home</a>
                  </div>
                </div>
                <h1>Forgot Password ?</h1>
                <div className="reset-password">
                  <p>Enter your email to reset your password.</p>
                </div>
                <form action="https://dreamslms.dreamstechnologies.com/html/login.html">
                  <div className="input-block">
                    <label className="form-control-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter your email address" />
                  </div>
                  <div className="d-grid">
                    <button className="btn btn-start" type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
            {/* /Login */}
          </div>
        </div>
      </div>

    </>
  );
};

export default ForgotPassWord;

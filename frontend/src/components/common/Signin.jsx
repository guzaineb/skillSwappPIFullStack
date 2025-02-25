import React from 'react'

export default function Signin() {
  return (

<>
{/* Main Wrapper */}
<div className="main-wrapper log-wrap">
  <div className="row">
    {/* Login Banner */}
    <div className="col-md-6 login-bg">
      <div className="owl-carousel login-slide owl-theme">
        <div className="welcome-login">
          <div className="login-banner">
            <img src="assets/img/login-img.png" className="img-fluid" alt="Logo" />
          </div>
          <div className="mentor-course text-center">
            <h2>Welcome to <br />DreamsLMS Courses.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </div>
        </div>
        <div className="welcome-login">
          <div className="login-banner">
            <img src="assets/img/login-img.png" className="img-fluid" alt="Logo" />
          </div>
          <div className="mentor-course text-center">
            <h2>Welcome to <br />DreamsLMS Courses.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </div>
        </div>
        <div className="welcome-login">
          <div className="login-banner">
            <img src="assets/img/login-img.png" className="img-fluid" alt="Logo" />
          </div>
          <div className="mentor-course text-center">
            <h2>Welcome to <br />DreamsLMS Courses.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </div>
        </div>
      </div>
    </div>
    {/* /Login Banner */}
    <div className="col-md-6 login-wrap-bg">
      {/* Login */}
      <div className="login-wrapper">
        <div className="loginbox">
          <div className="w-100">
            <div className="img-logo">
              <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
              <div className="back-home">
                <a href="index-2.html">Back to Home</a>
              </div>
            </div>
            <h1>Sign into Your Account</h1>
            <form action="https://dreamslms.dreamstechnologies.com/html/instructor-dashboard.html">
              <div className="input-block">
                <label className="form-control-label">Email</label>
                <input type="email" className="form-control" placeholder="Enter your email address" />
              </div>
              <div className="input-block">
                <label className="form-control-label">Password</label>
                <div className="pass-group">
                  <input type="password" className="form-control pass-input" placeholder="Enter your password" />
                  <span className="feather-eye toggle-password" />
                </div>
              </div>
              <div className="forgot">
                <span><a className="forgot-link" href="forgot-password.html">Forgot Password
                    ?</a></span>
              </div>
              <div className="remember-me">
                <label className="custom_check mr-2 mb-0 d-inline-flex remember-me"> Remember me
                  <input type="checkbox" name="radio" />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary btn-start" type="submit">Sign In</button>
              </div>
            </form>
          </div>
        </div>
        <div className="google-bg text-center">
          <span><a href="#">Or sign in with</a></span>
          <div className="sign-google">
            <ul>
              <li><a href="#"><img src="assets/img/net-icon-01.png" className="img-fluid" alt="Logo" /> Sign
                  In using Google</a></li>
              <li><a href="#"><img src="assets/img/net-icon-02.png" className="img-fluid" alt="Logo" />Sign
                  In using Facebook</a></li>
            </ul>
          </div>
          <p className="mb-0">New User ? <a href="register.html">Create an Account</a></p>
        </div>
      </div>
      {/* /Login */}
    </div>
  </div>
</div>

</>
    
  )
}

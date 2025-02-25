import React from 'react'

function Signup() {
  return (
<>
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
          <h1>Sign up</h1>
          <form action="https://dreamslms.dreamstechnologies.com/html/login.html">
            <div className="input-block">
              <label className="form-control-label">Full Name</label>
              <input type="text" className="form-control" placeholder="Enter your Full Name" />
            </div>
            <div className="input-block">
              <label className="form-control-label">Email</label>
              <input type="email" className="form-control" placeholder="Enter your email address" />
            </div>
            <div className="input-block">
              <label className="form-control-label">Password</label>
              <div className="pass-group" id="passwordInput">																	
                <input type="password" className="form-control pass-input" placeholder="Enter your password" />
                <span className="toggle-password feather-eye" />
                <span className="pass-checked"><i className="feather-check" /></span>
              </div>
              <div className="password-strength" id="passwordStrength">
                <span id="poor" />
                <span id="weak" />
                <span id="strong" />
                <span id="heavy" />
              </div>
              <div id="passwordInfo" />	
            </div>
            <div className="form-check remember-me">
              <label className="form-check-label mb-0">
                <input className="form-check-input" type="checkbox" name="remember" /> I agree to the <a href="term-condition.html">Terms of Service</a> and <a href="privacy-policy.html">Privacy Policy.</a>
              </label>
            </div>
            <div className="d-grid">
              <button className="btn btn-primary btn-start" type="submit">Create Account</button>
            </div>
          </form>
        </div>
        <div className="google-bg text-center">
          <span><a href="#">Or sign in with</a></span>
          <div className="sign-google">
            <ul>
              <li><a href="#"><img src="assets/img/net-icon-01.png" className="img-fluid" alt="Logo" /> Sign In using Google</a></li>
              <li><a href="#"><img src="assets/img/net-icon-02.png" className="img-fluid" alt="Logo" />Sign In using Facebook</a></li>
            </ul>
          </div>
          <p className="mb-0">Already have an account? <a href="login.html">Sign in</a></p>
        </div>
      </div>
      {/* /Login */}
    </div>
  </div>
</div>


</>
)
}

export default Signup
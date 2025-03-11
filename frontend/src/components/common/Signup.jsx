import React, { useState } from 'react';
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { Loader, Lock, Mail, User } from "lucide-react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("learner,admin,educator");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(name, email, phone, role, password);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-wrapper log-wrap">
      <div className="row">
        {/* Login Banner */}
        <div className="col-md-6 login-bg">
          <div className="welcome-login">
            <div className="login-banner">
              <img src="assets/img/login-img.png" className="img-fluid" alt="Logo" />
            </div>
            <div className="mentor-course text-center">
              <h2>Welcome to <br />SkillSwap.</h2>
            
            </div>
          </div>
        </div>
        {/* /Login Banner */}
        <div className="col-md-6 login-wrap-bg">
          {/* Signup */}
          <div className="login-wrapper">
            <div className="loginbox">
              <div className="img-logo">
                <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
                <div className="back-home">
                  <a href="/index">Back to Home</a>
                </div>
              </div>
              <h1>Sign up</h1>
              <form onSubmit={handleSignup}>
                <div className="input-block">
                  <label className="form-control-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="Enter your Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-block">
                  <label className="form-control-label">Email</label>
                  <input type="email" className="form-control" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-block">
                  <label className="form-control-label">Phone Number</label>
                  <input type="tel" className="form-control" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="input-block">
                  <label className="form-control-label">Role</label>
                  <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select your role</option>
                    <option value="learner">Learner</option>
                    <option value="admin">Admin</option>
                    <option value="educator">Educator</option>
                  </select>
                </div>
                <div className="input-block">
                  <label className="form-control-label">Password</label>
                  <div className="pass-group" id="passwordInput">
                    <input icon={Lock} type="password" className="form-control pass-input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
              <p className="mb-0">Already have an account? <a href="/signin">Sign in</a></p>
            </div>
          </div>
          {/* /Signup */}
        </div>
      </div>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/Dash"); // Rediriger après connexion réussie
    } catch (err) {
      console.error("Erreur de connexion :", err);
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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        {/* /Login Banner */}

        <div className="col-md-6 login-wrap-bg">
          <div className="login-wrapper">
            <div className="loginbox">
              <div className="w-100">
                <div className="img-logo">
                  <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
                  <div className="back-home">
                    <a href="/index">Back to Home</a>
                  </div>
                </div>
                <h1>Sign into Your Account</h1>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label className="form-control-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-block">
                    <label className="form-control-label">Password</label>
                    <div className="pass-group">
                      <input
                        type="password"
                        className="form-control pass-input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="forgot">
                    <span><a className="forgot-link" href="/forgot-password">Forgot Password?</a></span>
                  </div>
                  <div className="remember-me">
                    <label className="custom_check mr-2 mb-0 d-inline-flex remember-me"> Remember me
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="d-grid">
                    <button className="btn btn-primary btn-start" type="submit" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="google-bg text-center">
              <span><a href="#">Or sign in with</a></span>
              <div className="sign-google">
                <ul>
                  <li><a href="#"><img src="assets/img/net-icon-01.png" alt="Google" /> Sign In using Google</a></li>
                  <li><a href="#"><img src="assets/img/net-icon-02.png" alt="Facebook" /> Sign In using Facebook</a></li>
                </ul>
              </div>
              <p className="mb-0">New User? <a href="/signup">Create an Account</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

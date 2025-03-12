import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const ForgotPassWord = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading, error } = useAuthStore();
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true); // Show success message
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="row">
        <div className="col-md-6 login-bg">
          {/* ... existing banner code ... */}
        </div>
        <div className="col-md-6 login-wrap-bg">
          <div className="login-wrapper">
            <div className="loginbox">
              <div className="img-logo">
                <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
                <div className="back-home">
                  <a href="/">Back to Home</a>
                </div>
              </div>
              <h1>Forgot Password ?</h1>
              
              {isSubmitted ? (
                // Success state
                <div className="success-container">
                  <p>If an account exists for {email}, you will receive a password reset link shortly.</p>
                  <div className="back-login">
                    <a href="/login">Back to Login</a>
                  </div>
                </div>
              ) : (
                // Form state
                <>
                  <p>Enter your email to reset your password.</p>
                  {error && <p className="error-message">{error}</p>}
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
                    <div className="d-grid">
                      <button className="btn btn-start" type="submit" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassWord;
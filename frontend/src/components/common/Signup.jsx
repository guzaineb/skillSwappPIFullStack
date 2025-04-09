import React, { useState } from 'react';
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name || name.length < 3) newErrors.name = "Full name must be at least 3 characters long.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format.";
    if (!phone || !/^[0-9]{8,}$/.test(phone)) newErrors.phone = "Phone number must be at least 8 digits.";
    if (!role) newErrors.role = "Please select a role.";
    if (!password || !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/.test(password))
      newErrors.password = "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.";
    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
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

        <div className="col-md-6 login-wrap-bg">
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
                {['name', 'email', 'phone', 'role', 'password'].map((field) => (
                  <div className="input-block" key={field}>
                    <label className="form-control-label">
                      {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                    </label>
                    {field === 'role' ? (
                      <select
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Select your role</option>
                        <option value="learner">Learner</option>
                        <option value="educator">Educator</option>
                      </select>
                    ) : (
                      <input
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : field === 'password' ? 'password' : 'text'}
                        className="form-control"
                        placeholder={`Enter your ${field}`}
                        value={eval(field)}
                        onChange={(e) => eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}(e.target.value)`) }
                      />
                    )}
                    {errors[field] && (
                      <p style={{ color: '#FF5733', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}
                <div className="form-check remember-me">
                  <label className="form-check-label mb-0">
                    <input className="form-check-input" type="checkbox" name="remember" /> I agree to the <a href="term-condition.html">Terms of Service</a> and <a href="privacy-policy.html">Privacy Policy.</a>
                  </label>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-start" type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
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
        </div>
      </div>
    </div>
  );
}

export default Signup;

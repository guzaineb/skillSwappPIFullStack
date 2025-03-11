import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore"; // Assure-toi que le chemin est correct

export default function VerificationCode() {
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const verifyEmail = useAuthStore((state) => state.verifyEmail);
  const error = useAuthStore((state) => state.error);


  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // N'accepte que les chiffres

    const newCode = [...code];

    if (value.length === 6) {
      // Gestion du collage de code complet
      const pastedCode = value.split("").slice(0, 6);
      setCode(pastedCode);
      inputRefs.current[5].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus(); // Focus sur la case suivante
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Focus sur la case précédente
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log("Verification Code:", verificationCode);

    try {
      // Ajoute ici ta logique de vérification
      await verifyEmail(verificationCode);
      console.log("Code vérifié avec succès !");
      navigate("/signin");
    } catch (error) {
      console.log("Code incorrect !");
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="main-wrapper log-wrap">
      <div className="row">
        {/* Verification Banner */}
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
        {/* /Verification Banner */}

        {/* Verification Code Form */}
        <div className="col-md-6 login-wrap-bg">
          <div className="login-wrapper">
            <div className="loginbox">
              <div className="w-100">
                <div className="img-logo">
                  <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
                  <div className="back-home">
                    <a href="index-2.html">Back to Home</a>
                  </div>
                </div>
                <h1>Enter Verification Code</h1>
                <p className="text-muted mb-4">
                  We have sent a verification code to your email. Please enter it below.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label className="form-control-label">Verification Code</label>
                    <div className="d-flex justify-content-between gap-2">
                      {code.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          maxLength={1}
                          className="form-control text-center verification-input"
                          style={{
                            width: "50px",
                            height: "50px",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            border: "2px solid #ddd",
                            borderRadius: "10px",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-start"
                      disabled={code.includes("")}
                    >
                      Verify
                    </button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <p className="mb-0">
                    Didn't receive the code? <a href="#">Resend Code</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Verification Code Form */}
      </div>
    </div>
  );
}

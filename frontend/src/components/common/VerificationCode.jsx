// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore"; 
// export default function VerificationCode() {
//   const [code, setCode] = useState(Array(6).fill(""));
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();
//   const verifyEmail = useAuthStore((state) => state.verifyEmail);
//   const error = useAuthStore((state) => state.error);


//   const handleChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;

//     const newCode = [...code];

//     if (value.length === 6) {
      
//       const pastedCode = value.split("").slice(0, 6);
//       setCode(pastedCode);
//       inputRefs.current[5].focus();
//     } else {
//       newCode[index] = value;
//       setCode(newCode);

//       if (value && index < 5) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       inputRefs.current[index - 1].focus(); 
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const verificationCode = code.join("");
//     console.log("Verification Code:", verificationCode);

//     try {
//       await verifyEmail(verificationCode);
//       console.log("Code vérifié avec succès !");
//       navigate("/signin");
//     } catch (error) {
//       console.log("Code incorrect !");
//     }
//   };

//   useEffect(() => {
//     if (code.every((digit) => digit !== "")) {
//       handleSubmit(new Event("submit"));
//     }
//   }, [code]);

//   return (
//     <div className="main-wrapper log-wrap">
//       <div className="row">
//         {/* Verification Banner */}
//         <div className="col-md-6 login-bg">
//           <div className="welcome-login">
//             <div className="login-banner">
//               <img src="assets/img/login-img.png" className="img-fluid" alt="Logo" />
//             </div>
//             <div className="mentor-course text-center">
//               <h2>Welcome to <br />SkillSwap.</h2>
//             </div>
//           </div>
//         </div>
//         {/* /Verification Banner */}

//         {/* Verification Code Form */}
//         <div className="col-md-6 login-wrap-bg">
//           <div className="login-wrapper">
//             <div className="loginbox">
//               <div className="w-100">
//                 <div className="img-logo">
//                   <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
//                   <div className="back-home">
//                     <a href="/index">Back to Home</a>
//                   </div>
//                 </div>
//                 <h1>Enter Verification Code</h1>
//                 <p className="text-muted mb-4">
//                   We have sent a verification code to your email. Please enter it below.
//                 </p>
//                 <form onSubmit={handleSubmit}>
//                   <div className="input-block">
//                     <label className="form-control-label">Verification Code</label>
//                     <div className="d-flex justify-content-between gap-2">
//                       {code.map((digit, index) => (
//                         <input
//                           key={index}
//                           ref={(el) => (inputRefs.current[index] = el)}
//                           type="text"
//                           value={digit}
//                           onChange={(e) => handleChange(index, e.target.value)}
//                           onKeyDown={(e) => handleKeyDown(index, e)}
//                           maxLength={1}
//                           className="form-control text-center verification-input"
//                           style={{
//                             width: "50px",
//                             height: "50px",
//                             fontSize: "1.5rem",
//                             fontWeight: "bold",
//                             border: "2px solid #ddd",
//                             borderRadius: "10px",
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                   <div className="d-grid mt-4">
//                     <button
//                       type="submit"
//                       className="btn btn-primary btn-start"
//                       disabled={code.includes("")}
//                     >
//                       Verify
//                     </button>
//                   </div>
//                 </form>
//                 <div className="text-center mt-3">
//                   <p className="mb-0">
//                     Didn't receive the code? <a href="#">Resend Code</a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Verification Code Form */}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function VerificationCode() {
  const [code, setCode] = useState(Array(6).fill(""));
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail, resendVerificationCode, error, message, isLoading, user } = useAuthStore();

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    if (value.length === 6) {
      const pastedCode = value.split("").slice(0, 6);
      setCode(pastedCode);
      inputRefs.current[5].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/signin");
    } catch (error) {
      console.log("Erreur de vérification:", error);
    }
  };

  const handleResendCode = async (e) => {
    e.preventDefault();
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    try {
      await resendVerificationCode(user.email); // Pass the email
      setResendCooldown(60);
    } catch (error) {
      console.error("Erreur lors du renvoi:", error);
    } finally {
      setIsResending(false);
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
        <div className="col-md-6 login-bg">{/* Banner content */}</div>
        <div className="col-md-6 login-wrap-bg">
          <div className="login-wrapper">
            <div className="loginbox">
              <div className="w-100">
                <div className="img-logo">{/* Logo content */}</div>
                <h1>Enter Verification Code</h1>
                <p className="text-muted mb-4">
                  We have sent a verification code to your email. Please enter it below.
                </p>
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}
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
                      disabled={code.includes("") || isLoading}
                    >
                      {isLoading ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <p className="mb-0">
                    Didn't receive the code?{" "}
                    {resendCooldown > 0 ? (
                      <span>Resend available in {resendCooldown}s</span>
                    ) : (
                      <a
                        href="#"
                        onClick={handleResendCode}
                        className={isResending || isLoading ? "disabled" : ""}
                      >
                        {isResending || isLoading ? "Sending..." : "Resend Code"}
                      </a>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

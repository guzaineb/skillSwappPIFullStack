// import React, { useState } from "react"; 
// import { useAuthStore } from "../../store/authStore";
// import { useNavigate, useParams } from "react-router-dom";

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission success
//   const { resetPassword, isLoading, message, error } = useAuthStore();
//   const navigate = useNavigate();
//   const { token } = useParams();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     try {
//       await resetPassword(token, password);
//       setIsSubmitted(true);  // Mark the form as successfully submitted
//       alert("Password reset successful! You can now login.");
//       navigate("/signin");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Your Password</h2>

//         {isSubmitted ? (
//           // Show confirmation message after successful password reset
//           <div className="text-center">
//             <p className="text-green-600">Your password has been successfully reset.</p>
//             <p className="text-gray-600">You can now log in with your new password.</p>
//             <button
//               onClick={() => navigate("/login")}
//               className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
//             >
//               Go to Login Page
//             </button>
//           </div>
//         ) : (
//           // Show the password reset form when not submitted yet
//           <>
//             {message && <p className="text-green-600 text-center">{message}</p>}
//             {error && <p className="text-red-600 text-center">{error}</p>}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700">New Password</label>
//                 <input
//                   type="password"
//                   className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter new password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Confirm Password</label>
//                 <input
//                   type="password"
//                   className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Confirm new password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Resetting..." : "Reset Password"}
//               </button>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";



export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword, isLoading, message, error } = useAuthStore();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);
      setIsSubmitted(true);
      alert("Password reset successful! You can now login.");
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-wrapper ">
      <div className="row">
      <div className="col-md-6 login-bg">
          <div className="welcome-login">
            <div className="login-banner">
              <img src="/assets/img/login-img.png" className="img-fluid" alt="Logo" />
            </div>
            <div className="mentor-course text-center">
              <h2>Welcome to <br />SkillSwap.</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 login-wrap-bg">
          <div className="login-wrapper">
            <div className="loginbox">
              <div className="w-100">
              <div className="img-logo">
                <img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />

                <div className="back-home">
                  <a href="/index">Back to Home</a>
                </div>
              </div>
                <h1>Set a New Password</h1>
                {message && <p className="text-success text-center">{message}</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                {isSubmitted ? (
                  <div className="text-center">
                    <p className="text-success">Your password has been successfully reset.</p>
                    <p>You can now log in with your new password.</p>
                    <button
                      onClick={() => navigate("/signin")}
                      className="btn btn-primary btn-start w-100"
                    >
                      Go to Login Page
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="input-block">
                      <label className="form-control-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-block">
                      <label className="form-control-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-primary btn-start" type="submit" disabled={isLoading}>
                        {isLoading ? "Resetting..." : "Reset Password"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <div className="text-center">
              <p className="mb-0">Remembered your password? <a href="/signin">Sign In</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

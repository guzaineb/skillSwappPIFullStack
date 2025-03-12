import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Signin from "./components/common/Signin";
import Signup from "./components/common/Signup";
import Dashboard from "./components/common/Dashboard";
import Profile from "./components/common/Profile";
import ForgetPassWord from "./components/common/ForgetPassWord";
import ResetPassword from "./components/common/ResetPassword";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};




function App() {
 

  return (
    <>
      <Routes>
        
        <Route path="/" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Signin" element={<Signin/>} />
        <Route path="/ForgetPassWord" element={<ForgetPassWord/>} />

        <Route
					path="/reset-password:token"
					element={
					
							<ResetPassword />
				
					}
				/>
      </Routes>

    </>
  );
}

export default App;

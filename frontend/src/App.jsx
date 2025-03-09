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
function App() {
 

  return (
    <>
      <Routes>
        
        <Route path="/" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/ForgetPassWord" element={<ForgetPassWord/>} />

      </Routes>

    </>
  );
}

export default App;

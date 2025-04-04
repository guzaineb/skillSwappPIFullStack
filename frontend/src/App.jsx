import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/common/Header";
import Signin from "./components/common/Signin";
import Signup from "./components/common/Signup";
import Index from "./components/common/Index";
import VerificationCode from "./components/common/VerificationCode";
import DashboardUser from "./components/common/DashboardUser";
import Index1 from "./components/common/Index1";
import Dashboard from "./components/common/Dashboard";
import Profile from "./components/common/Profile";
import ForgetPassWord from "./components/common/ForgetPassWord";
import ResetPassword from "./components/common/ResetPassword";
import Chat from "./components/common/Chat";
import UpdateProfile from "./components/common/updateProfile";


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
        <Route path="/index" element={<Index />} />
        <Route path="/verify-email" element={<VerificationCode/>} />
        <Route path="/header" element={<Header />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Dash" element={<DashboardUser />} />
        <Route path="/index1" element={<Index1 />} />
        <Route path="/ForgetPassWord" element={<ForgetPassWord/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Chat" element={<Chat/>} />
        <Route path="/profileUpdate" element={<UpdateProfile />} />

<Route
  path="/reset-password/:token"
  element={
  
      <ResetPassword />

  }
/>
      </Routes>

    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import Signin from "./components/common/Signin";
import Signup from "./components/common/Signup";
import Index from "./components/common/Index";
import VerificationCode from "./components/common/VerificationCode";
import DashboardUser from "./components/common/DashboardUser";
import Index1 from "./components/common/Index1";
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
      </Routes>

    </>
  );
}

export default App;

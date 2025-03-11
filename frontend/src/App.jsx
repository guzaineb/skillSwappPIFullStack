import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Signin from "./components/common/Signin";
import Signup from "./components/common/Signup";
import Index from "./components/common/Index";
import VerificationCode from "./components/common/VerificationCode";
import DashboardUser from "./components/common/DashboardUser";
function App() {
  return (
    <>
      <Routes>
        <Route path="/index" element={<Index />} />
        <Route path="/verify-email" element={<VerificationCode/>} />
        <Route path="/header" element={<Header />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/Dash" element={<DashboardUser />} />

      </Routes>

    </>
  );
}

export default App;

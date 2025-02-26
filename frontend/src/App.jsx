import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Signin from "./components/common/Signin";
import Signup from "./components/common/Signup";

function App() {
  return (
    <>
      <Routes>
        
        <Route path="/" element={<Signup />} />
      </Routes>

    </>
  );
}

export default App;

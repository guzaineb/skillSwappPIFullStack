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
// import UpdateProfile from "./components/common/updateProfile";
import HeaderBack from "./components/common/HeaderBack";

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
        <Route path ="/HeaderBack" element={<HeaderBack />} />
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
        {/* <Route path="/profileUpdate" element={<UpdateProfile />} /> */}
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
// import { useState, useEffect } from 'react';
// import { useMessageStore } from '../stores/useMessageStore';

// const ChatBox = () => {
//   const { messages, getMessages, sendMessage, selectedUser } = useMessageStore();
//   const [text, setText] = useState('');

//   // Charge les messages quand l'utilisateur sélectionné change
//   useEffect(() => {
//     if (selectedUser) {
//       getMessages(selectedUser._id);
//     }
//   }, [selectedUser]);

//   const handleSend = () => {
//     if (text.trim() && selectedUser) {
//       sendMessage(
//         "ID_DE_L_UTILISATEUR_CONNECTE", // Remplace par l'ID réel (ex: depuis le token)
//         selectedUser._id,
//         text
//       );
//       setText('');
//     }
//   };

//   return (
//     <div className="chat-box">
//       <div className="messages">
//         {messages.map((msg) => (
//           <div key={msg._id} className={`message ${msg.senderId === "ID_DE_L_UTILISATEUR_CONNECTE" ? 'sent' : 'received'}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="input-area">
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Écrire un message..."
//         />
//         <button onClick={handleSend}>Envoyer</button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

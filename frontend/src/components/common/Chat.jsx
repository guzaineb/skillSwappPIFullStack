import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import NoChatSelected from "../../pages/NoChatSelected";
import ChatContainer from "../../pages/ChatContainer";
import Header from "./Header";
import Sidebar from "../../pages/Sidebar";
import Footer from "./Footer";

const Chat = () => {
<<<<<<< HEAD
    const { selectedUser } = useChatStore();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`chat-application ${isDarkMode ? 'dark-mode' : ''}`} 
             style={{
                 minHeight: "100vh",
                 background: isDarkMode 
                     ? "linear-gradient(145deg, #1a1c23 0%, #23272f 100%)" 
                     : "linear-gradient(145deg, #f0f4f8 0%, #d7e3fc 100%)",
                 padding: "80px 20px 20px",
                 transition: "all 0.3s ease"
             }}>
            
            {/* Header with app name and dark mode toggle */}
            <div className="position-fixed top-0 start-0 end-0 py-2 px-4" 
                 style={{
                     background: isDarkMode ? "rgba(18, 18, 18, 0.8)" : "rgba(255, 255, 255, 0.8)",
                     backdropFilter: "blur(10px)",
                     borderBottom: isDarkMode ? "1px solid #2d2d2d" : "1px solid rgba(0,0,0,0.08)",
                     zIndex: 1000,
                     transition: "all 0.3s ease"
                 }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="me-2" style={{ 
                            width: "32px", 
                            height: "32px", 
                            borderRadius: "8px", 
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold"
                        }}>
                            SC
                        </div>
                        <h5 className="mb-0" style={{ 
                            color: isDarkMode ? "#e2e8f0" : "#334155",
                            fontWeight: "600"
                        }}>SkillChat</h5>
                    </div>
                    <button 
                        onClick={toggleDarkMode} 
                        className="btn btn-sm" 
                        style={{
                            background: isDarkMode ? "#2d3748" : "#f1f5f9",
                            color: isDarkMode ? "#e2e8f0" : "#334155",
                            border: "none",
                            borderRadius: "8px",
                            padding: "6px 12px",
                            transition: "all 0.2s ease"
                        }}
                    >
                        {isDarkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>
            </div>
            
            {/* Main chat container */}
            <div className="container-fluid" style={{ maxWidth: "1400px" }}>
                <div className="chat-container shadow-lg overflow-hidden" 
                     style={{ 
                         height: 'calc(100vh - 100px)',
                         borderRadius: "16px",
                         border: isDarkMode ? "1px solid #2d3748" : "1px solid rgba(0,0,0,0.08)",
                         background: isDarkMode ? "#1e1e2d" : "#ffffff",
                         transition: "all 0.3s ease"
                     }}>
                    <div className="d-flex h-100">
                        {/* Sidebar with custom styling */}
                        <div className="chat-sidebar" style={{
                            width: "320px",
                            borderRight: isDarkMode ? "1px solid #2d3748" : "1px solid rgba(0,0,0,0.08)",
                            background: isDarkMode ? "#171723" : "#f8fafc",
                            transition: "all 0.3s ease"
                        }}>
                            <Sidebar />
                        </div>
                        
                        {/* Main chat area */}
                        <div className="flex-grow-1 d-flex flex-column h-100 position-relative"
                             style={{
                                 background: isDarkMode ? "#1e1e2d" : "#ffffff",
                                 transition: "all 0.3s ease"
                             }}>
                            {!selectedUser ? <NoChatSelected /> : <ChatContainer isDarkMode={isDarkMode} />}
                        </div>
                    </div>
                </div>
                
                {/* Footer note */}
                <div className="text-center mt-3">
                    <small style={{ 
                        color: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                        transition: "all 0.3s ease"
                    }}>
                        SkillSwapp Chat © {new Date().getFullYear()} - Connectez et partagez vos compétences
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Chat;
=======

    const { selectedUser } = useChatStore();

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="vh-100 bg-light">
                <div className="d-flex justify-content-center pt-5 px-4">
                    <div className="bg-white rounded-lg shadow w-100 max-w-xxl" style={{ height: 'calc(100vh - 8rem)' }}>
                        <div className="d-flex h-100 rounded-lg overflow-hidden">
                            <Sidebar />
                            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Chat;
>>>>>>> origin/tasks

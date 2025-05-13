<<<<<<< HEAD
import { useState, useEffect } from "react";
import { X, Phone, Video, MoreVertical, Info, Star, Archive } from "lucide-react";
=======
import { X } from "lucide-react";
>>>>>>> origin/tasks
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
<<<<<<< HEAD
  const [showOptions, setShowOptions] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastSeen, setLastSeen] = useState("Today at 12:45 PM");

  // Vérifier le mode sombre du système
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener("change", handleChange);
    
    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);

  if (!selectedUser) return null;

  const isOnline = onlineUsers?.includes(selectedUser._id);

  return (
    <div 
      className={`border-bottom ${isDarkMode ? "bg-dark" : "bg-white"}`}
      style={{ 
        backdropFilter: "blur(10px)",
        backgroundColor: isDarkMode ? "rgba(33, 37, 41, 0.95)" : "rgba(255, 255, 255, 0.95)",
        borderColor: isDarkMode ? "#2d3748" : "rgba(0,0,0,0.08)",
        transition: "all 0.3s ease"
      }}
    >
      <div className="d-flex justify-content-between align-items-center p-3">
        <div className="d-flex align-items-center gap-3">
          {/* Avatar avec indicateur de statut */}
          <div className="position-relative">
            <div 
              className="rounded-circle overflow-hidden shadow-sm" 
              style={{ 
                width: "48px", 
                height: "48px",
                border: isDarkMode ? "2px solid #2d3748" : "2px solid #f8f9fa"
              }}
            >
=======

  if (!selectedUser) return null;

  return (
    <div className="border-bottom bg-white">
      <div className="d-flex justify-content-between align-items-center p-3">
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="rounded-circle overflow-hidden" style={{ width: "40px", height: "40px" }}>
>>>>>>> origin/tasks
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName || selectedUser.name || "User"}
                className="w-100 h-100 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avatar.png";
                }}
              />
            </div>
<<<<<<< HEAD
            {isOnline && (
              <span 
                className="position-absolute bottom-0 end-0 rounded-circle border-2"
                style={{ 
                  width: "12px", 
                  height: "12px", 
                  backgroundColor: "#10b981",
                  border: isDarkMode ? "2px solid #1e1e2d" : "2px solid #ffffff"
                }}
              ></span>
            )}
          </div>

          {/* User info avec animation de typing */}
          <div>
            <h6 
              className="mb-0 fw-bold"
              style={{ 
                color: isDarkMode ? "#f8f9fa" : "#212529",
                fontSize: "1rem"
              }}
            >
              {selectedUser.fullName || selectedUser.name || "Anonymous"}
              {selectedUser.verified && (
                <span 
                  className="ms-1 badge rounded-pill"
                  style={{ 
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    fontSize: "0.6rem",
                    padding: "0.2rem 0.4rem"
                  }}
                >
                  ✓
                </span>
              )}
            </h6>
            <div className="d-flex align-items-center gap-1">
              {isOnline ? (
                <div className="d-flex align-items-center">
                  <span 
                    className="d-inline-block me-1 rounded-circle"
                    style={{ 
                      width: "6px", 
                      height: "6px", 
                      backgroundColor: "#10b981" 
                    }}
                  ></span>
                  <small 
                    style={{ 
                      color: isDarkMode ? "#a0aec0" : "#6c757d",
                      fontSize: "0.75rem"
                    }}
                  >
                    Online
                    {Math.random() > 0.7 && (
                      <span className="ms-1 typing-indicator">
                        typing
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    )}
                  </small>
                </div>
              ) : (
                <small 
                  style={{ 
                    color: isDarkMode ? "#a0aec0" : "#6c757d",
                    fontSize: "0.75rem"
                  }}
                >
                  Last seen {lastSeen}
                </small>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex align-items-center gap-2">
          {/* Call buttons */}
          <button
            className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "36px",
              height: "36px",
              background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              color: isDarkMode ? "#e2e8f0" : "#4b5563",
              border: "none"
            }}
            title="Voice call"
          >
            <Phone size={16} />
          </button>
          
          <button
            className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "36px",
              height: "36px",
              background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              color: isDarkMode ? "#e2e8f0" : "#4b5563",
              border: "none"
            }}
            title="Video call"
          >
            <Video size={16} />
          </button>
          
          {/* More options dropdown */}
          <div className="position-relative">
            <button
              className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "36px",
                height: "36px",
                background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                color: isDarkMode ? "#e2e8f0" : "#4b5563",
                border: "none"
              }}
              onClick={() => setShowOptions(!showOptions)}
              title="More options"
            >
              <MoreVertical size={16} />
            </button>
            
            {showOptions && (
              <div 
                className="position-absolute end-0 mt-1 py-1 rounded shadow-lg"
                style={{
                  width: "180px",
                  zIndex: 1000,
                  background: isDarkMode ? "#1e1e2d" : "#ffffff",
                  border: isDarkMode ? "1px solid #2d3748" : "1px solid rgba(0,0,0,0.08)"
                }}
              >
                <ul className="list-unstyled mb-0">
                  {[
                    { icon: <Info size={14} />, text: "View profile" },
                    { icon: <Star size={14} />, text: "Add to favorites" },
                    { icon: <Archive size={14} />, text: "Archive chat" }
                  ].map((item, index) => (
                    <li key={index}>
                      <button 
                        className="btn btn-sm w-100 text-start d-flex align-items-center gap-2 px-3 py-2"
                        style={{
                          color: isDarkMode ? "#e2e8f0" : "#4b5563",
                          fontSize: "0.85rem",
                          background: "transparent",
                          border: "none",
                          transition: "background 0.2s"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {item.icon}
                        <span>{item.text}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Close button */}
          <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "36px",
              height: "36px",
              background: isDarkMode ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              border: "none"
            }}
            title="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Style pour l'animation de typing */}
      <style jsx>{`
        .typing-indicator {
          color: #10b981;
          font-style: italic;
        }
        
        .dot {
          animation: dotTyping 1.5s infinite;
          opacity: 0;
        }
        
        .dot:nth-child(2) {
          animation-delay: 0.5s;
        }
        
        .dot:nth-child(3) {
          animation-delay: 1s;
        }
        
        @keyframes dotTyping {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
=======
          </div>

          {/* User info */}
          <div>
            <h6 className="mb-0">{selectedUser.fullName || selectedUser.name || "Anonymous"}</h6>
            <small className="text-muted">
              {onlineUsers?.includes(selectedUser._id) ? (
                <span className="text-success">Online</span>
              ) : (
                <span className="text-muted">Offline</span>
              )}
            </small>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-link text-muted p-0"
        >
          <X size={20} />
        </button>
      </div>
>>>>>>> origin/tasks
    </div>
  );
};

<<<<<<< HEAD
export default ChatHeader;
=======
export default ChatHeader;



>>>>>>> origin/tasks

<<<<<<< HEAD
import { useEffect, useMemo, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, Filter, X } from "lucide-react";

const Sidebar = ({ isDarkMode }) => {
=======
import { useEffect, useMemo,useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
>>>>>>> origin/tasks
  const { 
    getUsers, 
    users, 
    selectedUser, 
    setSelectedUser, 
    isUsersLoading 
  } = useChatStore();
  
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
<<<<<<< HEAD
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
=======
>>>>>>> origin/tasks

  useEffect(() => {
    getUsers();
  }, [getUsers]);

<<<<<<< HEAD
  // Optimisation avec useMemo pour le filtrage
  const filteredUsers = useMemo(() => {
    let filtered = users;
    
    // Filtre par statut en ligne
    if (showOnlineOnly) {
      filtered = filtered.filter(user => onlineUsers.includes(user._id));
    }
    
    // Filtre par recherche
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(term) || 
        (user.email && user.email.toLowerCase().includes(term))
      );
    }
    
    return filtered;
  }, [users, onlineUsers, showOnlineOnly, searchTerm]);
=======
  // Optimisation avec useMemo
  const filteredUsers = useMemo(() => {
    return showOnlineOnly
      ? users.filter(user => onlineUsers.includes(user._id))
      : users;
  }, [users, onlineUsers, showOnlineOnly]);
>>>>>>> origin/tasks

  // Vérification plus robuste du statut
  const isUserOnline = (userId) => {
    return onlineUsers.some(id => id.toString() === userId.toString());
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
<<<<<<< HEAD
    <aside className="h-100 d-flex flex-column" 
           style={{ 
             width: "320px", 
             background: isDarkMode ? "#171723" : "#f8fafc",
             transition: "all 0.3s ease"
           }}>
      {/* Header */}
      <div className="p-3" style={{ 
        borderBottom: isDarkMode ? "1px solid #2d3748" : "1px solid rgba(0,0,0,0.08)",
      }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <Users size={20} className={isDarkMode ? "text-light" : ""} />
            <h6 className="mb-0 fw-semibold" style={{ color: isDarkMode ? "#e2e8f0" : "#334155" }}>
              Contacts
            </h6>
          </div>
          <button 
            className="btn btn-sm" 
            onClick={() => setShowFilters(!showFilters)}
            style={{
              background: isDarkMode ? "#2d3748" : "#f1f5f9",
              color: isDarkMode ? "#e2e8f0" : "#334155",
              border: "none",
              borderRadius: "8px",
              padding: "4px 8px"
            }}
          >
            <Filter size={16} />
          </button>
        </div>

        {/* Search bar */}
        <div className="position-relative mb-3">
          <input
            type="text"
            placeholder="Rechercher un contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{
              background: isDarkMode ? "#2d3748" : "#fff",
              color: isDarkMode ? "#e2e8f0" : "#334155",
              border: isDarkMode ? "1px solid #4a5568" : "1px solid #e2e8f0",
              borderRadius: "8px",
              paddingLeft: "36px",
              paddingRight: searchTerm ? "36px" : "12px"
            }}
          />
          <Search 
            size={16} 
            className="position-absolute" 
            style={{ 
              left: "12px", 
              top: "50%", 
              transform: "translateY(-50%)",
              color: isDarkMode ? "#a0aec0" : "#94a3b8"
            }} 
          />
          {searchTerm && (
            <button
              className="btn btn-sm position-absolute"
              style={{ 
                right: "8px", 
                top: "50%", 
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                padding: "0",
                color: isDarkMode ? "#a0aec0" : "#94a3b8"
              }}
              onClick={() => setSearchTerm("")}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-2 p-2 rounded" style={{
            background: isDarkMode ? "#2d3748" : "#f1f5f9",
            transition: "all 0.3s ease"
          }}>
            <label className="d-flex align-items-center gap-2 mb-0">
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={showOnlineOnly}
                  onChange={(e) => setShowOnlineOnly(e.target.checked)}
                  style={{
                    cursor: "pointer"
                  }}
                />
              </div>
              <span style={{ 
                fontSize: "0.85rem",
                color: isDarkMode ? "#e2e8f0" : "#334155"
              }}>
                Afficher uniquement en ligne
              </span>
              <span className="badge bg-success rounded-pill ms-auto">
                {onlineUsers.length - 1}
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Contact list */}
      <div className="overflow-auto flex-grow-1 py-2" style={{
        scrollbarWidth: "thin",
        scrollbarColor: isDarkMode ? "#4a5568 #2d3748" : "#cbd5e1 #f1f5f9"
      }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const isOnline = isUserOnline(user._id);
            const isSelected = selectedUser?._id === user._id;
            
            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className="w-100 border-0 text-start p-0"
                style={{ 
                  background: "transparent",
                  outline: "none"
                }}
              >
                <div className="d-flex align-items-center p-3 gap-3" style={{
                  background: isSelected 
                    ? isDarkMode ? "#2d3748" : "#e2e8f0" 
                    : "transparent",
                  borderRadius: "8px",
                  margin: "0 8px 4px 8px",
                  transition: "all 0.2s ease"
                }}>
                  {/* Avatar with online indicator */}
                  <div className="position-relative">
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: isDarkMode ? "2px solid #2d3748" : "2px solid #f1f5f9"
                    }}>
                      <img
                        src={user.profilePic || "/avatar.png"}
                        alt={user.name}
                        className="w-100 h-100 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/avatar.png";
                        }}
                      />
                    </div>
                    {isOnline && (
                      <span
                        className="position-absolute bottom-0 end-0 border-2"
                        style={{ 
                          width: "14px", 
                          height: "14px",
                          background: "#10b981",
                          borderRadius: "50%",
                          border: isDarkMode ? "2px solid #171723" : "2px solid #f8fafc",
                          animation: "pulse 1.5s infinite"
                        }}
                      />
                    )}
                  </div>
                  
                  {/* User info */}
                  <div className="flex-grow-1 min-width-0">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 
                        className="mb-0 text-truncate" 
                        style={{ 
                          fontSize: "0.95rem", 
                          fontWeight: "600",
                          color: isDarkMode ? "#e2e8f0" : "#334155",
                          maxWidth: "160px"
                        }}
                      >
                        {user.name}
                      </h6>
                      <small style={{ 
                        fontSize: "0.75rem",
                        color: isDarkMode ? "#a0aec0" : "#94a3b8"
                      }}>
                        {user.lastMessageTime || ""}
                      </small>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <p 
                        className="mb-0 text-truncate" 
                        style={{ 
                          fontSize: "0.8rem",
                          color: isDarkMode ? "#a0aec0" : "#64748b",
                          maxWidth: "180px"
                        }}
                      >
                        {user.lastMessage || (isOnline ? "En ligne" : "Hors ligne")}
                      </p>
                      
                      {user.unreadCount > 0 && (
                        <span className="badge rounded-pill" style={{
                          background: "#3b82f6",
                          fontSize: "0.7rem",
                          minWidth: "20px"
                        }}>
                          {user.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-center p-4">
            <div style={{ 
              color: isDarkMode ? "#a0aec0" : "#64748b",
              fontSize: "0.9rem" 
            }}>
              {searchTerm 
                ? "Aucun résultat trouvé" 
                : showOnlineOnly 
                  ? "Aucun contact en ligne" 
                  : "Aucun contact disponible"}
            </div>
            {searchTerm && (
              <button 
                className="btn btn-sm mt-2" 
                onClick={() => setSearchTerm("")}
                style={{
                  background: isDarkMode ? "#2d3748" : "#e2e8f0",
                  color: isDarkMode ? "#e2e8f0" : "#334155",
                  border: "none",
                  borderRadius: "8px"
                }}
              >
                Effacer la recherche
              </button>
            )}
=======
    <aside className="h-100 w-20 w-lg-72 border-end border-light d-flex flex-column">
      <div className="border-bottom border-light w-100 p-3">
        <div className="d-flex align-items-center gap-2">
          <Users className="w-5 h-5" />
          <span className="font-weight-medium d-none d-lg-block">Contacts</span>
        </div>

        <div className="mt-2 d-none d-lg-flex align-items-center gap-2">
          <label className="cursor-pointer d-flex align-items-center gap-1">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="form-check-input"
            />
            <span className="text-sm" style={{ fontSize: "0.8rem" }}>
              Show online only
            </span>
            <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>

          </label>
        </div>
      </div>

      <div className="overflow-auto w-100 py-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-100 p-2 d-flex align-items-center gap-2
              hover:bg-light transition-colors
              ${selectedUser?._id === user._id ? "bg-light border-1 border-light" : ""}
            `}
            style={{ fontSize: "0.85rem" }}
          >
            <div className="position-relative mx-auto mx-lg-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="w-8 h-8 object-cover rounded-circle"
                style={{ width: "32px", height: "32px" }}
              />
              {isUserOnline(user._id) && (
                <span
                  className="position-absolute bottom-0 end-0 translate-middle p-1 bg-success border border-light rounded-circle"
                  style={{ 
                    width: "10px", 
                    height: "10px",
                    animation: "pulse 1.5s infinite"
                  }}
                />
              )}
            </div>

            <div className="d-none d-lg-block text-start min-w-0">
              <div 
                className="text-truncate" 
                style={{ 
                  fontSize: "0.85rem", 
                  fontWeight: "500",
                  color: isUserOnline(user._id) ? "#4CAF50" : "inherit"
                }}
              >
                {user.name}
              </div>
              <div 
                className="text-muted" 
                style={{ fontSize: "0.75rem" }}
              >
                {isUserOnline(user._id) ? (
                  <span className="text-success">Online</span>
                ) : (
                  <span className="text-muted">Offline</span>
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-muted py-4" style={{ fontSize: "0.85rem" }}>
            {showOnlineOnly ? "No online users" : "No contacts available"}
>>>>>>> origin/tasks
          </div>
        )}
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
<<<<<<< HEAD
        
        /* Custom scrollbar for Webkit browsers */
        .overflow-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-auto::-webkit-scrollbar-track {
          background: ${isDarkMode ? "#2d3748" : "#f1f5f9"};
        }
        
        .overflow-auto::-webkit-scrollbar-thumb {
          background-color: ${isDarkMode ? "#4a5568" : "#cbd5e1"};
          border-radius: 6px;
        }
=======
>>>>>>> origin/tasks
      `}</style>
    </aside>
  );
};

export default Sidebar;
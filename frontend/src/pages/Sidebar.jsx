import { useEffect, useMemo,useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { 
    getUsers, 
    users, 
    selectedUser, 
    setSelectedUser, 
    isUsersLoading 
  } = useChatStore();
  
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Optimisation avec useMemo
  const filteredUsers = useMemo(() => {
    return showOnlineOnly
      ? users.filter(user => onlineUsers.includes(user._id))
      : users;
  }, [users, onlineUsers, showOnlineOnly]);

  // Vérification plus robuste du statut
  const isUserOnline = (userId) => {
    return onlineUsers.some(id => id.toString() === userId.toString());
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
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
      `}</style>
    </aside>
  );
};

export default Sidebar;
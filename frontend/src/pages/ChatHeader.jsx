import { X } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className="border-bottom bg-white">
      <div className="d-flex justify-content-between align-items-center p-3">
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="rounded-circle overflow-hidden" style={{ width: "40px", height: "40px" }}>
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
    </div>
  );
};

export default ChatHeader;




import { X } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-bottom border-muted">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="rounded-circle overflow-hidden" style={{ width: "40px", height: "40px" }}>
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.name}
                className="w-100 h-100 object-cover"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h5 className="mb-0">{selectedUser.name}</h5>
            <p className="mb-0 text-muted small">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-sm btn-link text-muted"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

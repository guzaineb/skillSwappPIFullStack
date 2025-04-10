import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-100 w-20 w-lg-72 border-end border-light d-flex flex-column">
      <div className="border-bottom border-light w-100 p-3">
        <div className="d-flex align-items-center gap-2">
          <Users className="w-5 h-5" />
          <span className="font-weight-medium d-none d-lg-block">Contacts</span>
        </div>

        {/* Online filter toggle */}
        <div className="mt-2 d-none d-lg-flex align-items-center gap-2">
          <label className="cursor-pointer d-flex align-items-center gap-1">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="form-check-input"
            />
            <span className="text-sm" style={{ fontSize: "0.8rem" }}>Show online only</span>
          </label>
          <span className="text-muted" style={{ fontSize: "0.75rem" }}>
            ({onlineUsers.length - 1} online)
          </span>
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
              {onlineUsers.includes(user._id) && (
                <span
                  className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-light"
                  style={{ width: "8px", height: "8px" }}
                />
              )}
            </div>

            {/* User info visible only on large screens */}
            <div className="d-none d-lg-block text-start min-w-0">
              <div className="text-truncate" style={{ fontSize: "0.85rem", fontWeight: "500" }}>
                {user.fullName}
              </div>
              <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-muted py-4" style={{ fontSize: "0.85rem" }}>
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

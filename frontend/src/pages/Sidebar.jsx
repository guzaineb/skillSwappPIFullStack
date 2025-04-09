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
      <div className="border-bottom border-light w-100 p-4">
        <div className="d-flex align-items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-weight-medium d-none d-lg-block">Contacts</span>
        </div>

        {/* TODO: Online filter toggle */}
        <div className="mt-3 d-none d-lg-flex align-items-center gap-2">
          <label className="cursor-pointer d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="form-check-input"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-muted">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-auto w-100 py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-100 p-3 d-flex align-items-center gap-3
              hover:bg-light transition-colors
              ${selectedUser?._id === user._id ? "bg-light border-1 border-light" : ""}
            `}
          >
            <div className="relative mx-auto mx-lg-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="w-10 h-10 object-cover rounded-circle"  // Réduction de la taille de l'image
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="position-absolute bottom-0 end-0 w-2.5 h-2.5 bg-success 
                  rounded-circle border-2 border-light"
                />
              )}
            </div>

            {/* Info utilisateur - visible uniquement sur les grands écrans */}
            <div className="d-none d-lg-block text-start min-w-0">
              <div className="font-weight-medium text-truncate">{user.fullName}</div>
              <div className="text-sm text-muted">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-muted py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

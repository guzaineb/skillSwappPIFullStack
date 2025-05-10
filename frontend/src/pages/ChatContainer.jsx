import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/useChatStore";


const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { user, socket } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    
    getMessages(selectedUser._id);
    
    // Only subscribe if socket is connected
    if (socket?.connected) {
      subscribeToMessages();
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages, socket]);

  // Ajoutez ces logs pour debug
  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-y-auto p-4">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`d-flex align-items-start gap-3 mb-4 ${
                message.senderId._id === user._id ? "flex-row-reverse" : ""
              }`}
            >
              <div className="avatar">
                <div className="rounded-circle overflow-hidden" style={{ width: "40px", height: "40px" }}>
                  <img
                    src={
                      message.senderId._id === user._id
                        ? user.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="w-100 h-100 object-cover"
                  />
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="mb-1">
                  <small className="text-muted">
                    {formatMessageTime(message.createdAt)}
                  </small>
                </div>
                <div className={`chat-bubble d-flex flex-column ${message.error ? 'error' : ''}`}>
                  {message.image && (
                    <div className="message-image-container mb-2">
                      <img
                        src={message.image}
                        alt="Message attachment"
                        className="img-fluid rounded"
                        style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
                        onError={(e) => {
                          console.error("Image loading error:", e);
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  {message.content && <p className="mb-0">{message.content}</p>}
                  {message.pending && <small className="text-muted">Sending...</small>}
                  {message.error && <small className="text-danger">Failed to send</small>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No messages yet</p>
        )}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;





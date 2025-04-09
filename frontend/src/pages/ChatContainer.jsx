import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/authStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { user } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && Array.isArray(messages)) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="d-flex flex-column overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column flex-grow-1 overflow-auto">
      <ChatHeader />

      <div className="flex-grow-1 overflow-y-auto p-4">
        {/* Vérification que messages est un tableau */}
        {Array.isArray(messages) ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`d-flex align-items-start gap-3 mb-4 ${
                message.senderId === user._id ? "flex-row-reverse" : ""
              }`}
              ref={messageEndRef}
            >
              <div className="avatar">
                <div className="rounded-circle overflow-hidden" style={{ width: "40px", height: "40px" }}>
                  <img
                    src={
                      message.senderId === user._id
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
                <div className="chat-bubble d-flex flex-column">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="img-fluid rounded mb-2"
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                  {message.text && <p className="mb-0">{message.text}</p>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No messages available</p>
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

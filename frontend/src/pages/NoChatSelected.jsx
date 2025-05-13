import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center p-4 bg-light bg-opacity-50">
      <div className="max-w-md text-center space-y-4">
        {/* Icon Display */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <div className="position-relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary bg-opacity-10 d-flex align-items-center justify-content-center animate__animated animate__bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="fs-2 fw-bold">Welcome to Chatty!</h2>
        <p className="text-muted">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

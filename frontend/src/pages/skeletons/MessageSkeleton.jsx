const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`d-flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
          <div className="d-flex align-items-center">
            <div className="skeleton rounded-circle" style={{ width: "40px", height: "40px" }} />
          </div>

          <div className="ms-2 flex-grow-1">
            {/* Skeleton Header */}
            <div className="skeleton" style={{ height: "1rem", width: "4rem", marginBottom: "0.5rem" }} />

            {/* Skeleton Bubble */}
            <div className="skeleton" style={{ height: "4rem", width: "200px" }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;

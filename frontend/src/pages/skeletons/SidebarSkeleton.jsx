import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="d-flex flex-column border-end border-secondary p-3 transition-all"
      style={{ height: "100vh" }}
    >
      {/* Header */}
      <div className="border-bottom border-secondary p-3">
        <div className="d-flex align-items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="fw-medium d-none d-lg-block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-auto py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="d-flex align-items-center gap-3 p-2">
            {/* Avatar skeleton */}
            <div className="d-flex justify-content-center">
              <div className="skeleton rounded-circle" style={{ width: "48px", height: "48px" }} />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="d-none d-lg-block flex-grow-1">
              <div className="skeleton" style={{ height: "1rem", width: "8rem", marginBottom: "0.5rem" }} />
              <div className="skeleton" style={{ height: "0.75rem", width: "4rem" }} />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;

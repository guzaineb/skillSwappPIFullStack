import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, user } = useAuthStore();

  return (
    <header className="bg-light border-bottom fixed-top w-100 z-40 backdrop-blur-lg bg-opacity-80">
      <div className="container-fluid px-3 py-2">
        <div className="d-flex justify-content-between align-items-center h-100">
          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <div className="rounded-lg bg-primary bg-opacity-10 d-flex align-items-center justify-content-center p-2">
                <MessageSquare className="w-20px h-20px text-primary" />
              </div>
              <h1 className="h5 fw-bold mb-0">Chatty</h1>
            </Link>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link to={"/settings"} className="btn btn-sm d-flex align-items-center gap-2">
              <Settings className="w-16px h-16px" />
              <span className="d-none d-sm-inline">Settings</span>
            </Link>

            {user && (
              <>
                <Link to={"/profile"} className="btn btn-sm d-flex align-items-center gap-2">
                  <User className="w-16px h-16px" />
                  <span className="d-none d-sm-inline">Profile</span>
                </Link>

                <button className="btn btn-sm d-flex align-items-center gap-2" onClick={logout}>
                  <LogOut className="w-16px h-16px" />
                  <span className="d-none d-sm-inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

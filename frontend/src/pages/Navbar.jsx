import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { 
  LogOut, 
  MessageSquare, 
  Settings, 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Menu, 
  Search 
} from "lucide-react";

const Navbar = () => {
  const { logout, user } = useAuthStore();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Détecter le défilement pour l'effet de shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Basculer le mode sombre
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <header 
      className={`fixed-top w-100 z-40 ${
        isDarkMode ? "bg-dark" : "bg-white"
      } ${
        isScrolled ? "shadow-sm" : ""
      }`}
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: isDarkMode 
          ? "rgba(33, 37, 41, 0.85)" 
          : "rgba(255, 255, 255, 0.85)",
        transition: "all 0.3s ease"
      }}
    >
      <div className="container-fluid px-3 py-2">
        <div className="d-flex justify-content-between align-items-center h-100">
          {/* Logo et marque */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <div 
                className="rounded-lg d-flex align-items-center justify-content-center p-2"
                style={{ 
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  boxShadow: "0 4px 6px rgba(79, 70, 229, 0.15)"
                }}
              >
                <MessageSquare className="text-white" size={20} />
              </div>
              <h1 
                className="h5 fw-bold mb-0"
                style={{ 
                  color: isDarkMode ? "#f8f9fa" : "#212529",
                  letterSpacing: "-0.5px"
                }}
              >
                Chatty
              </h1>
            </Link>
            
            {/* Navigation principale - visible sur desktop uniquement */}
            <nav className="d-none d-md-flex">
              <ul className="list-unstyled d-flex mb-0 ms-4 gap-4">
                {["Home", "Explore", "Messages", "Help"].map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/${item.toLowerCase()}`}
                      className="text-decoration-none position-relative"
                      style={{ 
                        color: isDarkMode ? "#e2e8f0" : "#4b5563",
                        fontWeight: location.pathname === `/${item.toLowerCase()}` ? "600" : "400",
                        fontSize: "0.95rem"
                      }}
                    >
                      {item}
                      {location.pathname === `/${item.toLowerCase()}` && (
                        <span 
                          className="position-absolute"
                          style={{
                            height: "3px",
                            width: "100%",
                            background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                            bottom: "-8px",
                            left: 0,
                            borderRadius: "3px"
                          }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bouton menu mobile */}
          <button 
            className="btn d-md-none p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ 
              color: isDarkMode ? "#e2e8f0" : "#4b5563",
              background: "transparent"
            }}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>

          {/* Actions utilisateur */}
          <div className="d-none d-md-flex align-items-center gap-3">
            {/* Barre de recherche */}
            <div 
              className="position-relative d-none d-lg-block"
              style={{
                width: "200px"
              }}
            >
              <input
                type="text"
                placeholder="Rechercher..."
                className="form-control form-control-sm"
                style={{
                  background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                  border: "none",
                  borderRadius: "20px",
                  paddingLeft: "32px",
                  fontSize: "0.85rem",
                  color: isDarkMode ? "#e2e8f0" : "#4b5563"
                }}
              />
              <Search 
                size={14} 
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: isDarkMode ? "#a0aec0" : "#9ca3af"
                }}
              />
            </div>

            {/* Toggle mode sombre/clair */}
            <button 
              className="btn btn-sm"
              onClick={toggleDarkMode}
              style={{
                background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                color: isDarkMode ? "#e2e8f0" : "#4b5563",
                borderRadius: "20px",
                width: "32px",
                height: "32px",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Notifications */}
            <button 
              className="btn btn-sm position-relative"
              style={{
                background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                color: isDarkMode ? "#e2e8f0" : "#4b5563",
                borderRadius: "20px",
                width: "32px",
                height: "32px",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span 
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.6rem" }}
              >
                2
              </span>
            </button>

            {/* Liens et boutons utilisateur */}
            <Link 
              to="/settings" 
              className="btn btn-sm"
              style={{
                background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                color: isDarkMode ? "#e2e8f0" : "#4b5563",
                borderRadius: "20px",
                padding: "6px 12px",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <Settings size={16} />
              <span>Settings</span>
            </Link>

            {user && (
              <>
                <Link 
                  to="/profile" 
                  className="btn btn-sm"
                  style={{
                    background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                    color: isDarkMode ? "#e2e8f0" : "#4b5563",
                    borderRadius: "20px",
                    padding: "6px 12px",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <div className="position-relative">
                    {user.profilePic ? (
                      <img 
                        src={user.profilePic} 
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: "20px", height: "20px", objectFit: "cover" }}
                      />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <span>Profile</span>
                </Link>

                <button 
                  className="btn btn-sm"
                  onClick={logout}
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    borderRadius: "20px",
                    padding: "6px 12px",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div 
          className="d-md-none py-2 px-3"
          style={{
            background: isDarkMode ? "#212529" : "#ffffff",
            borderTop: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)"
          }}
        >
          <div className="d-flex flex-column gap-2">
            {/* Navigation mobile */}
            <nav className="mb-3">
              <ul className="list-unstyled mb-0">
                {["Home", "Explore", "Messages", "Help"].map((item) => (
                  <li key={item} className="mb-2">
                    <Link 
                      to={`/${item.toLowerCase()}`}
                      className="d-block py-2 px-3 text-decoration-none rounded"
                      style={{ 
                        color: isDarkMode ? "#e2e8f0" : "#4b5563",
                        background: location.pathname === `/${item.toLowerCase()}` 
                          ? isDarkMode ? "rgba(79, 70, 229, 0.1)" : "rgba(79, 70, 229, 0.05)"
                          : "transparent",
                        fontWeight: location.pathname === `/${item.toLowerCase()}` ? "600" : "400"
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Recherche mobile */}
            <div className="position-relative mb-3">
              <input
                type="text"
                placeholder="Rechercher..."
                className="form-control"
                style={{
                  background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                  border: "none",
                  borderRadius: "20px",
                  paddingLeft: "36px",
                  fontSize: "0.9rem",
                  color: isDarkMode ? "#e2e8f0" : "#4b5563"
                }}
              />
              <Search 
                size={16} 
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: isDarkMode ? "#a0aec0" : "#9ca3af"
                }}
              />
            </div>

            {/* Actions utilisateur mobile */}
            <div className="d-flex flex-column gap-2">
              <Link 
                to="/settings" 
                className="btn d-flex align-items-center"
                style={{
                  background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                  color: isDarkMode ? "#e2e8f0" : "#4b5563",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontSize: "0.9rem",
                  justifyContent: "flex-start",
                  gap: "10px"
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>

              {user && (
                <>
                  <Link 
                    to="/profile" 
                    className="btn d-flex align-items-center"
                    style={{
                      background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                      color: isDarkMode ? "#e2e8f0" : "#4b5563",
                      borderRadius: "8px",
                      padding: "10px 16px",
                      fontSize: "0.9rem",
                      justifyContent: "flex-start",
                      gap: "10px"
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>

                  <button 
                    className="btn d-flex align-items-center"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      background: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                      borderRadius: "8px",
                      padding: "10px 16px",
                      fontSize: "0.9rem",
                      justifyContent: "flex-start",
                      gap: "10px"
                    }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>

            {/* Toggle mode sombre/clair mobile */}
            <button 
              className="btn d-flex align-items-center mt-2"
              onClick={toggleDarkMode}
              style={{
                background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                color: isDarkMode ? "#e2e8f0" : "#4b5563",
                borderRadius: "8px",
                padding: "10px 16px",
                fontSize: "0.9rem",
                justifyContent: "flex-start",
                gap: "10px"
              }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
import { useEffect, useState } from 'react';
import { useAuthStore } from "../../store/authStore";
import ProfileIcon from './ProfileIcon';

function Header() {
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await checkAuth();
        console.log("Response from checkAuth:", result);
        setIsLoggedIn(result.success);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
      }
    };

    verifyUser();
  }, [checkAuth]);

  const toggleDarkMode = () => {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  };

  const toggleLightMode = () => {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  };

  return (
    <div className="header-fixed">
      <nav className="navbar navbar-expand-lg navbar-light bg-light header-nav sticky-top">
        <div className="container-fluid">
          {/* ... other navbar code ... */}

          {/* Right Side Buttons */}
          <ul className="navbar-nav ms-3">
            {/* Dark Mode Toggle */}
            <li className="nav-item d-flex align-items-center">
              <button className="btn btn-light me-2" onClick={toggleDarkMode}>
                <i className="fa-solid fa-moon"></i>
              </button>
              <button className="btn btn-light" onClick={toggleLightMode}>
                <i className="fa-solid fa-sun"></i>
              </button>
            </li>

            {/* Profile or Auth */}
            <li className="nav-item ms-3">
              {isLoggedIn ? (
                <ProfileIcon user={user} />
              ) : (
                <>
                  <a className="nav-link" href="/signin">Signin</a>
                  <a className="nav-link" href="/signup">Signup</a>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;

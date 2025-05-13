
import React, { useEffect,useState } from 'react';
import { useAuthStore } from "../../store/authStore";
import { Camera } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import {Outlet,Link} from "react-router-dom";
import { fetchRandomQuote } from '../../services/quote.service';

function DashboardUser() {
  const { user, isUpdatingProfile,isAuthenticated, updateProfile,checkAuth } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
    const [quote, setQuote] = useState({ content: '', author: '' });

    useEffect(() => {
      const loadQuote = async () => {
        const newQuote = await fetchRandomQuote();
        setQuote(newQuote);
      };
      loadQuote();
    }, []);

      useEffect(() => {
        const verifyUser = async () => {
          try {
            const result = await checkAuth();
            console.log("Response from checkAuth:", result); // Debugging log
            setIsLoggedIn(result.success);
          } catch (error) {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            setIsLoggedIn(false); // Handle errors by setting logged in status to false
          }
        };
    
        if (!isAuthenticated) { // Check only if user is not authenticated already
          verifyUser();
        }
      }, [isAuthenticated, checkAuth]); 
    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        await updateProfile({ profilePic: base64Image });
      };
    };
     console.log({user});
    return (
      <>
        <div className="main-wrapper">
          {/* Header */}
          <Header />
          <div className="breadcrumb-bar breadcrumb-bar-info">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-12">
                  <div className="breadcrumb-list">
                    <h2 className="breadcrumb-title">Profile</h2>
                    <nav aria-label="breadcrumb" className="page-breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index-2.html">Welcome to SkillSwapp</a></li>
                        
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

 {/* Daily Motivation Quote Section - Add this */}
 <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card motivation-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Daily Motivation</h5>
                  <blockquote className="blockquote mb-0">
                    <p>"{quote.content}"</p>
                    <footer className="blockquote-footer mt-2">
                      <cite title="Source Title">{quote.author}</cite>
                    </footer>
                  </blockquote>
                  <button 
  className="btn btn-sm btn-outline-primary mt-3"
  onClick={async () => {
    const newQuote = await fetchRandomQuote();
    setQuote(newQuote);
  }}
>
  New Quote
</button>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* /Breadcrumb */}
          {/* Page Content */}
          <div className="page-content">
            <div className="container">
              <div className="row">
                {/* Sidebar */}
                <div className="col-xl-3 col-lg-3">
                  <div className="settings-widget dash-profile">
                    <div className="settings-menu">
                      <div className="profile-bg">
                        <div className="profile-img">
                          <a href="student-profile.html">
                            <img src={selectedImg || user?.profilePic || user?.avatar || "/avatar.png"} alt="Img" className="img-fluid" />
                          </a>
                        </div>
                      </div>
                      <label
                        htmlFor="avatar-upload"
                        className={`position-absolute bottom-0 end-0 bg-dark p-2 rounded-circle cursor-pointer ${isUpdatingProfile ? "animate-pulse disabled" : ""}`}
                      >
                        <Camera className="text-light" />
                        <input
                          type="file"
                          id="avatar-upload"
                          className="d-none"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUpdatingProfile}
                        />
                      </label>
                      <p className="text-muted">
                        {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                      </p>
                      <div className="profile-group">
                        <div className="profile-name text-center">
                          <h4>{user?.name}</h4>
                          <p className="px-4 py-2 bg-light rounded border">{user?.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="settings-widget account-settings">
                    <div className="settings-menu">
                      <h3>Dashboard</h3>
                      <ul className="nav flex-column">
                      <li className="nav-item ">
                         
                         <Link className="nav-link" to="/Profile1">
                       <i className="bx bxs-user"/>
                       Skill List
                         </Link>
                       </li>
                        <li className="nav-item ">
                         
                          <Link className="nav-link" to="/Profile1/profile2">
                        <i className="bx bxs-user"/>
                        My Profile
                          </Link>
                        </li>
                        <li className="nav-item ">
                         
                         <Link className="nav-link" to="/Profile1/update-password">
                       <i className="bx bxs-user"/>
                       Update Password 
                         </Link>
                       </li>
                       <li className="nav-item ">
                         
                         <Link className="nav-link" to="/Profile1/learnskills">
                       <i className="bx bxs-user"/>
                       Learn new skills
                         </Link>
                       </li>

                       <li className="nav-item ">
                         
                     
                       </li>
                       <li >
                       <Link className="nav-link" to="/Profile1/Quiz/:id">
                       <i className="bx bxs-user"/>
                       Pass Quiz
                         </Link>
                       </li>
                       <li className="nav-item ">
                         
                         <Link className="nav-link" to="/Profile1/Chat">
                       <i className="bx bxs-user"/>
                       ChatRoom
                         </Link>
                       </li>
                        {/* Additional list items */}
                      </ul>
                     
                      
                    </div>
                  </div>
                </div>
                {/* /Sidebar */}
                <div className="col-xl-9 col-lg-9">	
 
                     <Outlet/>
 
 </div>	
              </div>
            </div>
          </div>
          {/* /Page Content */}
          {/* Footer */}
          <Footer />
          {/* /Footer */}
        </div>
      </>
   )
}
export default DashboardUser;
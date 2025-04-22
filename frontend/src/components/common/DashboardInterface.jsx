import React, { useEffect,useState } from 'react';
import { useAuthStore } from "../../store/authStore";
import { Camera } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import {Outlet,Link} from "react-router-dom";
export default function DashboardInterface() {
    const { user, isUpdatingProfile,isAuthenticated, updateProfile,checkAuth } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
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
                        <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Profile</li>
                      </ol>
                    </nav>
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
                         
                          <Link className="nav-link" to="/Profile">
                        <i className="bx bxs-user"/>
                        My Profile
                          </Link>
                        </li>
                        <li className="nav-item ">
                         
                         <Link className="nav-link" to="/Profile/update-password">
                       <i className="bx bxs-user"/>
                       Update Password 
                         </Link>
                       </li>
                       <li className="nav-item ">
                         
                         <Link className="nav-link" to="/Profile/Categories">
                       <i className="bx bxs-user"/>
                       Categories
                         </Link>
                       </li>
                  
                       <li className="nav-item ">
                         
                         <Link className="nav-link" to="/Profile/skills">
                       <i className="bx bxs-user"/>
                       List skills
                         </Link>
                       </li>
                       <li >
                       <Link className="nav-link" to="/Profile/CreateQuiz">
                       <i className="bx bxs-user"/>
                       Create Quiz
                         </Link>
                       </li>

                       <li >
                       <Link className="nav-link" to="/ProfileCoursDetails">
                       <i className="bx bxs-user"/>
                       Cours Details
                         </Link>
                       </li>

                       <li >
                       <Link className="nav-link" to="/Profile/Quizzes">
                       <i className="bx bxs-user"/>
                       Quizzes
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
                <div class="col-xl-9 col-lg-9">	
 
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

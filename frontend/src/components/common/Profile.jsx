import React, { useEffect,useState } from 'react';
import { useAuthStore } from "../../store/authStore";
import { Camera } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

function Profile() {
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
  
              {/* Student Profile */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details mb-0">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>My Profile</h3>
                    </div>

                    <div className="course-group profile-upload-group mb-0 d-flex">
                      <div className="course-group-img profile-edit-field d-flex align-items-center">
                        <a href="student-profile.html" className="profile-pic">
                          <img src={selectedImg || user?.profilePic ||user?.avatar ||"/avatar.png"} alt="Img" className="img-fluid" />
                        </a>
                        <div className="profile-upload-head">
                          <h4><a href="student-profile.html">Your avatar</a></h4>
                          <p>PNG or JPG no bigger than 800px width and height</p>
                          <div className="new-employee-field">
                            <div className="d-flex align-items-center mt-2">
                              <div className="image-upload mb-0">
                                <input type="file" className="form-control" />
                                
                              </div>
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="checkout-form personal-address">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="contact-info">
                            <h6>Name</h6>
                            <p className="px-4 py-2 bg-light rounded border">{user?.name}</p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="contact-info">
                            <h6>Email</h6>
                            <p className="px-4 py-2 bg-light rounded border">{user?.email}</p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="contact-info">
                            <h6>Phone Number</h6>
                            <p className="px-4 py-2 bg-light rounded border">{user?.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Student Profile */}
           
    </>
  );
}

export default Profile;
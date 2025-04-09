import React from 'react'
import { useAuthStore } from "../../store/authStore"; // Importation du store (Zustand ou autre)
import  { useState } from 'react';

import { Camera } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
function Profile() {
  const { user, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  
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
                <h2 className="breadcrumb-title">Settings</h2>
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
        {/* sidebar */}
        <div className="col-xl-3 col-lg-3 theiaStickySidebar">
          <div className="settings-widget dash-profile">
            <div className="settings-menu">
              <div className="profile-bg">
              <div className="profile-img">
  <a href="student-profile.html">
    <img src={selectedImg || user?.profilePic || "/avatar.png"} alt="Img" />
  </a>
</div>

              </div>
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
              <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
              <div className="profile-group">
                <div className="profile-name text-center">

                  <h4><a href="student-profile.html">Rolands Richard</a></h4>
                  <p>Student</p>
                </div>
              </div>
            </div>
          </div>
          <div className="settings-widget account-settings">
            <div className="settings-menu">
              <h3>Dashboard</h3>
              <ul>
                <li className="nav-item ">
                  <a href="student-dashboard.html" className="nav-link">
                    <i className="bx bxs-tachometer" />Dashboard
                  </a>
                </li>
                <li className="nav-item active">
                  <a href="student-profile.html" className="nav-link">
                    <i className="bx bxs-user" />My Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-courses.html" className="nav-link">
                    <i className="bx bxs-graduation" />Enrolled Courses
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-wishlist.html" className="nav-link">
                    <i className="bx bxs-heart" />Wishlist
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-reviews.html" className="nav-link">
                    <i className="bx bxs-star" />Reviews
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-quiz.html" className="nav-link">
                    <i className="bx bxs-shapes" />My Quiz Attempts
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-order-history.html" className="nav-link">
                    <i className="bx bxs-cart" />Order History
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-qa.html" className="nav-link">
                    <i className="bx bxs-bookmark-alt" />Question &amp; Answer
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-referral.html" className="nav-link">
                    <i className="bx bxs-user-plus" />Referrals
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-messages.html" className="nav-link">
                    <i className="bx bxs-chat" />Messages
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-tickets.html" className="nav-link">
                    <i className="bx bxs-coupon" />Support Tickets
                  </a>
                </li>
              </ul>
              <h3>Account Settings</h3>
              <ul>
                <li className="nav-item">
                  <a href="student-settings.html" className="nav-link ">
                    <i className="bx bxs-cog" />Settings
                  </a>
                </li>
                <li className="nav-item">
                  <a href="index-2.html" className="nav-link">
                    <i className="bx bxs-log-out" />Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>			
        </div>
        {/* /Sidebar */}
        {/* Student Profile */}
        <div className="col-xl-9 col-lg-9">	
          <div className="settings-widget card-details mb-0">
            <div className="settings-menu p-0">
              <div className="profile-heading">
                <h3>My Profile</h3>
              </div>
              <div className="checkout-form personal-address">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="contact-info">
                      <h6>Name</h6>
                      <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.name}</p>
                      </div>
                  </div>
                 
        
                  <div className="col-sm-6">
                    <div className="contact-info">
                      <h6>Email</h6>
                      <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.email}</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="contact-info">
                      <h6>Phone Number</h6>
                      <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.phone}</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>	
        {/* Student Profile */}
      </div>
    </div>
  </div>	
  {/* /Page Content */}
  {/* Footer */}
 <Footer />
  {/* /Footer */}
</div>

    </>  )
}

export default Profile
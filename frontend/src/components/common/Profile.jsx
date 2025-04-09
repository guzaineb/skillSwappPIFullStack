import React, { useState } from 'react';
import { useAuthStore } from "../../store/authStore";
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
                          <img src={selectedImg || user?.profilePic || "/avatar.png"} alt="Img" className="img-fluid" />
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
                      <li className="nav-item">
                        <a href="student-dashboard.html" className="nav-link">
                          <i className="bx bxs-tachometer" /> Dashboard
                        </a>
                      </li>
                      <li className="nav-item active">
                        <a href="/Profile" className="nav-link">
                          <i className="bx bxs-user" /> My Profile
                        </a>
                      </li>
                      {/* Additional list items */}
                    </ul>
                    <h3 className="mt-4">Account Settings</h3>
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a href="student-settings.html" className="nav-link">
                          <i className="bx bxs-cog" /> Settings
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="index-2.html" className="nav-link">
                          <i className="bx bxs-log-out" /> Logout
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

                    <div className="course-group profile-upload-group mb-0 d-flex">
                      <div className="course-group-img profile-edit-field d-flex align-items-center">
                        <a href="student-profile.html" className="profile-pic">
                          <img src={selectedImg || user?.profilePic || "/avatar.png"} alt="Img" className="img-fluid" />
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
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Footer */}
        <Footer />
        {/* /Footer */}
      </div>
    </>
  );
}

export default Profile;

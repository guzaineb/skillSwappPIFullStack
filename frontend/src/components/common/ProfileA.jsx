import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { Camera } from "lucide-react";

function ProfileA() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const user = {
    name: "Mariem Tlili",
    role: "Admin",
    profilePic: null,
    avatar: null
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUpdatingProfile(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result);
        setIsUpdatingProfile(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main-wrapper">
      <Header />

      {/* Breadcrumb */}
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list text-center">
                <h2 className="breadcrumb-title">My Profile</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      My Profile
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                        <img
                          src={
                            selectedImg ||
                            user?.profilePic ||
                            user?.avatar ||
                            "/avatar.png"
                          }
                          alt="Img"
                          className="img-fluid"
                        />
                      </a>
                    </div>
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className={`position-absolute bottom-0 end-0 bg-dark p-2 rounded-circle cursor-pointer ${
                      isUpdatingProfile ? "animate-pulse disabled" : ""
                    }`}
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
                  <p className="text-muted text-center mt-2">
                    {isUpdatingProfile
                      ? "Uploading..."
                      : "Click the camera icon to update your photo"}
                  </p>
                  <div className="profile-group">
                    <div className="profile-name text-center">
                      <h4>{user?.name}</h4>
                      <p className="px-4 py-2 bg-light rounded border">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-widget account-settings">
                <div className="settings-menu">
                  <h3>Dashboard</h3>
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <Link className="nav-link" to="/Dash">
                        <i className="bx bxs-user" /> Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/ProfileA">
                        <i className="bx bxs-user" /> My Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/settings">
                        <i className="bx bxs-user" /> Settings
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Profile Content */}
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
                          <h6>First Name</h6>
                          <p>Tlili</p>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="contact-info">
                          <h6>Last Name</h6>
                          <p>Mariem</p>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="contact-info">
                          <h6>Date of Birth</h6>
                          <p>03/06/1999</p>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="contact-info">
                          <h6>Email</h6>
                          <p>mariemtlili@gmail.com</p>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="contact-info">
                          <h6>Phone Number</h6>
                          <p>888888888</p>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        {/* Ajoute ici des infos supplémentaires si besoin */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Profile Content */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileA;

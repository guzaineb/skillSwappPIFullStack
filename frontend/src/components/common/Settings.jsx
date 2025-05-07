import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera } from "react-feather";
import Footer from "./Footer";
import Header from "./Header";

function Settings() {
  const [user, setUser] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    phone: "",
    dateOfBirth: "",
    bio: "",
    avatar: "assets/img/user/user16.jpg"
  });

  // Simuler le chargement des données utilisateur
  useEffect(() => {
    // Ici vous devriez faire un appel API pour récupérer les données utilisateur
    const mockUser = {
      name: "Mariem Tlili",
      role: "Admin",
      profilePic: "assets/img/user/user16.jpg",
      avatar: "assets/img/user/user16.jpg"
    };
    setUser(mockUser);
    
    // Pré-remplir le formulaire avec les données existantes
    setFormData({
      firstName: "John",
      lastName: "Doe",
      designation: "Student",
      phone: "+1234567890",
      dateOfBirth: "1990-01-01",
      bio: "I'm a student learning new skills.",
      avatar: mockUser.avatar
    });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUpdatingProfile(true);
      // Simuler un upload d'image
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImg(event.target.result);
        setFormData(prev => ({...prev, avatar: event.target.result}));
        setIsUpdatingProfile(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({...prev, avatar: event.target.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    setFormData(prev => ({...prev, avatar: "/avatar.png"}));
    setSelectedImg(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler une requête API pour mettre à jour le profil
    setTimeout(() => {
      console.log("Profile updated:", formData);
      setIsSubmitting(false);
      
      // Mettre à jour les données utilisateur
      setUser(prev => ({
        ...prev,
        name: `${formData.firstName} ${formData.lastName}`,
        profilePic: formData.avatar
      }));
    }, 1500);
  };

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <div className="breadcrumb-bar breadcrumb-bar-info">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h2 className="breadcrumb-title">Settings</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Edit Profile
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                        <Link className="nav-link" to="settings">
                          <i className="bx bxs-user" /> Settings
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>Settings</h3>
                      <p>You have full control to manage your own account settings</p>
                    </div>
                    <div className="settings-page-head">
                      <ul className="settings-pg-links">
                        <li>
                          <a href="Settings" className="active">
                            <i className="bx bx-edit" />
                            Edit Profile
                          </a>
                        </li>
                        <li>
                          <a href="LinkedAccounts">
                            <i className="bx bx-link" />
                            Linked Accounts
                          </a>
                        </li>
                        <li>
                          <a href="Notifications">
                            <i className="bx bx-bell" />
                            Notifications
                          </a>
                        </li>
                      </ul>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="course-group profile-upload-group mb-0 d-flex">
                        <div className="course-group-img profile-edit-field d-flex align-items-center">
                          <a href="student-profile.html" className="profile-pic">
                            <img
                              src={formData.avatar || "assets/img/user/user16.jpg"}
                              alt="Avatar"
                              className="img-fluid"
                            />
                          </a>
                          <div className="profile-upload-head">
                            <h4>Your avatar</h4>
                            <p>PNG or JPG no bigger than 800px width and height</p>
                            <div className="new-employee-field">
                              <div className="d-flex align-items-center mt-2">
                                <div className="image-upload mb-0">
                                  <input 
                                    type="file" 
                                    onChange={handleFileChange}
                                    accept="image/jpeg, image/png"
                                  />
                                  <div className="image-uploads">
                                    <i className="bx bx-cloud-upload" />
                                  </div>
                                </div>
                                <div className="img-delete">
                                  <button 
                                    type="button" 
                                    className="delete-icon"
                                    onClick={handleDeleteAvatar}
                                  >
                                    <i className="bx bx-trash" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="checkout-form settings-wrap">
                        <div className="edit-profile-info">
                          <h5>Personal Details</h5>
                          <p>Edit your personal information</p>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-block">
                              <label className="form-label">First Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block">
                              <label className="form-label">Last Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block">
                              <label className="form-label">Designation</label>
                              <input
                                type="text"
                                className="form-control"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block">
                              <label className="form-label">Phone Number</label>
                              <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block">
                              <label className="form-label">Date of Birth</label>
                              <input
                                type="date"
                                className="form-control"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="input-block">
                              <label className="form-label">Bio</label>
                              <textarea
                                rows={4}
                                className="form-control"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <button 
                              className="btn btn-primary" 
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? 'Updating...' : 'Update Profile'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <Footer />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Settings;
import { useState } from 'react';
import axios from 'axios'; // ou votre librairie HTTP préférée

function Settings() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    phone: '',
    dateOfBirth: '',
    bio: '',
    avatar: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    setFormData(prev => ({
      ...prev,
      avatar: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Remplacez cette URL par votre endpoint backend
      const response = await axios.put('/api/profile', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // si vous utilisez JWT
        }
      });

      if (response.data.success) {
        setSuccess(true);
        // Optionnel: Mettre à jour le contexte/utilisateur global ici
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="main-wrapper">
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
                          {error && <div className="alert alert-danger">{error}</div>}
                          {success && <div className="alert alert-success">Profil mis à jour avec succès!</div>}
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
                {/* Footer content */}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="copyright">
                <div className="row">
                  <div className="col-md-6">
                    <div className="privacy-policy">
                      <ul>
                        <li><a href="term-condition.html">Terms</a></li>
                        <li><a href="privacy-policy.html">Privacy</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="copyright-text">
                      <p className="mb-0">© 2024 DreamsLMS. All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Settings;
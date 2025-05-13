import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Profile1() {
  const { user, checkAuth } = useAuthStore();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getSkills = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/auth/profile/${userId}/skills`
      );
      setSkills(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      setError("Failed to load skills. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeProfile = async () => {
      try {
        const authResult = await checkAuth();
        if (authResult?.user?._id) {
          await getSkills(authResult.user._id);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate('/login');
      }
    };

    initializeProfile();
  }, []);

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  if (loading) {
    return <div>Loading skills...</div>;
  }

  return (
    <>
      <div className="main-wrapper">
      
        

        {/* Page Content */}
        <div className="page-content">
          <div className="container">
            <div className="row">
              {/* Sidebar */}
             
              {/* /Sidebar */}

              {/* Profile Content */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details mb-0">
                  <div className="settings-menu p-0">
                   
                    <div className="checkout-form personal-address">
                      <div className="row">
                      
                        <div className="col-sm-6">
                          <div className="contact-info">
                            <h6>Username</h6>
                            <p>{user.name}</p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="contact-info">
                            <h6>Email</h6>
                            <p>{user.email}</p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="contact-info">
                            <h6>Phone Number</h6>
                            <p>{user.phone || "Not provided"}</p>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="contact-info">
                            <h6>Bio</h6>
                            <p>{user.bio || "No bio provided"}</p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="col-sm-12">
                          <div className="contact-info mb-0">
                            <div className="d-flex justify-content-between">
                              <h6>Skills</h6>
                              <a
                                type="button"
                                className="btn btn-primary"
                                href="/learnskills"
                              >
                                Add Skill
                              </a>
                            </div>
                            {error ? (
                              <div className="text-danger">{error}</div>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {skills.map((skill) => (
                                  <span
                                    key={skill._id}
                                    style={{
                                      backgroundColor: "#f0f0f0",
                                      borderRadius: "5px",
                                      padding: "5px",
                                      margin: "5px 0",
                                    }}
                                  >
                                    {skill.skillname} ({skill.level})
                                  </span>
                                ))}
                                {skills.length === 0 && (
                                  <p>No skills added yet.</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* /Skills */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Profile Content */}
            </div>
          </div>
        </div>
        {/* /Page Content */}
        
      </div>
    </>
  );
}

export default Profile1;

import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useQuery from "../../useQuery";
import Header from "./Header";
import Footer from "./Footer";
function Profile() {
  const query = useQuery();
  const { user, checkAuth ,isAuthenticated} = useAuthStore();
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  const getSkills = async () => {
    if (!user?._id) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/profile/${user._id}/unobtained-skills`
      );
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const addSkill = async (skill, userId) => {
      if (skill.pricingType === "free") {
        const response = await axios.post(
          `http://localhost:5000/api/auth/profile/${userId || user._id}/add-skill`,
          { skillId: skill._id }
        );
        if (response.status === 200) {
          alert("Skill added successfully");
          navigate("/learnskills")
          return;
        }
        alert("Error adding skill.");
      } else {
        const response = await axios.post(
          `http://localhost:5000/api/pay/checkout`,
          {
            skillId: skill._id,
            skillName: skill.skillname,
            skillPrice: skill.price,
            userId: user._id
          }
        );
        if (response.status === 200) {
          window.location.href = response.data;
        } else {
          alert("Error adding skill.");
        }
    };
  };
  useEffect(() => {
    const initializeUser = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate('/login');
      }
    };

    initializeUser( );
    getSkills();
    const skillToAdd = query.get("boughtSkill");
    if (skillToAdd) {
      addSkill({ _id: skillToAdd, pricingType: "free"}, query.get("user"));
    }
  }, [isAuthenticated]);

 
  return (
    <>
      <div className="main-wrapper">
      
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
          
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="page-content">
          <div className="container">
            <div className="row">
              {/* sidebar */}
              
              {/* /Sidebar */}
              {/* Content */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget">
                  <div className="settings-menu">
                    <h3>All Skills</h3>
                  </div>
                  <table className="table table-center table-hover">
                    <thead>
                      <tr>
                        <th>Skill Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Pricing</th>
                        <th>Level</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skills.map((skill) => (
                        <tr key={skill._id}>
                          <td>
                            <a
                              href="course-details.html"
                              className="course-name"
                            >
                              {skill.skillname}
                            </a>
                          </td>
                          <td>{skill.category}</td>
                          <td>{skill.description}</td>
                          <td>
                            {skill.pricingType === "free" ? (
                              <span className="badge badge-pill bg-success-light">
                                Free
                              </span>
                            ) : (
                              <span className="badge badge-pill bg-danger-light">
                                ${skill.price}
                              </span>
                            )}
                          </td>
                          <td>{skill.level}</td>
                          <td>
                            {skill.status === "active" ? (
                              <span className="badge badge-pill bg-success-light">
                                Active
                              </span>
                            ) : skill.status === "inactive" ? (
                              <span className="badge badge-pill bg-danger-light">
                                Inactive
                              </span>
                            ) : (
                              <span className="badge badge-pill bg-warning-light">
                                Pending
                              </span>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm bg-danger-light"
                              onClick={() => addSkill(skill)}
                            >
                              <i className="feather-trash-2 me-1" /> Get Skill
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
       
      </div>
    </>
  );
}

export default Profile;

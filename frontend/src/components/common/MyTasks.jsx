import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import Header from "./Header";
import axios from "axios";
import {Link} from "react-router-dom"

function MyTasks() {
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification :",
          error
        );
      }
    };

    if (!isAuthenticated) {
      // Check only if user is not authenticated already
      verifyUser();
    } else {
      fetchUserTasks();
    }
  }, [isAuthenticated, checkAuth]);

  const fetchUserTasks = async () => {
    try {
      const response = await axios.get("/tasks/owner/" + user._id);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <>
      {/* Student Profile */}
      <div className="col-xl-9 col-lg-9">
        <div className="settings-widget card-details mb-0">
          <div className="settings-menu p-0">
            <div className="profile-heading">
              <h3>My Tasks</h3>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
                margin: "20px 0",
              }}
            >
              {tasks.map((task) => (
                <div
                  key={task._id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s",
                    hover: { transform: "translateY(-5px)" },
                  }}
                >
                  <h3 style={{ marginTop: "0", color: "#2c3e50" }}>
                    {task.title}
                  </h3>
                  <p style={{ color: "#7f8c8d", marginBottom: "15px" }}>
                    {task.description}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#7f8c8d",
                      margin: "5px 0",
                    }}
                  >
                    Posted by: {task.owner.name}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#7f8c8d",
                      margin: "5px 0",
                    }}
                  >
                    Posted on: {task.createdAt}
                  </p>  
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#7f8c8d",
                      margin: "5px 0",
                    }}
                  >
                    Compensation: {task.compensation}
                  </p>                  
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#7f8c8d",
                      margin: "5px 0",
                    }}
                  >
                    Applications: {task.applications.length}
                  </p>
                  {isAuthenticated && (
                    <Link
                      to={`/tasks/${task._id}`}
                      style={{
                        display: "inline-block",
                        padding: "8px 15px",
                        backgroundColor: "#3498db",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        marginTop: "10px",
                        fontWeight: "bold",
                        transition: "background-color 0.2s",
                        hover: { backgroundColor: "#2980b9" },
                      }}
                    >
                      View
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* /Student Profile */}
    </>
  );
}

export default MyTasks;
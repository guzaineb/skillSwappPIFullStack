import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useAuthStore } from "../../store/authStore";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await checkAuth();
        console.log("Response from checkAuth:", result); // Debugging log
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
      }
    };

    if (!isAuthenticated) { // Check only if user is not authenticated already
      verifyUser();
    }
    fetchTasks();
  }, [isAuthenticated, checkAuth]);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/tasks");
      setTasks(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Please log in to view these tasks");
      } else {
        setError("An error occurred while fetching tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#e74c3c" }}>
        <p>{error}</p>
        {!isAuthenticated ? (
          <Link
            to="/signin"
            style={{
              display: "inline-block",
              padding: "8px 16px",
              backgroundColor: "#3498db",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              margin: "10px 0",
            }}
          >
            Log In
          </Link>
        ) : (
          <button
            onClick={fetchTasks}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        )}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "30px",
          margin: "20px auto",
          maxWidth: "500px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{ fontSize: "48px", color: "#bdc3c7", marginBottom: "15px" }}
        >
          <i className="fas fa-file-alt"></i>
        </div>
        <p style={{ fontSize: "18px", color: "#7f8c8d" }}>No tasks found</p>
      </div>
    );
  }
  return (
    <><Header /><div style={{ margin: "10% 5%" }}>
      <h2>Tasks</h2>
      {isAuthenticated && (
        <Link
          to="/tasks/create"
          style={{
            display: "inline-block",
            padding: "10px 15px",
            backgroundColor: "#27ae60",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            margin: "10px 0",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Create Task
        </Link>
      )}
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
            <h3 style={{ marginTop: "0", color: "#2c3e50" }}>{task.title}</h3>
            <p style={{ color: "#7f8c8d", marginBottom: "15px" }}>
              {task.description}
            </p>
            <p style={{ fontSize: "14px", color: "#7f8c8d", margin: "5px 0" }}>
              Posted by: {task.owner.name}
            </p>
            <p style={{ fontSize: "14px", color: "#7f8c8d", margin: "5px 0" }}>
              {formatDate(task.createdAt)}
            </p>
            <p style={{ fontSize: "14px", color: "#7f8c8d", margin: "5px 0" }}>
              Compensation: {task.compensation}
            </p>
            <p style={{ fontSize: "14px", color: "#7f8c8d", margin: "5px 0" }}>
              Applications: {task.applications.length}
            </p>
            {isAuthenticated && task.owner._id !== user._id && (
  <Link
    to={`/tasks/${task._id}/apply`}
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
    }}
  >
    Apply
  </Link>
)}

          </div>
        ))}
      </div>
    </div><Footer /></>
  );
};

export default Tasks;

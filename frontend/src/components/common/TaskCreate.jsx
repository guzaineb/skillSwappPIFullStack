import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const TaskCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [compensation, setCompensation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();

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
    }}, [isAuthenticated])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate inputs
    if (!title.trim() || !description.trim()) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "/tasks",
        {
          title,
          description,
          compensation
        },
        {
          headers: {
            Authorization: "",
          },
          withCredentials: true,
        }
      );

      setSuccess(true);

      alert("Task created successfully!");
      navigate("/tasks");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response && err.response.status === 401) {
        setError("You must be logged in to create a task");
      } else {
        setError("An error occurred while creating the task");
      }
    } finally {
      setLoading(false);
    }
  };

  // Check authentication
  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#e74c3c" }}>
        <p>You must be logged in to create a task</p>
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
      </div>
    );
  }

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
        <p>Creating task...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: "0" }}>Create New Task</h2>
        <Link
          to="/tasks"
          style={{
            display: "inline-block",
            padding: "8px 15px",
            backgroundColor: "#7f8c8d",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Back to Tasks
        </Link>
      </div>

      {success && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          Task created successfully! Redirecting to tasks list...
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#2c3e50",
            }}
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
            placeholder="Enter task title"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="description"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#2c3e50",
            }}
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "16px",
              minHeight: "150px",
              resize: "vertical",
            }}
            placeholder="Describe the task in detail"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="compensation"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#2c3e50",
            }}
          >
            Compensation
          </label>
          <input
            id="compensation"
            value={compensation}
            type="number"
            onChange={(e) => setCompensation(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
            placeholder="Compensation for this task"
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "12px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s",
            width: "100%",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#219653")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#27ae60")}
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskCreate;

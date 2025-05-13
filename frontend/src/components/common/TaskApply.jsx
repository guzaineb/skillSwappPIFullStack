import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header"
import Footer from "./Footer"

const TaskApply = () => {
  const { id } = useParams();
  const [task, setTask] = useState();
  const [cvFile, setCvFile] = useState(null);
  const [analysis, setAnalysis] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, checkAuth } = useAuthStore();

  const fetchTask = async () => {
    try {
      const response = await axios.get(`/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };
  useEffect(() => {
    fetchTask()
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.name.endsWith(".pdf")) {
      setError("Please select a PDF file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    setCvFile(file);
    setError(null);
  };

  const removeFile = () => {
    setCvFile(null);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      setError("Please upload your CV.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("cv", cvFile);

      const response = await axios.post(
        `/tasks/${id}/analyzecv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAnalysis(response.data.analysisResult.analysis)
    } catch (error) {
      console.error("Error analyzing CV:", error);
      setError("Failed to analyze CV. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      setError("Please upload your CV.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("cv", cvFile);

      console.log("File attached:", cvFile.name);

      // Récupérer le token depuis les cookies ou localStorage
      const token =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token=") || row.startsWith("jwt="))
          ?.split("=")[1] || localStorage.getItem("authToken");

      console.log("Token disponible pour la requête:", token ? "Oui" : "Non");

      const response = await axios.post(
        `http://localhost:5000/api/tasks/${id}/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
          withCredentials: true,
        }
      );

      alert("Application successful.");
      console.log("Applied to task successfully:", response.data);

      setCvFile(null);

      navigate("/tasks");
    } catch (error) {
      console.error("Error applying to task:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to apply to task. Please try again.";
      console.error("Error details:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (error || !task) {
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
            onClick={fetchTask}
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

  return (
    <>
    <Header/>
    <div
      style={{
        maxWidth: "600px",
        margin: "10% auto",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={user?.profileImg || "/default-avatar.png"}
          alt={user?.username}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <h3 style={{ margin: 0 }}>
          Apply to Task: <strong>{task.title}</strong>
        </h3>
      </div>

      <form>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginBottom: "16px",
            }}
          >
            <p>
              Uploaded: <strong>{cvFile ? cvFile.name : "Nothing."}</strong>
            </p>
            {cvFile && <button
              type="button"
              onClick={removeFile}
              style={{
                position: "absolute",
                top: "-5px",
                right: "-15px",
                background: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "12px",
                height: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
              }}
            >
              X
            </button>}
            {analysis && (
            <div
              style={{
                backgroundColor: "#f3f3f3",
                padding: "12px",
                borderRadius: "4px",
                marginTop: "10px",
              }}
            >
              <h4 style={{ margin: "0 0 10px" }}>Analysis</h4>
              <p>{analysis}</p>
            </div>
          )}
          </div>
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f3f3f3",
                borderRadius: "4px",
                padding: "8px 12px",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#3498db",
                marginRight: "10px",
              }}
            >
              <i className="fas fa-file" style={{ marginRight: "6px" }}></i>
              <span>Upload CV</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              disabled={loading || !cvFile}
              style={{
                padding: "10px 20px",
                backgroundColor: loading || !cvFile ? "#bdc3c7" : "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: loading || !cvFile ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
              }}
              onClick={handleAnalyze}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
            <button
              type="button"
              disabled={loading || !cvFile}
              style={{
                padding: "10px 20px",
                backgroundColor: loading || !cvFile ? "#bdc3c7" : "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: loading || !cvFile ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
              }}
              onClick={handleApply}
            >
              {loading ? "Applying..." : "Apply"}
            </button>
          </div>
        </div>
      </form>
    </div>
      <Footer/>
    </>
    
  );
};

export default TaskApply;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  const fetchTask = async () => {
    try {
      const response = await axios.get("/tasks/" + id);
      setTask(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Veuillez vous connecter pour voir cette tâche.");
      } else {
        setError(
          "Une erreur s'est produite lors de la récupération de la tâche."
        );
      }
    }
  };

  useEffect(() => {
    fetchTask();
  });

  const acceptApplication = (applicationId) => async () => {
    try {
      const response = await axios.post(`/tasks/${id}/accept`, {
        applicationId,
      });
      if (response.status === 200) {
        alert("Application accepted successfully!");
        fetchTask(); // Refresh the task details
      }
    } catch (error) { }
  };

  if (!task || error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#e74c3c" }}>
        <p>{error}</p>
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
      </div>
    );
  }

  return (
    <><Header /><div style={{ margin: "10% 5%" }}>
      <h2>
        Task: <strong>{task.title}</strong>
      </h2>
      <p>
        Description: <strong>{task.description}</strong>
      </p>
      <p>
        Created by: <strong>{task.owner.name}</strong>
      </p>
      <p>
        Created on:
        <strong> {new Date(task.createdAt).toLocaleDateString()}</strong>
      </p>
      <p>
        Compensation:
        <strong> ${task.compensation}</strong>
      </p>
      <p>
        Status: <strong>{task.state}</strong>
      </p>

      <h3>Applications</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Candidate Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Link to CV
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {task.applications.map((application) => (
            <tr key={application._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {application.candidate.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <a
                  href={"http://localhost:5000/uploads/" + application.candidate_cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View CV
                </a>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {application.status}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {(application.status === "pending" && task.state === "open") && (
                  <button
                    onClick={acceptApplication(application._id)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#3498db",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Accept
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => window.history.back()}
        style={{
          padding: "8px 16px",
          marginTop: "24px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back to My Tasks
      </button>

    </div><Footer /></>
  );
}

export default TaskDetail;
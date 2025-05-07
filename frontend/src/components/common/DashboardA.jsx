import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link, Outlet } from "react-router-dom";
import { Camera } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

function DashboardA() {
  const [charts, setCharts] = useState({
    teachers: [],
    students: [],
    quizzes: [],
    activeQuizzes: []
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "Mariem Tlili",
    role: "Admin",
    profilePic: null,
    avatar: null,
  });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

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

  const generateData = (min, max) =>
    Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      valeur: Math.floor(Math.random() * (max - min + 1)) + min
    }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chartResponse, usersResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/chart-data"),
          axios.get("http://localhost:5000/api/user")
        ]);

        setCharts({
          teachers: chartResponse.data.teachersData || generateData(5, 15),
          students: chartResponse.data.studentsData || generateData(20, 50),
          quizzes: chartResponse.data.quizzesTakenData || generateData(10, 30),
          activeQuizzes: chartResponse.data.activeQuizzesData || generateData(3, 15)
        });

        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Erreur:", error);
        setCharts({
          teachers: generateData(5, 15),
          students: generateData(20, 50),
          quizzes: generateData(10, 30),
          activeQuizzes: generateData(3, 15)
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const Graphique = ({ data, couleur, titre }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-center mb-3">{titre}</h3>
      <div style={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="valeur" stroke={couleur} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <Header />
      <div className="container text-center">
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <h2 className="breadcrumb-title">Dashboard Admin</h2>
          <nav aria-label="breadcrumb" className="page-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Dashboard Admin</li>
            </ol>
          </nav>
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
                        <img src={selectedImg || user?.profilePic || user?.avatar || "/avatar.png"} alt="Img" className="img-fluid" />
                      </a>
                    </div>
                  </div>
                  <label htmlFor="avatar-upload" className={`position-absolute bottom-0 end-0 bg-dark p-2 rounded-circle cursor-pointer ${isUpdatingProfile ? "animate-pulse disabled" : ""}`}>
                    <Camera className="text-light" />
                    <input type="file" id="avatar-upload" className="d-none" accept="image/*" onChange={handleImageUpload} disabled={isUpdatingProfile} />
                  </label>
                  <p className="text-muted">
                    {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                  </p>
                  <div className="profile-group">
                    <div className="profile-name text-center">
                      <h4>{user?.name}</h4>
                      <p className="px-4 py-2 bg-light rounded border">{user?.role}</p>
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

            {/* Main Content */}
            <div className="col-xl-9 col-lg-9 bg-light p-3 rounded">
              <Outlet />

              <div className="row">
                <div className="col-md-6"><Graphique data={charts.teachers} couleur="#8884d8" titre="Educateurs" /></div>
                <div className="col-md-6"><Graphique data={charts.students} couleur="#82ca9d" titre="Learners" /></div>
                <div className="col-md-6"><Graphique data={charts.quizzes} couleur="#ffc658" titre="Quiz" /></div>
                <div className="col-md-6"><Graphique data={charts.activeQuizzes} couleur="#ff7f7f" titre="Quiz actifs" /></div>
              </div>

              <div className="dashboard-title mt-4"><h4>User Management</h4></div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Avatar</th>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Rôle</th>
                      <th>Dernière connexion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>
                          {user.profilePic ? (
                            <img src={`http://localhost:5001/uploads/${user.profilePic}`} alt={user.name} className="rounded-circle" width="40" height="40" />
                          ) : (
                            <div className="avatar-placeholder rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                              {user.name.charAt(0)}
                            </div>
                          )}
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge ${user.role === 'educator' ? 'bg-primary' : 'bg-success'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DashboardA;

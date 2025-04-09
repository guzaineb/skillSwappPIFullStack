import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const users = [
    {
      id: 1,
      name: "Mimi Tlili",
      role: "Teacher",
      skills: ["JavaScript", "React"],
    },
    {
      id: 2,
      name: "Sarra Maamar",
      role: "Student",
      skills: ["Python", "Django"],
    },
    {
      id: 3,
      name: "Zaineb Guesmi",
      role: "Teacher",
      skills: ["Java", "Spring"],
    },
    {
      id: 4,
      name: "Ons Dashraoui",
      role: "Student",
      skills: ["C++", "Qt"],
    },
    {
      id: 5,
      name: "Hanen Ghannem",
      role: "Student",
      skills: ["PHP", "Laravel"],
    },
    {
      id: 6,
      name: "Mohanned Tlili",
      role: "Teacher",
      skills: ["Ruby", "Rails"],
    },
    {
      id: 7,
      name: "Mayar Tlili",
      role: "Student",
      skills: ["Swift", "iOS"],
    },
  ];

  const teachersData = [
    { day: 'Mon', value: 2 },
    { day: 'Tue', value: 4 },
    { day: 'Wed', value: 6 },
    { day: 'Thu', value: 10 },
    { day: 'Fri', value: 13 },
  ];

  const studentsData = [
    { day: 'Mon', value: 20 },
    { day: 'Tue', value: 35 },
    { day: 'Wed', value: 60 },
    { day: 'Thu', value: 75 },
    { day: 'Fri', value: 91 },
  ];

  const quizzesTakenData = [
    { day: 'Mon', value: 1 },
    { day: 'Tue', value: 3 },
    { day: 'Wed', value: 5 },
    { day: 'Thu', value: 8 },
    { day: 'Fri', value: 11 },
  ];

  const activeQuizzesData = [
    { day: 'Mon', value: 2 },
    { day: 'Tue', value: 1 },
    { day: 'Wed', value: 1 },
    { day: 'Thu', value: 0 },
    { day: 'Fri', value: 0 },
  ];

  const CustomLineChart = ({ title, data, color }) => (
    <div className="bg-white shadow-sm rounded-xl p-4 mb-4">
      <h5 className="text-center mb-3">{title}</h5>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <>
      <div className="main-wrapper">
        <Header />
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h2 className="breadcrumb-title">Dashboard Admin</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Dashboard Admin
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="page-content">
          <div className="container">
            <div className="row">
              <Sidebar />
              {/* Student Dashboard */}
              <div className="col-xl-9 col-lg-9">
                {/* Dashboard Charts */}
                <div className="row">
                  <div className="col-md-6">
                    <CustomLineChart title="Teachers Over Time" data={teachersData} color="#8884d8" />
                  </div>
                  <div className="col-md-6">
                    <CustomLineChart title="Students Over Time" data={studentsData} color="#82ca9d" />
                  </div>
                  <div className="col-md-6">
                    <CustomLineChart title="Quizzes Taken" data={quizzesTakenData} color="#ffc658" />
                  </div>
                  <div className="col-md-6">
                    <CustomLineChart title="Active Quizzes" data={activeQuizzesData} color="#ff7f7f" />
                  </div>
                </div>
                {/* /Dashboard Charts */}
                <div className="dashboard-title">
                  <h4>Users</h4>
                </div>
                <div className="row">
                  <div className="table-container">
                    <ul className="responsive-table">
                      <li className="table-header">
                        <div className="col col-1">User ID</div>
                        <div className="col col-2">Full Name</div>
                        <div className="col col-3">Role</div>
                        <div className="col col-4">Skills</div>
                      </li>
                      {users.map((user) => (
                        <li className="table-row" key={user.id}>
                          <div className="col col-1" data-label="User ID">
                            {user.id}
                          </div>
                          <div className="col col-2" data-label="Full Name">
                            {user.name}
                          </div>
                          <div className="col col-3" data-label="Role">
                            {user.role}
                          </div>
                          <div className="col col-4" data-label="Skills">
                            {user.skills.join(", ")}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Student Dashboard */}
            </div>
          </div>
        </div>
        {/* /Page Content */}
        <Footer />
      </div>
    </>
  );
}
export default Dashboard;

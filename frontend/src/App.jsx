import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "./store/authStore";
import Header from "./components/common/Header";
import Signin from "./components/common/Signin";
import Signup from "./components/common/Signup";
import Index from "./components/common/Index";
import VerificationCode from "./components/common/VerificationCode";
import DashboardUser from "./components/common/DashboardUser";
import Index1 from "./components/common/Index1";
import Dashboard from "./components/common/Dashboard";
import Profile from "./components/common/Profile";
import ForgetPassWord from "./components/common/ForgetPassWord";
import ResetPassword from "./components/common/ResetPassword";
import Chat from "./components/common/Chat";
import HeaderBack from "./components/common/HeaderBack";
import UpdatePassword from "./components/common/UpdatePassword";
import DashboardInterface from "./components/common/DashboardInterface";
import Skills from "./components/common/Skills";
import Profile1 from "./components/common/Profile1";

import AddCategory from "./components/common/category/AddCategory";
import Categories from "./components/common/category/Categories";
import UpdateCategory from "./components/common/category/UpdateCategory";
import SkillList from "./components/common/SkillList";
import { SkillGrid } from "./components/common/SkillGrid";
import { SkillForm } from "./components/common/SkillForm";
import { EditSkill } from "./components/common/EditSkill";
// Import pour les composants "T"
import ProfileT from "./components/commonT/ProfileT";
import CreateQuiz from "./components/commonT/CreateQuiz";
import CoursDetails from "./components/commonT/CoursDetails";
import Question from "./components/commonT/Question";
import Quizzes from "./components/commonT/Quizzes";
import QuizDetails from "./components/commonT/QuizDetails";
import Cours from "./components/commonT/Cours";
import Logout from "./components/commonT/Logout";
import ChatBotComponent from "./components/common/ChatBot";
import AdvancedChatBot from "./components/common/AdvancedChatBot";
import ChatbotDemo from "./pages/ChatbotDemo";
import ChatbotAdmin from "./pages/ChatbotAdmin";
import StudentsBySkill from "./components/common/list/ListLEarner";
import EducatorsByCategory from "./components/common/list/ListEducator";
import SkillReader from "./components/common/SkillReader";
import SkillDetail from "./components/common/SkillDetail";
import SkillProgress from "./components/common/SkillProgress";
// Import pour les composants de posts et notifications
import PostsPage from "./pages/PostsPage";
import NotificationList from "./components/common/NotificationList";
//Import pour les composants "A"
import DashboardA from "./components/common/DashboardA";
import ProfileA from "./components/common/ProfileA";
import Settings from "./components/common/Settings";
import Notification from "./components/common/Notification";
import LinkedAccounts from "./components/common/LinkedAccounts";
// Importez les nouveaux composants de meeting
import MeetingHome from "./pages/MeetingHome";
import MeetingRoom from "./pages/MeetingRoom";
import MeetingErrorBoundary from "./components/common/MeetingErrorBoundary";
import "./styles/meeting-error.css";

import Tasks from "./components/common/Tasks";
import TaskApply from "./components/common/TaskApply";
import TaskCreate from "./components/common/TaskCreate";
import MyTasks from "./components/common/MyTasks";
import TaskDetail from "./components/common/TaskDetail";

// Dans votre configuration de routes
<Route path="/skills/:skillId/progress" element={<SkillProgress />} />;
function App() {
  const socket = useAuthStore((state) => state.socket);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (socket && user?._id) {
      socket.emit("addUser", user._id);
    }
  }, [socket, user]);

  // ✅ récupérer le socket depuis Zustand
  const setOnlineUsers = useAuthStore((state) => state.setOnlineUsers); // ✅ définir la méthode setOnlineUsers

  // Écoute les utilisateurs en ligne via le socket
  useEffect(() => {
    if (!socket) return;

    // Écouter l'événement "onlineUsers"
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [socket, setOnlineUsers]);

  const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, checkAuth, user, onlineUsers } = useAuthStore();

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    if (isAuthenticated) {
      return <Navigate to="/index" replace />;
    }

    return children;
  };

  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, checkAuth, user } = useAuthStore();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
      const verifyAuth = async () => {
        await checkAuth();
        setIsCheckingAuth(false);
      };
      verifyAuth();
    }, [checkAuth]);

    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }

    return children;
  };

  return (
    <>
      <Routes>
        <Route path="/Profile" element={<DashboardInterface />}>
          {/* Educator */}
          <Route index element={<Profile />} />
          <Route path="AddCategory" element={<AddCategory />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route path="skills/new" element={<SkillForm />} />
          <Route path="UpdateCategory/:id" element={<UpdateCategory />} />
          <Route path="skills" element={<SkillGrid />} />
          <Route path="CreateQuiz" element={<CreateQuiz />} />
          <Route path="Quizzes" element={<Quizzes />} />
          <Route path="Categories" element={<Categories />} />
          <Route path="skill/:skillId/students" element={<StudentsBySkill />} />

          <Route path="posts" element={<PostsPage />} />
          <Route path="notifications" element={<NotificationList />} />
          <Route path="Chat" element={<Chat />} />
          <Route path="meetings" element={<MeetingHome />} />
          <Route
            path="meeting/:meetingId"
            element={
              <MeetingErrorBoundary>
                <MeetingRoom />
              </MeetingErrorBoundary>
            }
          />
        </Route>
        <Route path="/Profile1" element={<DashboardUser />}>
          {/*learner */}
          <Route index element={<SkillList />} />
          <Route path="learnskills" element={<Skills />} />
          <Route path="profile2" element={<Profile />} />
          <Route path="mytasks" element={<MyTasks />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route path="SkillList" element={<SkillList />} />
          <Route path="Chat" element={<Chat />} />
          <Route path="skill/:skillId/students" element={<StudentsBySkill />} />
          <Route path="EducatorsByCategory" element={<EducatorsByCategory />} />
          <Route path="skills/edit/:id" element={<EditSkill />} />
          <Route path="Categories" element={<Categories />} />
          <Route path="UpdateCategory/:id" element={<UpdateCategory />} />
          <Route path="logout" element={<Logout />} />
          <Route path="chatBot" element={<ChatBotComponent />} />
          <Route path="learnSkill/:skillId" element={<SkillReader />} />
          <Route path="skills/:skillId/progress" element={<SkillProgress />} />
          <Route path="meetings" element={<MeetingHome />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="notifications" element={<NotificationList />} />

          <Route
            path="meeting/:meetingId"
            element={
              <MeetingErrorBoundary>
                <MeetingRoom />
              </MeetingErrorBoundary>
            }
          />
        </Route>

        <Route path="/index" element={<Index />} />
        <Route path="/HeaderBack" element={<HeaderBack />} />
        <Route path="/verify-email" element={<VerificationCode />} />
        <Route path="/header" element={<Header />} />
        <Route
          path="/signin"
          element={
            <RedirectAuthenticatedUser>
              <Signin />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Signin />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/index1" element={<Index1 />} />
        <Route path="/forgot-password" element={<ForgetPassWord />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/SkillList" element={<SkillList />} />
        <Route path="/skills" element={<SkillGrid />} />
        <Route path="/skills/new" element={<SkillForm />} />
        <Route path="/Profile1" element={<Profile1 />} />
        <Route path="/skill/:skillId/students" element={<StudentsBySkill />} />
        <Route path="/skills/:id" element={<SkillDetail />} />
        <Route path="/EducatorsByCategory" element={<EducatorsByCategory />} />
        <Route path="/skills/edit/:id" element={<EditSkill />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/UpdateCategory/:id" element={<UpdateCategory />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/ProfileT" element={<ProfileT />} />
        <Route path="/Cours" element={<Cours />} />
        <Route path="/Question" element={<Question />} />
        <Route path="QuizDetails/:id" element={<QuizDetails />} />
        <Route path="/chatBot" element={<ChatBotComponent />} />
        <Route
          path="/advanced-chatbot"
          element={<AdvancedChatBot userId="test_user" />}
        />
        <Route path="/chatbot-demo" element={<ChatbotDemo />} />
        <Route path="/admin/chatbot" element={<ChatbotAdmin />} />

        <Route path="CoursDetails" element={<CoursDetails />} />

        <Route path="/learnSkill/:skillId" element={<SkillReader />} />

        <Route path="/skills/:skillId/progress" element={<SkillProgress />} />
        <Route path="/meetings" element={<MeetingHome />} />
        <Route
          path="/meetings-direct"
          element={<MeetingHome skipAuthCheck={true} />}
        />
        <Route
          path="/meeting/:meetingId"
          element={
            <MeetingErrorBoundary>
              <MeetingRoom />
            </MeetingErrorBoundary>
          }
        />

        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/tasks/:id/apply" element={<TaskApply />} />
        <Route path="/tasks/create" element={<TaskCreate />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />

        {/* Admin */}

        <Route path="Dash" element={<DashboardA />} />
        <Route path="ProfileA" element={<ProfileA />} />
        <Route path="settings" element={<Settings />} />
        <Route path="Notifications" element={<Notification />} />
        <Route path="LinkedAccounts" element={<LinkedAccounts />} />

        {/* Routes pour les posts et notifications */}
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/notifications" element={<NotificationList />} />
      </Routes>
    </>
  );
}

export default App;
console.log("Token dans localStorage:", localStorage.getItem("authToken"));
console.log("Token dans cookies:", document.cookie);

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
import { SkillGrid } from './components/common/SkillGrid';
import { SkillForm } from './components/common/SkillForm';
import { EditSkill } from './components/common/EditSkill';


// Import pour les composants "T"
import ProfileT from "./components/commonT/ProfileT";
import CreateQuiz from "./components/commonT/CreateQuiz";
import CoursDetails from "./components/commonT/CoursDetails";
import Question from "./components/commonT/Question";
import Quizzes from "./components/commonT/Quizzes";
import Quiz from "./components/commonT/Quiz";
import QuizDetails from "./components/commonT/QuizDetails";
import Cours from "./components/commonT/Cours";
import Logout from "./components/commonT/Logout";

function App() {
  const socket = useAuthStore((state) => state.socket);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (socket && user?._id) {
      socket.emit("addNewUser", user._id); // Changé de "addUser" à "addNewUser"
    }
  }, [socket, user]);

  // ✅ récupérer le socket depuis Zustand
  const setOnlineUsers = useAuthStore((state) => state.setOnlineUsers); // ✅ définir la méthode setOnlineUsers

  // Écoute les utilisateurs en ligne via le socket
  useEffect(() => {
    if (!socket) return;

    // Écouter l'événement "getOnlineUsers" au lieu de "onlineUsers"
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("getOnlineUsers");
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
        <Route path="/Profile" element={<DashboardInterface />}>{/* Educator */}
          <Route index element={<Profile />} />
          <Route path="AddCategory" element={<AddCategory />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route path="skills/new" element={<SkillForm />} />
          <Route path="UpdateCategory/:id" element={<UpdateCategory />} /> 
          <Route path="skills" element={<SkillGrid />} />
          <Route path="CreateQuiz" element={<CreateQuiz />} />
          <Route path="Quizzes" element={<Quizzes />} />
          <Route path="Categories" element={<Categories />} />

          <Route path="Chat" element={<Chat />} />




        </Route>
        <Route path="/Profile1" element={<DashboardUser />}>{/*learner */}
          <Route index element={<SkillList />} />
          <Route path="learnskills" element={<Skills />} />
          <Route path="profile2" element={<Profile />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route path="SkillList" element={<SkillList />} />
          <Route path="Chat" element={<Chat />} />





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


        <Route path="/signup" element={<Signup />} />
        <Route path="/index1" element={<Index1 />} />
        <Route path="/forgot-password" element={<ForgetPassWord />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/SkillList" element={<SkillList />} />
        <Route path="/skills" element={<SkillGrid />} />
        <Route path="/skills/new" element={<SkillForm />} />
        <Route path="/Profile1" element={<Profile1 />} />


        <Route path="/skills/edit/:id" element={<EditSkill />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/UpdateCategory/:id" element={<UpdateCategory />} /> 

        <Route path="/logout" element={<Logout />} />

        <Route path="/ProfileT" element={<ProfileT />} />
        <Route path="/Cours" element={<Cours />} />
        <Route path="/Question" element={<Question />} />
        <Route path="QuizDetails/:id" element={<QuizDetails />} />


        <Route path="CoursDetails" element={<CoursDetails />} />

      </Routes>
    </>
  );
}

export default App;



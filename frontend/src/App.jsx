import { Routes, Route } from "react-router-dom";

// Import des composants
import Dashboard from "./components/commonA/Dashboard";
import Profile from "./components/commonA/Profile";
import Reviews from "./components/commonA/Reviews";
import OrderHistory from "./components/commonA/OrderHistory";
import Referral from "./components/commonA/Referral";
import Message from "./components/commonA/Message";
import Tickets from "./components/commonA/Tickets";
import Settings from "./components/commonA/Settings";
import LinkedAccounts from "./components/commonA/LinkedAccounts";
import Notification from "./components/commonA/Notification";
import Logout from "./components/commonA/Logout";

// Import pour les composants "S"
import ProfileS from "./components/commonS/ProfileS";
import CoursS from "./components/commonS/CoursS";
import QuizzesS from "./components/commonS/QuizzesS";
import QuizDetailsS from "./components/commonS/QuizDetailsS";
import CoursDetailsS from "./components/commonS/CoursDetailsS";
import WishList from "./components/commonS/WishListS";

// Import pour les composants "T"
import ProfileT from "./components/commonT/ProfileT";
import CreateQuiz from "./components/commonT/CreateQuiz";
import CoursDetails from "./components/commonT/CoursDetails";
import Question from "./components/commonT/Question";
import Quizzes from "./components/commonT/Quizzes";
import Quiz from "./components/commonT/Quiz";
import QuizDetails from "./components/commonT/QuizDetails";
import Cours from "./components/commonT/Cours";

function App() {
  return (
    <>
      <Routes>
        {/* Routes pour l'utilisateur standard */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
        <Route path="/Referral" element={<Referral />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/Tickets" element={<Tickets />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/LinkedAccounts" element={<LinkedAccounts />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Logout" element={<Logout />} />

        {/* Routes pour l'utilisateur "S" */}
        <Route path="/ProfileS" element={<ProfileS />} />
        <Route path="/CoursS" element={<CoursS />} />
        <Route path="/QuizzesS" element={<QuizzesS />} />
        <Route path="/QuizDetailsS/:id" element={<QuizDetailsS />} />
        <Route path="/CoursDetailsS" element={<CoursDetailsS />} />
        <Route path="/WishList" element={<WishList />} />

        {/* Routes pour l'utilisateur "T" */}
        <Route path="/ProfileT" element={<ProfileT />} />
        <Route path="/Cours" element={<Cours />} />
        <Route path="/CreateQuiz" element={<CreateQuiz />} />
        <Route path="/Quizzes" element={<Quizzes />} />
        <Route path="/QuizDetails/:id" element={<QuizDetails />} />
        <Route path="/Quiz/:id" element={<Quiz />} />
        <Route path="/Question" element={<Question />} />
        <Route path="/CoursDetails" element={<CoursDetails />} />
      </Routes>
    </>
  );
}

export default App;

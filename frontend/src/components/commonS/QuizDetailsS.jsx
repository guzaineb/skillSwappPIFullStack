import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

function QuizDetailsS() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quiz/${id}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuizDetails();
  }, [id]);
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
                  <h2 className="breadcrumb-title">Quiz Details</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Quiz Details
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
              {/* Student Quiz Details */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details mb-0">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>{quiz ? quiz.title : "Could not find Quiz."}</h3>
                    </div>
                    {quiz && <div className="checkout-form">
                      <div>
                          <h4>Quiz Creator: {quiz.creatorEmail}</h4>
                          <h4>Quiz Questions:</h4>
                          {quiz.questions.map((question, index) => (
                            <div key={index} className="question-item">
                              <h5>
                                {index + 1}. {question.question}
                              </h5>
                              <ul>
                                {question.options.map((option, i) => (
                                  <li key={i}>{option}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <h4>Attempts:</h4>
                          <ul>
                            {quiz.attempts.map((attempt, index) => (
                              <li key={index}>
                                <strong>{attempt.userEmail}</strong>:
                                {attempt.answers.reduce((acc, curr, index) => acc + (curr == quiz.questions[index].answer ? 1 : 0), 0)} points
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>}
                  </div>
                </div>
              </div>
              {/* /Student Quiz Details */}
            </div>
          </div>
        </div>
        {/* /Page Content */}
        <Footer />
      </div>
    </>
  );
}

export default QuizDetailsS;

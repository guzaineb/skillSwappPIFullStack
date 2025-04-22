import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function QuizDetails() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const [quizAnswered, setQuizAnswered] = useState(false);

  const submitAnswers = async () => {
    // Réinitialisation des réponses sélectionnées
    refs.forEach(ref => ref.current.checked = false);

    // Si ce n'est pas la dernière question, passer à la suivante
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }

    // Soumettre les réponses une fois toutes les questions répondues
    try {
      const response = await axios.post(
        `http://localhost:5000/api/quiz/${id}/answers`,
        { userEmail: "test@test.com", answers }
      );
      if (response.status === 200) {
        console.log("Answers submitted successfully!");
        setQuizAnswered(true);
      } else {
        console.error("Error submitting answers:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

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
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h2 className="breadcrumb-title">Take Quiz</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Take Quiz
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
            
              {/* Student Quiz Details */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details mb-0">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>{quiz ? quiz.title : "Could not find Quiz."}</h3>
                    </div>
                    {quizAnswered ? (
                      <div>
                        <h2>Quiz Completed!</h2>
                        <p>Thank you for taking the quiz. Your answers have been submitted.</p>
                        <p>Your score: {answers.reduce((acc, curr, index) => acc + (curr === quiz.questions[index].answer ? 1 : 0), 0)}</p>
                        <button onClick={() => window.location.href = "/Quizzes"}>Back to Quizzes</button>
                      </div>
                    ) : quiz && (
                      <div className="checkout-form">
                        <h2>Question {currentQuestionIndex + 1}</h2>
                        <h4>{quiz.questions[currentQuestionIndex].question}</h4>
                        <div className="form-group">
                          {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                            <div key={index} className="form-check">
                              <input
                                ref={refs[index]}
                                type="radio"
                                name="answer"
                                value={option}
                                onChange={(e) => {
                                  const newAnswers = [...answers];
                                  newAnswers[currentQuestionIndex] = e.target.value;
                                  setAnswers(newAnswers);
                                }}
                              />
                              <label>{option}</label>
                            </div>
                          ))}
                        </div>
                        <button onClick={submitAnswers}>Next Question</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* /Student Quiz Details */}
            </div>
          </div>
        </div>
        {/* /Page Content */}
       
      </div>
    </>
  );
}

export default QuizDetails;

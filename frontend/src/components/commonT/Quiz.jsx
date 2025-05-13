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
  const [definition, setDefinition] = useState([]);
  const [loadingDef, setLoadingDef] = useState(false);

  const fetchDefinition = async (term) => {
    setLoadingDef(true);
    setDefinition([]); // Clear previous definition
    try {
      const response = await axios.get(
        `http://localhost:5000/api/quiz/define/${encodeURIComponent(term)}`
      );
      setDefinition(response.data);
    } catch (error) {
      console.error("Definition fetch error:", error.response?.data || error.message);
      setDefinition([error.response?.data?.error || "Could not fetch definition. Please try another term."]);
    }
    setLoadingDef(false);
  };
const isAnswerSelected = answers[currentQuestionIndex] !== undefined;
  const submitAnswers = async () => {
    // Reset selected answers
    refs.forEach(ref => ref.current.checked = false);

    // If not the last question, move to the next one
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }

    // Submit answers once all questions are answered
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
                        <h4>{quiz.questions[currentQuestionIndex]?.question}</h4> {/* Ensure correct property here */}
                        <button
                          onClick={() => {
                            console.log("Speaking:", quiz.questions[currentQuestionIndex]?.question); // Debugging log
                            window.responsiveVoice.speak(
                              quiz.questions[currentQuestionIndex]?.question,
                              "UK English Male" // Optional: choose voice
                            );
                          }}
                          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                        >
                          🔊 Lire la question
                        </button>
                        <div className="form-group">
                          {quiz.questions[currentQuestionIndex]?.options.map((option, index) => (
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
                        <div className="d-flex flex-column align-items-start gap-2 mb-2">
 <button
                          className="btn btn-success mb-2"
                          onClick={() => fetchDefinition(quiz.questions[currentQuestionIndex]?.question)}
                        >
                          Define this term
                        </button>

                        {loadingDef ? (
                          <p>Loading definition...</p>
                        ) : definition.length > 0 && (
                          <div className="alert alert-secondary">
                            <strong>Definition:</strong>
                            <ul>
                              {definition.map((def, idx) => (
                                <li key={idx}>{def}</li>
                              ))}
                            </ul>
                          </div>
                        )}

  <button 
    onClick={submitAnswers} 
    className={`btn ${isAnswerSelected ? 'btn-success' : 'btn-secondary'}`}
    disabled={!isAnswerSelected}
  >
    {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
  </button>
</div>
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

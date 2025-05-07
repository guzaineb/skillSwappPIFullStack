import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Ajout de Link dans l'import

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      creatorEmail: "test@test.com",
      title,
      questions,
    };
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/quiz",
        quizData
      );
      
      if (response.status === 201) {
        console.log("Quiz created successfully!");
        navigate(`/QuizDetails/${response.data._id}`);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Error creating quiz: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="main-wrapper">
    
      {/* Breadcrumb */}
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title">Create Quiz</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link> {/* Maintenant Link est correctement importé */}
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Create Quiz
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="page-content">
        <div className="container">
          <div className="row">
         
            <div className="col-xl-9 col-lg-9">
              <div className="settings-widget card-details">
                <div className="settings-menu p-0">
                  <div className="profile-heading d-flex align-items-center">
                    <h3>Questions:</h3>
                    <input
                      type="number"
                      className="form-control ms-3"
                      name="questionCount"
                      placeholder="Enter number of questions"
                      value={questions.length}
                      min={1}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (isNaN(value)) return;
                        
                        setQuestions(prev => {
                          if (value > prev.length) {
                            return [
                              ...prev,
                              ...Array(value - prev.length).fill().map(() => ({
                                question: "",
                                options: ["", "", "", ""],
                                answer: "",
                              }))
                            ];
                          }
                          return prev.slice(0, value);
                        });
                      }}
                    />
                  </div>
                  
                  <div className="checkout-form">
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                        <label>Quiz Title</label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="form-control"
                          name="title"
                          placeholder="Enter quiz title"
                          required
                        />
                      </div>
                      
                      {questions.map((question, index) => (
                        <div key={index} className="form-group">
                          <label>Question {index + 1}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter question"
                            value={question.question}
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[index].question = e.target.value;
                              setQuestions(newQuestions);
                            }}
                            required
                          />
                          
                          <label>Options</label>
                          {question.options.map((option, i) => (
                            <input
                              key={`option-${index}-${i}`}
                              type="text"
                              className="form-control mb-2"
                              placeholder={`Option ${i + 1}`}
                              value={option}
                              onChange={(e) => {
                                const newQuestions = [...questions];
                                newQuestions[index].options[i] = e.target.value;
                                setQuestions(newQuestions);
                              }}
                              required
                            />
                          ))}
                          
                          <label>Answer</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter correct answer"
                            value={question.answer}
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[index].answer = e.target.value;
                              setQuestions(newQuestions);
                            }}
                            required
                          />
                        </div>
                      ))}

                      <button type="submit" className="btn btn-primary mt-3">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
  
    </div>
  );
}
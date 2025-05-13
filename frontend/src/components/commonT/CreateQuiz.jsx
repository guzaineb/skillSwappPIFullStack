import { useState } from "react";
import axios from "axios";

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ]);
  const [title, setTitle] = useState("");
<<<<<<< HEAD
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormComplete = () => {
    return (
      title.trim() && 
      questions.every(q => 
        q.question.trim() && 
        q.options.every(o => o.trim()) && 
        q.answer.trim()
      )
    );
  };

  const handleGenerate = async () => {
    if (!title.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simuler un appel API à un service d'IA
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Exemple de données générées (à remplacer par votre vrai appel API)
      const generatedQuestions = [
        {
          question: `Quelle est la capitale de la France?`,
          options: ["Londres", "Berlin", "Paris", "Madrid"],
          answer: "Paris"
        },
        {
          question: `Quel est le résultat de 2 + 2?`,
          options: ["3", "4", "5", "6"],
          answer: "4"
        }
      ];
      
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error("Erreur lors de la génération IA:", error);
      alert("Une erreur est survenue lors de la génération");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
=======

  const onSubmit = async (e) => {
    e.preventDefault();
>>>>>>> origin/tasks
    const quizData = {
      creatorEmail: "test@test.com",
      title,
      questions,
    };
<<<<<<< HEAD
    
    try {
      const response = await axios.post(
=======
    let response;
    try {
      response = await axios.post(
>>>>>>> origin/tasks
        "http://localhost:5000/api/quiz",
        quizData
      );
      if (response.status === 201) {
<<<<<<< HEAD
        window.location.href = "/QuizDetails/" + response.data._id;
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Une erreur est survenue lors de la création du quiz");
    } finally {
      setIsSubmitting(false);
    }
=======
        console.log("Quiz created successfully!");
      } else {
        console.error("Error creating quiz:", response.statusText);
        return;
      }
    } catch (error) {
      console.error("Caught Error creating quiz:", error);
      return;
    }
    window.location.href = "/QuizDetails/" + response.data._id;
>>>>>>> origin/tasks
  };

  return (
    <>
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
                        <a href="index-2.html">Home</a>
                      </li>
<<<<<<< HEAD
                      <li className="breadcrumb-item active" aria-current="page">
=======
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
>>>>>>> origin/tasks
                        Create Quiz
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
<<<<<<< HEAD
        
=======
>>>>>>> origin/tasks
        {/* Page Content */}
        <div className="page-content">
          <div className="container">
            <div className="row">
<<<<<<< HEAD
=======
           
>>>>>>> origin/tasks
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
                        defaultValue={1}
                        min={1}
                        onChange={(e) =>
                          setQuestions((prev) => {
                            const value = parseInt(e.target.value, 10);
                            if (value <= 0) {
                              return prev;
                            }
                            if (prev.length > value) {
                              return prev.slice(0, value);
                            }
                            const questionsToAdd = value - prev.length;
                            const newQuestions = [...prev];
                            for (let i = 0; i < questionsToAdd; i++) {
                              newQuestions.push({
                                question: "",
                                options: ["", "", "", ""],
                                answer: "",
                              });
                            }
                            return newQuestions;
                          })
                        }
                      />
                    </div>
                    <div className="checkout-form">
                      <form>
                        <div className="form-group">
                          <label>Quiz Title</label>
                          <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                            name="title"
                            placeholder="Enter quiz title"
<<<<<<< HEAD
                            required
                          />
                        </div>
                        
=======
                          />
                        </div>
>>>>>>> origin/tasks
                        {questions.map((question, index) => (
                          <div key={index} className="form-group">
                            <label>Question {index + 1}</label>
                            <input
                              type="text"
                              className="form-control"
                              name={`question${index}`}
                              placeholder="Enter question"
                              value={question.question}
                              onChange={(e) => {
                                const newQuestions = [...questions];
                                newQuestions[index].question = e.target.value;
                                setQuestions(newQuestions);
                              }}
<<<<<<< HEAD
                              required
=======
>>>>>>> origin/tasks
                            />
                            <label>Options</label>
                            {question.options.map((option, i) => (
                              <input
                                key={`question${index}option${i}`}
                                type="text"
<<<<<<< HEAD
                                className="form-control mt-2"
=======
                                className="form-control"
>>>>>>> origin/tasks
                                name={`option${i}`}
                                placeholder={`Option ${i + 1}`}
                                value={option}
                                onChange={(e) => {
                                  const newQuestions = [...questions];
                                  newQuestions[index].options[i] =
                                    e.target.value;
                                  setQuestions(newQuestions);
                                }}
<<<<<<< HEAD
                                required
                              />
                            ))}
                            <label className="mt-2">Answer</label>
=======
                              />
                            ))}
                            <label>Answer</label>
>>>>>>> origin/tasks
                            <input
                              type="text"
                              className="form-control"
                              name={`answer${index}`}
                              placeholder="Enter answer"
                              value={question.answer}
                              onChange={(e) => {
                                const newQuestions = [...questions];
                                newQuestions[index].answer = e.target.value;
                                setQuestions(newQuestions);
                              }}
<<<<<<< HEAD
                              required
=======
>>>>>>> origin/tasks
                            />
                          </div>
                        ))}

<<<<<<< HEAD
                        <div className="d-flex gap-2 mt-4">
                          <button
                            type="submit"
                            className={`btn ${isFormComplete() ? "btn-success" : "btn-secondary"} flex-grow-1`}
                            style={{ 
                              opacity: isFormComplete() ? 1 : 0.7,
                              transition: 'all 0.3s ease'
                            }}
                            onClick={onSubmit}
                            disabled={isSubmitting || !isFormComplete()}
                          >
                            {isSubmitting ? (
                              <>
                                <span 
                                  className="spinner-border spinner-border-sm me-2" 
                                  role="status" 
                                  aria-hidden="true"
                                ></span>
                                Envoi en cours...
                              </>
                            ) : (
                              'Soumettre le Quiz'
                            )}
                          </button>
                        </div>
=======
                        <button
                          type="submit"
                          className="btn btn-primary mt-3"
                          onClick={onSubmit}
                        >
                          Submit
                        </button>
>>>>>>> origin/tasks
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
      </div>
    </>
  );
}
=======
       
      </div>
    </>
  );
}
>>>>>>> origin/tasks

import { useState } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import SidebarT from "../SidebarT";
import HeaderS from "../HeaderS";
import HeaderT from "../HeaderT";

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ]);
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      creatorEmail: "test@test.com",
      title,
      questions,
    };
    let response;
    try {
      response = await axios.post(
        "http://localhost:5000/api/quiz",
        quizData
      );
      if (response.status === 201) {
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
  };

  return (
    <>
      <div className="main-wrapper">
        <HeaderT />
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
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
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
        {/* Page Content */}
        <div className="page-content">
          <div className="container">
            <div className="row">
              <SidebarT />
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
                          />
                        </div>
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
                            />
                            <label>Options</label>
                            {question.options.map((option, i) => (
                              <input
                                key={`question${index}option${i}`}
                                type="text"
                                className="form-control"
                                name={`option${i}`}
                                placeholder={`Option ${i + 1}`}
                                value={option}
                                onChange={(e) => {
                                  const newQuestions = [...questions];
                                  newQuestions[index].options[i] =
                                    e.target.value;
                                  setQuestions(newQuestions);
                                }}
                              />
                            ))}
                            <label>Answer</label>
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
                            />
                          </div>
                        ))}

                        <button
                          type="submit"
                          className="btn btn-primary mt-3"
                          onClick={onSubmit}
                        >
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
        <Footer />
      </div>
    </>
  );
}

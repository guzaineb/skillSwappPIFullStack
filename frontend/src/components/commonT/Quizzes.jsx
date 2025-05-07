import { useEffect, useState } from "react";
import axios from "axios";


function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/quiz/"
        );
        const data = response.data.map((quiz) => ({
          id: quiz._id,
          title: quiz.title,
          questions: quiz.questions.length,
          attempts: quiz.attempts.length,
          link: `/QuizDetails/${quiz._id}`,
        }));
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <>
      <div className="main-wrapper">
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h2 className="breadcrumb-title">All Quizzes</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        All Quizzes
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
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="profile-heading d-flex">
                      <h3>All Quizzes</h3>
                     
                    </div>
                    <div className="checkout-form">
                      <div className="table-responsive custom-table">
                        {/* Referred Users*/}
                        <table className="table table-nowrap mb-0">
                          <thead>
                            <tr>
                              <th>Quiz Title</th>
                              <th>Questions</th>
                              <th>Attempts</th>
                              <th>Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {quizzes.map((quiz) => (
                              <tr key={quiz._id}>
                                <td>
                                  <div className="quiz-table">
                                    <p>
                                      {quiz.title}
                                      <i className="bx bx-info-circle" />
                                    </p>
                                  </div>
                                </td>
                                <td>{quiz.questions}</td>
                                <td>{quiz.attempts}</td>
                                <td>
                                  <a
                                    href={quiz.link}
                                    className="btn btn-light-danger quiz-view"
                                  >
                                    Details
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quizzes;

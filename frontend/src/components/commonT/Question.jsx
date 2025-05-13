import React from 'react'


function Question() {
  return (
    <>
      <div className="main-wrapper">
       
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h2 className="breadcrumb-title">Question &amp; Answer</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Question &amp; Answer
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
              {/* sidebar */}
             
              {/* /Sidebar */}
              {/* Student Q & A */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>Question &amp; Answer</h3>
                    </div>
                    <div className="checkout-form">
                      <div className="table-responsive custom-table">
                        {/* Referred Users*/}
                        <table className="table table-nowrap mb-0">
                          <thead>
                            <tr>
                              <th>Question No</th>
                              <th>Question</th>
                              <th>Course</th>
                              <th>Type</th>
                              <th>Date</th>
                              <th>Posted By</th>
                              <th>No of Replies</th>
                              <th />
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Q1</td>
                              <td>
                                <span className="title-course">
                                  AngularJS and Angular refer to the same
                                  framework.
                                </span>
                              </td>
                              <td>
                                <span className="title-course">
                                  Learn Angular Fundamentals Beginners Guide
                                </span>
                              </td>
                              <td>
                                <i className="bx bxs-adjust" />
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-original-title="True / False"
                                >
                                  <i className="bx bxs-info-circle" />
                                </a>
                              </td>
                              <td>
                                March 24, 2024{" "}
                                <span className="d-block">09:30 AM</span>
                              </td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="javascript:void(0);"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user2.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="javascript:void(0);">
                                    Thompson Hicks
                                  </a>
                                </h2>
                              </td>
                              <td>0</td>
                              <td>
                                <div className="table-view">
                                  <a href="#">
                                    <i className="bx bx-undo" />
                                    Reply
                                  </a>
                                </div>
                              </td>
                              <td>
                                <div className="table-view">
                                  <a href="#">
                                    <i className="bx bx-show" />
                                    View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Q2</td>
                              <td>
                                <span className="title-course">
                                  What is the purpose of Angular&apos;s NgIf
                                  directive?
                                </span>
                              </td>
                              <td>
                                <span className="title-course">
                                  Learn Angular Fundamentals Beginners Guide
                                </span>
                              </td>
                              <td>
                                <i className="bx bx-check-double" />
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-original-title="Multiple Choice"
                                >
                                  <i className="bx bxs-info-circle" />
                                </a>
                              </td>
                              <td>
                                March 24, 2024{" "}
                                <span className="d-block">09:30 AM</span>
                              </td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="javascript:void(0);"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user3.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="javascript:void(0);">
                                    James Schulte
                                  </a>
                                </h2>
                              </td>
                              <td>0</td>
                              <td>
                                <div className="table-view">
                                  <a href="#">
                                    <i className="bx bx-undo" />
                                    Reply
                                  </a>
                                </div>
                              </td>
                              <td>
                                <div className="table-view">
                                  <a href="#">
                                    <i className="bx bx-show" />
                                    View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Q3</td>
                              <td>
                                <span className="title-course">
                                  Observables are not part of Angular&apos;s
                                  HTTP module.
                                </span>
                              </td>
                              <td>
                                <span className="title-course">
                                  Learn Angular Fundamentals Beginners Guide
                                </span>
                              </td>
                              <td>
                                <i className="bx bxs-adjust" />
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-original-title="True / False"
                                >
                                  <i className="bx bxs-info-circle" />
                                </a>
                              </td>
                              <td>
                                March 24, 2024{" "}
                                <span className="d-block">09:30 AM</span>
                              </td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="javascript:void(0);"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user5.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="javascript:void(0);">Doris Hughes</a>
                                </h2>
                              </td>
                              <td>0</td>
                              <td>
                                <div className="table-view">
                                  <a href="#">
                                    <i className="bx bx-undo" />
                                    Reply
                                  </a>
                                </div>
                              </td>
                              <td>
                                <div className="table-view">
                                  <a href="#">
                                    <i className="bx bx-show" />
                                    View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Q4</td>
                              <td>
                                <span className="title-course">
                                  Which of the following is a valid way to bind
                                  data in Angular?
                                </span>
                              </td>
                              <td>
                                <span className="title-course">
                                  Learn Angular Fundamentals Beginners Guide
                                </span>
                              </td>
                              <td>
                                <i className="bx bx-check-double" />
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-original-title="Multiple Choice"
                                >
                                  <i className="bx bxs-info-circle" />
                                </a>
                              </td>
                              <td>
                                March 24, 2024{" "}
                                <span className="d-block">09:30 AM</span>
                              </td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="javascript:void(0);"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user13.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="javascript:void(0);">
                                    Arthur Nalley
                                  </a>
                                </h2>
                              </td>
                              <td>0</td>
                              <td>
                                <div className="table-view">
                                  <a href="#">
                                    <i className="bx bx-undo" />
                                    Reply
                                  </a>
                                </div>
                              </td>
                              <td>
                                <div className="table-view">
                                  <a href="#">
                                    <i className="bx bx-show" />
                                    View
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Q5</td>
                              <td>
                                <span className="title-course">
                                  Angular applications can only be written in
                                  TypeScript.
                                </span>
                              </td>
                              <td>
                                <span className="title-course">
                                  Learn Angular Fundamentals Beginners Guide
                                </span>
                              </td>
                              <td>
                                <i className="bx bxs-adjust" />
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-original-title="True / False"
                                >
                                  <i className="bx bxs-info-circle" />
                                </a>
                              </td>
                              <td>
                                March 24, 2024{" "}
                                <span className="d-block">09:30 AM</span>
                              </td>
                              <td>
                                <h2 className="table-avatar d-flex align-items-center">
                                  <a
                                    href="javascript:void(0);"
                                    className="avatar"
                                  >
                                    <img
                                      className="avatar-img"
                                      src="assets/img/user/user8.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href="javascript:void(0);">Shirley Lis</a>
                                </h2>
                              </td>
                              <td>0</td>
                              <td>
                                <div className="table-view">
                                  <a href="#">
                                    <i className="bx bx-undo" />
                                    Reply
                                  </a>
                                </div>
                              </td>
                              <td>
                                <div className="table-view">
                                  <a href="#">
                                    <i className="bx bx-show" />
                                    View
                                  </a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dash-pagination">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <p>Page 1 of 2</p>
                    </div>
                    <div className="col-6">
                      <ul className="pagination">
                        <li className="active">
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bx-chevron-right" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Student Q & A */}
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Footer */}
       
        {/* /Footer */}
      </div>
    </>
  );
}

export default Question;

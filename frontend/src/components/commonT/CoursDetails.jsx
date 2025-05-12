import React from "react";


function CoursDetails() {
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
      
        {/* /Header */}
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Courses
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        All Courses
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        The Complete Web Developer Course 2.0
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Inner Banner */}
        <div className="inner-banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="instructor-wrap border-bottom-0 m-0">
                  <div className="about-instructor align-items-center">
                    <div className="abt-instructor-img">
                      <a href="instructor-profile.html">
                        <img
                          src="assets/img/user/user1.jpg"
                          alt="img"
                          className="img-fluid"
                        />
                      </a>
                    </div>
                    <div className="instructor-detail me-3">
                      <h5>
                        <a href="instructor-profile.html">Nicole Brown</a>
                      </h5>
                      <p>UX/UI Designer</p>
                    </div>
                    <div className="rating mb-0">
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star filled" />
                      <i className="fas fa-star" />
                      <span className="d-inline-block average-rating">
                        <span>4.5</span> (15)
                      </span>
                    </div>
                  </div>
                  <span className="web-badge mb-3">WEB DEVELPMENT</span>
                </div>
                <h2>The Complete Web Developer Course 2.0</h2>
                <p>
                  Learn Web Development by building 25 websites and mobile apps
                  using HTML, CSS, Javascript, PHP, Python, MySQL &amp; more!
                </p>
                <div className="course-info d-flex align-items-center border-bottom-0 m-0 p-0">
                  <div className="cou-info">
                    <img src="assets/img/icon/icon-01.svg" alt="Img" />
                    <p>12+ Lesson</p>
                  </div>
                  <div className="cou-info">
                    <img src="assets/img/icon/timer-icon.svg" alt="Img" />
                    <p>9hr 30min</p>
                  </div>
                  <div className="cou-info">
                    <img src="assets/img/icon/people.svg" alt="Img" />
                    <p>32 students enrolled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Inner Banner */}
        {/* Course Content */}
        <section className="page-content course-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                {/* Overview */}
                <div className="card overview-sec">
                  <div className="card-body">
                    <h5 className="subs-title">Overview</h5>
                    <h6>Course Description</h6>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </p>
                    <p>
                      It was popularised in the 1960s with the release of
                      Letraset sheets containing Lorem Ipsum passages, and more
                      recently with desktop publishing software like Aldus
                      PageMaker including versions of Lorem Ipsum.
                    </p>
                    <h6>What you'll learn</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <ul>
                          <li>Become a UX designer.</li>
                          <li>
                            You will be able to add UX designer to your CV
                          </li>
                          <li>Become a UI designer.</li>
                          <li>Build &amp; test a full website design.</li>
                          <li>Build &amp; test a full mobile app.</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul>
                          <li>
                            Learn to design websites &amp; mobile phone apps.
                          </li>
                          <li>You'll learn how to choose colors.</li>
                          <li>Prototype your designs with interactions.</li>
                          <li>Export production ready assets.</li>
                          <li>All the techniques used by UX professionals</li>
                        </ul>
                      </div>
                    </div>
                    <h6>Requirements</h6>
                    <ul className="mb-0">
                      <li>
                        You will need a copy of Adobe XD 2019 or above. A free
                        trial can be downloaded from Adobe.
                      </li>
                      <li>No previous design experience is needed.</li>
                      <li className="mb-0">
                        No previous Adobe XD skills are needed.
                      </li>
                    </ul>
                  </div>
                </div>
                {/* /Overview */}
                {/* Course Content */}
                <div className="card content-sec">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <h5 className="subs-title">Course Content</h5>
                      </div>
                      <div className="col-sm-6 text-sm-end">
                        <h6>92 Lectures 10:56:11</h6>
                      </div>
                    </div>
                    <div className="course-card">
                      <h6 className="cou-title">
                        <a
                          className="collapsed"
                          data-bs-toggle="collapse"
                          href="#collapseOne"
                          aria-expanded="false"
                        >
                          In which areas do you operate?
                        </a>
                      </h6>
                      <div
                        id="collapseOne"
                        className="card-collapse collapse"
                        style={{}}
                      >
                        <ul>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.1 Introduction to the User Experience
                              Course
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.2 Exercise: Your first design challenge
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.3 How to solve the previous exercise
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.3 How to solve the previous exercise
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.5 How to use text layers effectively
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="course-card">
                      <h6 className="cou-title">
                        <a
                          className="collapsed"
                          data-bs-toggle="collapse"
                          href="#course2"
                          aria-expanded="false"
                        >
                          The Brief
                        </a>
                      </h6>
                      <div
                        id="course2"
                        className="card-collapse collapse"
                        style={{}}
                      >
                        <ul>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.1 Introduction to the User Experience
                              Course
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.2 Exercise: Your first design challenge
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.3 How to solve the previous exercise
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.3 How to solve the previous exercise
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.5 How to use text layers effectively
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="course-card">
                      <h6 className="cou-title">
                        <a
                          className="collapsed"
                          data-bs-toggle="collapse"
                          href="#course3"
                          aria-expanded="false"
                        >
                          Wireframing Low Fidelity
                        </a>
                      </h6>
                      <div
                        id="course3"
                        className="card-collapse collapse"
                        style={{}}
                      >
                        <ul>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.1 Introduction to the User Experience
                              Course
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.2 Exercise: Your first design challenge
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.3 How to solve the previous exercise
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.3 How to solve the previous exercise
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture1.5 How to use text layers effectively
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="course-card">
                      <h6 className="cou-title mb-0">
                        <a
                          className="collapsed"
                          data-bs-toggle="collapse"
                          href="#coursefour"
                          aria-expanded="false"
                        >
                          Type, Color &amp; Icon Introduction
                        </a>
                      </h6>
                      <div
                        id="coursefour"
                        className="card-collapse collapse"
                        style={{}}
                      >
                        <ul>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture4.1 Introduction to the User Experience
                              Course
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture4.2 Exercise: Your first design challenge
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture4.3 How to solve the previous exercise
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture4.4 How to solve the previous exercise
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                          <li>
                            <p>
                              <img
                                src="assets/img/icon/play.svg"
                                alt="Img"
                                className="me-2"
                              />
                              Lecture4.5 How to use text layers effectively
                            </p>
                            <div>
                              <a href="javascript:void(0);">Preview</a>
                              <span>02:53</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Course Content */}
                {/* Instructor */}
                <div className="card instructor-sec">
                  <div className="card-body">
                    <h5 className="subs-title">About the instructor</h5>
                    <div className="instructor-wrap">
                      <div className="about-instructor">
                        <div className="abt-instructor-img">
                          <a href="instructor-profile.html">
                            <img
                              src="assets/img/user/user1.jpg"
                              alt="img"
                              className="img-fluid"
                            />
                          </a>
                        </div>
                        <div className="instructor-detail">
                          <h5>
                            <a href="instructor-profile.html">Nicole Brown</a>
                          </h5>
                          <p>UX/UI Designer</p>
                        </div>
                      </div>
                      <div className="rating">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star" />
                        <span className="d-inline-block average-rating">
                          4.5 Instructor Rating
                        </span>
                      </div>
                    </div>
                    <div className="course-info d-flex align-items-center">
                      <div className="cou-info">
                        <img src="assets/img/icon/play.svg" alt="Img" />
                        <p>5 Courses</p>
                      </div>
                      <div className="cou-info">
                        <img src="assets/img/icon/icon-01.svg" alt="Img" />
                        <p>12+ Lesson</p>
                      </div>
                      <div className="cou-info">
                        <img src="assets/img/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                      <div className="cou-info">
                        <img src="assets/img/icon/people.svg" alt="Img" />
                        <p>270,866 students enrolled</p>
                      </div>
                    </div>
                    <p>
                      UI/UX Designer, with 7+ Years Experience. Guarantee of
                      High Quality Work.
                    </p>
                    <p>
                      Skills: Web Design, UI Design, UX/UI Design, Mobile
                      Design, User Interface Design, Sketch, Photoshop, GUI,
                      Html, Css, Grid Systems, Typography, Minimal, Template,
                      English, Bootstrap, Responsive Web Design, Pixel Perfect,
                      Graphic Design, Corporate, Creative, Flat, Luxury and much
                      more.
                    </p>
                    <p>Available for:</p>
                    <ul>
                      <li>1. Full Time Office Work</li>
                      <li>2. Remote Work</li>
                      <li>3. Freelance</li>
                      <li>4. Contract</li>
                      <li>5. Worldwide</li>
                    </ul>
                  </div>
                </div>
                {/* /Instructor */}
                {/* Reviews */}
                <div className="card review-sec">
                  <div className="card-body">
                    <h5 className="subs-title">Reviews</h5>
                    <div className="instructor-wrap">
                      <div className="about-instructor">
                        <div className="abt-instructor-img">
                          <a href="instructor-profile.html">
                            <img
                              src="assets/img/user/user1.jpg"
                              alt="img"
                              className="img-fluid"
                            />
                          </a>
                        </div>
                        <div className="instructor-detail">
                          <h5>
                            <a href="instructor-profile.html">Nicole Brown</a>
                          </h5>
                          <p>UX/UI Designer</p>
                        </div>
                      </div>
                      <div className="rating">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star" />
                        <span className="d-inline-block average-rating">
                          4.5 Instructor Rating
                        </span>
                      </div>
                    </div>
                    <p className="rev-info">
                      “ This is the second Photoshop course I have completed
                      with Cristian. Worth every penny and recommend it highly.
                      To get the most out of this course, its best to to take
                      the Beginner to Advanced course first. The sound and video
                      quality is of a good standard. Thank you Cristian. “
                    </p>
                    <a href="javascript:void(0);" className="btn btn-reply">
                      <i className="feather-corner-up-left" /> Reply
                    </a>
                  </div>
                </div>
                {/* /Reviews */}
                {/* Comment */}
                <div className="card comment-sec">
                  <div className="card-body">
                    <h5 className="subs-title">Post A comment</h5>
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="input-block">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Subject"
                        />
                      </div>
                      <div className="input-block">
                        <textarea
                          rows={4}
                          className="form-control"
                          placeholder="Your Comments"
                          defaultValue={""}
                        />
                      </div>
                      <div className="submit-section">
                        <button className="btn submit-btn" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* /Comment */}
              </div>
              <div className="col-lg-4">
                <div className="sidebar-sec">
                  {/* Video */}
                  <div className="video-sec vid-bg">
                    <div className="card">
                      <div className="card-body">
                        <a
                          href="https://www.youtube.com/watch?v=TxARXAGn-_k"
                          className="video-thumbnail"
                          data-fancybox
                        >
                          <div className="play-icon">
                            <i className="fa-solid fa-play" />
                          </div>
                          <img className src="assets/img/video.jpg" alt="Img" />
                        </a>
                        <div className="video-details">
                          <div className="course-fee">
                            <h2>FREE</h2>
                            <p>
                              <span>$99.00</span> 50% off
                            </p>
                          </div>
                          <div className="row gx-2">
                            <div className="col-md-6">
                              <a
                                href="course-wishlist.html"
                                className="btn btn-wish w-100"
                              >
                                <i className="feather-heart" /> Add to Wishlist
                              </a>
                            </div>
                            <div className="col-md-6">
                              <a
                                href="javascript:void(0);"
                                className="btn btn-wish w-100"
                              >
                                <i className="feather-share-2" /> Share
                              </a>
                            </div>
                          </div>
                          <a
                            href="checkout.html"
                            className="btn btn-enroll w-100"
                          >
                            Enroll Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Video */}
                  {/* Include */}
                  <div className="card include-sec">
                    <div className="card-body">
                      <div className="cat-title">
                        <h4>Includes</h4>
                      </div>
                      <ul>
                        <li>
                          <img
                            src="assets/img/icon/import.svg"
                            className="me-2"
                            alt="Img"
                          />{" "}
                          11 hours on-demand video
                        </li>
                        <li>
                          <img
                            src="assets/img/icon/play.svg"
                            className="me-2"
                            alt="Img"
                          />{" "}
                          69 downloadable resources
                        </li>
                        <li>
                          <img
                            src="assets/img/icon/key.svg"
                            className="me-2"
                            alt="Img"
                          />{" "}
                          Full lifetime access
                        </li>
                        <li>
                          <img
                            src="assets/img/icon/mobile.svg"
                            className="me-2"
                            alt="Img"
                          />{" "}
                          Access on mobile and TV
                        </li>
                        <li>
                          <img
                            src="assets/img/icon/cloud.svg"
                            className="me-2"
                            alt="Img"
                          />{" "}
                          Assignments
                        </li>
                        <li>
                          <img
                            src="assets/img/icon/teacher.svg"
                            className="me-2"
                            alt="Img"
                          />{" "}
                          Certificate of Completion
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Include */}
                  {/* Features */}
                  <div className="card feature-sec">
                    <div className="card-body">
                      <div className="cat-title">
                        <h4>Includes</h4>
                      </div>
                      <ul>
                        <li>
                          <img
                            src="assets/img/icon/users.svg"
                            className="me-2"
                            alt="Img"
                          />{" "}
                          Enrolled: <span>32 students</span>
                        </li>
                        <li>
                          <img
                            src="assets/img/icon/timer.svg"
                            className="me-2"
                            alt="Img"
                          />{" "}
                          Duration: <span>20 hours</span>
                        </li>
                        <li>
                          <img
                            src="assets/img/icon/chapter.svg"
                            className="me-2"
                            alt="Img"
                          />{" "}
                          Chapters: <span>15</span>
                        </li>
                        <li>
                          <img
                            src="assets/img/icon/video.svg"
                            className="me-2"
                            alt="Img"
                          />{" "}
                          Video:<span> 12 hours</span>
                        </li>
                        <li>
                          <img
                            src="assets/img/icon/chart.svg"
                            className="me-2"
                            alt="Img"
                          />{" "}
                          Level: <span>Beginner</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Features */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Pricing Plan */}
       
      </div>
    </>
  );
}

export default CoursDetails;

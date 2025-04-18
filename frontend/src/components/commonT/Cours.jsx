import React from 'react'

function Cours() {
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
    
        {/* /Header */}
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h2 className="breadcrumb-title">Courses</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                         Courses
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
              {/* Student Courses */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-info">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3> Courses</h3>
                    </div>
                    <div className="checkout-form pb-0">
                      <div className="wishlist-tab">
                        <ul className="nav">
                          <li className="nav-item">
                            <a
                              href="javascript:void(0);"
                              className="active"
                              data-bs-toggle="tab"
                              data-bs-target="#enroll-courses"
                            >
                              Enrolled Courses (06)
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="javascript:void(0);"
                              data-bs-toggle="tab"
                              data-bs-target="#active-courses"
                            >
                              Active Courses (03)
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="javascript:void(0);"
                              data-bs-toggle="tab"
                              data-bs-target="#complete-courses"
                            >
                              Completed Courses (03)
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="enroll-courses"
                        >
                          <div className="row">
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-02.jpg"
                                      />
                                    </a>
                                    <div className="price">
                                      <h3>
                                        $80 <span>$99.00</span>
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user2.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              Cooper
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Wordpress for Beginners - Master
                                        Wordpress Quickly
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>12+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>70hr 30min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <span className="d-inline-block average-rating">
                                        <span>5.0</span>
                                        (20)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-03.jpg"
                                      />
                                    </a>
                                    <div className="price combo">
                                      <h3>FREE</h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user5.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              Jenny
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Sketch from A to Z (2024): Become an app
                                        designer
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>10+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>40hr 10min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <i className="fas fa-star" />
                                      <span className="d-inline-block average-rating">
                                        <span>3.0</span>
                                        (18)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-04.jpg"
                                      />
                                    </a>
                                    <div className="price">
                                      <h3>
                                        $65 <span>$70.00</span>
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user4.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              Nicole Brown
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Learn Angular Fundamentals From
                                        beginning to advance lavel
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>15+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>80hr 40min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <span className="d-inline-block average-rating">
                                        <span>4.0</span>
                                        (10)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-05.jpg"
                                      />
                                    </a>
                                    <div className="price combo">
                                      <h3>FREE</h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user3.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              John Smith
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Build Responsive Real World Websites
                                        with Crash Course
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>12+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>70hr 30min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <span className="d-inline-block average-rating">
                                        <span>4.0</span>
                                        (15)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-07.jpg"
                                      />
                                    </a>
                                    <div className="price">
                                      <h3>
                                        $70 <span>$80.00</span>
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user6.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              Stella Johnson
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Learn JavaScript and Express to become a
                                        Expert
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>15+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>70hr 30min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <span className="d-inline-block average-rating">
                                        <span>4.6</span>
                                        (15)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-08.jpg"
                                      />
                                    </a>
                                    <div className="price combo">
                                      <h3>FREE</h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user1.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              Nicole Brown
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Introduction to Programming- Python
                                        &amp; Java
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>10+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>70hr 30min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <span className="d-inline-block average-rating">
                                        <span>5.0</span>
                                        (13)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                          </div>
                        </div>
                        <div className="tab-pane fade" id="active-courses">
                          <div className="row">
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-04.jpg"
                                      />
                                    </a>
                                    <div className="price">
                                      <h3>
                                        $65 <span>$70.00</span>
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user4.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              Nicole Brown
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Learn Angular Fundamentals From
                                        beginning to advance lavel
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>15+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>80hr 40min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <span className="d-inline-block average-rating">
                                        <span>4.0</span>
                                        (10)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-07.jpg"
                                      />
                                    </a>
                                    <div className="price">
                                      <h3>
                                        $70 <span>$80.00</span>
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user6.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              Stella Johnson
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Learn JavaScript and Express to become a
                                        Expert
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>15+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>70hr 30min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <span className="d-inline-block average-rating">
                                        <span>4.6</span>
                                        (15)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-08.jpg"
                                      />
                                    </a>
                                    <div className="price combo">
                                      <h3>FREE</h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user1.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              Nicole Brown
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Introduction to Programming- Python
                                        &amp; Java
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>10+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>70hr 30min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <span className="d-inline-block average-rating">
                                        <span>5.0</span>
                                        (13)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                          </div>
                        </div>
                        <div className="tab-pane fade" id="complete-courses">
                          <div className="row">
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-03.jpg"
                                      />
                                    </a>
                                    <div className="price combo">
                                      <h3>FREE</h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user5.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              Jenny
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Sketch from A to Z (2024): Become an app
                                        designer
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>10+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>40hr 10min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <i className="fas fa-star" />
                                      <span className="d-inline-block average-rating">
                                        <span>3.0</span>
                                        (18)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-04.jpg"
                                      />
                                    </a>
                                    <div className="price">
                                      <h3>
                                        $65 <span>$70.00</span>
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user4.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              Nicole Brown
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Learn Angular Fundamentals From
                                        beginning to advance lavel
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>15+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>80hr 40min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <span className="d-inline-block average-rating">
                                        <span>4.0</span>
                                        (10)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                            {/* Course Grid */}
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <a href="course-details.html">
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src="assets/img/course/course-07.jpg"
                                      />
                                    </a>
                                    <div className="price">
                                      <h3>
                                        $70 <span>$80.00</span>
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="product-content">
                                    <div className="course-group d-flex">
                                      <div className="course-group-img d-flex">
                                        <a href="instructor-profile.html">
                                          <img
                                            src="assets/img/user/user6.jpg"
                                            alt="Img"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="course-name">
                                          <h4>
                                            <a href="instructor-profile.html">
                                              Stella Johnson
                                            </a>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        <a href="#">
                                          <i className="fa-regular fa-heart" />
                                        </a>
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <a href="course-details.html">
                                        Learn JavaScript and Express to become a
                                        Expert
                                      </a>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-01.svg"
                                          alt="Img"
                                        />
                                        <p>15+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img
                                          src="assets/img/icon/icon-02.svg"
                                          alt="Img"
                                        />
                                        <p>70hr 30min</p>
                                      </div>
                                    </div>
                                    <div className="rating mb-0">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <span className="d-inline-block average-rating">
                                        <span>4.6</span>
                                        (15)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /Course Grid */}
                          </div>
                        </div>
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
              {/* /Student Courses */}
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

export default Cours;

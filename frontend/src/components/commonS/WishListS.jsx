import HeaderS from "../HeaderS";
import SidebarS from "../SidebarS";

function WishList() {
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
       <HeaderS />
        {/* /Header */}
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h2 className="breadcrumb-title">Wishlist</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Wishlist
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
              <SidebarS />
              {/* /Sidebar */}
              {/* Student Wishlist */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-info">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>Wishlist</h3>
                    </div>
                    <div className="checkout-form pb-0">
                      <div className="row">
                        {/* Course Grid */}
                        <div className="col-xxl-4 col-md-6 d-flex">
                          <div className="course-box flex-fill">
                            <div className="product">
                              <div className="product-img">
                                <a href="CoursDetails">
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
                                      <i className="fa-regular fa-heart color-active" />
                                    </a>
                                  </div>
                                </div>
                                <h3 className="title instructor-text">
                                  <a href="CoursDetails">
                                    Wordpress for Beginners - Master Wordpress
                                    Quickly
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
                                <a href="CoursDetails">
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
                                      <i className="fa-regular fa-heart color-active" />
                                    </a>
                                  </div>
                                </div>
                                <h3 className="title instructor-text">
                                  <a href="CoursDetails">
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
                                <a href="CoursDetails">
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
                                      <i className="fa-regular fa-heart color-active" />
                                    </a>
                                  </div>
                                </div>
                                <h3 className="title instructor-text">
                                  <a href="CoursDetails">
                                    Learn Angular Fundamentals From beginning to
                                    advance lavel
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
                                <a href="CoursDetails">
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
                                      <i className="fa-regular fa-heart color-active" />
                                    </a>
                                  </div>
                                </div>
                                <h3 className="title instructor-text">
                                  <a href="CoursDetails">
                                    Build Responsive Real World Websites with
                                    Crash Course
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
                                <a href="CoursDetails">
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
                                      <i className="fa-regular fa-heart color-active" />
                                    </a>
                                  </div>
                                </div>
                                <h3 className="title instructor-text">
                                  <a href="CoursDetails">
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
                                <a href="CoursDetails">
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
                                      <i className="fa-regular fa-heart color-active" />
                                    </a>
                                  </div>
                                </div>
                                <h3 className="title instructor-text">
                                  <a href="CoursDetails">
                                    Introduction to Programming- Python &amp;
                                    Java
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
              {/* /Student Wishlist */}
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Footer */}
        <footer className="footer">
          {/* Footer Top */}
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-about">
                    <div className="footer-logo">
                      <img src="assets/img/logo.svg" alt="logo" />
                    </div>
                    <div className="footer-about-content">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut consequat mauris Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Ut consequat mauris
                      </p>
                    </div>
                  </div>
                  {/* /Footer Widget */}
                </div>
                <div className="col-lg-2 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-menu">
                    <h2 className="footer-title">For Instructor</h2>
                    <ul>
                      <li>
                        <a href="instructor-profile.html">Profile</a>
                      </li>
                      <li>
                        <a href="login.html">Login</a>
                      </li>
                      <li>
                        <a href="register.html">Register</a>
                      </li>
                      <li>
                        <a href="instructor-list.html">Instructor</a>
                      </li>
                      <li>
                        <a href="instructor-dashboard.html"> Dashboard</a>
                      </li>
                    </ul>
                  </div>
                  {/* /Footer Widget */}
                </div>
                <div className="col-lg-2 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-menu">
                    <h2 className="footer-title">For Student</h2>
                    <ul>
                      <li>
                        <a href="Profile">Profile</a>
                      </li>
                      <li>
                        <a href="login.html">Login</a>
                      </li>
                      <li>
                        <a href="register.html">Register</a>
                      </li>
                      <li>
                        <a href="students-list.html">Student</a>
                      </li>
                      <li>
                        <a href="student-dashboard.html"> Dashboard</a>
                      </li>
                    </ul>
                  </div>
                  {/* /Footer Widget */}
                </div>
                <div className="col-lg-4 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-contact">
                    <h2 className="footer-title">News letter</h2>
                    <div className="news-letter">
                      <form>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your email address"
                          name="email"
                        />
                      </form>
                    </div>
                    <div className="footer-contact-info">
                      <div className="footer-address">
                        <img
                          src="assets/img/icon/icon-20.svg"
                          alt="Img"
                          className="img-fluid"
                        />
                        <p>
                          {" "}
                          3556 Beech Street, San Francisco,
                          <br /> California, CA 94108{" "}
                        </p>
                      </div>
                      <p>
                        <img
                          src="assets/img/icon/icon-19.svg"
                          alt="Img"
                          className="img-fluid"
                        />
                        <a
                          href="https://dreamslms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                          className="__cf_email__"
                          data-cfemail="4c283e292d213f20213f0c29342d213c2029622f2321"
                        >
                          [email&nbsp;protected]
                        </a>
                      </p>
                      <p className="mb-0">
                        <img
                          src="assets/img/icon/icon-21.svg"
                          alt="Img"
                          className="img-fluid"
                        />
                        +19 123-456-7890
                      </p>
                    </div>
                  </div>
                  {/* /Footer Widget */}
                </div>
              </div>
            </div>
          </div>
          {/* /Footer Top */}
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="container">
              {/* Copyright */}
              <div className="copyright">
                <div className="row">
                  <div className="col-md-6">
                    <div className="privacy-policy">
                      <ul>
                        <li>
                          <a href="term-condition.html">Terms</a>
                        </li>
                        <li>
                          <a href="privacy-policy.html">Privacy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="copyright-text">
                      <p className="mb-0">
                        © 2024 DreamsLMS. All rights reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Copyright */}
            </div>
          </div>
          {/* /Footer Bottom */}
        </footer>
        {/* /Footer */}
      </div>
    </>
  );
}

export default WishList;

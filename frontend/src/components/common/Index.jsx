import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Index() {
  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        <section className="home-slide d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="home-slide-face aos">
                  <div className="home-slide-text">
                    <h5>The Leader in Online Learning</h5>
                    <h1>Engaging & Accessible Online Courses For All</h1>
                    <p>Own your future learning new skills online</p>
                  </div>
                  <div className="banner-content">
                    <form className="form" action="https://dreamslms.dreamstechnologies.com/html/course-list.html">
                      <div className="form-inner">
                        <div className="input-group">
                          <i className="fa-solid fa-magnifying-glass search-icon"></i>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Search School, Online educational centers, etc"
                          />
                          <span className="drop-detail">
                            <select className="form-select select">
                              <option>Category</option>
                              <option>Angular</option>
                              <option>Node Js</option>
                              <option>React</option>
                              <option>Python</option>
                            </select>
                          </span>
                          <button className="btn btn-primary sub-btn" type="submit">
                            <i className="fas fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="trust-user">
                    <p>Trusted by over 15K Users <br />worldwide since 2024</p>
                    <div className="trust-rating d-flex align-items-center">
                      <div className="rate-head">
                        <h2><span>1000</span>+</h2>
                      </div>
                      <div className="rating d-flex align-items-center">
                        <h2 className="d-inline-block average-rating">4.4</h2>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 d-flex align-items-center">
                <div className="girl-slide-img aos">
                  <img src="assets/img/object.png" alt="Img" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </section>
      <section className="section new-course">
  <div className="container">
    <div className="section-header aos" data-aos="fade-up">
      <div className="section-sub-head">
        <span>What’s New</span>
        <h2>Featured Courses</h2>
      </div>
      <div className="all-btn all-category d-flex align-items-center">
        <a href="course-list.html" className="btn btn-primary">All Courses</a>
      </div>
    </div>
    <div className="section-text aos" data-aos="fade-up">
      <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan
        bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet.</p>
    </div>
    <div className="course-feature">
      <div className="row">
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="course-box d-flex aos" data-aos="fade-up">
            <div className="product">
              <div className="product-img">
                <a href="course-details.html">
                  <img className="img-fluid" alt="Img" src="assets/img/course/course-01.jpg" />
                </a>
                <div className="price">
                  <h3>$300 <span>$99.00</span></h3>
                </div>
              </div>
              <div className="product-content">
                <div className="course-group d-flex">
                  <div className="course-group-img d-flex">
                    <a href="instructor-profile.html"><img src="assets/img/user/user1.jpg" alt="Img" className="img-fluid" /></a>
                    <div className="course-name">
                      <h4><a href="instructor-profile.html">Nicole Brown</a></h4>
                      <p>Instructor</p>
                    </div>
                  </div>
                  <div className="course-share d-flex align-items-center justify-content-center">
                    <a href="#"><i className="fa-regular fa-heart" /></a>
                  </div>
                </div>
                <h3 className="title instructor-text"><a href="course-details.html">Information
                    About UI/UX Design Degree</a></h3>
                <div className="course-info d-flex align-items-center">
                  <div className="rating-img d-flex align-items-center">
                    <img src="assets/img/icon/icon-01.svg" alt="Img" />
                    <p>12+ Lesson</p>
                  </div>
                  <div className="course-view d-flex align-items-center">
                    <img src="assets/img/icon/icon-02.svg" alt="Img" />
                    <p>9hr 30min</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rating m-0">
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star" />
                    <span className="d-inline-block average-rating"><span>4.0</span> (15)</span>
                  </div>
                  <div className="all-btn all-category d-flex align-items-center">
                    <a href="checkout.html" className="btn btn-primary">BUY NOW</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="course-box d-flex aos" data-aos="fade-up">
            <div className="product">
              <div className="product-img">
                <a href="course-details.html">
                  <img className="img-fluid" alt="Img" src="assets/img/course/course-02.jpg" />
                </a>
                <div className="price">
                  <h3>$400 <span>$99.00</span></h3>
                </div>
              </div>
              <div className="product-content">
                <div className="course-group d-flex">
                  <div className="course-group-img d-flex">
                    <a href="instructor-profile.html"><img src="assets/img/user/user2.jpg" alt="Img" className="img-fluid" /></a>
                    <div className="course-name">
                      <h4><a href="instructor-profile.html">Jenis R.</a></h4>
                      <p>Instructor</p>
                    </div>
                  </div>
                  <div className="course-share d-flex align-items-center justify-content-center">
                    <a href="#"><i className="fa-regular fa-heart" /></a>
                  </div>
                </div>
                <h3 className="title instructor-text"><a href="course-details.html">Wordpress for
                    Beginners - Master Wordpress Quickly</a></h3>
                <div className="course-info d-flex align-items-center">
                  <div className="rating-img d-flex align-items-center">
                    <img src="assets/img/icon/icon-01.svg" alt="Img" />
                    <p>11+ Lesson</p>
                  </div>
                  <div className="course-view d-flex align-items-center">
                    <img src="assets/img/icon/icon-02.svg" alt="Img" />
                    <p>6hr 30min</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rating m-0">
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star" />
                    <span className="d-inline-block average-rating"><span>4.3</span> (15)</span>
                  </div>
                  <div className="all-btn all-category d-flex align-items-center">
                    <a href="checkout.html" className="btn btn-primary">BUY NOW</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="course-box d-flex aos" data-aos="fade-up">
            <div className="product">
              <div className="product-img">
                <a href="course-details.html">
                  <img className="img-fluid" alt="Img" src="assets/img/course/course-03.jpg" />
                </a>
                <div className="price combo">
                  <h3>FREE</h3>
                </div>
              </div>
              <div className="product-content">
                <div className="course-group d-flex">
                  <div className="course-group-img d-flex">
                    <a href="instructor-profile.html"><img src="assets/img/user/user5.jpg" alt="Img" className="img-fluid" /></a>
                    <div className="course-name">
                      <h4><a href="instructor-profile.html">Jesse Stevens</a></h4>
                      <p>Instructor</p>
                    </div>
                  </div>
                  <div className="course-share d-flex align-items-center justify-content-center">
                    <a href="#"><i className="fa-regular fa-heart" /></a>
                  </div>
                </div>
                <h3 className="title instructor-text"><a href="course-details.html">Sketch from A to
                    Z (2024): Become an app designer</a></h3>
                <div className="course-info d-flex align-items-center">
                  <div className="rating-img d-flex align-items-center">
                    <img src="assets/img/icon/icon-01.svg" alt="Img" />
                    <p>16+ Lesson</p>
                  </div>
                  <div className="course-view d-flex align-items-center">
                    <img src="assets/img/icon/icon-02.svg" alt="Img" />
                    <p>12hr 30min</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rating m-0">
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star" />
                    <span className="d-inline-block average-rating"><span>4.5</span> (15)</span>
                  </div>
                  <div className="all-btn all-category d-flex align-items-center">
                    <a href="checkout.html" className="btn btn-primary">BUY NOW</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="course-box d-flex aos" data-aos="fade-up">
            <div className="product">
              <div className="product-img">
                <a href="course-details.html">
                  <img className="img-fluid" alt="Img" src="assets/img/course/course-04.jpg" />
                </a>
                <div className="price">
                  <h3>$500 <span>$99.00</span></h3>
                </div>
              </div>
              <div className="product-content">
                <div className="course-group d-flex">
                  <div className="course-group-img d-flex">
                    <a href="instructor-profile.html"><img src="assets/img/user/user4.jpg" alt="Img" className="img-fluid" /></a>
                    <div className="course-name">
                      <h4><a href="instructor-profile.html">Nicole Brown</a></h4>
                      <p>Instructor</p>
                    </div>
                  </div>
                  <div className="course-share d-flex align-items-center justify-content-center">
                    <a href="#"><i className="fa-regular fa-heart" /></a>
                  </div>
                </div>
                <h3 className="title instructor-text"><a href="course-details.html">Learn Angular
                    Fundamentals From beginning to advance lavel</a></h3>
                <div className="course-info d-flex align-items-center">
                  <div className="rating-img d-flex align-items-center">
                    <img src="assets/img/icon/icon-01.svg" alt="Img" />
                    <p>10+ Lesson</p>
                  </div>
                  <div className="course-view d-flex align-items-center">
                    <img src="assets/img/icon/icon-02.svg" alt="Img" />
                    <p>8hr 30min</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rating m-0">
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star" />
                    <span className="d-inline-block average-rating"><span>4.2</span> (15)</span>
                  </div>
                  <div className="all-btn all-category d-flex align-items-center">
                    <a href="checkout.html" className="btn btn-primary">BUY NOW</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="course-box d-flex aos" data-aos="fade-up">
            <div className="product">
              <div className="product-img">
                <a href="course-details.html">
                  <img className="img-fluid" alt="Img" src="assets/img/course/course-05.jpg" />
                </a>
                <div className="price">
                  <h3>$300 <span>$99.00</span></h3>
                </div>
              </div>
              <div className="product-content">
                <div className="course-group d-flex">
                  <div className="course-group-img d-flex">
                    <a href="instructor-profile.html"><img src="assets/img/user/user3.jpg" alt="Img" className="img-fluid" /></a>
                    <div className="course-name">
                      <h4><a href="instructor-profile.html">John Smith</a></h4>
                      <p>Instructor</p>
                    </div>
                  </div>
                  <div className="course-share d-flex align-items-center justify-content-center">
                    <a href="#"><i className="fa-regular fa-heart" /></a>
                  </div>
                </div>
                <h3 className="title instructor-text"><a href="course-details.html">Build Responsive
                    Real World Websites with HTML5 and CSS3</a></h3>
                <div className="course-info d-flex align-items-center">
                  <div className="rating-img d-flex align-items-center">
                    <img src="assets/img/icon/icon-01.svg" alt="Img" />
                    <p>13+ Lesson</p>
                  </div>
                  <div className="course-view d-flex align-items-center">
                    <img src="assets/img/icon/icon-02.svg" alt="Img" />
                    <p>10hr 30min</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rating m-0">
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star" />
                    <span className="d-inline-block average-rating"><span>4.0</span> (15)</span>
                  </div>
                  <div className="all-btn all-category d-flex align-items-center">
                    <a href="checkout.html" className="btn btn-primary">BUY NOW</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="course-box d-flex aos" data-aos="fade-up">
            <div className="product">
              <div className="product-img">
                <a href="course-details.html">
                  <img className="img-fluid" alt="Img" src="assets/img/course/course-06.jpg" />
                </a>
                <div className="price combo">
                  <h3>FREE</h3>
                </div>
              </div>
              <div className="product-content">
                <div className="course-group d-flex">
                  <div className="course-group-img d-flex">
                    <a href="instructor-profile.html"><img src="assets/img/user/user6.jpg" alt="Img" className="img-fluid" /></a>
                    <div className="course-name">
                      <h4><a href="instructor-profile.html">Stella Johnson</a></h4>
                      <p>Instructor</p>
                    </div>
                  </div>
                  <div className="course-share d-flex align-items-center justify-content-center">
                    <a href="#"><i className="fa-regular fa-heart" /></a>
                  </div>
                </div>
                <h3 className="title instructor-text"><a href="course-details.html">C# Developers
                    Double Your Coding Speed with Visual Studio</a></h3>
                <div className="course-info d-flex align-items-center">
                  <div className="rating-img d-flex align-items-center">
                    <img src="assets/img/icon/icon-01.svg" alt="Img" />
                    <p>7+ Lesson</p>
                  </div>
                  <div className="course-view d-flex align-items-center">
                    <img src="assets/img/icon/icon-02.svg" alt="Img" />
                    <p>7hr 30min</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="rating m-0">
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star filled" />
                    <i className="fas fa-star" />
                    <span className="d-inline-block average-rating"><span>4.6</span> (15)</span>
                  </div>
                  <div className="all-btn all-category d-flex align-items-center">
                    <a href="checkout.html" className="btn btn-primary">BUY NOW</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

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
                    <h1 style={{ color: '#002058', marginBottom: 10 }}>An easy exchange opportunity</h1>
                    <h3>Learn skills in your preferred field</h3>
                    <Link to="/">
                      <button
                        className="btn btn-primary sub-btn"
                        style={{
                          marginBottom: 10,
                          marginTop: 10,
                          marginLeft: '7em',
                          borderRadius: 50,
                          fontSize: '1.2rem',
                          padding: 10,
                          paddingLeft: 25,
                          paddingRight: 25
                        }}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                  <div className="trust-user d-flex align-items-center">
                    <div className="trust-rating d-flex align-items-center">
                      <div className="rate-head flex-grow-1 me-4">
                        <h3 style={{ whiteSpace: 'nowrap', marginBottom: 0, marginTop: 0 }}>Trusted by over 1K Users</h3>
                        <p style={{ marginTop: 10, marginBottom: 0, fontSize: '1.5rem', color: '#666' }}>Since 2025</p>
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
                  <h5 style={{ whiteSpace: 'nowrap', marginBottom: 0, marginTop: 20 }}><span>1000</span>+ skills to look into</h5>
                </div>
              </div>
              <div className="col-md-5 d-flex align-items-center">
                <div className="girl-slide-img aos">
                  <img src="assets/img/object.png" alt="Img" className="img-fluid" style={{ height: '25em' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section new-course">
          <div className="container">
            <div className="section-header aos" data-aos="fade-up">
              <div className="section-sub-head">
                <span style={{ fontSize: '1.5rem', paddingBottom: 0 }}>A growing list of</span>
                <h2>Categories</h2>
              </div>
            </div>
            <div className="section-text aos" data-aos="fade-up">
              <p className="mb-0">Browse our selection of categories and find the ones that suit you.</p>
            </div>
            <div className="course-feature">
              <div className="row">

                <div className="col-lg-4 col-md-6 d-flex" >
                  <Link to="/">
                    <div className="course-box d-flex aos" data-aos="fade-up">
                      <div className="product d-flex flex-column align-items-center justify-content-center">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img className="img-fluid" alt="Img" src="assets/img/course/UI-UXDesign.jpg" style={{ width: '369px', height: '271px', objectFit: 'cover' }} />
                          </a>
                        </div>
                        <div className="product-content text-center">
                          <h3 className="title" style={{ color: '#666' }}>UI/UX Design</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-6 d-flex" >
                  <Link to="/">
                    <div className="course-box d-flex aos" data-aos="fade-up">
                      <div className="product d-flex flex-column align-items-center justify-content-center">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img className="img-fluid" alt="Img" src="assets/img/course/Business.jpeg" style={{ width: '369px', height: '271px', objectFit: 'cover' }} />
                          </a>
                        </div>
                        <div className="product-content text-center">
                          <h3 className="title" style={{ color: '#666' }}>Business</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-6 d-flex" >
                  <Link to="/">
                    <div className="course-box d-flex aos" data-aos="fade-up">
                      <div className="product d-flex flex-column align-items-center justify-content-center">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img className="img-fluid" alt="Img" src="assets/img/course/ComputerScience.jpg" style={{ width: '369px', height: '271px', objectFit: 'cover' }} />
                          </a>
                        </div>
                        <div className="product-content text-center">
                          <h3 className="title" style={{ color: '#666' }}>Computer Science</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-6 d-flex" >
                  <Link to="/">
                    <div className="course-box d-flex aos" data-aos="fade-up">
                      <div className="product d-flex flex-column align-items-center justify-content-center">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img className="img-fluid" alt="Img" src="assets/img/course/DataScience.PNG" style={{ width: '369px', height: '271px', objectFit: 'cover' }} />
                          </a>
                        </div>
                        <div className="product-content text-center">
                          <h3 className="title" style={{ color: '#666' }}>Data Science</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-6 d-flex" >
                  <Link to="/">
                    <div className="course-box d-flex aos" data-aos="fade-up">
                      <div className="product d-flex flex-column align-items-center justify-content-center">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img className="img-fluid" alt="Img" src="assets/img/course/PersonalDevelopment.PNG" style={{ width: '369px', height: '271px', objectFit: 'cover' }} />
                          </a>
                        </div>
                        <div className="product-content text-center">
                          <h3 className="title" style={{ color: '#666' }}>Personal Development</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-6 d-flex" >
                  <Link to="/">
                    <div className="course-box d-flex aos" data-aos="fade-up">
                      <div className="product d-flex flex-column align-items-center justify-content-center">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img className="img-fluid" alt="Img" src="assets/img/course/SocialSciences.PNG" style={{ width: '369px', height: '271px', objectFit: 'cover' }} />
                          </a>
                        </div>
                        <div className="product-content text-center">
                          <h3 className="title" style={{ color: '#666' }}>Social Sciences</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link to="/index">
                  <button
                    className="btn btn-primary sub-btn"
                    style={{
                      marginBottom: 10,
                      borderRadius: 50,
                      fontSize: '1.2rem',
                      padding: 10,
                      paddingLeft: 200,
                      paddingRight: 200,
                      zIndex: 1, position: 'relative'
                    }}
                  >
                    Get started
                  </button>
                </Link>

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
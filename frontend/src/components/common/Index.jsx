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

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

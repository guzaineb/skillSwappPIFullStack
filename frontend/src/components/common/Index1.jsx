import React from 'react'
import Header from './Header'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Index1() {
  return (
    <>
    
{/* Main Wrapper */}
<div className="main-wrapper">
  
  <section className="home-slide d-flex align-items-center">
    <div className="container">
        <div className="row">
            <div className="col-md-7">
                <div className="home-slide-face aos" >
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
                                    <input type="email" className="form-control"
                                        placeholder="Search School, Online educational centers, etc" />
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
                    <img src="assets/img/object.png" alt="Img" />
                </div>
            </div>
        </div>
    </div>
</section>
<section className="section how-it-works">
  <div className="container">
    <div className="section-header aos" >
      <div className="section-sub-head">
        <span>Favourite Course</span>
        <h2>Top Category</h2>
      </div>
      <div className="all-btn all-category d-flex align-items-center">
        <a href="job-category.html" className="btn btn-primary">All Categories</a>
      </div>
    </div>
    <div className="section-text aos" >
      <p>Rejoignez SkillSwap, la plateforme où le partage de connaissances connecte les passionnés. Apprenez, enseignez, collaborez et progressez aux côtés d'une communauté dynamique. Transformez vos compétences en opportunités et explorez de nouvelles voies d'apprentissage.</p>
    </div>
    <div className="owl-carousel mentoring-course owl-theme aos">
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Angular Development</div>
            </div>
          </div>
          <p>40 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-01.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Docker Development</div>
            </div>
          </div>
          <p>45 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-02.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Node JS Frontend</div>
            </div>
          </div>
          <p>40 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-03.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Swift Development</div>
            </div>
          </div>
          <p>23 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-04.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Python Development</div>
            </div>
          </div>
          <p>30 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-05.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">React<br /> Native</div>
            </div>
          </div>
          <p>80 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-04.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Angular Development</div>
            </div>
          </div>
          <p>40 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-01.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Docker Development</div>
            </div>
          </div>
          <p>45 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-02.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Node JS Frontend</div>
            </div>
          </div>
          <p>40 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-03.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Swift Development</div>
            </div>
          </div>
          <p>23 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-04.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Python Development</div>
            </div>
          </div>
          <p>30 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-01.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Docker Development</div>
            </div>
          </div>
          <p>45 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-02.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Node JS Frontend</div>
            </div>
          </div>
          <p>40 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-03.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Swift Development</div>
            </div>
          </div>
          <p>23 Instructors</p>
        </div>
      </div>
      <div className="feature-box text-center ">
        <div className="feature-bg">
          <div className="feature-header">
            <div className="feature-icon">
              <img src="assets/img/categories-icon-04.png" alt="Img" />
            </div>
            <div className="feature-cont">
              <div className="feature-text">Python Development</div>
            </div>
          </div>
          <p>30 Instructors</p>
        </div>
      </div>
    </div>
  </div>
</section>


 
</div>

    </>
  )
}

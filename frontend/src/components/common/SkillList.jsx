import React, { useEffect, useState } from 'react';
import { useSkillStore } from './../../store/skillStore';
import Footer from './Footer';
import Header from './Header'; 

const SkillList = () => {
  const { skills, fetchSkills, isLoading, error } = useSkillStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState(skills);

  // Fetch skills when the component is mounted
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter skills based on the search query
  useEffect(() => {
    setFilteredSkills(
      skills.filter((skill) => 
        skill.skillname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, skills]);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      
      <div className="page-content">
        <div className="row">
          {/* Search Input */}
          <div className="col-lg-9 col-md-9">
            <div className="search-box">
              <input 
                type="text" 
                value={searchQuery} 
                onChange={handleSearchChange} 
                placeholder="       Search skills..." 
                className="form-control"
              />
            </div>
          </div>

          {/* Display filtered skills */}
          {filteredSkills.map((skill) => (
            <div key={skill._id} className="col-lg-12 col-md-12 d-flex">
              <div className="course-box course-design list-course d-flex">
                <div className="product">
                  <div className="product-img">
                    <a href="course-details.html">
                      <img
                        className="img-fluid"
                        alt="Skill Image"
                        src={skill.image || 'default-image.jpg'} // Assure-toi que l'image existe
                      />
                    </a>
                    <div className="price">
                      <h3>
                        {skill.pricingType === 'free' ? 'Free' : `$${skill.price}`} 
                      </h3>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="head-course-title">
                      <h3 className="title">
                        <a href="course-details.html">{skill.skillname}</a>
                      </h3>
                      <div className="all-btn all-category d-flex align-items-center">
                        <a href="checkout.html" className="btn btn-primary">BUY NOW</a>
                      </div>
                    </div>
                    <div className="course-info border-bottom-0 pb-0 d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <p>{skill.level}</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <p>{skill.category}</p>
                      </div>
                    </div>
                    <div className="rating">
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                      <span className="d-inline-block average-rating">
                        <span>4.0</span> (15)
                      </span>
                    </div>
                    <div className="course-group d-flex mb-0">
                      <div className="course-group-img d-flex">
                        <a href="instructor-profile.html">
                          <img
                            src="assets/img/user/user1.jpg"
                            alt="Instructor"
                            className="img-fluid"
                          />
                        </a>
                        <div className="course-name">
                          <h4><a href="instructor-profile.html">Instructor Name</a></h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div className="course-share d-flex align-items-center justify-content-center">
                        <a href="#rate">
                          <i className="fa-regular fa-heart"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Sidebar Filters */}
      <div className="col-lg-3 theiaStickySidebar">
        <div className="filter-clear">
          <div className="clear-filter d-flex align-items-center">
            <h4><i className="feather-filter" />Filters</h4>
            <div className="clear-text">
              <p>CLEAR</p>
            </div>
          </div>

          {/* Search Filter */}
          <div className="card search-filter categories-filter-blk">
            <div className="card-body">
              <div className="filter-widget mb-0">
                <div className="categories-head d-flex align-items-center">
                  <h4>Course categories</h4>
                  <i className="fas fa-angle-down" />
                </div>
                <div>
                  <label className="custom_check">
                    <input type="checkbox" name="select_specialist" />
                    <span className="checkmark" /> Backend (3)
                  </label>
                </div>
                <div>
                  <label className="custom_check">
                    <input type="checkbox" name="select_specialist" />
                    <span className="checkmark" /> CSS (2)
                  </label>
                </div>
                <div>
                  <label className="custom_check">
                    <input type="checkbox" name="select_specialist" />
                    <span className="checkmark" /> Frontend (2)
                  </label>
                </div>
                <div>
                  <label className="custom_check">
                    <input type="checkbox" name="select_specialist" defaultChecked />
                    <span className="checkmark" /> General (2)
                  </label>
                </div>
                <div>
                  <label className="custom_check">
                    <input type="checkbox" name="select_specialist" defaultChecked />
                    <span className="checkmark" /> IT &amp; Software (2)
                  </label>
                </div>
                <div>
                  <label className="custom_check">
                    <input type="checkbox" name="select_specialist" />
                    <span className="checkmark" /> Photography (2)
                  </label>
                </div>
                <div>
                  <label className="custom_check">
                    <input type="checkbox" name="select_specialist" />
                    <span className="checkmark" /> Programming Language (3)
                  </label>
                </div>
                <div>
                  <label className="custom_check mb-0">
                    <input type="checkbox" name="select_specialist" />
                    <span className="checkmark" /> Technology (2)
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* /Search Filter */}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default SkillList;

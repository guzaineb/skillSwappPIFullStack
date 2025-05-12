import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSkillStore } from '../../store/skillStore';
import Header from './Header';
import Footer from './Footer';

const SkillList = ({ user }) => {
  const { skills, fetchSkills, participateToSkill, isLoading, error } = useSkillStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSkills = async () => {
      try {
        await fetchSkills();
      } catch (err) {
        setLocalError('Failed to load skills. Please try again.');
        toast.error('Failed to load skills.');
      }
    };
    loadSkills();
  }, [fetchSkills]);

  useEffect(() => {
    if (!Array.isArray(skills)) {
      setFilteredSkills([]);
      return;
    }

    const filtered = skills.filter((skill) =>
      skill?.skillname?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSkills(filtered);
  }, [searchQuery, skills]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const addSkill = async (skill) => {
    if (!user || !user._id) {
      toast.error("Utilisateur non connecté.");
      return;
    }

    try {
      if (skill.pricingType === "free") {
        const response = await axios.post(
          `http://localhost:5000/api/auth/profile/${user._id}/add-skill`,
          { skillId: skill._id }
        );

        if (response.status === 200) {
          toast.success("Skill ajouté avec succès !");
          navigate("/learnskills");
        } else {
          toast.error("Erreur lors de l'ajout du skill.");
        }
      } else {
        const response = await axios.post(`http://localhost:5000/api/pay/checkout`, {
          skillId: skill._id,
          skillName: skill.skillname,
          skillPrice: skill.price,
          userId: user._id,
        });

        if (response.status === 200) {
          window.location.href = response.data;
        } else {
          toast.error("Erreur lors de l'ajout du skill.");
        }
      }
    } catch (error) {
      toast.error("Une erreur s'est produite : " + error.message);
    }
  };

  return (
    <div className="skill-list-page">
      <main className="container py-5">
        <section className="search-section mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for skills..."
              aria-label="Search for skills"
              aria-describedby="search-icon"
            />
            <span className="input-group-text" id="search-icon">
              <i className="fas fa-search" />
            </span>
          </div>
        </section>

        {isLoading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading skills...</p>
          </div>
        )}

        {(error || localError) && (
          <div className="alert alert-danger text-center" role="alert">
            {error || localError}
          </div>
        )}

        {!isLoading && !error && !localError && (!filteredSkills.length || !Array.isArray(filteredSkills)) && (
          <div className="text-center my-5">
            <h4>No skills found</h4>
            <p>Try adjusting your search or check back later for new skills.</p>
          </div>
        )}

        {!isLoading && !error && !localError && filteredSkills.length > 0 && (
          <section className="skills-grid row g-4">
            {filteredSkills.map((skill) => (
              <article key={skill._id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-img-top position-relative">
                    <Link to={`/skill/${skill._id}`}>
                      <img
                        src={skill.image || '/default-skill-image.jpg'}
                        alt={`${skill.skillname} illustration`}
                        className="img-fluid"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    </Link>
                    <div className={`price ${skill.pricingType === 'free' ? 'combo' : ''}`}>
                      {skill.pricingType === 'free' ? (
                        <h3>GRATUIT</h3>
                      ) : (
                        <h3>${skill.price}</h3>
                      )}
                    </div>
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h3 className="card-title">
                      <Link to={`/skill/${skill._id}`} className="text-decoration-none">
                        {skill.skillname}
                      </Link>
                    </h3>
                    <p className="card-text text-muted flex-grow-1">
                      {skill.description?.substring(0, 100)}...
                    </p>
                    <p className="card-text text-muted">{skill.category?.title}</p>
                    <div className="course-info d-flex align-items-center justify-content-between mt-3">
                      <div className="rating-img d-flex align-items-center">
                        <img src="/assets/img/icon/icon-01.svg" alt="leçons" />
                        <p className="ms-2">{skill.lessonCount} Leçons</p>
                      </div>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => addSkill(skill)}
                      >
                        <i className="feather-plus me-1" /> Get Skill
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};
export default SkillList;

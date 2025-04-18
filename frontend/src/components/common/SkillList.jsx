import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSkillStore } from '../../store/skillStore';
import Header from './Header';
import Footer from './Footer';

const SkillList = () => {
  const { skills, fetchSkills, participateToSkill, isLoading, error } = useSkillStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [localError, setLocalError] = useState(null);

  // Fetch skills on mount
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

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter skills based on search query
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

  // Handle participation
  const handleParticipate = async (skillId) => {
    try {
      // Note: userId is undefined in the original code. Ensure it's available (e.g., from auth context)
      const result = await participateToSkill(/* userId, */ skillId);
      toast.success(result.message || 'Successfully joined the skill!');
    } catch (err) {
      toast.error(err.message || 'Failed to join the skill.');
    }
  };

  return (
    <>
  
    <div className="skill-list-page">
  

      {/* Main Content */}
      <main className="container py-5">
        {/* Search Bar */}
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading skills...</p>
          </div>
        )}

        {/* Error State */}
        {(error || localError) && (
          <div className="alert alert-danger text-center" role="alert">
            {error || localError}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && !localError && (!filteredSkills.length || !Array.isArray(filteredSkills)) && (
          <div className="text-center my-5">
            <h4>No skills found</h4>
            <p>Try adjusting your search or check back later for new skills.</p>
          </div>
        )}

        {/* Skills Grid */}
        {!isLoading && !error && !localError && filteredSkills.length > 0 && (
          <section className="skills-grid row g-4">
            {filteredSkills.map((skill) => (
              <article key={skill._id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  {/* Skill Image */}
                  <div className="card-img-top position-relative">
                    <Link to={`/skill/${skill._id}`}>
                      <img
                        src={skill.imageprovide || '/default-skill-image.jpg'}
                        alt={`${skill.skillname} illustration`}
                        className="img-fluid"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    </Link>
                    <span className={`badge price-badge ${skill.pricingType === 'free' ? 'bg-success' : 'bg-primary'}`}>
                      {skill.pricingType === 'free' ? 'Free' : `€${skill.price}`}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column">
                    <h3 className="card-title">
                      <Link to={`/skill/${skill._id}`} className="text-decoration-none">
                        {skill.skillname}
                      </Link>
                    </h3>
                    <p className="card-text text-muted flex-grow-1">
                      {skill.description?.substring(0, 100)}...
                    </p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => handleParticipate(skill._id)}
                      disabled={isLoading}
                    >
                      Join Skill
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

    </div>
    </>
  );
};

export default SkillList;
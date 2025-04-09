import React, { useEffect } from 'react';
import { useSkillStore } from '../../store/skillStore'
import StatusBadge from "./StatusBadge";



const SkillList = () => {
  const { skills, fetchSkills, deleteSkill, isLoading, error } = useSkillStore();

  useEffect(() => {
    fetchSkills();
  }, []);

  if (isLoading) return <p>Chargement des compétences...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="col-xl-9 col-lg-9">
    <div className="settings-widget card-info">
      <div className="settings-menu p-0">
        <div className="profile-heading">
          <h3>Mes Compétences</h3>
          <p>Gérez vos compétences et leur classification</p>
        </div>
        <div className="checkout-form pb-0">
          <div className="row">
            {skills.map((skill) => (
              <div className="col-xxl-4 col-md-6 d-flex" key={skill._id}>
                <div className="course-box flex-fill">
                  <div className="product">
                    <div className="product-img">
                      <img className="img-fluid" alt="Skill Icon" src="assets/img/icon/icon-01.svg" />
                      <div className="price combo">
                        <h3>{skill.pricingType}</h3>
                      </div>
                    </div>
                    <div className="product-content">
                      <h3 className="title instructor-text">{skill.skillname}</h3>
                      <div className="course-info d-flex align-items-center">
                        <div className="rating-img d-flex align-items-center">
                        <StatusBadge status={skill.status}
                        level={skill.level} />

                        </div>
                      </div>
                      <div className="course-edit-btn d-flex align-items-center justify-content-between">
                        <a href="#"><i className="bx bx-edit me-2" />Modifier</a>
                        <button className="btn btn-link p-0 text-danger" onClick={() => deleteSkill(skill._id)}>
                          <i className="bx bx-trash me-2" />Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );  
};

export default SkillList;

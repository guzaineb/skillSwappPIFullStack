import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useQuery from "../../useQuery";
import Header from "./Header";
import Footer from "./Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Profile() {
  const query = useQuery();
  const { user, checkAuth, isAuthenticated } = useAuthStore();
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [participatingSkills, setParticipatingSkills] = useState({});
  const navigate = useNavigate();

  const getSkills = async () => {
    if (!user?._id) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/profile/${user._id}/unobtained-skills`
      );
      setSkills(response.data);
      setFilteredSkills(response.data);

      const uniqueCategories = [
        ...new Set(response.data.map((skill) => skill.category?.title).filter(Boolean)),
      ];
      setCategories(uniqueCategories);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError("Erreur lors de la récupération des compétences.");
      setIsLoading(false);
    }
  };

  const addSkill = async (skill, userId) => {
    try {
      if (skill.pricingType === "free") {
        const response = await axios.post(
          `http://localhost:5000/api/auth/profile/${userId || user._id}/add-skill`,
          { skillId: skill._id }
        );
        if (response.status === 200) {
          alert("Compétence ajoutée avec succès");
          navigate("/learnskills");
        } else {
          alert("Erreur lors de l'ajout de la compétence.");
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
          alert("Erreur lors de la redirection vers le paiement.");
        }
      }
    } catch (err) {
      console.error(err);
      setLocalError("Une erreur est survenue lors de l'ajout de la compétence.");
    }
  };

  const handleParticipation = (skill) => {
    setParticipatingSkills((prev) => ({
      ...prev,
      [skill._id]: true,
    }));
    addSkill(skill);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate("/login");
        return;
      }
      getSkills();
      const skillToAdd = query.get("boughtSkill");
      if (skillToAdd) {
        addSkill({ _id: skillToAdd, pricingType: "free" }, query.get("user"));
      }
    };
    initialize();
  }, [isAuthenticated]);

  useEffect(() => {
    let skillsFiltered = [...skills];

    if (selectedCategory !== "Tous") {
      skillsFiltered = skillsFiltered.filter(
        (skill) => skill.category?.title === selectedCategory
      );
    }

    if (searchQuery.trim() !== "") {
      skillsFiltered = skillsFiltered.filter((skill) =>
        skill.skillname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSkills(skillsFiltered);
  }, [searchQuery, skills, selectedCategory]);

  return (
    <div className="skill-list-page">

      <main className="container py-5">
        <section className="search-section mb-5 text-center">
          <div className="d-flex flex-column align-items-center gap-3">
            <div className="input-group w-50 shadow-sm">
              <input
                type="text"
                className="form-control rounded-start-pill"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔎 Rechercher un talent (ex: Yoga, Coding...)"
              />
              <span className="input-group-text rounded-end-pill bg-primary text-white">
                <i className="fas fa-search" />
              </span>
            </div>

            <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
              <button
                onClick={() => setSelectedCategory("Tous")}
                className={`btn btn-sm ${
                  selectedCategory === "Tous" ? "btn-primary" : "btn-outline-primary"
                } rounded-pill`}
              >
                Tous
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn btn-sm ${
                    selectedCategory === cat ? "btn-primary" : "btn-outline-primary"
                  } rounded-pill`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="row g-4">
            {[...Array(6)].map((_, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <Skeleton height={300} borderRadius={20} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {(error || localError) && (
              <div className="alert alert-danger text-center" role="alert">
                {error || localError}
              </div>
            )}

            {filteredSkills.length === 0 ? (
              <div className="text-center my-5">
                <h4>Aucune compétence trouvée</h4>
                <p>Essayez un autre mot-clé ou une autre catégorie.</p>
              </div>
            ) : (
              <section className="skills-grid row g-4">
                {filteredSkills.map((skill) => (
                  <article key={skill._id} className="col-md-6 col-lg-4">
                    <div className="card h-100">
                      <div className="position-relative">
                        <Link to={`/skills/${skill._id}`}>
                          <img
                            src={skill.image || "/assets/img/default-course.jpg"}
                            alt={skill.skillname}   className="img-fluid w-100 h-200 object-fit-cover"
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        </Link>
                        {skill.pricingType === "free" ? (
  <button
    className="btn btn-primary mt-auto"
    onClick={() => navigate(`/skills/${skill._id}`)}
  >
    Participer
  </button>
) : (
  <button
    className="btn btn-success mt-auto"
    onClick={() => handleParticipation(skill)}
    disabled={participatingSkills[skill._id]}
  >
    Acheter ${skill.price}
  </button>
)}

                      </div>

                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{skill.skillname}</h5>
                        <p className="card-text text-muted flex-grow-1">
                          {skill.description?.length > 100
                            ? skill.description.substring(0, 100) + "..."
                            : skill.description}
                        </p>
                        <p className="card-text text-muted small">{skill.category?.title}</p>

                        <div className="course-info d-flex align-items-center justify-content-between">
  <div className="rating-img d-flex align-items-center gap-2">
    <img src="/assets/img/icon/icon-01.svg" alt="leçons" />
    <p>{skill.lessonCount ? `${skill.lessonCount} Leçons` : "N/A"}</p>
  </div>
  <div className="course-view d-flex align-items-center gap-2">
    <img src="/assets/img/icon/icon-02.svg" alt="durée" />
    <p>{skill.totalDuration ? skill.totalDuration : "Durée inconnue"}</p>
  </div>
</div>


                        <button
                          className="btn btn-primary mt-auto"
                          onClick={() => handleParticipation(skill)}
                          disabled={participatingSkills[skill._id]}
                        >
                          {participatingSkills[skill._id] ? "Inscrit" : "Participer"}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </>
        )}
      </main>
   =
    </div>
  );
}

export default Profile;

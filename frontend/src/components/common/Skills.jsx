import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useQuery from "../../useQuery";
import { toast } from "react-toastify";
import {
  Search,
  BookOpen,
  Star,
  Plus,
  Filter,
  RefreshCw
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

function Skills() {
  const query = useQuery();
  const { user, checkAuth, isAuthenticated } = useAuthStore();
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [categories, setCategories] = useState([]);
  const [levels] = useState(['beginner', 'intermediate', 'advanced', 'all-levels']);
  const [addingSkill, setAddingSkill] = useState({});
  const navigate = useNavigate();

  const getSkills = async () => {
    if (!user?._id) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/profile/${user._id}/unobtained-skills`
      );

      // Log pour déboguer les données d'image
      console.log("Skills data:", response.data);

      setSkills(response.data);

      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(skill =>
        skill.category?.title || skill.category || "Uncategorized"
      ))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching skills:", error);
      toast.error("Erreur lors du chargement des compétences");
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = async (skill, userId) => {
    setAddingSkill({ ...addingSkill, [skill._id]: true });
    try {
      if (skill.pricingType === "free") {
        const response = await axios.post(
          `http://localhost:5000/api/auth/profile/${userId || user._id}/add-skill`,
          { skillId: skill._id }
        );
        if (response.status === 200) {
          toast.success("Compétence ajoutée avec succès !");
          navigate("/learnskills");
          return;
        }
        toast.error("Erreur lors de l'ajout de la compétence");
      } else {
        const response = await axios.post(
          `http://localhost:5000/api/pay/checkout`,
          {
            skillId: skill._id,
            skillName: skill.skillname,
            skillPrice: skill.price,
            userId: user._id
          }
        );
        if (response.status === 200) {
          window.location.href = response.data;
        } else {
          toast.error("Erreur lors de l'ajout de la compétence");
        }
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Erreur lors de l'ajout de la compétence");
    } finally {
      setAddingSkill({ ...addingSkill, [skill._id]: false });
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate('/login');
      }
    };

    initializeUser();
    getSkills();
    const skillToAdd = query.get("boughtSkill");
    if (skillToAdd) {
      addSkill({ _id: skillToAdd, pricingType: "free" }, query.get("user"));
    }
  }, [isAuthenticated]);

  // Filter skills based on search term, category and level
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.skillname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" ||
      (skill.category?.title || skill.category) === selectedCategory;
    const matchesLevel = selectedLevel === "" || skill.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Format level label
  const getLevelLabel = (level) => {
    const labels = {
      'beginner': 'beginner',
      'intermediate': 'intermediate',
      'advanced': 'advanced',
      'all-levels': 'all-levels'
    };
    return labels[level] || level;
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Explorez les compétences</h2>
        <button
          className="btn btn-outline-secondary d-flex align-items-center"
          onClick={() => getSkills()}
        >
          <RefreshCw size={16} className="me-2" />
          Rafraîchir
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 bg-light"
                  placeholder="Rechercher une compétence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select bg-light"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Toutes les catégories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select bg-light"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">Tous les niveaux</option>
                {levels.map((level, index) => (
                  <option key={index} value={level}>{getLevelLabel(level)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Skills display */}
      {isLoading ? (
        <div className="row g-4">
          {[...Array(6)].map((_, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <Skeleton height={300} borderRadius={8} />
            </div>
          ))}
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <img
              src="/assets/img/skil-01.png"
              alt="Aucun résultat"
              style={{ maxWidth: '250px', opacity: 0.9 }}
            />
          </div>
          <h4>Aucune compétence trouvée</h4>
          <p className="text-muted">Essayez de modifier vos critères de recherche</p>
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
              setSelectedLevel("");
            }}
          >
            <Filter size={16} className="me-2" />
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <motion.div
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill._id}
              className="col-md-6 col-lg-4"
              variants={itemVariants}
            >
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src={skill.image || "/assets/img/course/course-01.jpg"}
                    alt={skill.skillname}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  {skill.pricingType === "free" ? (
                    <span className="position-absolute top-0 end-0 badge bg-success m-2">
                      Gratuit
                    </span>
                  ) : (
                    <span className="position-absolute top-0 end-0 badge bg-primary m-2">
                      {skill.price}€
                    </span>
                  )}
                  {skill.status === "active" && (
                    <span className="position-absolute top-0 start-0 badge bg-info m-2">
                      Actif
                    </span>
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="badge bg-light text-dark">
                      {skill.category?.title || skill.category || "Non catégorisé"}
                    </span>
                    <span className="badge bg-light text-dark">
                      {getLevelLabel(skill.level) || "Niveau inconnu"}
                    </span>
                  </div>
                  <h5 className="card-title">{skill.skillname}</h5>
                  <p className="card-text text-muted mb-4 flex-grow-1">
                    {skill.description?.length > 100
                      ? `${skill.description.substring(0, 100)}...`
                      : skill.description || "Aucune description disponible"}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <BookOpen size={14} className="text-primary me-1" />
                      <small>{skill.lessonCount || 0} leçon(s)</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <Star size={14} className="text-warning me-1" />
                      <small>{skill.rating || 0}/5</small>
                    </div>
                  </div>
                  <button
                    className={`btn ${skill.pricingType === "free" ? "btn-outline-primary" : "btn-outline-success"} w-100`}
                    onClick={() => addSkill(skill)}
                    disabled={addingSkill[skill._id]}
                  >
                    {addingSkill[skill._id] ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        En cours...
                      </>
                    ) : (
                      <>
                        <Plus size={16} className="me-2" />
                        {skill.pricingType === "free"
                          ? "Ajouter gratuitement"
                          : `Acheter pour ${skill.price}€`}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Skills;

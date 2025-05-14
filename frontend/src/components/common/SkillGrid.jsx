import { useEffect, useState, useMemo } from 'react';
import { useSkillStore } from './../../store/skillStore';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Edit,
  Trash2,
  Users,
  Eye,
  Plus,
  Search,
  Filter,
  BookOpen,
  Clock,
  Star,
  MoreVertical,
  AlertTriangle
} from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

/**
 * Composant de gestion des compétences pour les éducateurs
 */
export const SkillGrid = () => {
  const {
    skills,
    isLoading,
    error,
    fetchSkills,
    deleteSkill,
    findSkillById,
    filters,
    updateFilters,
    resetFilters,
    pagination
  } = useSkillStore();

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  // Chargement initial des compétences
  useEffect(() => {
    // Réinitialiser les filtres locaux pour éviter les conflits
    setSearchQuery('');
    setStatusFilter('all');

    // Récupérer toutes les compétences sans pagination
    fetchSkills({ limit: 1000 })
      .then(data => {
        console.log(`Nombre de compétences récupérées: ${data.skills?.length || 0}`);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des compétences:', error);
      });
  }, [fetchSkills]);

  // Fonction pour filtrer les compétences avec mémoisation pour améliorer les performances
  const filteredSkills = useMemo(() => {
    console.log(`Nombre total de compétences avant filtrage: ${skills.length}`);

    const filtered = skills.filter(skill => {
      // Filtrer par recherche
      const query = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' ||
        skill.skillname?.toLowerCase().includes(query) ||
        skill.description?.toLowerCase().includes(query) ||
        skill.category?.title?.toLowerCase().includes(query);

      // Filtrer par statut
      if (statusFilter === 'all') return matchesSearch;
      return matchesSearch && skill.status === statusFilter;
    });

    console.log(`Nombre de compétences après filtrage: ${filtered.length}`);
    console.log('Filtres appliqués:', { searchQuery, statusFilter });

    return filtered;
  }, [skills, searchQuery, statusFilter]);

  // Fonction pour confirmer la suppression
  const confirmDelete = (skill) => {
    setSkillToDelete(skill);
    setShowDeleteModal(true);
  };

  // Fonction pour effectuer la suppression
  const handleDelete = async () => {
    if (!skillToDelete) return;

    try {
      await deleteSkill(skillToDelete._id);
      toast.success('Compétence supprimée avec succès');
      setShowDeleteModal(false);
      setSkillToDelete(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Erreur lors de la suppression de la compétence';
      toast.error(errorMessage);
      console.error('Erreur de suppression:', error);
    }
  };

  // Fonction pour voir les participants
  const viewParticipants = (skillId) => {
    console.log("viewParticipants appelé avec skillId:", skillId);

    try {
      // Récupérer les informations de la compétence avant la navigation
      findSkillById(skillId);

      // Essayer avec le chemin correspondant à la nouvelle route ajoutée dans App.jsx
      const path = `/Profile/skills/${skillId}/students`;
      console.log("Tentative de navigation vers:", path);

      // Naviguer vers la page des participants
      navigate(path);

      // Afficher un message de confirmation pour aider au débogage
      toast.info(`Navigation vers la liste des participants de la compétence ${skillId}`);
    } catch (error) {
      console.error("Erreur lors de la navigation:", error);
      toast.error(`Erreur de navigation: ${error.message}`);
    }
  };

  // Autres fonctions utilitaires peuvent être ajoutées ici si nécessaire

  // Animation pour les cartes
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

  // Affichage du chargement
  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Gestion des compétences</h2>
          <div className="skeleton-box" style={{ width: '120px', height: '38px' }}></div>
        </div>
        <div className="row g-4">
          {[...Array(6)].map((_, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <Skeleton height={300} borderRadius={8} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Affichage des erreurs
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <AlertTriangle size={24} className="me-2" />
          <div>
            <h4 className="alert-heading">Erreur lors du chargement des compétences</h4>
            <p className="mb-0">{error}</p>
          </div>
        </div>
        <div className="d-flex gap-2 mt-3">
          <button
            className="btn btn-primary"
            onClick={() => fetchSkills()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7l3-3"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7l-3 3"></path>
            </svg>
            Réessayer
          </button>
          <Link to="/Profile" className="btn btn-outline-secondary">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* En-tête */}
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <h2 className="mb-0 me-3">Gestion des compétences</h2>
          <button
            className="btn btn-outline-secondary d-flex align-items-center"
            onClick={() => {
              console.log('Rafraîchissement des compétences...');
              fetchSkills({ limit: 1000 });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7l3-3"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7l-3 3"></path>
            </svg>
            Rafraîchir
          </button>
        </div>
        <Link to="/Profile/skills/new" className="btn btn-primary d-flex align-items-center">
          <Plus size={18} className="me-2" />
          Ajouter une compétence
        </Link>
      </header>

      {/* Filtres et recherche */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 bg-light"
                  placeholder="Rechercher une compétence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select bg-light"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actives</option>
                <option value="pending">En attente</option>
                <option value="inactive">Inactives</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select bg-light"
                value={filters.sortField}
                onChange={(e) => updateFilters({ sortField: e.target.value })}
              >
                <option value="createdDate">Date de création</option>
                <option value="skillname">Nom</option>
                <option value="enrollmentCount">Popularité</option>
              </select>
            </div>
          </div>

          {/* Compteur de compétences */}
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <div className="text-muted small">
              <strong>{filteredSkills.length}</strong> compétence(s) affichée(s) sur <strong>{skills.length}</strong> au total
            </div>
            {filteredSkills.length !== skills.length && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Liste des compétences */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <img
              src="/assets/img/empty-skills.svg"
              alt="Aucune compétence"
              style={{ maxWidth: '200px', opacity: 0.7 }}
            />
          </div>
          <h4>Aucune compétence trouvée</h4>
          <p className="text-muted">Créez votre première compétence pour commencer à enseigner</p>
          <Link to="/Profile/skills/new" className="btn btn-primary mt-3">
            <Plus size={18} className="me-2" />
            Créer une compétence
          </Link>
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
                    src={skill.image || '/assets/img/default-course.jpg'}
                    className="card-img-top"
                    alt={skill.skillname}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className={`badge ${skill.status === 'active' ? 'bg-success' :
                      skill.status === 'pending' ? 'bg-warning' :
                        'bg-secondary'
                      }`}>
                      {skill.status === 'active' ? 'Active' :
                        skill.status === 'pending' ? 'En attente' :
                          'Inactive'}
                    </span>
                  </div>
                  <div className="position-absolute bottom-0 start-0 m-2">
                    <span className={`badge ${skill.pricingType === 'free' ? 'bg-info' : 'bg-primary'}`}>
                      {skill.pricingType === 'free' ? 'Gratuit' : `${skill.price} €`}
                    </span>
                  </div>
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{skill.skillname}</h5>

                  <div className="mb-3">
                    <span className="badge bg-light text-dark me-2">
                      {skill.category?.title || 'Non catégorisé'}
                    </span>
                    <span className="badge bg-light text-dark">
                      {skill.level === 'beginner' ? 'Débutant' :
                        skill.level === 'intermediate' ? 'Intermédiaire' :
                          skill.level === 'advanced' ? 'Avancé' : 'Tous niveaux'}
                    </span>
                  </div>

                  <p className="card-text text-muted small">
                    {skill.shortDescription ||
                      (skill.description?.length > 100 ?
                        `${skill.description.slice(0, 100)}...` :
                        skill.description) ||
                      'Aucune description'}
                  </p>

                  <div className="d-flex justify-content-between mb-3 text-muted small mt-auto">
                    <div className="d-flex align-items-center">
                      <BookOpen size={14} className="me-1" />
                      <span>{skill.lessonCount || 0} leçons</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Users size={14} className="me-1" />
                      <span>{skill.enrollmentCount || 0} inscrits</span>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Link
                      to={`/skills/${skill._id}`}
                      className="btn btn-sm btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center"
                    >
                      <Eye size={14} className="me-1" />
                      Voir
                    </Link>
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <MoreVertical size={14} />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <Link
                            to={`/Profile/skills/edit/${skill._id}`}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <Edit size={14} className="me-2" />
                            Modifier
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center"
                            onClick={() => viewParticipants(skill._id)}
                          >
                            <Users size={14} className="me-2" />
                            Participants
                          </button>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center text-danger"
                            onClick={() => confirmDelete(skill)}
                          >
                            <Trash2 size={14} className="me-2" />
                            Supprimer
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmer la suppression</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer la compétence <strong>{skillToDelete?.skillname}</strong> ?</p>
                <p className="text-danger">
                  <AlertTriangle size={18} className="me-2" />
                  Cette action est irréversible.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { useEffect } from 'react';
import { useSkillStore } from './../../store/skillStore';

export const CategorieSkill = () => {
  const { categories, fetchCategories, isLoading, error } = useSkillStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Si les catégories sont en cours de chargement
  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  // Si une erreur se produit lors de la récupération des catégories
  if (error) {
    return <div>Error loading categories: {error}</div>;
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="title-sec">
          <h2>Browse Job By Categories</h2>
          <p>Browse Job By Categories</p>
        </div>

        {/* Générer dynamiquement les onglets de catégories */}
        <div className="category-tab">
          <ul className="nav nav-justified">
            {categories.map((cat, index) => {
              // Remplacer les espaces par des tirets et convertir en minuscule pour un ID valide
              const tabId = cat.name.replace(/\s+/g, '-').toLowerCase();
              return (
                <li className="nav-item" key={index}>
                  <a
                    href={`#${tabId}`}
                    className={`nav-link ${index === 0 ? 'active' : ''}`} // Active le premier onglet par défaut
                    data-bs-toggle="tab"
                  >
                    {cat.type}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Affichage des catégories avec leur titre et le nombre de jobs */}
        <div className="row">
          {categories.length === 0 ? (
            <div>No categories found</div>
          ) : (
            categories.map((cat, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="category-box">
                  <div className="category-title">
                    <h5>{cat.name}</h5>
                  </div>
                  <div className="cat-count">
                    <span>{cat.count}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorieSkill;

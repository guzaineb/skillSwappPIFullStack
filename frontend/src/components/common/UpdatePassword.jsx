import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UpdatePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Le mot de passe actuel est requis';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'Le nouveau mot de passe est requis';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // Récupérer le token depuis les cookies
 // 'authToken' est le nom du cookie
      
    
      
      const response = await axios.put(
        'http://localhost:5000/api/password',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        {
        
          withCredentials: true // Important pour les cookies HTTP-only
        }
      );
      
      setSuccessMessage(response.data.message || 'Mot de passe mis à jour avec succès');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Redirection optionnelle après succès
      // navigate('/profile');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe:', error);
      
      if (error.response && error.response.status === 401) {
        // Token invalide ou expiré
        Cookies.remove('authToken');
        setErrorMessage('Session expirée. Veuillez vous reconnecter.');
        navigate('/login');
      } else {
        setErrorMessage(
          error.response?.data?.message || 
          'Échec de la mise à jour du mot de passe. Veuillez réessayer.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="settings-widget card-details">
      <div className="settings-menu p-0">
        <div className="profile-heading">
          <h3>Paramètres</h3>
          <p>Vous avez le contrôle total pour gérer les paramètres de votre compte</p>
        </div>
        <div className="settings-page-head">
          <ul className="settings-pg-links">
            <li>
              <a href="#" className="active">
                <i className="bx bx-lock" />Changer le mot de passe
              </a>
            </li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="checkout-form settings-wrap">
            {successMessage && (
              <div className="alert alert-success">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger">
                {errorMessage}
              </div>
            )}
            
            <div className="row">
              <div className="col-md-6">
                <div className="input-block">
                  <label className="form-label">Mot de passe actuel</label>
                  <input
                    type="password"
                    className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                  />
                  {errors.currentPassword && (
                    <div className="invalid-feedback">{errors.currentPassword}</div>
                  )}
                </div>
                
                <div className="input-block">
                  <label className="form-label">Nouveau mot de passe</label>
                  <input
                    type="password"
                    className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  {errors.newPassword && (
                    <div className="invalid-feedback">{errors.newPassword}</div>
                  )}
                </div>
                
                <div className="input-block">
                  <label className="form-label">Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>
              
              <div className="col-md-12">
                <button 
                  className="btn btn-primary" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Mise à jour en cours...' : 'Réinitialiser le mot de passe'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
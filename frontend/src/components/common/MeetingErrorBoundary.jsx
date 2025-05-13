import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MeetingErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Mettre à jour l'état pour afficher l'UI de fallback
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez aussi enregistrer l'erreur dans un service de reporting
    console.error('Meeting error caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez rendre n'importe quelle UI de fallback
      return (
        <div className="meeting-error-container">
          <div className="meeting-error-content">
            <h2>Oups ! Un problème est survenu</h2>
            <p>Nous n'avons pas pu charger la réunion correctement.</p>
            
            <div className="error-details">
              <p><strong>Erreur :</strong> {this.state.error?.message || 'Erreur inconnue'}</p>
              {this.state.error?.stack && (
                <details>
                  <summary>Détails techniques</summary>
                  <pre>{this.state.error.stack}</pre>
                </details>
              )}
            </div>
            
            <div className="error-actions">
              <button 
                onClick={() => window.location.reload()}
                className="retry-button"
              >
                Réessayer
              </button>
              <Link to="/meetings" className="back-button">
                Retour aux réunions
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MeetingErrorBoundary;

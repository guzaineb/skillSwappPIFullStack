import React, { useState } from 'react';
import { Settings, X, Save, RefreshCw, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import './ChatbotSettings.css';

const ChatbotSettings = ({ onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState(false);

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(localSettings);
      setTimeout(() => {
        setSaving(false);
        onClose();
      }, 500);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des paramètres:', error);
      setSaving(false);
    }
  };

  const handleReset = () => {
    setLocalSettings({
      darkMode: false,
      fontSize: 'medium',
      soundEnabled: true,
      autoOpen: false,
      language: 'fr',
      bubblePosition: 'right'
    });
  };

  return (
    <div className="chatbot-settings-overlay">
      <div className="chatbot-settings-panel">
        <div className="settings-header">
          <div className="settings-title">
            <Settings size={20} />
            <h3>Paramètres du Chatbot</h3>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h4>Apparence</h4>
            
            <div className="settings-option">
              <label>Mode sombre</label>
              <div className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={localSettings.darkMode} 
                  onChange={(e) => handleChange('darkMode', e.target.checked)}
                  id="dark-mode-toggle"
                />
                <label htmlFor="dark-mode-toggle" className="toggle-label">
                  <span className="toggle-icon">
                    {localSettings.darkMode ? <Moon size={14} /> : <Sun size={14} />}
                  </span>
                </label>
              </div>
            </div>

            <div className="settings-option">
              <label>Taille de police</label>
              <select 
                value={localSettings.fontSize} 
                onChange={(e) => handleChange('fontSize', e.target.value)}
                className="settings-select"
              >
                <option value="small">Petite</option>
                <option value="medium">Moyenne</option>
                <option value="large">Grande</option>
              </select>
            </div>

            <div className="settings-option">
              <label>Position du bouton</label>
              <select 
                value={localSettings.bubblePosition} 
                onChange={(e) => handleChange('bubblePosition', e.target.value)}
                className="settings-select"
              >
                <option value="left">Gauche</option>
                <option value="right">Droite</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h4>Comportement</h4>
            
            <div className="settings-option">
              <label>Sons de notification</label>
              <div className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={localSettings.soundEnabled} 
                  onChange={(e) => handleChange('soundEnabled', e.target.checked)}
                  id="sound-toggle"
                />
                <label htmlFor="sound-toggle" className="toggle-label">
                  <span className="toggle-icon">
                    {localSettings.soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  </span>
                </label>
              </div>
            </div>

            <div className="settings-option">
              <label>Ouverture automatique</label>
              <div className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={localSettings.autoOpen} 
                  onChange={(e) => handleChange('autoOpen', e.target.checked)}
                  id="auto-open-toggle"
                />
                <label htmlFor="auto-open-toggle" className="toggle-label"></label>
              </div>
            </div>

            <div className="settings-option">
              <label>Langue</label>
              <select 
                value={localSettings.language} 
                onChange={(e) => handleChange('language', e.target.value)}
                className="settings-select"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button className="settings-button reset" onClick={handleReset}>
            <RefreshCw size={16} />
            <span>Réinitialiser</span>
          </button>
          <button 
            className={`settings-button save ${saving ? 'saving' : ''}`} 
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={16} />
            <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSettings;

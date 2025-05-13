import React, { useState } from 'react';
import ChatbotAnalytics from '../components/common/ChatbotAnalytics';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Settings, Database, MessageSquare, HelpCircle } from 'lucide-react';
import './ChatbotAdmin.css';
import 'react-tabs/style/react-tabs.css';

const ChatbotAdmin = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [knowledgeBase, setKnowledgeBase] = useState({
    skills: [
      { id: 1, name: 'JavaScript', category: 'Programmation', description: 'Langage de programmation pour le web' },
      { id: 2, name: 'Piano', category: 'Musique', description: 'Instrument de musique à clavier' },
      { id: 3, name: 'Anglais', category: 'Langues', description: 'Langue internationale' },
    ],
    faqs: [
      { id: 1, question: 'Comment fonctionne SkillExchange?', answer: 'SkillExchange est une plateforme qui permet aux utilisateurs d\'échanger des compétences gratuitement.' },
      { id: 2, question: 'Comment puis-je proposer mes compétences?', answer: 'Vous pouvez proposer vos compétences en créant une offre dans votre profil.' },
      { id: 3, question: 'Comment trouver un mentor?', answer: 'Vous pouvez rechercher des mentors par compétence dans la section "Recherche".' },
    ]
  });
  
  const [newSkill, setNewSkill] = useState({ name: '', category: '', description: '' });
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [globalSettings, setGlobalSettings] = useState({
    welcomeMessage: 'Bienvenue sur l\'Assistant SkillExchange ! Comment puis-je vous aider aujourd\'hui ?',
    maxHistoryLength: 50,
    defaultLanguage: 'fr',
    aiModel: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 150
  });

  const handleSkillChange = (e, field) => {
    setNewSkill({
      ...newSkill,
      [field]: e.target.value
    });
  };

  const handleFaqChange = (e, field) => {
    setNewFaq({
      ...newFaq,
      [field]: e.target.value
    });
  };

  const handleSettingChange = (e, field) => {
    let value = e.target.value;
    
    // Convertir en nombre si nécessaire
    if (field === 'maxHistoryLength' || field === 'maxTokens') {
      value = parseInt(value, 10);
    } else if (field === 'temperature') {
      value = parseFloat(value);
    }
    
    setGlobalSettings({
      ...globalSettings,
      [field]: value
    });
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.category) return;
    
    const updatedSkills = [
      ...knowledgeBase.skills,
      { 
        id: knowledgeBase.skills.length + 1, 
        ...newSkill 
      }
    ];
    
    setKnowledgeBase({
      ...knowledgeBase,
      skills: updatedSkills
    });
    
    setNewSkill({ name: '', category: '', description: '' });
  };

  const addFaq = (e) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) return;
    
    const updatedFaqs = [
      ...knowledgeBase.faqs,
      { 
        id: knowledgeBase.faqs.length + 1, 
        ...newFaq 
      }
    ];
    
    setKnowledgeBase({
      ...knowledgeBase,
      faqs: updatedFaqs
    });
    
    setNewFaq({ question: '', answer: '' });
  };

  const deleteSkill = (id) => {
    const updatedSkills = knowledgeBase.skills.filter(skill => skill.id !== id);
    setKnowledgeBase({
      ...knowledgeBase,
      skills: updatedSkills
    });
  };

  const deleteFaq = (id) => {
    const updatedFaqs = knowledgeBase.faqs.filter(faq => faq.id !== id);
    setKnowledgeBase({
      ...knowledgeBase,
      faqs: updatedFaqs
    });
  };

  const saveSettings = () => {
    // Ici, vous pourriez envoyer les paramètres au serveur
    alert('Paramètres sauvegardés avec succès !');
  };

  return (
    <div className="chatbot-admin-container">
      <h1>Administration du Chatbot</h1>
      
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList className="admin-tabs">
          <Tab><MessageSquare size={18} /> Statistiques</Tab>
          <Tab><Database size={18} /> Base de Connaissances</Tab>
          <Tab><Settings size={18} /> Paramètres</Tab>
          <Tab><HelpCircle size={18} /> Aide</Tab>
        </TabList>

        <TabPanel>
          <ChatbotAnalytics />
        </TabPanel>

        <TabPanel>
          <div className="knowledge-base-container">
            <div className="knowledge-section">
              <h2>Compétences</h2>
              <div className="knowledge-list">
                {knowledgeBase.skills.map(skill => (
                  <div key={skill.id} className="knowledge-item">
                    <div className="knowledge-content">
                      <h3>{skill.name}</h3>
                      <span className="category-badge">{skill.category}</span>
                      <p>{skill.description}</p>
                    </div>
                    <button className="delete-button" onClick={() => deleteSkill(skill.id)}>
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
              
              <form className="knowledge-form" onSubmit={addSkill}>
                <h3>Ajouter une compétence</h3>
                <div className="form-group">
                  <label>Nom</label>
                  <input 
                    type="text" 
                    value={newSkill.name} 
                    onChange={(e) => handleSkillChange(e, 'name')} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Catégorie</label>
                  <input 
                    type="text" 
                    value={newSkill.category} 
                    onChange={(e) => handleSkillChange(e, 'category')} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    value={newSkill.description} 
                    onChange={(e) => handleSkillChange(e, 'description')} 
                  />
                </div>
                <button type="submit" className="add-button">Ajouter</button>
              </form>
            </div>
            
            <div className="knowledge-section">
              <h2>Questions Fréquentes</h2>
              <div className="knowledge-list">
                {knowledgeBase.faqs.map(faq => (
                  <div key={faq.id} className="knowledge-item">
                    <div className="knowledge-content">
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                    <button className="delete-button" onClick={() => deleteFaq(faq.id)}>
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
              
              <form className="knowledge-form" onSubmit={addFaq}>
                <h3>Ajouter une FAQ</h3>
                <div className="form-group">
                  <label>Question</label>
                  <input 
                    type="text" 
                    value={newFaq.question} 
                    onChange={(e) => handleFaqChange(e, 'question')} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Réponse</label>
                  <textarea 
                    value={newFaq.answer} 
                    onChange={(e) => handleFaqChange(e, 'answer')} 
                    required 
                  />
                </div>
                <button type="submit" className="add-button">Ajouter</button>
              </form>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="settings-container">
            <h2>Paramètres Globaux</h2>
            <form className="settings-form">
              <div className="form-group">
                <label>Message de bienvenue</label>
                <textarea 
                  value={globalSettings.welcomeMessage} 
                  onChange={(e) => handleSettingChange(e, 'welcomeMessage')} 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Longueur max. de l'historique</label>
                  <input 
                    type="number" 
                    value={globalSettings.maxHistoryLength} 
                    onChange={(e) => handleSettingChange(e, 'maxHistoryLength')} 
                    min="10" 
                    max="100" 
                  />
                </div>
                
                <div className="form-group">
                  <label>Langue par défaut</label>
                  <select 
                    value={globalSettings.defaultLanguage} 
                    onChange={(e) => handleSettingChange(e, 'defaultLanguage')}
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
              
              <h3>Paramètres IA</h3>
              
              <div className="form-group">
                <label>Modèle</label>
                <select 
                  value={globalSettings.aiModel} 
                  onChange={(e) => handleSettingChange(e, 'aiModel')}
                >
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="gpt-4">GPT-4</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Température (0-1)</label>
                  <input 
                    type="number" 
                    value={globalSettings.temperature} 
                    onChange={(e) => handleSettingChange(e, 'temperature')} 
                    min="0" 
                    max="1" 
                    step="0.1" 
                  />
                </div>
                
                <div className="form-group">
                  <label>Tokens maximum</label>
                  <input 
                    type="number" 
                    value={globalSettings.maxTokens} 
                    onChange={(e) => handleSettingChange(e, 'maxTokens')} 
                    min="50" 
                    max="500" 
                  />
                </div>
              </div>
              
              <button type="button" className="save-button" onClick={saveSettings}>
                Sauvegarder les paramètres
              </button>
            </form>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="help-container">
            <h2>Aide et Documentation</h2>
            
            <div className="help-section">
              <h3>Comment utiliser le panneau d'administration</h3>
              <p>Ce panneau d'administration vous permet de gérer tous les aspects du chatbot avancé de SkillExchange.</p>
              
              <h4>Statistiques</h4>
              <p>Visualisez les statistiques d'utilisation du chatbot, y compris le nombre de messages, les intentions les plus courantes, et l'activité par jour.</p>
              
              <h4>Base de Connaissances</h4>
              <p>Gérez les informations que le chatbot utilise pour répondre aux questions des utilisateurs. Vous pouvez ajouter, modifier ou supprimer des compétences et des FAQs.</p>
              
              <h4>Paramètres</h4>
              <p>Configurez le comportement du chatbot, y compris les paramètres de l'IA, les messages de bienvenue, et les limites d'historique.</p>
            </div>
            
            <div className="help-section">
              <h3>Besoin d'aide supplémentaire ?</h3>
              <p>Contactez l'équipe technique à <a href="mailto:support@skillexchange.com">support@skillexchange.com</a></p>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ChatbotAdmin;

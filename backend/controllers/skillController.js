const Skill = require('../models/skill.model');
const User = require('../models/user.model');



/*async function add(req,res) {
    try {
          console.log(req.body)
           const skill = new Skill(req.body); 
           await skill.save()
        res.status(200).json(skill);
    }
    catch (err) {
        console.log(err);
    }     
} ;*/


async function findAll(req,res) {
    try {
        
       var skill=await Skill.find()
        res.status(200).json(skill);
    }
    catch (err) {
        console.log(err);
    }  
};

async function findOneByName (req,res) {
    try {
        
        const skill = await Skill.find({ skillname: req.params.skillname });

        res.status(200).json(skill);
    }
    catch (err) {
        console.log(err);
    }  
};
async function findByCategory (req,res) {
    try {
        
        const skill = await Skill.find({ category: req.params.category });

        res.status(200).json(skill);
    }
    catch (err) {
        console.log(err);
    }  
};

async function showAllByName (req,res) {
    try {
        
        const skill = await Skill.find({ skillname: req.params.skillname });

        res.status(200).json(skill);
    }
    catch (err) {
        console.log(err);
    }  
} ;


async function showByID (req,res) {
    try {  const skill = await Skill.findById( req.params.id );
        res.status(200).json(skill);
    }
    catch (err) {
        console.log(err);
    }  
} ;

async function update(req,res)  {
    try {
        
       var skill=await Skill.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
       });
        res.status(200).json(skill);
    }
    catch (err) {
        console.log(err);
    }  
} ;

async function deleteSkill (req,res) {
    try {
        
       var skill=await Skill.findByIdAndDelete(req.params.id);
        res.status(200).send("skill deleted");
    }
    catch (err) {
        console.log(err);
    }  
};



async function addSkillWithLessons(req, res) {
    try {
      const { skillname, category, description, lessons } = req.body;
  
      const skill = new Skill({
        skillname,
        category,
        description,
        lessons: lessons || [],
      });
  
      await skill.save();
      res.status(201).json(skill);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de l\'ajout de la skill' });
    }
  }
  
  // Participation étudiant
  async function participateToSkill(req, res) {
    try {
      const { userId, skillId } = req.body;
  
      const user = await User.findById(userId);
      const skill = await Skill.findById(skillId);
  
      if (!user || !skill) {
        return res.status(404).json({ message: 'Utilisateur ou Skill non trouvé' });
      }
  
      if (user.skillsParticipated?.includes(skillId)) {
        return res.status(400).json({ message: 'Déjà inscrit à cette skill' });
      }
  
      user.skillsParticipated.push(skillId);
      await user.save();
  
      res.status(200).json({ message: 'Participation enregistrée', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la participation' });
    }
  }
  
  // Voir enseignants & étudiants
  async function getAllUsersByRole(req, res) {
    try {
      const teachers = await User.find({ role: 'educator' });
      const students = await User.find({ role: 'learner' });
  
      res.status(200).json({ teachers, students });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
  }
  
  module.exports = {
    addSkillWithLessons,
    participateToSkill,
    getAllUsersByRole,
  
  deleteSkill,update,showByID,showAllByName,findOneByName,findAll,findByCategory   };

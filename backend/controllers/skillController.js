const Skill = require('../models/skill.model');
const User = require('../models/user.model');

const Category = require('../models/category.model'); 

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


async function findAll(req, res) {
    try {
      const skills = await Skill.find().populate('category');
  
      const skillWithStats = skills.map(skill => {
        const lessonCount = skill.lessons.length;
        const totalDuration = skill.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);
  
        return {
          _id: skill._id,
          skillname: skill.skillname,
          category: skill.category,
          description: skill.description,
          pricingType: skill.pricingType,
          price: skill.price,
          image: skill.image,
          createdDate: skill.createdDate,
          status: skill.status,
          level: skill.level,
          lessons: skill.lessons,
          lessonCount: lessonCount,
          totalDuration: totalDuration
        };
      });
  
      res.status(200).json(skillWithStats);
    } catch (err) {
      console.error("Erreur lors de la récupération des compétences :", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
}

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

async function findByIds(req, res) {
    try {
      const skill = await Skill.find({ _id: { $in: req.body.ids } });
      res.status(200).json(skill);
    } catch (err) {
      console.log(err);
    }
  }
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
    const { skillname, description, lessons, pricingType, price, status, level, category, image } = req.body;

    if (!category) {
      return res.status(400).json({ message: 'La catégorie est requise' });
    }

    // Validation des leçons
    if (!lessons || !Array.isArray(lessons) || lessons.length === 0) {
      return res.status(400).json({ message: 'Au moins une leçon est requise' });
    }

    // Validation du contenu des leçons
    for (const lesson of lessons) {
      if (!lesson.title || !lesson.content || !lesson.duration) {
        return res.status(400).json({ 
          message: 'Chaque leçon doit avoir un titre, un contenu et une durée' 
        });
      }
    }

    const skill = new Skill({
      skillname,
      category,
      description,
      pricingType,
      price,
      image,
      status,
      level,
      lessons,
      createdDate: new Date()
    });

    await skill.save();
    
    const populatedSkill = await Skill.findById(skill._id).populate('category');
    res.status(201).json(populatedSkill);
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la compétence:', err);
    res.status(500).json({ 
      message: 'Erreur lors de l\'ajout de la compétence',
      error: err.message 
    });
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
  async function advancedSearch(req, res) {
    try {
        const { skillname, category, level, pricingType, priceRange } = req.query;

        // Construire un objet de requête dynamique
        let query = {};

        if (skillname) {
            query.skillname = { $regex: skillname, $options: 'i' }; // Recherche insensible à la casse
        }
        if (category) {
            query.category = category;
        }
        if (level) {
            query.level = level;
        }
        if (pricingType) {
            query.pricingType = pricingType;
        }
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split(':').map(Number);
            if (minPrice || maxPrice) {
                query.price = {};
                if (minPrice) query.price.$gte = minPrice;
                if (maxPrice) query.price.$lte = maxPrice;
            }
        }

        // Effectuer la recherche
        const skills = await Skill.find(query);

        res.status(200).json(skills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la recherche' });
    }
}

  module.exports = {
    addSkillWithLessons,
    participateToSkill,
    getAllUsersByRole,
    advancedSearch,
  
  deleteSkill,
  update,
  showByID,
  showAllByName,
  findOneByName,
  findAll,
  findByCategory ,
  findByIds  };




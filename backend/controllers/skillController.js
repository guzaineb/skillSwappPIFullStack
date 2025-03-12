const Skill = require('../models/skill.model');



async function add(req,res) {
    try {
          console.log(req.body)
           const skill = new Skill(req.body); 
           await skill.save()
        res.status(200).json(skill);
    }
    catch (err) {
        console.log(err);
    }     
} ;


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
        
        const skill = await Skill.findOne({ skillname: req.params.skillname });

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








module.exports = {deleteSkill,update,showByID,showAllByName,findOneByName,findAll,add   };

var express = require('express');


const router = express.Router();

const { findAll, findOneByName, showByID, showAllByName, update, deleteSkill,advancedSearch, findByCategory,addSkillWithLessons,participateToSkill,getAllUsersByRole,
    getStudentsBySkill,getEducatorsByCategory,findSkillById,readSkillById,getSkillsByLearner,getUserSkillProgress
 } = require('../controllers/skillController');

 const { generateAndSendCertificate } = require('../controllers/certificateController');
//router.post("/add-skill",add);
router.get("/skills",findAll);
router.get("/skill/:skillname",findOneByName);
router.get('/getSkillsByLerner/:id',getSkillsByLearner);
router.get("/all-skills/:skillname",showAllByName);
router.put("/skills/update/:id",update);
router.delete("/skills/delete/:id",deleteSkill);
router.get("/skills/category/:category",findByCategory);
router.post('/add',addSkillWithLessons);
router.post('/participate',participateToSkill);
router.get('/users',getAllUsersByRole);
// Dans votre fichier de routes
router.get('/search', advancedSearch);
router.get('/:skillId/students',getStudentsBySkill);
router.get('/category/:categoryId/educators', getEducatorsByCategory);
router.get('/:skillId',findSkillById)
router.get('/skills/:id', showByID);
router.get('/progress/:userId/:skillId', getUserSkillProgress);
router.post('/read-skill', readSkillById);
router.post('/generate-certificate', generateAndSendCertificate);


module.exports = router;

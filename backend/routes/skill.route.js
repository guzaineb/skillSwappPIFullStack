var express = require("express");

const router = express.Router();
const {
  deleteSkill,
  update,
  showByID,
  showAllByName,
  findOneByName,
  findAll,
  add,
} = require("../controllers/skillController");
router.post("/add-skill", add);
router.get("/skills", findAll);
router.get("/skill/:skillname", findOneByName);
router.get("/skills/:id", showByID);
router.get("/all-skills/:skillname", showAllByName);
router.put("/skills/update/:id", update);
router.delete("/skills/delete/:id", deleteSkill);

module.exports = router;

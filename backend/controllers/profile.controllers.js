const User = require("../models/user.model");
const Skill = require("../models/skill.model");

const AddProfile = async (req, res) => {
  res.send("Add Profile");
};
const DeleteProfile = async (req, res) => {
  res.send("Delete Profile");
};
const GetProfile = async (req, res) => {
  res.send("Get Profile");
};
const GetAllProfiles = async (req, res) => {
  res.send("Get All Profiles");
};

const getSkills = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const skills = await Skill.find({ _id: { $in: user.enrolledSkills } });
  if (!skills) {
    return res.status(404).json({ message: "No skills found" });
  }
  res.status(200).json(skills);
};

getUnobtainedSkills = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const skills = await Skill.find({ _id: { $nin: user.enrolledSkills } });
  if (!skills) {
    return res.status(404).json({ message: "No skills found" });
  }
  res.status(200).json(skills);
};

const addSkill = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const skill = await Skill.findById(req.body.skillId);
  if (!skill) {
    return res.status(400).json({ message: "Skill not provided" });
  }
  if (!user.enrolledSkills.includes(skill._id)) 
  {  
    user.enrolledSkills.push(skill._id);
    await user.save();
  }

  res.status(200).json({ message: "Skill added successfully" });
};

module.exports = {
  AddProfile,
  DeleteProfile,
  GetProfile,
  GetAllProfiles,
  getSkills,
  getUnobtainedSkills,
  addSkill,
};

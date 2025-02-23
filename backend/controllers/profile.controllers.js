const AddProfile = async (req, res) => {
 res.send("Add Profile");};
const DeleteProfile = async (req, res) => { res.send("Delete Profile");}            
const GetProfile = async (req, res) => { res.send("Get Profile");}
const GetAllProfiles = async (req, res) => { res.send("Get All Profiles");}
module.exports = {
 AddProfile,
 UpdateProfile,
 DeleteProfile,
 GetProfile,
 GetAllProfiles,
};
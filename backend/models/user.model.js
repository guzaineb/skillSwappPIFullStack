
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({


    email: {
        type: String,
        required: true,
    },  
    password: {
        type: String,
        required: true,
        // minlength: [8,"Password must be at least 8 characters long"],
        // maxlength: [32,"Password must be at most 32 characters long"],
    },
    // phone:String,
    googleId:{
        type:String,

    },
    githubId:{
        type:String,
    },
avatar:{
    type:String},
    
    name: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role:{
        type:String,
        enum:['learner','admin','educator'],
       
    },
    enrolledSkills:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
    }],
   

    phone:{
        type:Number,
        required:true,
    },

    profilePic: {
        type: String,
      },

    resetPasswordToken:String,
    resetPasswordExpires:Date,
    verificationToken:String,
    verificationTokenExpires:Date,
    
    
}, { timestamps: true });



module.exports = mongoose.model("User", userSchema);


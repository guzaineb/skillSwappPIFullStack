const mongoose = require('mongoose');

const skillResponseSchema = new mongoose.Schema(
    {
        skill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        replies: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("SkillResponse", skillResponseSchema);

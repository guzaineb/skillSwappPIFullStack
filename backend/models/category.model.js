const mongo = require('mongoose');
const Schema = mongo.Schema;

// Category Schema
const category = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
    },
    { timestamps: true }  // Adds createdAt and updatedAt automatically
);
category.index({ title: 1, description: 1 }, { unique: true });
module.exports = mongo.model('Category', category);

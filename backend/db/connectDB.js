
const mongoose = require('mongoose');

async function connectDB() {
    try {
        console.log("mongo uri:", process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connection to MongoDB: `);
        process.exit(1); // exit with failure, 0 is success
    }
}

module.exports = { connectDB };



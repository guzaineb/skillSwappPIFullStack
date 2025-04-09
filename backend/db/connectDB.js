const mongoose = require("mongoose");

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

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/skillSwapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };

require("dotenv").config();
const mongoose = require("mongoose");

// Function to connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log("Connected to Database");
  } catch (err) {
    console.error("Connection Error Details:", err);
  }
}

// Call the connect function
connectToDatabase();

module.exports = mongoose;

//External imports
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbUrl = process.env.MONGOOSE_URL;
// connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("DataBase Connection Successful.");
  } catch (error) {
    console.log("DataBase Connection Unsuccessful.");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

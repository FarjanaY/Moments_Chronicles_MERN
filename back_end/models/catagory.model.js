// External Imports
const mongoose = require("mongoose");

//Catagory schema
const catagorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Model create
const Catagory = mongoose.model("Catagory", catagorySchema);

module.exports = Catagory;

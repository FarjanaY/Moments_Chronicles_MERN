//External Imports
const mongoose = require("mongoose");

//Post Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
      required: false,
    },
    photo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    catagories: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

//Model create
const Post = mongoose.model("Post", postSchema);

module.exports = Post;

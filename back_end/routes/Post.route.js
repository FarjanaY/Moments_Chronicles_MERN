//External Imports
const express = require("express");

//internal Imports
const {
  addPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

//Post router create
const postRouter = express.Router();

//all post routers
//route: http://localhost:8000/api/post/add
postRouter.post("/add", addPost);

//route : http://localhost:8000/api/post/
postRouter.get("/", getAllPosts);

//route: http://localhost:8000/api/post/:id
postRouter.get("/:id", getOnePost);

//route : http://localhost:8000/api/post/update
postRouter.put("/update/:id", updatePost);

//route : http://localhost:8000/api/post/delete/:id
postRouter.delete("/delete/:id", deletePost);

module.exports = postRouter;

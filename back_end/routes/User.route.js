//External Imports
const express = require("express");

//internal imports
const { userLogin, userRegister } = require("../controllers/auth.controller");
const {
  getAllusers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

//Router create
const userRouter = express.Router();

//All Routes
//route : http://localhost:8000/api/user/register
userRouter.post("/register", userRegister);

//route : http://localhose:8000/api/user/login
userRouter.post("/login", userLogin);

//route : http://localhost:8000/api/user/
userRouter.get("/", getAllusers);

//route : http://localhost:8000/api/user/:id
userRouter.get("/:id", getOneUser);

// route : http://localhost:8000/api/user/update/:id
userRouter.put("/update/:id", updateUser);

//route : http://localhost:8000/api/user/delete/:id
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;

//external imports
const bcrypt = require("bcrypt");

//internal imports
const User = require("../models/user.model");
const Post = require("../models/post.model");

//All routes functions
/*==================================================================
    Desc : Find all user
    route: http://localhost:8000/api/user/
    method: GET 
====================================================================*/
const getAllusers = async (req, res) => {
  try {
    const users = await User.find();
    //const {password, ...others} = users;
    if(users){
      return res.status(200).json({
        result: "successful",
        message: "Users are found",
        total : users.length,
        
      });
    }else{
      return res.status(404).json({
        result: "unsuccessful",
        message: "No user has been found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: "unsuccessful",
      message: "Server Error!...",
      error: error.message,
    });
  }
};

/*==================================================================
Desc : Find one user 
route : http://localhost:8000/user/:id
method : GET
====================================================================*/
const getOneUser = async (req, res) => {
  try {
    const oneUser = await User.findOne({ _id: req.params.id });
    const { password, ...user } = oneUser._doc;
    if (oneUser) {
      return res.status(200).json({
        result: "successful",
        message: "User has been found...",
        user,
      });
    } else {
      return res.status(404).json({
        result: "successful",
        message: "User can't be found...",
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: "unsuccessful",
      message: "Server Error!...",
      error: error.message,
    });
  }
};

/*==================================================================
desc: Update/ Edit User 
route : http://localhost:8000/user/update/:id
method: PUT 
====================================================================*/
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      const { password, ...user } = updatedUser._doc;
      if (updatedUser) {
        return res.status(200).json({
          result: "successful",
          message: "Updated Successfully.",
          user,
        });
      } else {
        return res.status(404).json({
          result: "unsuccessful",
          message: "Can't be Updated.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        result: "unsuccessful",
        message: "Server Error!...",
        error: error.message,
      });
    }
  } else {
    return res.status(401).json({
      result: "unsuccessful",
      message: "Unauthorised: You can only update your account...",
    });
  }
};

/*==================================================================
decs : Delete User
route : http://localhost:8000/user/delete/:id
method : DELETE    
====================================================================*/
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        //delete posts for corresponding user
        const deletedPost = await Post.deleteMany({ username: user.username });
        //delete user
        const deletedUser = await User.findByIdAndDelete(
          { _id: req.params.id },
          { new: true }
        );

        if (deletedUser) {
          return res.status(200).json({
            result: "successful",
            message: "User and corresponding posts are deleted.",
          });
        } else {
          return res.status(404).json({
            result: "unsuccessful",
            message: "User can't be deleted.",
          });
        }
      } catch (error) {
        res.status(500).json({
          result: "unsuccessful",
          message: "Sever error.",
        });
      }
    } catch (error) {
      res.status(500).json({
        result: "unsuccessful",
        message: "Can't be found such user.",
      });
    }
  } else {
    return res.status(401).json({
      result: "unsuccessful",
      message: "Unauthrized : You can only delete your account.",
    });
  }
};

module.exports = { getAllusers, getOneUser, updateUser, deleteUser };

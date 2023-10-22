//external imports
const bcrypt = require("bcrypt");

//internal Imports
const User = require("../models/user.model");
//const userRouter = require('../routes/User.route')

//Routes functions
/*==================================================================
    Desc : Register user
    route: http://localhost:8000/api/user/register
    method: POST 
====================================================================*/
const userRegister = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Cheking if username is exists or not
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).json({
        result: "unsuccessful",
        message: "User Name is already exists.",
      });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      const user = await newUser.save();

      if (user) {
        return res.status(200).json({
          result: "successful",
          message: "User Registerd Successfully.",
          user,
        });
      } else {
        return res.status(404).json({
          result: "unsuccessful",
          message: "User can't be registered.",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      result: "unsuccessful",
      message: "Server Error.",
      error: error.message,
    });
  }
};

/*==================================================================
    Desc : Login user
    route: http://localhost:8000/api/user/login
    method: POST 
====================================================================*/
const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user &&
      res.status(404).json({
        result: "unsuccessful",
        message: "Invalid Username/Password!...",
      });

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated &&
      res.status(404).json({
        result: "unsuccessful",
        message: "Invalid Username/Password!...",
      });

    const { password, ...others } = user._doc;
    if (user && validated) {
      return res.status(200).json({
        result: "successful",
        message: "LogIn Successfully...",
        others,
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

module.exports = { userLogin, userRegister };

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

//internal Imports
import "./Login.style.css";
import { Context } from "../../context/Context";
import axios from "axios";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const { dispatch, isFetching } = useContext(Context);

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  //Form submit
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    //validation;
    if (userLogin.username === "") {
      setErrors({
        username: true,
        password: false,
      });
      setErrMsg("User Name is required.");
      setSuccessMsg("");
    } else if (userLogin.password === "") {
      setErrors({
        username: false,
        password: true,
      });
      setErrMsg("Password is required.");
      setSuccessMsg("");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/login",
          userLogin
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        setErrors({
          username: false,
          password: false,
        });
        setErrMsg("");
        setSuccessMsg("Logged In successfully!...");

        //switch window
        if (response.data) {
          setTimeout(() => {
            window.location.replace("/");
          }, 2000);
        }
      } catch (error) {
        dispatch({ type: "LOGIN_FAILURE" });
        setErrMsg("Login Failure!! Invalid Email/Password...");
        console.log(error);
        setSuccessMsg("");
      }
    }
  };

  // Form input onChange handler
  const onChangeHandler = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  return (
    <div className="logInContainer">
      <span className="logInTitle">LogIn</span>
      <form className="logInForm" onSubmit={formSubmitHandler}>
        <label>UserName</label>
        <input
          type="text"
          placeholder="Enter your username."
          value={userLogin.username}
          name="username"
          onChange={onChangeHandler}
        />
        {/* {errors.username && errMsg && <p className="errMsg">{errMsg}</p>} */}

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password."
          value={userLogin.password}
          name="password"
          onChange={onChangeHandler}
        />
        {/* {errors.password && errMsg && <p className="errMsg">{errMsg}</p>} */}
        <button type="submit" className="logInBtn" disabled={isFetching}>
          LogIn
        </button>
        {errors && errMsg && <p className="errMsg">{errMsg}</p>}
        {successMsg && <p className="successMsg">{successMsg}</p>}
      </form>
      <button type="submit" className="logInRegisterBtn">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default Login;

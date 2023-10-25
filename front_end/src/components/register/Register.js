import React, { useState } from "react";
import axios from "axios";

//internal Import
import "./Register.style.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  //Form Submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //Validation
    if (user.username === "") {
      setErrors({ username: true, email: false, password: false });
      setErrMsg("User Name is required.");
    } else if (user.email === "") {
      setErrors({ username: false, email: true, password: false });
      setErrMsg("Email is required.");
    } else if (user.password === "") {
      setErrors({ username: false, email: false, password: true });
      setErrMsg("Password is required.");
    } else {
      //user registration using axios
      try {
        const response = await axios.post(
          "https://moments-chronicles-mern-back-end.onrender.com/api/user/register",
          user
        );
        console.log(response);
        setSuccessMsg("Thanks! Registerd Successfully.");
        setErrMsg("");
        setErrors({
          username: false,
          email: false,
          password: false,
        });

        //switch window
        if (response.data) {
          setTimeout(() => {
            window.location.replace("/login");
          }, 2000);
        }
      } catch (error) {
        const errRes = error.response;
        if (errRes.data.result === "unsuccessful" && errRes.status === 400) {
          setSuccessMsg("");
          setErrMsg("Existing Username! Try another one.");
          setErrors({
            username: true,
            email: false,
            password: false,
          });
        } else {
          setSuccessMsg("");
          setErrMsg("Error!... Server Error.");
          console.log(error);
        }
      }
    }
  };

  // form input onchange handler
  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="registerContainer">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={onSubmitHandler}>
        <label>User Name</label>
        <input
          type="text"
          placeholder="Enter your username."
          name="username"
          value={user.username}
          onChange={onChangeHandler}
        />
        {errors.username && errMsg && <p className="errMsg">{errMsg}</p>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your e-mail."
          name="email"
          value={user.email}
          onChange={onChangeHandler}
        />
        {errors.email && errMsg && <p className="errMsg">{errMsg}</p>}
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password."
          name="password"
          value={user.password}
          onChange={onChangeHandler}
        />
        {errors.password && errMsg && <p className="errMsg">{errMsg}</p>}
        <button type="submit" className="registerBtn">
          register
        </button>
        {successMsg && <p className="successMsg">{successMsg}</p>}
      </form>
      <button type="submit" className="registerLoginBtn">
        <Link to="/login">LogIn</Link>
      </button>
    </div>
  );
};

export default Register;

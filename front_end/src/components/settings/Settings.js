//external imports
import React, { useContext, useState } from "react";
import axios from "axios";

//internal imports
import "../settings/Settings.style.css";
import SideBar from "../sidebar/SideBar";
import { Context } from "../../context/Context";
//import profilePicture from "../assets/images/profile.jpg";

const Settings = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { user, dispatch } = useContext(Context);

  const PF = "https://moments-chronicles-mern-back-end.onrender.com/images/";

  //form submit function for update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user.others._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + "_" + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      //profile photo update
      try {
        await axios.post("https://moments-chronicles-mern-back-end.onrender.com/api/uploads", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const response = await axios.put(
        "https://moments-chronicles-mern-back-end.onrender.com/api/user/update/" + user.others._id,
        updatedUser
      );
      console.log(response);
      dispatch({ type: "UPADTE_SUCCESS", payload: response.data });

      setErrMsg("");
      setSuccessMsg("User Updated Successfully...");
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPDATE_FAILURE" });
      setErrMsg("Error! Can't be updated.");
      setSuccessMsg("");
    }
  };
  // console.log(user);

  return (
    <div className="settings">
      <div className="settingsContainer">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Accoount</span>
          {/* <span className="settingsTitleDelete">Delete Account</span> */}
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label htmlFor="pp">Profile Picture</label>
          <div className="settingsPP">
            <img
              src={
                file ? URL.createObjectURL(file) : PF + user.others.profilePic
              }
              alt="ProfileImg"
              className="settingsProfileImg"
            />
            <label htmlFor="profilePictureInput">
              <i className="fa-regular fa-circle-user ppInput"></i>
            </label>
            <input
              type="file"
              id="profilePictureInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            ></input>
          </div>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            placeholder={user.others.username}
            className="settingsUserName"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder={user.others.email}
            className="settingsUserEmail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="settingsUserPassword"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button type="submit" className="settingsSubmitBtn">
            UPDATE
          </button>

          <div className="msg">
            {errMsg && <p className="errMsg">{errMsg}</p>}
            {successMsg && <p className="successMsg">{successMsg}</p>}
          </div>
        </form>
      </div>
      <SideBar />
    </div>
  );
};

export default Settings;

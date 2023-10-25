//external imports
import React, { useContext, useState } from "react";
import axios from "axios";

//internal imports
import "./Write.style.css";
//import postImg from "../assets/images/post2.jpg";
import { Context } from "../../context/Context";

const Write = () => {
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [catagories, setCatagories] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({
    photo: false,
    title: false,
  });
  const [errMsg, setErrMsg] = useState("");

  //console.log(user.others.username);

  //form handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file === null || file === "") {
      setErrors({ photo: true, title: false });
      setErrMsg("Photo/Image is required.");
      setSuccessMsg("");
    } else if (title === "") {
      setErrors({ photo: false, title: true });
      setErrMsg("Unique Title is required.");
      setSuccessMsg("");
    } else {
      const newPost = {
        username: user.others.username,
        title,
        description,
        catagories,
      };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + "_" + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.post("https://moments-chronicles-mern-back-end.onrender.com/api/uploads", data);
          //setImgUrl(response.data.imageUrl);
          // console.log("RESPONSE");
          // console.log(response);
          setErrMsg("");
          setSuccessMsg("New Post Created Successfully...");
        } catch (error) {
          console.log(error);
          setSuccessMsg("");
          setErrMsg("Something went wrong. Post cant be added.");
        }
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post("https://moments-chronicles-mern-back-end.onrender.com/api/post/add", newPost);
        const id = response.data.savePost._id;

        //switch to single post
        setTimeout(() => {
          window.location.replace("/post/" + id);
        }, 2000);
      } catch (error) {
        const errRes = error.response;
        if (errRes.data.result === "unsuccessful" && errRes.status === 400) {
          setErrMsg("Existing Title! Title Name should be unique.");
          setErrors({
            photo: false,
            title: true,
          });
          setSuccessMsg("");
        } else {
          setErrMsg("Server Error!..");
          setSuccessMsg("");
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="writeContainer">
      {file && (
        <img src={URL.createObjectURL(file)} className="writeImage" alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormInput">
          <label htmlFor="writeImgInput">
            <i className="writeInputIcon fa-sharp fa-solid fa-plus" />
            <span className="writeImgText">New Photo</span>
          </label>
          <input
            type="file"
            id="writeImgInput"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
            name="file"
          />
          <input
            type="text"
            className="writeFormNameInput"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            className="writeFormNameInput  writeTextArea"
            placeholder="Enter catagories seperated by commas (,)"
            onChange={(e) => {
              //seperated values by comma for array
              setCatagories(e.target.value.split(","));
            }}
          />
        </div>
        <div className="writeFormTextArea">
          <textarea
            typ="text"
            className="writeFormNameInput writeTextArea"
            placeholder="Tell your story....."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>

        <button type="submit" className="writePublishBtn">
          Publish
        </button>
        <div className="msg">
          {errors && errMsg && <p className="errMsg">{errMsg}</p>}
          {successMsg && <p className="successMsg">{successMsg}</p>}
        </div>
      </form>
    </div>
  );
};

export default Write;

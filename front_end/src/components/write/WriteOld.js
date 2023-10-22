//external imports
import React, { useContext, useState } from "react";
import axios from "axios";

//internal imports
import "./Write.style.css";
//import postImg from "../assets/images/post2.jpg";
import { Context } from "../../context/Context";

const WriteOld = () => {
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  console.log(user.others.username);

  //form handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.others.username,
      title,
      description,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + "_" + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/uploads", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const response = await axios.post("/post/add", newPost);
      //const id = response.data.savePost._id;
      console.log(response);
      // console.log("RESPONSE>DTATA====");
      // console.log(response.data);
      console.log(URL.createObjectURL(file));

      // console.log("RESPONSE>DTATA>_ID====");
      // console.log(response.data.savePost._id);
      //switch to single post
      //window.location.replace("/post/" + id);
    } catch (error) {
      console.log(error);
    }

    // console.log(title);
    // console.log("description");
    // console.log(description);
    // console.log("PHOTO========");
    // console.log(file);
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
      </form>
    </div>
  );
};

export default WriteOld;

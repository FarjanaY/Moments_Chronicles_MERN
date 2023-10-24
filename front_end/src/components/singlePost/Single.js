/* eslint-disable no-unused-vars */
//external imports
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

//internal improts
import "./Single.style.css";
import { Context } from "../../context/Context";
//import post1 from "../assets/images/post2.jpg";

const Single = () => {
  const location = useLocation();
  const singleId = location.pathname.split("/")[2];

  const [post, setPost] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  //image path
  const PF = "moments-chronicles-mern-backend.vercel.app/images/";
  console.log("post.photo");
  console.log(post.photo);

  useEffect(() => {
    const singleData = async () => {
      const response = await axios.get("/post/" + singleId);
      const singlePost = response.data.post;
      console.log(singlePost);
      setPost(singlePost);
      setTitle(singlePost.title);
      setDescription(singlePost.description);
    };
    singleData();
  }, [singleId]);

  //Update functionality for single post update
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/post/update/${post._id}`, {
        // _id: post._id,
        username: user.others.username,
        title: title,
        description: description,
      });

      setSuccessMsg("Post Updated Successfully.");
      if (response.data) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete FUntionality for post delete
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/post/delete/${post._id}`, {
        data: { username: user.others.username },
      });
      setSuccessMsg("Post Deleted Successfully");
      if (response.data) {
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(post.username); //ok
  // console.log("USER . USERNAME=");
  // console.log(user);
  // console.log("USER . OTHERS =");
  // console.log(user.others.username);
  // console.log("COMPARE=======");
  // console.log(post.username === user.others.username);

  return (
    <div className="singleContainer">
      <div className="single">
        {post.photo && (
          <img className="singleImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            className="singleTitleInput"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoFocus={true}
          />
        ) : (
          <div className="singleHeading">
            <h1 className="singleTitle">{post.title}</h1>

            {post.username === user?.others.username && (
              <div className="singleIcons">
                <i
                  className="singleEditIcon fa-solid fa-pen-to-square"
                  onClick={(e) => setUpdateMode(true)}
                ></i>
                <i
                  className="singleDeleteIcon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </div>
        )}

        <div className="singleAuthor">
          <div className="singleAuthorName">
            <Link to={`/?username=${post.username}`}>
              <h3>{post.username}</h3>
            </Link>
          </div>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescriptionInput"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            autoFocus={true}
          />
        ) : (
          <p className="singlePostDescription">{post.description}</p>
        )}
        {updateMode && (
          <button
            type="submit"
            className="singlePostUpdateBtn"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
        {successMsg && <p className="successMsg">{successMsg}</p>}
      </div>
    </div>
  );
};

export default Single;

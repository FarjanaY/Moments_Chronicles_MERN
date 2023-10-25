//external imports
import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

//Internal Imports
import "./Post.style.css";
//import post2 from "../assets/images/post2.jpg";

const Post = ({ post }) => {
  const publicFolder = "https://moments-chronicles-mern-back-end.onrender.com/images/";
  
  return (
    <div className="postContainer">
      {post.photo && (
        <img src={`${publicFolder}${post.photo}`} className="postImg" alt="" />
      )}

      <div className="postInfo">
        <div className="postType">
          {post.catagories.map((catagory) => {
            return (
              <span className="postTopic" key={uuid()}>
                {catagory.name}
              </span>
            );
          })}
        </div>
        <Link to={`/post/${post._id}`}>
          <h2 className="postTitle">{post.title}</h2>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        <span className="postUserName">
          <Link to={`/?username=${post.username}`}>{post.username}</Link>
        </span>
        <div className="postDescription">{post.description}</div>
      </div>
    </div>
  );
};

export default Post;

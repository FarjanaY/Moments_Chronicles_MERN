import React from "react";
import { v4 as uuid } from "uuid";

//internal Imports
import "./Posts.style.css";
import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <div className="postsContainer">
      {posts.map((post) => (
        <Post post={post} key={uuid()} />
      ))}
    </div>
  );
};

export default Posts;

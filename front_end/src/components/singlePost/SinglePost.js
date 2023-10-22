import React from "react";

//Internal Import
import "./SinglePost.style.css";
import SideBar from "../sidebar/SideBar";
import Single from "./Single";

const SinglePost = () => {
  return (
    <div className="singlePostContainer">
      <Single />
      <SideBar />
    </div>
  );
};

export default SinglePost;

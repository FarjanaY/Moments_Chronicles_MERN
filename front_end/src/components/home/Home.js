//External imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

//internal imports
import "./Home.style.css";
import Header from "../home/Header";
import Posts from "./Posts";
import SideBar from "../sidebar/SideBar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get("/post" + search);
      const allPosts = response.data.posts;
      setPosts(allPosts);
    };
    fetchPost();
  }, [search]);
  return (
    <>
      <Header />
      <div className="homeContainer scrollbar-hide">
        <Posts posts={posts} />
        <SideBar />
      </div>
    </>
  );
};

export default Home;

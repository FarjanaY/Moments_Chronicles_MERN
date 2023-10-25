//external imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

//inetrnal importes
import "./SideBAr.style.css";
import profile from "../assets/images/mypp.jpg";

const SideBar = () => {
  const [catagories, setCatagories] = useState([]);

  //catagory data fetching
  useEffect(() => {
    const fectchCatagories = async () => {
      const response = await axios.get("https://moments-chronicles-mern-back-end.onrender.com/api/catagory");
      setCatagories(response.data.catagories);
    };
    fectchCatagories();
  }, []);

  return (
    <div className="sideBarContainer">
      <div className="sideBarItem">
        <h3 className="sideBarTitle">ABOUT ME</h3>
        <img src={profile} alt=""></img>
        <p className="aboutMeDescription">
          With a passion for photography, I've embarked on a journey to present
          my unique visual perspective through this immersive online platform.
        </p>
      </div>
      <div className="sideBarItem">
        <h3 className="sideBarTitle">CATAGORIES</h3>
        <ul className="catagoriesList">
          {catagories.map((cat) => {
            return (
              <li className="catagoriesListItem" key={uuid()}>
                <Link to={`/?catagories=${cat.name}`}>{cat.name} </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sideBarItem">
        <h3 className="sideBarTitle">FOLLOW ME</h3>
        <div className="sideBarIcons">
          <a
            className="sideBarIconLink"
            href="https://www.linkedin.com/in/farjana-yeasmin-15107923b/?locale=fr_FR"
            target="blank"
          >
            <i className="fa-brands fa-linkedin sideBarIcon"></i>
          </a>
          <a
            className="sideBarIconLink"
            href="https://www.facebook.com/profile.php?id=100007295927032"
            target="blank"
          >
            <i className="fa-brands fa-square-facebook sideBarIcon"></i>
          </a>
          <a
            className="sideBarIconLink"
            href="mailto:farjanaa.yyeasmin@gmail.com"
            target="blank"
          >
            <i className="fa-solid fa-square-envelope sideBarIcon"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

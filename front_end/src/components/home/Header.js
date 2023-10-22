import React from "react";
//internal imports
import "./Header.style.css";
import header from "../assets/images/header.jpg";

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="headerText">
        <span className="headerTextsm"></span>
        <h1 className="headerTextlg">Moments Chronicles</h1>
      </div>
      <img className="headerImg" src={header} alt="Header_Image"></img>
    </div>
  );
};

export default Header;

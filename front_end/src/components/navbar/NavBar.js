import React, { useContext, useState } from "react";
//internal imports
import "./Navbar.style.css";
import navLogo from "../assets/images/logo.png";
//import profile from "../assets/images/profile.jpg";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const NavBar = () => {
  const { user, dispatch } = useContext(Context);
  const [showMenu, setShowMenu] = useState(false);

  const PF = "https://moments-chronicles-mern-backend.vercel.app/images/";

  //Log out handler
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };

  return (
    <>
      <nav className="navBar">
        <div className="navLogoContainer">
          <img className=" navLogo" src={navLogo} alt="Logo" />
          <h3 className="navLogoName">
            <Link to="/">Moments Chronicles</Link>
          </h3>
          <div className="menuBarIcon" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </div>
        </div>

        <div className={showMenu ? "navItems menu" : "navItems"}>
          <ul className="navUl">
            <li className="navList">
              <Link to="/">Home</Link>
            </li>
            <li className="navList">
              <Link to="/write">Write</Link>
            </li>
            <li className="navList">
              <Link to="/about">About</Link>
            </li>
            <li className="navList">
              <Link to="/contact">Contact</Link>
            </li>
            {user && (
              <li className="navList" onClick={handleLogOut}>
                Log Out
              </li>
            )}
          </ul>

          <div className="navImg">
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
            {user ? (
              <Link to="/settings">
                <img
                  className="profileImg"
                  src={PF + user.others.profilePic}
                  alt=""
                />
              </Link>
            ) : (
              <>
                <ul className="navUl">
                  <li className="navList">
                    <Link to="/login">Login</Link>
                  </li>

                  <li className="navList">
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

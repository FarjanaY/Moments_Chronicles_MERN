import React from "react";

//internal Imports
import Title from "../title/Title";
import "./Contact.style.css";
import contactImg from "../assets/images/mypp.jpg";

const Contact = () => {
  return (
    <div className="contactTitle">
      <Title title="Contact ME" />
      <div className="contact">
        <div className="contactImageContainer">
          <img className="contactImage" src={contactImg} alt="contactImg" />
        </div>
        <div className="contactContainer">
          <div className="contactDescription">
            <h3 className="">Farjana Yeasmin</h3>
            <p className="">Full Stack Developer (MERN)</p>
            <span className="contactDTxt">
              For any queries, you can contact <br />
              with me .<h4>24X7</h4>
            </span>
            <p className="labelP">
              Phone: <span className="contactTxt">+880 1234567890</span>
            </p>
            <p className="labelP">
              Email:
              <span className="contactTxt">farjanaa.yyeasmin@gmail.com</span>
            </p>
          </div>
          <div className="contactIcons">
            <a
              className="contactIconLink"
              href="https://www.linkedin.com/in/farjana-yeasmin-15107923b/?locale=fr_FR"
              target="blank"
            >
              <i className="fa-brands fa-linkedin contactIcon"></i>
            </a>
            <a
              className="contactIconLink"
              href="https://www.facebook.com/profile.php?id=100007295927032"
              target="blank"
            >
              <i className="fa-brands fa-square-facebook contactIcon"></i>
            </a>
            <a
              className="contactIconLink"
              href="mailto:farjanaa.yyeasmin@gmail.com"
              target="blank"
            >
              <i className="fa-solid fa-square-envelope contactIcon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

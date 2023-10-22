import React from "react";

//Internal imports
import "./About.style.css";
import Title from "../title/Title";
import Slider from "../about/Slider";
//Images
import image2 from "../assets/images/image1.jpg";
import image1 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";

const About = () => {
  //Images for slider
  const images = [
    { src: image1, alt: "Image 1" },
    { src: image2, alt: "Image 2" },
    { src: image3, alt: "Image 3" },
    { src: image4, alt: "Image 4" },
    { src: image5, alt: "Image 5" },
  ];

  return (
    <div className="about">
      <div className="aboutContainer">
        <Slider images={images} />
      </div>
      <div className=" aboutDescription">
        <Title title="About Me" />
        <span className="aboutText text">
          I've combined the art of photography with cutting-edge web technology.
          With a passion for photography, I've embarked on a journey to present
          my unique visual perspective through this immersive online platform.
          At the heart of this project lies a collection of photographs that
        </span>
        <span className="aboutText">
          I've personally captured, each telling a story, preserving a memory,
          or freezing a fleeting moment in time. Whether it's the golden hues of
          a sunset, the intricate details of nature, or the candid shots that
          reveal raw emotions, each photograph showcased on Captured Moments is
          a testament to my artistic vision and technical skill.
        </span>
      </div>
    </div>
  );
};

export default About;

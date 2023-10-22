import React, { useState } from "react";

//Internal Imports
import "./Slider.style.css";

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="sliderContainer">
      {images.map((image, index) => {
        return (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="sliderImage"
            style={{ transform: `translateX(${-currentSlide * 100}%)` }}
          />
        );
      })}

      <button type="submit" onClick={prevSlide} className="prevBtn">
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button type="submit" onClick={nextSlide} className="nextBtn">
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Slider;

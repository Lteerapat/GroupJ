import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "../Styles/Slider1.css";

import Image1 from "../Images/Landing//slide-top-1.png";
import Image2 from "../Images/Landing//slide-top-2.png";
import Image3 from "../Images/Landing//slide-top-3.png";

import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    image: Image1,
    name: "maria ferguson",
  },
  {
    id: 2,
    image: Image2,
    buttonJU: <button className="join-us-slider-top">Join Us</button>,
  },
  {
    id: 3,
    image: Image3,
    buttonJU: <button className="join-us-slider-top">Join Us</button>,
  },
];

function Slider() {
  const [images, setImages] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = images.length - 1;
    //เมื่อ index น้อยกว่า 0  ให้  setIndex(2); ให้ไปต่อรูปสุดท้าย
    if (index < 0) {
      setIndex(lastIndex);
    }
    //เมื่อ index มากกว่า lastIndex(=2) ให้  setIndex(0); ให้ไปเริ่มรูปแรก
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, images]);

  // autoslide
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 10000);
    return () => clearInterval(slider);
  }, [index]);

  const dotImage = (indexImg) => {
    setIndex(indexImg);
  };

  return (
    <section className="slider-top">
      <div className="slider-section-center">
        {images.map((picture, pictureIndex) => {
          const { id, image, buttonJU } = picture;
          let position = "nextSlide";
          if (pictureIndex === index) {
            position = "activeSlide";
          }
          if (
            pictureIndex === index - 1 ||
            (index === 0 && pictureIndex === images.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <div className="slide-top-image">
              <article key={id} className={position}>
              <img src={image} className="picture-img" />
              <Link to="/signup">{buttonJU}</Link>
            </article>
            </div>
            
          );
        })}

        <button className="slide-top-prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="slide-top-next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
      <div className="slider-top-dot">
        {images.map((dots, dotIndex) => {
          return (
            <span
              id={index === dotIndex ? "span-active" : ""}
              className="slider-top-dots"
              key={dotIndex}
              onClick={() => dotImage(dotIndex)}
            ></span>
          );
        })}
      </div>
    </section>
  );
}

export default Slider;
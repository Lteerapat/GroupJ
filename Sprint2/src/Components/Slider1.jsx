import "../Styles/Slider1.css";
import { useState, useEffect, useRef } from "react";

// Import Image
import Image1 from "../Images/Landing/slide-top-1.png";
import Image2 from "../Images/Landing/slide-top-2.png";
import Image3 from "../Images/Landing/slide-top-3.png";

const Slider = () => {
  const timeRef = useRef(null);
  const slideImage = [Image1, Image2, Image3];
  const [Image, setImage] = useState(0);

  const next = () => {
    if (Image < slideImage.length - 1) {
      setImage(Image + 1);
    } else {
      setImage(0);
    }
  };

  const prev = () => {
    if (Image < 1) {
      setImage(slideImage.length - 1);
    } else {
      setImage(Image - 1);
    }
  };

  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      next();
    }, 3000);

    return () => clearTimeout(timeRef.current);
  });

  const dotImage = (indexImg) => {
    setImage(indexImg);
  };

  console.log(Image);
  console.log(slideImage.length);

  return (
    <div className="slider-top">
      <div className="slider-top-img">
        <img className="slider-img" src={slideImage[Image]} />
        {/* <img className="slider-img" src={slideImage[1]} />
        <img className="slider-img" src={slideImage[2]} /> */}
      </div>
      <div className="slider-top-dot">
        <span
          id={Image === 0 ? "span-active" : ""}
          onClick={() => dotImage(0)}
        ></span>
        <span
          id={Image === 1 ? "span-active" : ""}
          onClick={() => dotImage(1)}
        ></span>
        <span
          id={Image === 2 ? "span-active" : ""}
          onClick={() => dotImage(2)}
        ></span>
      </div>
      <button className="pervious" onClick={() => prev()}>
        &#8249;
      </button>
      <button className="next" onClick={() => next()}>
        &#8250;
      </button>
    </div>
  );
};
export default Slider;

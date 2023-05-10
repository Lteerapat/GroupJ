import "../Styles/Slider2.css";
import React, { useEffect } from "react";
import { useState } from "react";
import trophy from "../Images/Landing/trophy.png";
import graph from "../Images/Landing/graph.png";
import Line from "../Images/Landing/Line.png";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const list = [
  {
    id: 1,
    name: "Achievement",
    title:
      "Get started today and see how our achievement feature can help you achieve your goals.",
    image: trophy,
    link:"/achievement",
  },
  {
    id: 2,
    name: "JS Chart",
    title:
      "Visualize your exercise progress!! our graph progress can help you stay motivated and reach your goals.",
    image: graph,
    link:"/dashboard",
  },
  {
    id: 3,
    name: "Line Connect",
    title:
      "Connect your exercise tracking to LINE and start sharing with friends. It's easy and fun!",
    image: Line,
    link:"/#",
  },
];


const Slider2 = () => {
  const [people, setPeople] = useState(list);
  const[currentPerson, setCurrentPerson] = useState(0);
  
  const prevSlide  = () => {
    setCurrentPerson((oldPerson)=>{
      const result = (oldPerson - 1 + people.length) % people.length;
      return result;
    });
  };
  const nextSlide = () => {
    setCurrentPerson((oldPerson)=>{
      const result = (oldPerson + 1 ) % people.length;
      return result;
    });
  };

  useEffect(() => {
    let sliderId = setInterval( () => {
      nextSlide();
    }, 4000);
    return () => {
      clearInterval(sliderId);
    };
  },[currentPerson]);


  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { id, name, title, image, link } = person;
        return(
        <article className="slide " style={{transform:`translateX(${100*(personIndex-currentPerson)}%)`,
        opacity: personIndex === currentPerson ? 1 : 0,
        visibility: personIndex === currentPerson ? 'visible' : 'hidden',
        }} 
        key={id}>
            <div className="container_content1">
              <div>
                <h1>{name}</h1>
                <p>{title}</p>
              </div>
              <div>
                <div className="container_trophy">
                  <a href= {link}>
                  <img src={image} alt={name} />
                  </a>
                </div>
              </div>
            </div>
        </article>
        );
      })}
    <button type='button' className='prev' onClick={prevSlide}>
      <FiChevronLeft/>
    </button>
    <button type='button' className='next' onClick={nextSlide}>
      <FiChevronRight/>
   </button>
    </section>
  );
};

export default Slider2;

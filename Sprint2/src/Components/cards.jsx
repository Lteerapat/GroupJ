import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const Cards = () => {

  const [cards, setCards] = useState([ {
      id: "1",
      activityName: "Running with Dogs",
      activityType: "running",
      activityDate: "15.05.2023",
      activityDuration: "45",
      activityDistance: "300",
      activityNote: "so tired",
    },
    {
      id: "2",
      activityName: "Swimming with Cats",
      activityType: "swiming",
      activityDate: "16.05.2023",
      activityDuration: "4605",
      activityDistance: "200",
      activityNote: "very tired",
    },
    {
      id: "3",
      activityName: "walking with Rats",
      activityType: "walking",
      activityDate: "17.05.2023",
      activityDuration: "30",
      activityDistance: "500",
      activityNote: "too tired",
    }]);

  const handleDelete = (id) => {
    setCards(cards.filter(card => card.id !== id))
  };

  return (
    <div className="db-card-container">
      {cards.map((card) => (
        <div className="db-card" key={card.id}>
          <div className="db-activity-bg">
          {/*need to change to card.activityType */}
            <i className="fa-solid fa-person-running"></i>
          {/*need to change to card.activityType */}
          </div>
          <div className="db-activity-content">
            <h2>{card.activityName}</h2>
            <div className="db-activity-property">
              <div className="db-activity-property-top">
                <h4>Date : {card.activityDate}</h4>
                <h4>Duration : {card.activityDuration}</h4>
              </div>
              <div className="db-activity-property-bottom">
                <h4>Distance : {card.activityDistance}</h4>
                <h4>Note : {card.activityNote}</h4>
              </div>
            </div>
          </div>
          <div className="db-activity-edit-del">
            <a href={"/edit"}>
              <i className="fa-solid fa-pen-to-square"></i>
            </a>
            <div>
              <i
                className="fa-solid fa-trash"
                onClick={() => handleDelete(card.id)}
              ></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;

import React from "react";
import "../Styles/Dashboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import bgDashBoard from "../Images/Dashboard/bg-dashboard.png";
import logoLight from "../Images/Logo/gaintrack-logo-light.png";
import profilePic from "../Images/Dashboard/profilePic.png";
import { useState, useEffect } from "react";
import Cards from "../Components/card"

const Dashboard = () => {

  return (

    <div className="big-container">
      <div className="container">
        <img src={bgDashBoard} alt="bg" />

        <div className="left-container">
          <div className="left">
            <div className="logo">
              <a href={"/"}>
                <img src={logoLight} alt="logo-pic" />
              </a>
            </div>
            <div className="nav-bar">
              <nav>
                <ul>
                  <li>
                    <a href={"/achievement"}>
                      <i className="fa-solid fa-trophy"></i>Achievement
                    </a>
                  </li>
                  <li>
                    <a href={"/"}>
                      Log out<i className="fa-solid fa-right-from-bracket"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="middle-container">
          <div className="middle">
            <div className="mini-profile">
              <div className="location">
                <i className="fa-solid fa-location-dot"></i>
                <span>Somewhere, Space</span>
              </div>

              <div className="profile-pic">
                <img src={profilePic} alt="profile-pic" />
              </div>
            </div>

            <div className="card-container">
              <div className="card-add">
                <a href={"/add"}>
                  <i className="fa-solid fa-plus"></i>
                </a>
              </div>
              <Cards />
            </div>
          </div>
        </div>

        <div className="right-container">
          <div className="right">
            <div className="activity-summary-top">
              <h2>Activity Tracking</h2>
              <h4>Monday, 01 Jan</h4>
            </div>
            <div className="activity-summary">a</div>
            <div className="activity-summary">a</div>
            <div className="activity-summary">sa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

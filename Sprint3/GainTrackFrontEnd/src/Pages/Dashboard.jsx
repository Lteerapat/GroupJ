import React from "react";
import "../Styles/Dashboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import bgDashBoard from "../Images/Dashboard/bg-dashboard.png";
import logoLight from "../Images/Logo/gaintrack-logo-light.png";
import profilePic from "../Images/Dashboard/profilePic.png";
import Cards from "./../Components/cards"

const Dashboard = () => {

  return (

    <div className="db-big-container">
      <div className="db-container">
        <img src={bgDashBoard} alt="bg" />

        <div className="db-left-container">
          <div className="db-left">
            <div className="db-logo">
              <a href={"/"}>
                <img src={logoLight} alt="logo-pic" />
              </a>
            </div>
            <div className="db-nav-bar">
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

        <div className="db-middle-container">
          <div className="db-middle">
            <div className="db-mini-profile">
              <div className="db-location">
                <i className="fa-solid fa-location-dot"></i>
                <span>Somewhere, Space</span>
              </div>

              <div className="db-profile-pic">
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

        <div className="db-right-container">
          <div className="db-right">
            <div className="db-activity-summary-top">
              <h2>Activity Tracking</h2>
              <h4>Monday, 01 Jan</h4>
            </div>
            <div className="db-activity-summary">a</div>
            <div className="db-activity-summary">a</div>
            <div className="db-activity-summary">sa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

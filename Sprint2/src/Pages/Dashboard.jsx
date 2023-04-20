import React from "react";
import "../Styles/Dashboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import bgDashBoard from "../Images/Dashboard/bg-dashboard.png";
import logoLight from "../Images/Logo/gaintrack-logo-light.png";
import profilePic from "../Images/Dashboard/profilePic.png";


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
                <i className="fa-solid fa-plus"></i>
              </div>

              {/* <!-- card1 --> */}
               <div className="card">
                <div className="activity-bg">
                  <i className="fa-solid fa-person-running"></i>
                </div>
                <div className="activity-content">
                  <h2>Running with dog</h2>
                  <div className="activity-property">
                    <div className="activity-property-top">
                      <h4>Date: 02/01/23</h4>
                      <h4>Duration: 00:30:00</h4>
                    </div>
                    <div className="activity-property-bottom">
                      <h4>Distance: 5km</h4>
                      <h4>Note: - </h4>
                    </div>
                  </div>
                </div>
                <div className="activity-edit-del">
                  <i className="fa-solid fa-pen-to-square"></i>
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div> 

              {/* <!-- card2 --> */}
              {/* <div className="card">
                <div className="activity-bg">
                  <i className="fa-solid fa-person-swimming fa-flip-horizontal"></i>
                </div>
                <div className="activity-content">
                  <h2>Swimming is ez</h2>

                  <div className="activity-property">
                    <div className="activity-property-top">
                      <h4>Date: 02/01/23</h4>
                      <h4>Duration: 00:30:00</h4>
                    </div>

                    <div className="activity-property-bottom">
                      <h4>Distance: 5km</h4>
                      <h4>Note: - </h4>
                    </div>
                  </div>
                </div>
                <div className="activity-edit-del">
                  <i className="fa-solid fa-pen-to-square"></i>
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div> */}

              {/*   <!-- card3 --> */}
              {/* <div className="card">
                <div className="activity-bg">
                  <i className="fa-solid fa-person-walking"></i>
                </div>
                <div className="activity-content">
                  <h2>Walk to bar</h2>

                  <div className="activity-property">
                    <div className="activity-property-top">
                      <h4>Date: 02/01/23</h4>
                      <h4>Duration: 00:30:00</h4>
                    </div>

                    <div className="activity-property-bottom">
                      <h4>Distance: 5km</h4>
                      <h4>Note: - </h4>
                    </div>
                  </div>
                </div>
                <div className="activity-edit-del">
                  <i className="fa-solid fa-pen-to-square"></i>
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div> */}

              {/* <!-- card4 --> */}
              {/* <div className="card">
                <div className="activity-bg">
                  <i className="fa-solid fa-person-hiking"></i>
                </div>
                <div className="activity-content">
                  <h2>Hike the Everest</h2>

                  <div className="activity-property">
                    <div className="activity-property-top">
                      <h4>Date: 02/01/23</h4>
                      <h4>Duration: 00:30:00</h4>
                    </div>

                    <div className="activity-property-bottom">
                      <h4>Distance: 5km</h4>
                      <h4>Note: - </h4>
                    </div>
                  </div>
                </div>
                <div className="activity-edit-del">
                  <i className="fa-solid fa-pen-to-square"></i>
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div> */}

              {/* <!-- card5 --> */}
              {/* <div className="card">
                <div className="activity-bg">
                  <i className="fa-solid fa-person-biking"></i>
                </div>
                <div className="activity-content">
                  <h2>Cycling with dad</h2>

                  <div className="activity-property">
                    <div className="activity-property-top">
                      <h4>Date: 02/01/23</h4>
                      <h4>Duration: 00:30:00</h4>
                    </div>

                    <div className="activity-property-bottom">
                      <h4>Distance: 5km</h4>
                      <h4>Note: - </h4>
                    </div>
                  </div>
                </div>
                <div className="activity-edit-del">
                  <i className="fa-solid fa-pen-to-square"></i>
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>*/}
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

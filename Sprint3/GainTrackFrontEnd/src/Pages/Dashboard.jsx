import React, { useContext, useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import bgDashBoard from "../Images/Dashboard/bg-dashboard.png";
import logoLight from "../Images/Logo/gaintrack-logo-light.png";
import profilePic from "../Images/Dashboard/profilePic.png";
import { UserContext } from "../Contexts/UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import ActivityCards from "../Components/ActivityCard";
import {format} from 'date-fns';

const Dashboard = () => {
    // const {ready, user, setUser} = useContext(UserContext);
    const [user, setUser] = useState([]);
    const [ready, setReady] = useState(false);

    //Navigation
    const navigate = useNavigate();
    
    //when click logout 
    const logout = async (e) => {
        e.preventDefault();
        await axios.post('/logout');
        setUser(null);
        navigate('/login');
    }

    // render mini profile
    useEffect(() => {
        if (user) {
            axios.get('/profile')
                .then(({data}) => {
                    setUser(data);
                    setReady(true)
                })
                .catch(() => {
                    setUser(null);
                });
        }

         
    }, []);

   
    

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
                                <a href={"/dashboard/achievement"}>
                                <i className="fa-solid fa-trophy"></i>Achievement
                                </a>
                            </li>
                            <li>
                                <a onClick={logout}>
                                    Log out
                                    <i className="fa-solid fa-right-from-bracket"></i>
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
                                <h2>Welcome, {!ready ? 'Loading...' : user.first_name}</h2>
                            </div>
                        </div>

                        <div className="db-card-container">
                            <a className="db-card-add" href="/dashboard/add">
                                <i className="fa-solid fa-plus"></i>
                            </a>
                            <ActivityCards />
                        </div>
                    </div>
                </div>

                <div className="db-right-container">
                    <div className="db-right">
                        <div className="db-activity-summary-top">
                        <h2>Activity Tracking</h2>
                        <h3>{format(new Date(), 'EEEE, dd MMM')}</h3>
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

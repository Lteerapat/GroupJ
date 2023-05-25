import React, { useContext, useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import bgDashBoard from "../Images/Dashboard/bg-dashboard.png";
import logoLight from "../Images/Logo/gaintrack-logo-light.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import ActivityCards from "../Components/ActivityCards";
import {format} from 'date-fns';
import MiniProfile from "../Components/MiniProfile";
import ChartJsNumOfActivity from "../Components/ChartJsNumOfActivity";
import ChartJsDuraDisOfAllActivity from "../Components/ChartJsDuraDisOfAllActivity";
import lineQRPic from '../Images/Dashboard/LineOAQR.png';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [user, setUser] = useState([]);

    //Navigation
    const navigate = useNavigate();
    
    //when click logout 
    const logout = async (e) => {
        e.preventDefault();
        await Swal.fire({
            title: 'Confirm Logout ?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.post('/logout');
                localStorage.removeItem('token');
                sessionStorage.removeItem('sessionToken');
                setUser(null);
                navigate('/login');
            } else if (result.isDenied) {
               return;
            } 
        })
        
    }
   

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
                                        <i className="fa-solid fa-trophy" style={{color: 'yellow'}}></i>Achievement
                                    </a>
                                </li>
                                <li>
                                    <div className="db-line-connection">
                                        <a>
                                            <i className="fa-brands fa-line" style={{color: '#06c655'}}></i>
                                            Connect Line
                                        </a>
                                        <img src={lineQRPic} alt='lineQR-pic' />
                                    </div>
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
                        <MiniProfile />

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
                        <div className="db-activity-summary">
                            <ChartJsNumOfActivity />
                        </div>
                        <div className="db-activity-summary">
                            <ChartJsDuraDisOfAllActivity />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

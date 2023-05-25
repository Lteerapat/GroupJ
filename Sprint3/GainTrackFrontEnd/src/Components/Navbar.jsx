import React from "react";
import ReactDOM from "react-dom";
import './Navbar.css';
import logo from '../Images/Logo/gaintrack-logo-light.png';


const Navbar = () => {

    return (
        
            <div className="navBar">
                <div className="left-navbar">
                    <div className="logo-navbar">
                        <a href='/'><img src= {logo} alt="logo-pic" width={200} /></a>
                    </div>
                </div>
                    <div className="middle-navbar">
                        <nav>
                            <ul className="nav-ul">
                                <li>
                                    <a href="/#feature" className="footer-link">Feature</a>
                                </li>
                                <li>
                                    <a href="/#myJourney" className="footer-link">My Journey</a>
                                </li>
                                <li>
                                    <a href="/#sponsor" className="footer-link">Our Customers</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                <div className="right-navbar">
                            <ul className="nav-ul">
                                <li>
                                <a href="/login"><button className="login-navbar footer-link">LogIn</button></a>
                                </li>
                                <li>
                                <a href="/signup"><button className="signup-navbar footer-link">SignUp</button></a>
                                </li>
                            </ul>
                </div>
            </div>
    );
};
    
export default Navbar;
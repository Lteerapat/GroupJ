import React from "react";
import ReactDOM from "react-dom";
import './Navbar.css';
import logo from '../images/Logo/gaintrack-logo-light.png';


const Navbar = () => {

    return (
        
            <div className="navBar">
                <div className="left-navbar">
                    <div className="logo">
                        <a href='/'><img src= {logo} alt="logo-pic" width={200} /></a>
                    </div>
                </div>
                    <div className="middle-navbar">
                        <nav>
                            <ul>
                                <li>
                                    <a href="#">Feature</a>
                                </li>
                                <li>
                                    <a href="#">My Journey</a>
                                </li>
                                <li>
                                    <a href="#">Our Customers</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                <div className="right-navbar">
                            <ul>
                                <li>
                                <a href="/login"><button className="login">Login</button></a>
                                </li>
                                <li>
                                <a href="/signup"><button className="signup">SignUp</button></a>
                                </li>
                            </ul>
                </div>
            </div>
    );
};
    
export default Navbar;
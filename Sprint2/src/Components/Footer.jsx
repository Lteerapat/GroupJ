import React from "react";
import './Footer.css';


const Footer = () => {
  

return (
    
        <footer className="footer">
            <div className="left-footer">
            <div>
                    <p>&copy; Copyright 2023 GainTrack</p>
            </div>
            </div>
                <div className="middle-footer">
                    <div>
                        <ul>
                            <li>
                                <a href="#">Terms</a>
                            </li>
                            <li>
                                <a href="#">Privacy</a>
                            </li>
                            <li>
                                <a href="/contactUs">Contact us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            <div className="right-footer">
                <a  href='#top'>Back to top</a>
            </div>
        </footer>
);
};

export default Footer;
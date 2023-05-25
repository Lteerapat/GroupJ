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
                        <ul className="nav-ul">
                            <li>
                                <a href="#" className="footer-link">Terms</a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">Privacy</a>
                            </li>
                            <li>
                                <a href="/contactUs" className="footer-link">Contact us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            <div className="right-footer">
                <a  href='#top' className="footer-link">Back to top</a>
            </div>
        </footer>
);
};

export default Footer;
import '../Styles/ContactUs.css';
import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";

const ContactUs = () => {
    return (
        <div className="container" >
        <div className="contact">
            <h1 id="contact">Contact Us</h1>
        </div>
        <div className="contact-box">
            <div className="form-left">
                    <div className="name">
                        <input className="name" type="text" name="user_name" id="name" placeholder=" Name" required />
                    </div>
                    <br/>
                    <div className="email">
                        <input className="email" type="email" name="email" id="email" placeholder=" Email" required />
                    </div>
                    <br/>
                    <div className="message">
                        <textarea className="message" name="message" id="message" cols="20" rows="10" placeholder="Message"></textarea>
                    </div>
                    <br/>
                    <div>
                        <button className="button" type="submit">Submit</button>
                    </div>
                    <br/>
            </div>
           
            <div className="form-right">
                    <h3 className="call">Call us</h3>
                    <h4> 0xx-xxxxxx</h4>
                    <br/>
                    <h3 className="ourEmail">Email</h3>
                    <h4>helloworld@gaintrack.com</h4>
                    <br/>
                    <h3 className="location">Location</h3>
                    <h4>Earth, Milky way</h4>
            </div>
        </div>
    </div>
    )
 }









export default ContactUs;
import '../Styles/ContactUs.css';
import React from 'react';
import {useRef} from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import emailjs from '@emailjs/browser';
import Navbar from '../Components/Navbar';
import Swal from 'sweetalert2';

const ContactUs = () => {
    return (
    <div>
        <Navbar />
        <ContactUs2 />
    </div>
    );
}


const ContactUs2 = () => {
    const form = useRef()


    const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ezo9kc5', 'template_q9agsnf', form.current, 'aTw7yilb9W5PFkiOp')
      .then((result) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your email has been sent',
            showConfirmButton: false,
            timer: 1500
        })
      }, (error) => {
        Swal.fire('Failed to send your email. Please try again later.')
      });
      e.target.reset()
  };
    return (
        
    <div className="body">
        <div className="container-contact" >
        <div className="contact">
            <h1 id="contact">Contact Us</h1>
        </div>
        <div className="contact-box">
            <form ref={form} onSubmit={sendEmail} className="form-left">
                    <div className="name">
                        <input className="name" type="text" name="user_name" id="name" placeholder=" Name" required />
                    </div>
                    <br/>
                    <div className="email">
                        <input className="email" type="email" name="user_email" id="email" placeholder=" Email" required />
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
            </form>
           
            <div className="form-right">
                    <h3 className="call">Call us</h3>
                    <h4> 0xx-xxxxxx</h4>
                    <br/>
                    <h3 className="ourEmail">Email</h3>
                    <h4>gaintrack6@gmail.com</h4>
                    <br/>
                    <h3 className="location">Location</h3>
                    <h4>Earth, Milky way</h4>
            </div>
        </div>
    </div>
    </div>
    )
 }




export default ContactUs;
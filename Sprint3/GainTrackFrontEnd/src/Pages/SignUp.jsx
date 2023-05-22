import '../Styles/SignUp.css'
import light_logo from '../Images/Logo/gaintrack-logo-dark.png';
import { useNavigate } from "react-router-dom";
import Joi from 'joi';
import { useState } from 'react';
import axios from 'axios';
import "@fortawesome/fontawesome-free/css/all.min.css";


const SignUp = () => {  
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [lineId, setLineId] = useState('')

    const togglePassword = () =>{
        if (passwordType==="password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

  // navigation
    let a = false
    const navigate = useNavigate();
    const navigationToLogin = () => {
        navigate("/login")
    }

    // validation scheme in signup
    const schema = Joi.object({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    // function validation
    // submit to backend
    const handleCreateAccount = async (event) => {
        event.preventDefault();
        const userData = {
            firstName, 
            lastName, 
            email, 
            password
           
        }
        // const formData = new FormData(event.target);
        // const data = Object.fromEntries(formData.entries());
    
        const { error } = schema.validate(userData);
        if (error) {
            alert(error.details[0].message);
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do NOT match');
            return;
        }

        try {
            await axios.post('/auth/signup', { firstName, lastName, email, password,lineId });
            alert('Registration successful');
            navigationToLogin();
        } catch (err) {
            err.response.data.error === 'This email already registered' ?
                alert (err.response.data.error)
                :
                alert ("Registration failed. Please try again later.")
        }
        // Form data is valid, do something with it here
    };

    return (
        <div className="container_signup">
            <div className="login-card_singup">
                <div className="column">
                    <a href="/">
                    <img src={light_logo} alt="gaintrack-logo" />
                    </a>
                    <h2>Welcome to Our Website</h2>
                </div>
                <div className="column">
                    <h1>Create an account</h1>
                    <form onSubmit={handleCreateAccount}>
                        <div className="form-item">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                className="form-element"
                                id="firstname"
                                name="first_name"
                                placeholder="Firstname"
                                value={firstName}
                                onChange={e => {setFirstName(e.target.value)}}
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                className="form-element"
                                id="lastname"
                                name="last_name"
                                placeholder="Lastname"
                                value={lastName}
                                onChange={e => {setLastName(e.target.value)}}
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-element"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => {setEmail(e.target.value)}}
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="password">Password</label>
                            {passwordType==="password" ? 
                                <i className="fa-solid fa-eye-slash" onClick={togglePassword}></i>
                                :
                                <i className="fa-solid fa-eye" onClick={togglePassword}></i>
                            }
                            <input
                                type={passwordType}
                                className="form-element"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => {setPassword(e.target.value)}}
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="password">Confirm password</label>
                            {passwordType==="password" ? 
                                <i className="fa-solid fa-eye-slash" onClick={togglePassword}></i>
                                :
                                <i className="fa-solid fa-eye" onClick={togglePassword}></i>
                            }
                            <input
                                type={passwordType}
                                className="form-element"
                                id="password"
                                name="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={e => {setConfirmPassword(e.target.value)}}
                            />
                        </div>
                        <div className="flex">
                            <button>Create Account</button>
                            <p>
                            Already have an account? <a href="/login">Log In</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
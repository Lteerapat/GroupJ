import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { setCookie, getCookie, deleteCookie } from './cookieUtils'
import '../Styles/LogIn.css';
import gaintrackLogo from '../Images/Logo/gaintrack-logo-dark.png';
import "@fortawesome/fontawesome-free/css/all.min.css";

const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setpasswordType] = useState('password');
    const [rememberMe, setRememberMe] = useState(false);
    
    //see and unsee password
    const handleEyeClick = (e) => {
        setPassword(e.target.value);
    }

    const togglePassword = () =>{
        if(passwordType==="password") {
            setpasswordType("text")
            return;
        }
        setpasswordType("password")
    }

    //remember me checkbox
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");
        const storedRememberme = localStorage.getItem("rememberMe");

        if (storedRememberme && storedUsername) {
            setUsername(storedUsername);
            setPassword(storedPassword);
            setRememberMe(storedRememberme);
        }
    }, []);

    //Navigation
    const navigate = useNavigate();

    const navigateToSignUp = () => {
        navigate('/signup');
    };

    //check login input before submit
    const handleLogIn = (e) => {
        e.preventDefault();
        if (username === '' && password === '') {
            alert("Please enter you username and password!")
        } else if (username === '') {
            alert("Please enter your username!")
        } else if (password === '') {
            alert("Please enter you password!")
        } else {
            if (rememberMe) {
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
                localStorage.setItem("rememberMe", true);
            } else {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.removeItem("rememberMe");
            }
            navigate('/dashboard');
        }
    };

    return (
        
        <>
            <div className="login-page-container">
                <div className="login-card">
                    <div className="login-card-column">
                        <a href="/"><img src={gaintrackLogo} alt="gaintrack-logo" /></a>
                        <p>Easy to track your activities</p>
                        <form>
                            <div className="login-form-item">
                                <input type="text" className="login-form-element" placeholder="Username or Email" onChange={(e) => setUsername(e.target.value)} value={username} />
                            </div>
                            <div className="login-form-item">
                                {passwordType==="password" ? 
                                    <i className="fa-solid fa-eye-slash" onMouseDown={togglePassword}></i>
                                    :
                                    <i className="fa-solid fa-eye" onClick={togglePassword}></i>
                                }
                                <input type={passwordType} className="login-form-element" placeholder="Password" onChange={handleEyeClick} value={password} />
                            </div>
                            <div className="login-form-checkbox-item">
                                <input 
                                    type="checkbox" 
                                    id="rememberMe"  
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label for="rememberMe">Remember me</label>
                            </div>
                            <div className="login-flex">
                                <button type="button" onClick={handleLogIn}>Log In</button>
                                <button type="button" onClick={navigateToSignUp}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <div className="login-card-column">
                        <h2>Welcome to Our Website</h2>
                        <p>If you don't have an account, would you like to register now?</p>
                        <button onClick={navigateToSignUp}>Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogIn;
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import '../Styles/LogIn.css';
import gaintrackLogo from '../Images/Logo/gaintrack-logo-dark.png';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';


const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState('password');
    const [rememberMe, setRememberMe] = useState(false);
    const [cookies, setCookie] = useCookies(['token']);
    const {setUser} = useContext(UserContext);

    const navigate = useNavigate();

    const togglePassword = () =>{
        if (passwordType==="password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    //remember me checkbox
    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");
        const storedRememberMe = localStorage.getItem("rememberMe");

        if (storedRememberMe && storedEmail) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(storedRememberMe);
        }

        const token = localStorage.getItem('token');
        const sessionToken = sessionStorage.getItem('sessionToken');

        if (token || sessionToken) {
            navigate('/dashboard');
        }

        
    }, []);

    //Navigation
    const navigateToSignUp = () => {
        navigate('/signup');
    };

    //check login input before submit
    const handleLogIn = async (e) => {
        e.preventDefault();

        if (email === '' && password === '') {
            Swal.fire("Please enter you email and password!")
        } else if (email === '') {
            Swal.fire("Please enter your email!")
        } else if (password === '') {
            Swal.fire("Please enter you password!")
        } else {
            try {
                const {data, headers} = await axios.post('/auth/login', {email, password}, {withCredentials:true});
                if (rememberMe) { 
                    localStorage.setItem('token', data.password)
                    localStorage.setItem("email", email);
                    localStorage.setItem("password", password);
                    localStorage.setItem("rememberMe", true);
                } else {
                    sessionStorage.setItem('sessionToken', data.password)
                    localStorage.removeItem("email");
                    localStorage.removeItem("password");
                    localStorage.removeItem("rememberMe");
                }
                
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard');
            } catch (err) {
                Swal.fire('Login failed: '+err.response.data.error);
            }
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
                                <input 
                                    type="email" 
                                    className="login-form-element" 
                                    placeholder="Email" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email} 
                                />
                            </div>
                            <div className="login-form-item">
                                {passwordType==="password" ? 
                                    <i className="fa-solid fa-eye-slash" onMouseDown={togglePassword}></i>
                                    :
                                    <i className="fa-solid fa-eye" onClick={togglePassword}></i>
                                }
                                <input 
                                    type={passwordType} 
                                    className="login-form-element" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                            <div className="login-form-checkbox-item">
                                <input 
                                    type="checkbox" 
                                    id="rememberMe"  
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>
                            <div className="login-flex">
                                <button type="button" onClick={handleLogIn}>Log In</button>
                                <button type="button" onClick={navigateToSignUp}>Sign Up</button> {/* for responsive */}
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
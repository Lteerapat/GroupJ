import "../Styles/Add.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import Joi from "joi";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import '../Styles/EditProfile.css';

const EditProfile = () => {
    const [user, setUser] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [location, setLocation] = useState('');
    const [passwordType, setPasswordType] = useState('password');


    const navigate = useNavigate();

    const togglePassword = () =>{
        if (passwordType==="password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    //validation
    const schema = Joi.object({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        // confirmPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        // oldPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        location: Joi.string().min(3).max(30).required(),
    });

    // fetch user profile
    useEffect(() => {
        if (user) {
            axios.get('/profile')
                .then(({data}) => {
                    setUser(data);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setEmail(data.email);
                    setLocation(data.location);
                })
                .catch(() => {
                    setUser(null);
                });
        }
    }, []);

    // click save
    const saveProfile = async (e) => {
        e.preventDefault();
        const {error} = schema.validate({firstName, lastName, email, password, location});
        if (error) {
            const errorMessage = error.details[0].message
                .replace(/firstName/g, 'First Name')
                .replace(/lastName/g, 'Last Name')
                // .replace(/oldPassword/g, 'Old Password')
                // .replace(/confirmPassword/g, 'Confirm Password')
            alert(errorMessage);
            return;
        }

        try {
            // Validate the old password
            const response = await axios.post('/profile/validate-password', { password });
            if (response.data.correctPass) {
                const updatedProfile = {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    location
                }
                await axios.put('/profile', updatedProfile);
                alert('Profile updated successfully.')
                navigate('/dashboard')
            } else {
                alert('Your password is incorrect. Please try again.');
            }
        } catch (err) {
            alert('Error updating profile. Please try again.');
        }

        
        

    };


return (
    <div className="container-edit-profile">
        <div className="edit-profile-card">
            <h1>Edit Your Profile</h1>
            <form onSubmit={saveProfile}>
                <div className="edit-profile-name-container">
                    <div className='edit-profile-form-item'>
                        <label>First Name:</label>
                        <input
                            type="text"
                            className='edit-profile-form-element'
                            value={firstName}
                            defaultValue={user.first_name}
                            onChange={(e)=> setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='edit-profile-form-item'>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            className='edit-profile-form-element'
                            value={lastName}
                            defaultValue={user.last_name}
                            onChange={(e)=> setLastName(e.target.value)}
                        />
                    </div>
                </div>
            
                <div className='edit-profile-form-item'>
                    <label>Your Location:</label>
                    <input
                        type="text"
                        className='edit-profile-form-element'
                        value={location}
                        placeholder={user.location ? "" : "Your Location"}
                        defaultValue={user.location ? user.location : "" }
                        onChange={(e)=> setLocation(e.target.value)}
                    />
                </div>
                <div className='edit-profile-form-item'>
                    <label>Email:</label>
                    <input
                        type="email"
                        className='edit-profile-form-element'
                        value={email}
                        defaultValue={user.email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
            
                <div className='edit-profile-form-item'>
                    <label>Password:</label>
                    {passwordType==="password" ?
                        <i className="fa-solid fa-eye-slash" onClick={togglePassword}></i>
                        :
                        <i className="fa-solid fa-eye" onClick={togglePassword}></i>
                    }
                    <input
                        type={passwordType}
                        className='edit-profile-form-element'
                        value={password}
                        placeholder="Your Password"
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                {/* <div className='edit-profile-form-item'>
                    <label>New Password:</label>
                    {passwordType==="password" ?
                        <i className="fa-solid fa-eye-slash" onClick={togglePassword}></i>
                        :
                        <i className="fa-solid fa-eye" onClick={togglePassword}></i>
                    }
                    <input
                        type={passwordType}
                        className='edit-profile-form-element'
                        value={password}
                        placeholder="New Password"
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div> */}
                {/* <div className='edit-profile-form-item'>
                    <label>Confirm New Password:</label>
                    {passwordType==="password" ?
                        <i className="fa-solid fa-eye-slash" onClick={togglePassword}></i>
                        :
                        <i className="fa-solid fa-eye" onClick={togglePassword}></i>
                    }
                    <input
                        type={passwordType}
                        className='edit-profile-form-element'
                        value={confirmPassword}
                        placeholder="Confirm New Password"
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                    />
                </div> */}
                <div className='edit-profile-form-item'>
                    <label>Profile Image:</label>
                    <input
                        type="file"
                        // className='edit-profile-form-element'
                        value={profileImageUrl}
                        // defaultValue="Confirm New Password"
                        onChange={(e)=> setProfileImageUrl(e.target.value)}
                    />
                </div>
                <div className="edit-profile-button-section">
                    <button>Save</button>
                    <button onClick={() => {navigate('/dashboard')}}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
)
};

export default EditProfile;
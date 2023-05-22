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
const [profileImage, setProfileImage] = useState('');
const [location, setLocation] = useState('');
const [passwordType, setPasswordType] = useState('password');
const [isLoading, setIsLoading] = useState(false);
const [isFileSelected, setIsFileSelected] = useState(false);

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

    // Create a new FormData object
    const formData = new FormData();

    // Append the updated profile data to the FormData object
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('location', location);

    // Append the profile image file to the FormData object
    formData.append('profile_image', profileImage);

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
        // const file = e.target.files[0];


        // if (file) {
        //     if (file.size > 250000) {
        //         // Display an error message if the file size exceeds the limit
        //         alert('Image size exceeds the limit (250KB). Please choose a smaller file.');
        //         e.target.value = null; // Reset the file input value
        //         setIsFileSelected(false); // Set isFileSelected to false
        //     } else {
        //         setProfileImage(file);
        //         setIsFileSelected(true); // Set isFileSelected to true when a valid file is selected
        //     }
        // }
        // Validate the old password
        const response = await axios.post('/profile/validate-password', { password });
        if (response.data.correctPass) {
            setIsLoading(true); //start loading state

            // Make a POST request with the FormData object
            await axios.put('/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            });

            setIsLoading(false); //end the loading state
            alert('Profile updated successfully.')
            navigate('/dashboard')
        } else {
            alert('Your password is incorrect. Please try again.');
        }
    } catch (err) {
        alert(`Error updating profile. Please try again.`);
    }
};

//handle image size more than limit bug
const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
        if (file.size > 250000) {
            // Display an error message if the file size exceeds the limit
            alert('Image size exceeds the limit (250KB). Please choose a smaller file.');
            e.target.value = null; // Reset the file input value
            setIsFileSelected(false); // Set isFileSelected to false
        } else {
            setProfileImage(file);
            setIsFileSelected(true); // Set isFileSelected to true when a valid file is selected
        }
    }
}


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
                            // defaultValue={user.first_name}
                            onChange={(e)=> setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='edit-profile-form-item'>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            className='edit-profile-form-element'
                            value={lastName}
                            // defaultValue={user.last_name}
                            onChange={(e)=> setLastName(e.target.value)}
                        />
                    </div>
                </div>
            
                <div className='edit-profile-form-item'>
                    <label>Your Location:</label>
                    <input
                        type="text"
                        className='edit-profile-form-element'
                        placeholder={user.location ? "" : "Your Location"}
                        Value={user.location ? user.location : "" }
                        onChange={(e)=> setLocation(e.target.value)}
                    />
                </div>
                <div className='edit-profile-form-item'>
                    <label>Email:</label>
                    <input
                        type="email"
                        className='edit-profile-form-element'
                        value={email}
                        // defaultValue={user.email}
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
                <div className='edit-profile-form-item'>
                    <label>Profile Image:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="edit-profile-button-section">
                    <button 
                        className={isLoading ? 'disabled' : ''}
                        disabled={isLoading } //error here
                     >
                        {isLoading ? 'Uploading...' : 'Save'}
                    </button>
                    <button 
                        className={isLoading ? 'disabled' : ''} 
                        disabled={isLoading} 
                        onClick={() => {navigate('/dashboard')}}
                    >Cancel</button>
                </div>
            </form>
        </div>
    </div>
)
};

export default EditProfile;
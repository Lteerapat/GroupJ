import "../Styles/Add.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/EditProfile.css';
import Swal from 'sweetalert2';

const EditProfile = () => {
const [user, setUser] = useState([]);
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [profileImage, setProfileImage] = useState(null);
const [previewImage, setPreviewImage] = useState('');
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
    formData.append('profile_image', profileImage);

    const {error} = schema.validate({firstName, lastName, email, password, location});
    if (error) {
        Swal.fire(error.details[0].message.replace(/firstName/g, 'First Name').replace(/lastName/g, 'Last Name'));
        return;
    }

    try {
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
            await Swal.fire({
                title: 'Do you want to save the changes?',
                showCancelButton: true,
                confirmButtonText: 'Save',
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                   await Swal.fire('Profile updated successfully', '', 'success')
                   navigate('/dashboard')
                } else return;
              })
        } else {
            Swal.fire('Your password is incorrect. Please try again.');
        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error updating profile. Please try again.',
        })
    }
};

//handle image size more than limit bug
const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const fileType = file.type;

        if (!allowedTypes.includes(fileType)) {
            Swal.fire('Invalid file type. Please choose a JPEG, JPG, or PNG file.');
            setIsFileSelected(false);
            return;
        }
        
        if (file.size > 250000) {
            Swal.fire('Image size exceeds the limit (250KB). Please choose a smaller file.');
            setIsFileSelected(false); // Set isFileSelected to false
        } else {
            setProfileImage(file);
            setIsFileSelected(true); // Set isFileSelected to true when a valid file is selected
            setPreviewImage(URL.createObjectURL(file)); //preview image
        }
    }
}

const handleDeletePreview = (e) => {
    e.preventDefault();
    setProfileImage(null);
    setIsFileSelected(false);
    setPreviewImage('');
}

const handleCancelButton = async (e) => {
    e.preventDefault();
    await Swal.fire({
        title: 'Do you want to cancel the changes?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
    }).then(async (result) => {
        if (result.isConfirmed) {
           navigate('/dashboard')
        } else if (result.isDenied) {
           return;
        } 
    })
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
                            onChange={(e)=> setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='edit-profile-form-item'>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            className='edit-profile-form-element'
                            value={lastName}
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
                <div className='edit-profile-image-form-item'>
                    <label className="profile-image-label">
                        <input
                            type="file"
                            onChange={handleFileChange}
                        />
                        {isFileSelected ?
                            <div className="edit-profile-preview-image">
                                <img src={previewImage} alt="preview-img"  className="preview-image" />
                                <button className="delete-preview-button" onClick={handleDeletePreview}>
                                    <i className="fa-solid fa-xmark" style={{color: '#ff0000'}}></i>
                                </button>
                            </div>
                            :
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                            </div>
                        }
                        Upload Your Image
                    </label>
                </div>
                
                <div className="edit-profile-button-section">
                    <button 
                        className={isLoading ? 'disabled' : ''}
                        disabled={isLoading }
                     >
                        {isLoading ? 'Uploading...' : 'Save'}
                    </button>
                    <button 
                        className={isLoading ? 'disabled' : ''} 
                        disabled={isLoading} 
                        onClick={handleCancelButton}
                    >Cancel</button>
                </div>
            </form>
        </div>
    </div>
)
};

export default EditProfile;
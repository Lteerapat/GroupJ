import {  useEffect, useState } from "react";
import profilePic from "../Images/Dashboard/profilePic.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Styles/MiniProfile.css';

const MiniProfile = () => {
    const [user, setUser] = useState([]);
    const [ready, setReady] = useState(false);

    const editProfile = () => {
        navigate('/dashboard/edit-profile');
    }

    //Navigation
    const navigate = useNavigate();

    // fetch user data
    useEffect(() => {
        if (user) {
            axios.get('/profile')
                .then(({data}) => {
                    setUser(data);
                    setReady(true)
                })
                .catch(() => {
                    setUser(null);
                });
        }
    }, []);

    
    return (
        <div className="db-mini-profile">
            <div className="db-location">
                <i className="fa-solid fa-location-dot"></i>
                <span>{!ready ? 'Loading...' : user.location}</span>
            </div>

            <div className="db-profile-pic-container">
                <div className="db-profile-pic">
                    <img src={user.profile_image_url || profilePic} alt="profile-pic" />
                </div>
                <h2>Welcome, {!ready ? 'Loading...' : user.first_name}</h2>
                <button onClick={() => editProfile()}>Edit Profile</button>
            </div>
        </div>
    );
};

export default MiniProfile;
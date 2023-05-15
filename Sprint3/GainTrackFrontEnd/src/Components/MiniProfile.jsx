import { useContext } from "react";
import profilePic from "../Images/Dashboard/profilePic.png";
import { UserContext } from "../Contexts/UserContext";

const MiniProfile = () => {
    const {ready, user, setUser} = useContext(UserContext);


    
    return (
        <div className="db-mini-profile">
            <div className="db-location">
            <i className="fa-solid fa-location-dot"></i>
            <span>Somewhere, Space</span>
            </div>

            <div className="db-profile-pic">
                <img src={profilePic} alt="profile-pic" />
                <h2>Welcome, {user.firstName}</h2>
            </div>
        </div>
    );
};

export default MiniProfile;
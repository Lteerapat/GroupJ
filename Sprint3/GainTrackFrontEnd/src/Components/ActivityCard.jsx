import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import {format} from 'date-fns';
import ActivityCardIcon from "./ActivityTypeIcon";

const ActivityCards = () => {

    const [activityCards, setActivityCards] = useState([]);

    // render all activities
    useEffect(() => {
        axios.get('/activities/user-activities').then(({data}) => {
            setActivityCards(data);
        });
    }, []);
    
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this activity?");
        if (confirmDelete) {
            try {
                await axios.delete('/activities/'+id);
                setActivityCards(activityCards.filter(activityCard => activityCard._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="db-card-container">
        {activityCards.length > 0 && activityCards.map((activityCard) => (
            <div className="db-card" key={activityCard._id}>
                <div className="db-activity-bg">
                    <ActivityCardIcon activityCard={activityCard} />
                </div>
                <div className="db-activity-content">
                    <h2>{activityCard.title}</h2>
                    <div className="db-activity-property">
                        <div className="db-activity-property-top">
                            <h4>Date: {format(new Date(activityCard.date), 'yyyy-MM-dd')}</h4>
                            <h4>Duration: {activityCard.duration} mins</h4>
                        </div>
                        <div className="db-activity-property-bottom">
                            <h4>Distance: {activityCard.distance} m</h4>
                            <h4>Note: {activityCard.note}</h4>
                        </div>
                    </div>
                </div>
                <div className="db-activity-edit-del">
                    <div>
                        <a href={"/dashboard/edit/"+activityCard._id}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                    </div>
                    <div>
                        <i
                            className="fa-solid fa-trash"
                            onClick={() => handleDelete(activityCard._id)}
                        ></i>
                    </div>
                </div>
            </div>
        ))}
        </div>
    );
};

export default ActivityCards;

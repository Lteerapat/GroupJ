import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import {format} from 'date-fns';
import ActivityCardIcon from "./ActivityTypeIcon";
import '../Styles/ActivityCards.css';
import Swal from 'sweetalert2';

const ActivityCards = () => {
    const [activityCards, setActivityCards] = useState([]);


    // render all activities
    useEffect(() => {
        axios.get('/activities/user-activities').then(({data}) => {
            setActivityCards(data);
        });
    }, []);
    
    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Do you want to delete this activity ?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await Swal.fire('delete successful', '', 'success')
                return true;
            } else if (result.isDenied) {
               return;
            } 
        });

        if (confirmDelete) {
            try {
                await axios.delete('/activities/'+id);
                setActivityCards(activityCards.filter(activityCard => activityCard._id !== id));
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        }
    };

    return (
        <div className="db-activities-card-container">
        {activityCards.length > 0 && activityCards.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).map((activityCard) => (
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
                            <h4>Note: {activityCard.note.length>10? `${activityCard.note.substring(0, 10)}...`:activityCard.note}</h4>
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

import "../Styles/Add.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import  axios  from 'axios';
import Joi from "joi";

const Add = () => {
    //NameActivity
    const [nameActivity, setNameActivity] = useState('');
    //Type Activity
    const [activity, setActivity] = useState('');
    //Date 
    const [date,setDate] = useState('');
    //Duration
    const [duration,setDuration] = useState('');
    //Distance
    const [distance,setDistance] = useState('');
    //Note
    const [note,setNote] = useState('');
    const [addRedirect, setAddRedirect] = useState(false);


    //validation schema in add
    const schema = Joi.object({
        nameActivity: Joi.string().min(3).max(30).required(),
        duration:Joi.number().integer().required(),
        distance: Joi.number().integer().required(),
    });
    
    const addActivity = async (e) => {
        e.preventDefault();
        const activityData = {nameActivity, activity, date, duration, distance, note};

        const { error } = schema.validate({nameActivity, duration, distance});
        if (error) {
            const errorMessage = error.details[0].message.replace(/nameActivity/g, 'Activity Name');
            alert(errorMessage);
            return;
        }
        
        await axios.post('/activities/add', activityData);
        setAddRedirect(true);
        
    }

    //Navigate
    if (addRedirect) {
        return <Navigate to={'/dashboard'} />
    }


    return (
        <div className="container-add">
        <form className="container-form-add-edit" onSubmit={addActivity}>
            <h1>Add Your Activity</h1>
            <NameActivity nameActivity={nameActivity} setNameActivity={setNameActivity}/>
            <TypeActivity setActivity={setActivity} activity={activity} />
            <DateActivity date={date} setDate={setDate} />
            <DurationNote duration={duration} setDuration={setDuration} distance={distance} setDistance={setDistance} />
            <Note note={note} setNote={setNote} />
            <Button />
        </form>
        </div>
    );
    };

    const NameActivity = (props) => {
    const { nameActivity,setNameActivity } = props;
    return (
        <div className="NameActivity">
        <label>Activity Name: {nameActivity} </label>
        <br />
        <input 
            type="text" 
            value={nameActivity}
            onChange={(event)=> setNameActivity(event.target.value)} 
        />
        </div>
    );
    };

    const TypeActivity = (props) => {
    const { activity, setActivity } = props;
    return (
        <div className="TypeActivity">
        <label>Activity Type: {activity}</label>
        <ul>
            <li
            id={activity === "walking" ? "SeleteActive" : ""}
            onClick={() => setActivity("walking")}
            >
            <i className="fa-solid fa-person-walking"></i>
            </li>
            <li
            id={activity === "running" ? "SeleteActive" : ""}
            onClick={() => setActivity("running")}
            >
            <i className="fa-sharp fa-solid fa-person-running"></i>
            </li>
            <li
            id={activity === "biking" ? "SeleteActive" : ""}
            onClick={() => setActivity("biking")}
            >
            <i className="fa-sharp fa-solid fa-person-biking"></i>
            </li>
            <li
            id={activity === "swimming" ? "SeleteActive" : ""}
            onClick={() => setActivity("swimming")}
            >
            <i className="fa-sharp fa-solid fa-person-swimming"></i>
            </li>
            <li
            id={activity === "hiking" ? "SeleteActive" : ""}
            onClick={() => setActivity("hiking")}
            >
            <i className="fa-sharp fa-solid fa-person-hiking"></i>
            </li>
        </ul>
        </div>
    );
    };

    const DateActivity = (props) => {
    const {date ,setDate} = props
    return (
        <div className="DateAcitvity">
        <label>Date:  {date}</label>
        <br />
        <input 
            type="date" 
            value={date}
            onChange={(event)=> setDate(event.target.value)} 
        />
        </div>
    );
    };

    const DurationNote = (props) => {
    const { duration,setDuration,distance,setDistance} = props


    return (
        <div className="DurationDistance">
        <div>
            <label>Duration: {duration}</label>
            <br />
            <input 
                type="number" 
                value={duration}
                onChange={(event)=> setDuration(event.target.value)}
            />
            <span>min</span>
            </div>
        <div>
            <label>Distance: {distance}</label>
            <br />
            <input 
                type="number" 
                value={distance}
                onChange={(event)=> setDistance(event.target.value)}
            />      
            <span>meter</span> 
            </div>
        </div>
    );
    };

    const Note = (props) => {
    const { note,setNote} = props

    return (
        <div className="Note">
        <div>
            <label for="note-area">Note:</label>
            <br />
            <textarea name="note-area" rows="4" cols="39" 
                value={note}
                onChange={(event)=> setNote(event.target.value)} 
            />        
        </div>
        </div>
    );
    };

    const Button = () => {
        const [cancelRedirect, setCancelRedirect] = useState(false);
        if (cancelRedirect) {
            return <Navigate to={'/dashboard'} />
        }
    return (
        <div className="Buttom-Add-Edit">
        <button>Add</button>
        <button onClick={()=>{setCancelRedirect(true)}}>Cancel</button>
        </div>
    );
};

export default Add;
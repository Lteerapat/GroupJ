import "../Styles/Add.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import Joi from "joi";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const Edit = () => {
    const {id} =useParams();
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
    const [saveRedirect, setSaveRedirect] = useState(false);

   
    

    //custom the joi validation to limit input number at 5 digits
    const customValidation = (value, helpers) => {
        if (value.toString().length <= 5) {
            return value;
        } else {
            return helpers.error('any.custom', { custom: 'must be less than or equal to 5 digits' });
        }
    };

    
    //validation schema in edit
    const schema = Joi.object({
    nameActivity: Joi.string().min(3).max(20).required(),
    activity: Joi.string().min(3).max(30).required(),
    date: Joi.date().required(),
    duration: Joi.number().integer().custom(customValidation).required()
        .messages({
        'any.custom': '{{#label}} {{#custom}}'
        }),
    distance: Joi.number().integer().custom(customValidation).required()
        .messages({
        'any.custom': '{{#label}} {{#custom}}'
        })
    });

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/activities/edit/'+id).then(res => {
            const {data} = res;
            setNameActivity(data.title);
            setActivity(data.activity_type);
            setDate(data.date.replace(/T00:00:00.000Z/g, ''));
            setDuration(data.duration);
            setDistance(data.distance);
            setNote(data.note);
        });
    }, [id]);
    
    const saveEditedActivity = async (e) => {
        e.preventDefault();
        const activityData = {nameActivity, activity, date, duration, distance, note};

        const { error } = schema.validate({nameActivity,activity,date, duration, distance});
        if (error) {
            const errorMessage = error.details[0].message
                .replace(/nameActivity/g, 'Activity Name')
                .replace(/activity/g, 'Activity Type')
            Swal.fire(errorMessage);
            return;
        }

        if (id) {
            await axios.put('/activities/edit', {id, ...activityData});
            await Swal.fire({
                title: 'Do you want to save the changes?',
                showCancelButton: true,
                confirmButtonText: 'Save',
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                   await Swal.fire('saved', '', 'success')
                   setSaveRedirect(true);
                } else return;
              })
            
        } 
    };

    const handleCancelButton = async (e) => {
        e.preventDefault();
        await Swal.fire({
            title: 'Do you want to cancel the changes?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                setSaveRedirect(true);
            } else if (result.isDenied) {
               return;
            } 
        })
    }

    //Navigate
    if (saveRedirect) {
        return <Navigate to={'/dashboard'} />
    }

  return (
    <div className="container-add">
      <form className="container-form-add-edit" onSubmit={saveEditedActivity}>
        <h1>Edit Your Activity</h1>
        <NameActivity nameActivity={nameActivity} setNameActivity={setNameActivity}/>
        <TypeActivity setActivity={setActivity} activity={activity} />
        <DateActivity date={date} setDate={setDate} />
        <DurationNote duration={duration} setDuration={setDuration} distance={distance} setDistance={setDistance} />
        <Note note={note} setNote={setNote} />
        <Button handleCancelButton={handleCancelButton} />
      </form>
    </div>
  );
};

const NameActivity = (props) => {
  const { nameActivity,setNameActivity } = props;
  return (
    <div className="NameActivity">
      <label>Activity Name: {nameActivity}</label>
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
    const {date, setDate} = props
    return (
        <div className="DateAcitvity"> 
        <label>Date: {date}</label>
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

const Button = ({handleCancelButton}) => {
    const [cancelRedirect, setCancelRedirect] = useState(false);
    if (cancelRedirect) {
        return <Navigate to={'/dashboard'} />
    }
    return (
        <div className="Buttom-Add-Edit">
        <button>Save</button>
        <button onClick={handleCancelButton}>Cancel</button>
        </div>
    );
};

export default Edit;
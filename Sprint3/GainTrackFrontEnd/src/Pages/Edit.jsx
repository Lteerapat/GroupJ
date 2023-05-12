import "../Styles/Add.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  //Navigate
  const navigate = useNavigate();
  const submitButton = () => {
    navigate("/dashboard");
  };

  //NameActivity
  const [nameActivity, setNameActivity] = useState();

  //Type Acrivity
  const [activity, setActivity] = useState();
  const handleActivity = (active) => {
    setActivity(active);
  };

  //Date 
  const [date,setDate] = useState()

  //Duration
  const [duration,setDuration] = useState()

  //Distance
  const [distance,setDistance] = useState()

  //Note
  const [note,setNote] = useState()



  return (
    <div className="container-add">
      <div className="container-form-add-edit">
        <h1>Edit Your Activity</h1>
        <NameActivity nameActivity={nameActivity} setNameActivity={setNameActivity}/>
        <TypeActivity handleActivity={handleActivity} activity={activity} />
        <DateAcitvity date={date} setDate={setDate} />
        <DurationNote duration={duration} setDuration={setDuration} distance={distance} setDistance={setDistance} />
        <Note note={note} setNote={setNote} />
        <Buttom submitButton={submitButton} />
      </div>
    </div>
  );
};

const NameActivity = (props) => {
  const { nameActivity,setNameActivity } = props;
  return (
    <div className="NameActivity">
      <label>Activity Name  {nameActivity} </label>
      <br />
      <input onChange={(event)=> setNameActivity(event.target.value)} type="text" ></input>
    </div>
  );
};

const TypeActivity = (props) => {
  const { handleActivity, activity } = props;
  return (
    <div className="TypeActivity">
      <label>Activity Type  {activity}</label>
      <ul>
        <li
          id={activity === "walking" ? "SeleteActive" : ""}
          onClick={() => handleActivity("walking")}
        >
          <i className="fa-solid fa-person-walking"></i>
        </li>
        <li
          id={activity === "running" ? "SeleteActive" : ""}
          onClick={() => handleActivity("running")}
        >
          <i className="fa-sharp fa-solid fa-person-running"></i>
        </li>
        <li
          id={activity === "biking" ? "SeleteActive" : ""}
          onClick={() => handleActivity("biking")}
        >
          <i className="fa-sharp fa-solid fa-person-biking"></i>
        </li>
        <li
          id={activity === "swimming" ? "SeleteActive" : ""}
          onClick={() => handleActivity("swimming")}
        >
          <i className="fa-sharp fa-solid fa-person-swimming"></i>
        </li>
        <li
          id={activity === "hiking" ? "SeleteActive" : ""}
          onClick={() => handleActivity("hiking")}
        >
          <i className="fa-sharp fa-solid fa-person-hiking"></i>
        </li>
        <li
          id={activity === "plus" ? "SeleteActive" : ""}
          onClick={() => handleActivity("plus")}
        >
          <i className="fa-sharp fa-solid fa-plus"></i>
        </li>
      </ul>
    </div>
  );
};

const DateAcitvity = (props) => {
  const {date ,setDate} = props
  return (
    <div className="DateAcitvity">
      <label>Date  {date}</label>
      <br />
      <input type="date" onChange={(event)=> setDate(event.target.value)} placeholder="Date / Month / Year"></input>
    </div>
  );
};

const DurationNote = (props) => {
  const { duration,setDuration,distance,setDistance} = props


  return (
    <div className="DurationDistance">
      <div>
        <label>Duration {duration}</label>
        <br />
        <input type="number" onChange={(event)=> setDuration(event.target.value)}/><span>min</span>
      </div>
      <div>
        <label>Distance {distance}</label>
        <br />
        <input type="number" onChange={(event)=> setDistance(event.target.value)}/><span>meter</span>
      </div>
    </div>
  );
};

const Note = (props) => {
  const { note,setNote} = props

  return (
    <div className="Note">
      <div>
        <label for="note-area">Note</label>
        <br />
        <textarea name="note-area" rows="4" cols="39" onChange={(event)=> setNote(event.target.value)}></textarea>
      </div>
    </div>
  );
};

const Buttom = (props) => {
  const { submitButton } = props;
  return (
    <div className="Buttom-Add-Edit">
      <button onClick={submitButton}>Save</button>
      <button onClick={submitButton}>Cancel</button>
    </div>
  );
};

export default Edit;
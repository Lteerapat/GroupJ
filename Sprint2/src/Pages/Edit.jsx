import "../Styles/Add.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const submitButton = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container-add">
      <div className="container">
        <h1>Edit Your Activity</h1>
        <NameActivity />
        <TypeActivity />
        <DateAcitvity />
        <DurationNote />
        <Buttom submitButton={submitButton} />
      </div>
    </div>
  );
};

const NameActivity = () => {
  return (
    <div className="NameActivity">
      <label>Activity Name </label>
      <br />
      <input type="text"></input>
    </div>
  );
};

const TypeActivity = () => {
  return (
    <div className="TypeActivity">
      <label>Activity Type :</label>
      <ul>
        <li>
          <i className="fa-solid fa-person-walking"></i>
        </li>
        <li>
          <i className="fa-sharp fa-solid fa-person-running"></i>
        </li>
        <li>
          <i className="fa-sharp fa-solid fa-person-biking"></i>
        </li>
        <li>
          <i className="fa-sharp fa-solid fa-person-swimming"></i>
        </li>
        <li>
          <i className="fa-sharp fa-solid fa-person-hiking"></i>
        </li>
        <li>
          <i className="fa-sharp fa-solid fa-plus"></i>
        </li>
      </ul>
    </div>
  );
};

const DateAcitvity = () => {
  return (
    <div className="DateAcitvity">
      <label>Date</label>
      <br />
      <input type="date" placeholder="Date / Month / Year"></input>
    </div>
  );
};

const DurationNote = () => {
  return (
    <div className="DurationNote">
      <div>
        <label>Duration</label>
        <br />
        <input type="text"></input>
      </div>
      <div>
        <label>Note</label>
        <br />
        <input type="text"></input>
      </div>
    </div>
  );
};

const Buttom = (props) => {
    const {submitButton} = props
  return (
    <div className="Buttom">
      <button onClick={submitButton}>Save</button>
      <button onClick={submitButton}>Cancel</button>
    </div>
  );
};

export default Edit;
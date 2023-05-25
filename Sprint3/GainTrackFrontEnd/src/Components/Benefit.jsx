import React from 'react';
import easyIcon from '../Images/Landing/easy.png';
import enjoymentIcon from '../Images/Landing/Enjoyment.svg';
import empoweringIcon from '../Images/Landing/Empowering.svg';
import  '../Styles/Caption.css';

function Pros() {
  return (
    <section className="pros">
      <div className="pros-1">
        <div><img src={easyIcon} alt="Easy Icon" /></div>
        <div>
          <h1>Easy</h1>
          <p>Easy to use, just collect data with your fingertips.</p>
        </div>
      </div>
      <div className="pros-2">
        <div><img src={enjoymentIcon} alt="Enjoyment Icon" /></div>
        <div>
          <h1>Enjoyment</h1>
          <p>Keep track while playing with our fun features.</p>
        </div>
      </div>
      <div className="pros-3">
        <div><img src={empoweringIcon} alt="Empowering Icon" /></div>
        <div>
          <h1>Empowering</h1>
          <p>If you're about to give up, our tips will keep you from abandoning your goal.</p>
        </div>
      </div>
    </section>
  );
}

export default Pros;
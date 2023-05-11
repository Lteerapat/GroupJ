import '../Styles/Sponsor.css';
import React from 'react';
import aom1 from '../Images/Sponsor/aom1.svg'
import bua from '../Images/Sponsor/bua.svg'
import cp from '../Images/Sponsor/cp.svg'
import kbank from '../Images/Sponsor/kbank.svg'
import mbk1 from '../Images/Sponsor/mbk1.svg'
import ptt from '../Images/Sponsor/ptt.svg'
import scb from '../Images/Sponsor/scb.svg'
import scg1 from '../Images/Sponsor/scg1.svg'
import true_logo from '../Images/Sponsor/true.svg'


function Sponsor_section() {
    return (
      <div className="logos_sponsor" id="sponsor">
        <div className="logos-slide">
          <img src={aom1} alt="aom" />
          <img src={bua} alt="bua" />
          <img src={cp} alt="cp" />
          <img src={kbank} alt="kbank" />
          <img src={mbk1} alt="mbk1" />
          <img src={ptt} alt="ptt" />
          <img src={scb} alt="scb" />
          <img src={scg1} alt="scg1" />
          <img src={true_logo} alt="true_logo" />
        </div>
  
        <div className="logos-slide">
          <img src={aom1} alt="aom" />
          <img src={bua} alt="bua" />
          <img src={cp} alt="cp" />
          <img src={kbank} alt="kbank" />
          <img src={mbk1} alt="mbk1" />
          <img src={ptt} alt="ptt" />
          <img src={scb} alt="scb" />
          <img src={scg1} alt="scg1" />
          <img src={true_logo} alt="true_logo" />
        </div>
      </div>
    );
  }
  
  export default Sponsor_section;
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import bgimg from './assets/bg-img.png'
import logo from './assets/gaintrack-logo.png'
import './Signup_Page.css'


function Singup_Page() {

  return (
    <div className="login-card">
      <div className="column">
        <a href="#"><img src={logo} alt="gaintrack-logo" /></a>
        <h2>Welcome to Our Website</h2>
      </div>
      <div className="column">
        <h1>Create an account</h1>
        <form>
          <div className="form-item">
            <input type="text" className="form-element" placeholder="Firstname" />
          </div>
          <div className="form-item">
            <input type="text" className="form-element" placeholder="Lastname" />
          </div>
          <div className="form-item">
            <input type="text" className="form-element" placeholder="Email" />
          </div>
          <div className="form-item">
            <input type="password" className="form-element" placeholder="Password" />
          </div>
          <div className="flex">
            <button type="button">Create Account</button>
            <p>Already have an account? <a href="#">Log In</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Singup_Page

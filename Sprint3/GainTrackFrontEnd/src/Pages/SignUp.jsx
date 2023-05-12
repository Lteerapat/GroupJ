import '../Styles/SignUp.css'
import light_logo from '../Images/Logo/gaintrack-logo-dark.png';
import { useNavigate } from "react-router-dom";
import Joi from 'joi';


const SignUp = () => {  
  
  // navigation
  let a = false
  const navigate = useNavigate();
  const navigationToLogin = () => {
    navigate("/login")
  }

  // validation scheme
  const schema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });

  // function validation
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    const { error } = schema.validate(data);
    if (error) {
      console.log(error.details[0].message);
      alert(error.details[0].message);
      return;
    }else{
      alert("Create a new account successfully");
      
      navigationToLogin()
    }
    
    // Form data is valid, do something with it here
  };

        return (
          <div className="container_signup">
          <div className="login-card_singup">
            <div className="column">
              <a href="/"><img src={light_logo} alt="gaintrack-logo" /></a>
              <h2>Welcome to Our Website</h2>
            </div>
            <div className="column">
              <h1>Create an account</h1>
              <form onSubmit={handleSubmit}>
              <div className="form-item">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-element"
                id="firstname"
                name="firstname"
                placeholder="Firstname"
              />
              </div>
              <div className="form-item">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-element"
                id="lastname"
                name="lastname"
                placeholder="Lastname"
              />
            </div>
            <div className="form-item">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-element"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-item">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-element"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>
                <div className="flex">
                  <button type="submit">Create Account</button>
                  {/* <input type="submit" value="Create Account" /> */}
                  <p>Already have an account? <a href="/login">Log In</a></p>
                </div>
              </form>
            </div>
          </div>
          </div>
        );
      
};

export default SignUp;
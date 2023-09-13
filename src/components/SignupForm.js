// SignupForm.js
import React, { useState } from 'react';
import '../components/App.css';
import { useNavigate } from 'react-router-dom';


function SignupForm() {
    const navigate = useNavigate();
const [formData, setFormData] = useState({
  username: '',
  email: '',
  role: 'employee',
  password: '',
  contactNumber: '',
});
const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
      ...formData,
      [name]: value,
  });
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage(''); // Clear any previous success messages
    setErrorMessage('');
    // Process form submission logic here
    // Redirect to the login page
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.contactNumber
    ) {
      setErrorMessage('All fields are required');
      return;
    }
    try{
      const response = await fetch('http://20.55.109.32:8080/create_user',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
        const data = await response.json();
        const { token } = data;
        localStorage.setItem('token',token);
        navigate('/login');
        setSuccessMessage('Registration successful');
      }else{
        const errorData = await response.json();
        console.error('Error signing up:', errorData.message);
        setErrorMessage('Registration failed'); 

      }
    }catch (error){
      console.error('Error signing up:',error);
      setErrorMessage('Registration failed');
    }
  };
  return (
    <div className="signup-form">
        <div className='text-container'>
        <div className='left-text'>
        <p className="h3-heading">Welcome to Metaorange Digital</p>
        </div>
<div className='right-text'>
        <p className='p'>Have an Account? </p>
        <p className='p span'><a className="loginsignuplink"href="#"onClick={() => navigate('/login')}>Log In</a></p>
        </div>
      </div>
      {/* Your signup form content goes here */}
      <h1 className='heading'>Sign up</h1>

      <form className="">
        <div className="form-group">
          <label htmlFor="usernameEmail">Enter your username or email</label>
          <input
            type="text"
            id="usernameEmail"
            name="email"
            placeholder="Username or Email"
            value={formData.email}
            onChange={handleChange}
          />
          
        </div>


        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              placeholder="Enter your contact number"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="usernameEmail">Enter your password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          
        </div>

        <div className="submit-button">
    <button type="submit" onClick={handleSubmit}>Sign Up</button>
  </div>
  {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
        {/* Add other form fields and buttons here */}
      </form>
    </div>
    
  );
}

export default SignupForm;
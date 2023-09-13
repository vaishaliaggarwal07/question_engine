// SignupForm.js
import React , { useState } from 'react';
import '../components/App.css';


import { useNavigate } from 'react-router-dom';


function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields.');
      return false;
    }
    return true;
  };
    const handleSubmit = async (event) => {
      event.preventDefault();
      setErrorMessage('');
      setSuccessMessage('');

    if (!validateForm()) {
      return;
    }
      try{
        const response = await fetch('http://20.55.109.32:8080/login_user',{
          method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        });
        if(response.ok){
          const data = await response.json();
          const {token} = data;
          localStorage.setItem('token',token);
          navigate('/dashboard/campaigns');
        }else{
          const errorData = await response.json();
          console.log('login failed:', errorData.message);
          setErrorMessage('Invalid credentials. Please try again');
        }
      }catch (error) {
        console.log('Error loggin in:',error);
        setErrorMessage('An error occurred while loggin in. please try again');
      }
      // Process form submission logic here
      // Redirect to the login page
     
    };
  return (
    <div className="signup-form">
        <div className='text-container'>
        <div className='left-text'>
        <p className="h3-heading">Welcome to Metaorange Digital</p>
        </div>
<div className='right-text'>
        <p className='p'>No Account? </p>
        <p className='p span'><a className="loginsignuplink"href="#">Sign up</a></p>
        </div>
      </div>
      {/* Your signup form content goes here */}
      <h1 className='heading'>Log In</h1>

      <form className="">
        <div className="form-group">
          <label htmlFor="email">Enter your email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          
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
<p className='forgot'><a className="forgotpasslink"href="#"onClick={() => navigate('/forgetpasswordpage')}>Forgot password?</a></p>
        <div className="submit-button">
    <button type="submit" onClick={handleSubmit}>Log In</button>
  </div>
  {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        {/* Add other form fields and buttons here */}
      </form>
    </div>
    
  );
}

export default LoginForm;
// SignupPage.js
import React from 'react';
import SignupForm from '../components/SignupForm';
import '../components/App.css';
import byeImage from '../images/bye.png';
import { Link } from "react-router-dom";
function SignupPage() {
  return (
    <div className="signup-page">
      <div className="gradient-section">
        {/* Add your image here */}
        <img src={byeImage} alt="hello" className='centered-image'/>
      </div>
      <div className="form-section">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
// SignupPage.js
import React from 'react';
import '../components/App.css';
import forgetImage from '../images/forget.png';
import Forgetpassform from './Forgetpassform';
function ForgetpassPage() {
  return (
    <div className="signup-page">
      <div className="gradient-section">
        {/* Add your image here */}
        <img src={forgetImage} alt="forgetPass" className='centered-image'/>
      </div>
      <div className="form-section">
        <Forgetpassform />
      </div>
    </div>
  );
}

export default ForgetpassPage;
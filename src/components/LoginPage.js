import React from 'react';
import LoginForm from '../components/LoginForm';
import '../components/App.css';
import profileImage from '../images/profle_pic.png';
function LoginPage() {
  return (
    <div className="signup-page">
      <div className="gradient-section">
        {/* Add your image here */}
        <img src={profileImage} alt="hello" className='centered-image'/>
      </div>
      <div className="form-section">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
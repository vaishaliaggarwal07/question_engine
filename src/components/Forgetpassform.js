import React,{useState} from 'react'
import axios from 'axios'; 
import '../components/App.css';

import { useNavigate } from 'react-router-dom';

function Forgetpassform() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
       const handleStepChange = (newStep) => {
    setStep(newStep);
  };
    
      const handleOtpChange = (e) => {
        setOtp(e.target.value);
      };
    
      const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
        if(step === 1){
          // Send a request to your backend to request a password reset
          await axios.post('http://20.55.109.32:8080/requestPasswordReset', { email });
          setSuccessMessage('Password reset OTP sent successfully');
          handleStepChange(2);
         } else if(step===2){
            console.log('OTP verification successful');
            const response = await axios.post('http://20.55.109.32:8080/verifyOtp', { email, otp });
        if (response.data.message === 'OTP verification successful') {
          handleStepChange(3);
        } else {
          setErrorMessage('Invalid OTP. Please try again.');
        }
    }else if(step===3){
        await axios.post('http://20.55.109.32:8080/resetPassword', { email, token: otp, newPassword });
        setSuccessMessage('Password reset successful');
        handleStepChange(4);
    }

        } catch (error) {
            console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
          // Handle errors, e.g., display an error message
        }
      };
  return (
    
    <div className="signup-form">
        {step === 1 && (
            <>
            <h1 className='heading forget-heading'>Forgot Password?</h1>
<p className='forget-para'>Recover your password if you have forgot the password!</p>
{successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className=""onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            
          />
          
        </div>
        <div className="submit-button forgot-button">
    <button type="submit" >Submit</button>
  </div>
 
       
      </form>
            </>
        )}
      {step === 2 && (
        <>
        <h1 className='heading forget-heading'>Forgot Password?</h1>
<p className='forget-para'>We have sent an email to your email account with a verification code!</p>
{successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className=""onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="otp">Email</label>
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="verification OTP"
            value={otp}
            onChange={handleOtpChange}
            
          />
          
        </div>
        <div className="submit-button forgot-button">
    <button type="submit" >Submit</button>
  </div>
 
       
      </form>
        </>
      )}

      {step === 3 && (
        <>
        <h1 className="heading forget-heading">Set New Password</h1>
          <p className="forget-para">Please enter your new password.</p>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>

            <div className="submit-button forgot-button">
              <button type="submit">Submit</button>
            </div>
          </form>
        </>
      )}

      {step === 4 &&(
        <>
        <h1 className="heading forget-heading">Password Reset Successful</h1>
          <p className="forget-para">Your password has been successfully reset.</p>
          <form>
          <div className="submit-button forgot-button">
            <button type="submit"onClick={() => navigate('/login')}>Back to Login</button>
          </div>
          </form>

        </>
      )}
    </div>
  );
}

export default Forgetpassform
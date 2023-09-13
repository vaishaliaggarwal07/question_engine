import React ,{useEffect,useState}from 'react'
import file from '../../images/file.png'
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Import react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS
function Createcampaign() {
    const navigate = useNavigate();
    const handleCancelClick = () => {
        // Navigate back to the 'client.js' page
        navigate('/dashboard/campaigns');
      };
  const [formData, setFormData] = useState({
    Campaign_Name: '',
    Start_date: '',
    Campaign_Description: '',
    set_status:null,
    Created_by: 'vaishali', // You may need to handle this field as well
  });
  const statusOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://20.55.109.32:8080/createCampaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });
console.log(formData);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the response from the server
        // Reset the form or show a success message as needed
        navigate('/dashboard/campaigns')
      } else {
        console.error('Failed to create client');
        // Handle error case here
      }
    } catch (error) {
      console.error('An error occurred', error);
      // Handle network or other errors
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (selectedOption) => {
    // Update the Set_status field based on the selected option
    setFormData({ ...formData, set_status: selectedOption?.value  });
  };
  return (
    <div className="campaign-content">
<div className='create-client-container'> 
<div className='bread-crumbs bread-crumbs-create'> 
<p>Home &nbsp;&lt;&nbsp; Campaign &nbsp;&lt; &nbsp;Create Campaign</p>

  </div>
    <h3 className='create-questionnaire-heading'>
        <u className='stroke-create'>Campaigns</u>
    </h3>
    <div className='create-new-client-text-image '>
<img src={file} />
<h3 className='create-questionnaire-heading'>Create New Campaign</h3>
    </div>
<div className='form-div'>
    <form className="create-client-form" onSubmit={handleSubmit}>

        <div className="form-row">
          <div className="form-group half-width ">
            <label htmlFor="Campaign_Name" className='create-client-form-headings'>Campaign Name*</label>
            <input
            className='create-client-input'
              type="text"
              id="Campaign_Name"
              name="Campaign_Name"
              placeholder="Name"
              value={formData.Campaign_Name}
              onChange={handleInputChange}
              required

            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="Start_date" className='create-client-form-headings'>Start Date*</label>
            <DatePicker
      className="create-client-input"
      selected={formData.Start_date} // Pass the selected date
      onChange={(date) => setFormData({ ...formData, Start_date: date })} // Handle date selection
      dateFormat="dd-MM-yyyy" // Specify date format
      placeholderText="Select Date"
      required
    />
           
          </div>
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="Campaign_Description" className='create-client-form-headings'>Campaign Description*</label>
            <textarea
             className='description-input'
              type="text"
              id="Campaign_Description"
              name="Campaign_Description"
              placeholder="Description"
              value={formData.Campaign_Description}
                  onChange={handleInputChange}
                  required
                  rows="4"
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="set_status" className='create-client-form-headings'>Set Status*</label>
            <Select 
            className='custom-select'
            options={statusOptions}
            value={statusOptions.find((option) => option.value === formData.set_status)}
            onChange={handleStatusChange}
            placeholder = "Select status"
            isSearchable = {false}
            required
            
            />
           
          </div>
        </div>

        

        <div className="create-campaign-button">

        <button className="cancel-button"type="submit" onClick={handleCancelClick} >Cancel</button>
    <button className='create-button' type="submit" >Create</button>
  </div>
  
      </form>
      </div>
    </div>
    </div>
    
  )
}

export default Createcampaign
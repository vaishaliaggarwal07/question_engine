import React ,{useEffect,useState}from 'react'
import file from '../../images/file.png'
import Select from 'react-select';
import axios from 'axios';
import { useNavigate,  useParams } from 'react-router-dom';
function Editclient() {
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id);
    const handleCancelClick = () => {
        // Navigate back to the 'client.js' page
        navigate('/dashboard/clients');
      };
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    contact_number: '',
    client_description: '',
    client_location: '', // Initialize with null or a default country value
    Created_by: '', // You may need to handle this field as well
  });

  useEffect(() => {
    // Fetch campaign details using the campaign ID
    fetch(`http://20.55.109.32:8080/getClientById/${id}`) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.Campaign_Description);
        setFormData({
          client_name: data.client_name,
          client_email: data.client_email,
          contact_number: data.contact_number,
          client_description: data.client_description,
          client_location: data.client_location, // Initialize with null or a default country value
          Created_by: data.Created_by, // You may need to handle this field as well
        }); // Update the form data with the fetched campaign data
      })
      .catch((error) => {
        console.error('Error fetching campaign details:', error);
      });
  }, [id]);
  const [countryOptions, setCountryOptions] = useState([]);
  useEffect(() => {
    // Fetch the list of countries from the REST Countries API
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        // Map the API response to the format expected by react-select
        const mappedCountries = response.data.map((country) => ({
          label: country.name.common,
          value: country.name.common,
        }));
        setCountryOptions(mappedCountries);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://20.55.109.32:8080/update_existing_client/${id}`, {
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
        navigate('/dashboard/clients')
      } else {
        console.error('Failed to update campaign');
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

  const handleCountryChange = (selectedOption) => {
    // Check if selectedOption is truthy
    if (selectedOption) {
      // Access the value property of selectedOption (which is a string)
      const selectedValue = selectedOption.value;
  
      // Update the formData state with the selectedValue as a string
      setFormData({ ...formData, client_location: selectedValue });
    } else {
      // If selectedOption is falsy (e.g., when clearing the selection), set client_location to null or an appropriate default value
      setFormData({ ...formData, client_location: null });
    }
  };

  return (
    <div className="campaign-content">
<div className='create-client-container'> 
<div className='bread-crumbs bread-crumbs-create'> 
<p>Home &nbsp;&lt;&nbsp; Client &nbsp;&lt; &nbsp;Edit Client</p>

  </div>
    <h3 className='create-client-heading edit-client'>
        <u className='stroke-create'>Edit Client</u>
    </h3>
    <div className='create-new-client-text-image'>
<img src={file} />
<h3 className='create-client-heading '>Edit Client Details</h3>
    </div>
<div className='form-div'>
    <form className="create-client-form" onSubmit={handleSubmit}>

        <div className="form-row">
          <div className="form-group half-width ">
            <label htmlFor="client_name" className='create-client-form-headings'>Client Name*</label>
            <input
            className='create-client-input'
              type="text"
              id="client_name"
              name="client_name"
              placeholder="Enter Name"
              value={formData.client_name}
              onChange={handleInputChange}
              required

            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="client_locationr" className='create-client-form-headings'>Client Location*</label>
            <Select 
            className='custom-select'
            options={countryOptions}
            value={countryOptions.find(option => option.value === formData.client_location)}
            onChange={handleCountryChange}
            placeholder = "select a country"
            isSearchable = {true}
            required
            />
            {/* <input
             className='create-client-input'
              type="text"
              id="client_locationr"
              name="client_locationr"
              placeholder=""
              value={formData.client_location}
                  onChange={handleInputChange}
                  required
              
            /> */}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="client_email" className='create-client-form-headings'>Primary Email ID*</label>
            <input
             className='create-client-input'
              type="text"
              id="client_email"
              name="client_email"
              placeholder="Enter Email"
              value={formData.client_email}
                  onChange={handleInputChange}
                  required
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="contact_number" className='create-client-form-headings'>Primary Contact Number*</label>
            <input
             className='create-client-input'
              type="text"
              id="contact_number"
              name="contact_number"
              placeholder="Enter Contact"
              value={formData.contact_number}
                  onChange={handleInputChange}
                  required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="client_description"className='create-client-form-headings'>Client's Description</label>
          <input
           className='create-client-input'
            type="text"
            id="client_description"
            name="client_description"
            placeholder="Description"
            value={formData.client_description}
                onChange={handleInputChange}
                required
          />
          
        </div>

        <div className="create-client-button">

        <button className="cancel-button"type="submit" onClick={handleCancelClick} >Cancel</button>
    <button className='create-button' type="submit" >Create</button>
  </div>
  
      </form>
      </div>
    </div>
    </div>
    
  )
}

export default Editclient
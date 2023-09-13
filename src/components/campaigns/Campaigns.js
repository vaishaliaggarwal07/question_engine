import React, { useState, useEffect } from 'react';
import create from '../../images/createnew.png';
import { useNavigate } from 'react-router-dom';
import users from '../../images/users.png';
import action from '../../images/action.png';
import add from '../../images/add.png';
import edit from '../../images/edit.png';
import deleteimg from '../../images/delete.png';
import view from '../../images/view.png';
import question from '../../images/question.png'
import copy from '../../images/copy.png'
import stroke from '../../images/stroke.png'
import Campaign from '../../images/campaigns.png';



const Campaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [showActionMenus, setShowActionMenus] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmationMessage, setDeleteConfirmationMessage] = useState('');
  useEffect(() => {
    // Fetch campaigns when the component mounts
    fetch('http://20.55.109.32:8080/getCampaigns') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setCampaigns(data);
        setShowActionMenus(new Array(data.length).fill(false)); // Update the state with the fetched clients

      })
      .catch((error) => {
        console.error('Error fetching campaigns:', error);
      });
  }, []);
  
  const handleEditClick = (campaign) => {
    setSelectedCampaign(campaign);
    // Navigate to the Editclient component and pass the client's details as props
    navigate(`/dashboard/editcampaign/${campaign.id}`);
  };
 
  const toggleActionMenu = (index) => {
    // Function to toggle the action menu visibility for a specific client
    const updatedMenus = [...showActionMenus];
    updatedMenus[index] = !updatedMenus[index];
    setShowActionMenus(updatedMenus);
  };

  const handleDeleteClick = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    // Send a DELETE request to delete the selected campaign
    try {
      const response = await fetch(`http://20.55.109.32:8080/deleteCampaign/${selectedCampaign.id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Campaign was successfully deleted
        // You may want to refresh the campaign list or update state accordingly
        // For example, you can refetch campaigns here
        setDeleteConfirmationMessage('Campaign deleted successfully.');
        fetchCampaigns();
        // setShowDeleteConfirmation(false);
        // setSelectedCampaign(null);
      } else {
        // Handle error scenarios here
        console.error('Error deleting campaign:', response.statusText);
        setDeleteConfirmationMessage('Error deleting campaign.');
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
      setDeleteConfirmationMessage('Error deleting campaign.');
    }
    setShowDeleteConfirmation(false);
  };

  const fetchCampaigns = () => {
    // Fetch campaigns again to update the list
    fetch('http://20.55.109.32:8080/getCampaigns') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setCampaigns(data);
      })
      .catch((error) => {
        console.error('Error fetching campaigns:', error);
      });
  };


  return (
   
    <div className='campaign-content'>
  
     <div className='campaign-container'>
     <div className='bread-crumbs'> 
<p>Home &nbsp;&lt;&nbsp; Campaigns</p>

  </div>
      <h3 className='campaign-text'><u className='stroke'>Campaigns </u></h3>
      {/* <img className="stroke-img"src={stroke} /> */}
      
     </div>
     {campaigns.length > 0 ? (
      <div>
        <button className='create-campaign-button-2'onClick={() => navigate('/dashboard/createcampaign')}>
          <img src={add} />
          New Campaign</button>
        <div className='client-display-big-container'>
        <div className='client-display-container'>
        <div className='client-details-heading'>
        <div className='client-details-item-heading fixed-width client-name-heading'>
          <img classname="client-name-image"src={users} />
          Campaign Name</div>
            <div className='client-details-item-heading fixed-width'>&nbsp;Action</div>
            <div className='client-details-item-heading fixed-width'>Campaign Description</div>
            <div className='client-details-item-heading fixed-width'>Created By&nbsp;&nbsp;</div>

        </div>
        <ul className='client-list'>
          {campaigns.map((campaign,index) => (
            <li key={campaign.id}>
              <button className='client-button'>
                  <div className='client-details-item-name fixed-width'>{campaign.Campaign_Name}</div>
                  <div className='client-details-item fixed-width'><img src={action} onClick={() => toggleActionMenu(index)}/></div>
                  <div className='client-details-item fixed-width'>{campaign.Campaign_Description}</div>
                  <div className='client-details-item fixed-width'>{campaign.Created_by}</div>

                  
                  {
                    showActionMenus[index] && (
                      <div className='action-menu campaign-action-menu'>
                        <button className="action-menu-button"onClick={() => handleEditClick(campaign)}>Edit
                        <img src={edit} />
                        </button>
                        <button className="action-menu-button"onClick={() => handleDeleteClick(campaign)}>Delete
                        <img src={deleteimg} />
                        </button>
                        <button className="action-menu-button">Questionnaire
                        <img src={question} />
                        </button>
                        <button className="action-menu-button">View
                        <img src={view} />
                        </button>
                        <button className="action-menu-button">Copy
                        <img src={copy} />
                        </button>
                      </div>
                    )
                  }
                  
                </button>
            </li>
          ))}
        </ul>
      </div>
      </div>
      </div>
       
     ) : (
      <><div className='image-container'>
            <img src={create} className='campaign-image' />
          </div><button className='campaign-button' onClick={() => navigate('/dashboard/createcampaign')}>Create New Campaign</button></>
     )
     }

{showDeleteConfirmation && (
        <div className="delete-confirmation-dialog">
          <p>Are you sure you want to delete this campaign?</p>
          <div className='delete-confirmation-button-container'>
          <button className="delete-confirmation-button"onClick={handleConfirmDelete}>Yes</button>
          <button className="delete-confirmation-button" onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        </div>
      )}


     
    


</div>
  );
};

export default Campaigns
import React, { useState, useEffect } from 'react'
import create from '../../images/createnew.png'
import { useNavigate } from 'react-router-dom';
import users from '../../images/users.png'
import action from '../../images/action.png'
import add from '../../images/add.png'
import edit from '../../images/edit.png';
import deleteimg from '../../images/delete.png';
import view from '../../images/view.png';
import question from '../../images/question.png'
import copy from '../../images/copy.png'

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
   const [selectedClient, setSelectedClient] = useState(null);
  const [showActionMenus, setShowActionMenus] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmationMessage, setDeleteConfirmationMessage] = useState('');
  
  useEffect(() => {
    // Fetch all clients from your backend API
    fetch('http://20.55.109.32:8080/find_all_client') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
        setShowActionMenus(new Array(data.length).fill(false)); // Update the state with the fetched clients
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);
 
const handleEditClick = (client) => {
    setSelectedClient(client);
    // Navigate to the Editclient component and pass the client's details as props
    navigate(`/dashboard/editclient/${client.id}`);
  };
  const toggleActionMenu = (index) => {
    // Function to toggle the action menu visibility for a specific client
    const updatedMenus = [...showActionMenus];
    updatedMenus[index] = !updatedMenus[index];
    setShowActionMenus(updatedMenus);
  };
   const handleDeleteClick = (client) => {
    setSelectedClient(client);
    setShowDeleteConfirmation(true);
  };

  const confirmDeactivation = () => {
    // Make a PATCH request to deactivate the client
    fetch(`http://20.55.109.32:8080/client_deactive/${selectedClient.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_active: 0 }), // Send the data you want to update
    })
      .then((response) => {
        if (response.status === 200) {
          // Client was successfully deactivated
          // You can handle this in your UI as needed, e.g., remove the client from the list
          // and update the state.
          // Here, we'll just refresh the page for simplicity.
          fetch('http://20.55.109.32:8080/find_all_client') // Replace with your actual API endpoint
          .then((response) => response.json())
          .then((data) => {
            setClients(data);
          })
          .catch((error) => {
            console.error('Error fetching active clients:', error);
          });
        } else {
          // Handle error cases, e.g., show an error message to the user.
          console.error('Error deactivating client:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deactivating client:', error);
      });
  
    // Close the confirmation dialog
    setShowDeleteConfirmation(false);
  };
  
  return (
    <div className='campaign-content'>
  
     <div className='campaign-container'>
     <div className='bread-crumbs'> 
<p>Home &nbsp;&lt;&nbsp; Clients</p>

  </div>
      <h3 className='campaign-text'><u className='stroke'>Clients</u></h3>
      
     </div>
     {clients.length > 0 ? (
      <div>
        <button className='create-client-button-2'onClick={() => navigate('/dashboard/createclient')}>
          <img src={add} />
          New Client</button>
        <div className='client-display-big-container'>
        <div className='client-display-container'>
        <div className='client-details-heading'>
        <div className='client-details-item-heading fixed-width client-name-heading'>
          <img classname="client-name-image"src={users} />
          Client Name</div>
            <div className='client-details-item-heading fixed-width'>Email ID</div>
            <div className='client-details-item-heading fixed-width'>Contact Number</div>
            <div className='client-details-item-heading fixed-width'>Client Description</div>
            <div className='client-details-item-heading fixed-width'>Location</div>
            <div className='client-details-item-heading fixed-width'>Action</div>  
        </div>
        <ul className='client-list'>
          {clients.map((client,index) => (
            <li key={client.id}>
              <button className='client-button'>
                  <div className='client-details-item-name fixed-width'>{client.client_name}</div>
                  <div className='client-details-item fixed-width'>{client.client_email}</div>
                  <div className='client-details-item fixed-width'>{client.contact_number}</div>
                  <div className='client-details-item fixed-width'>{client.client_description}</div>
                  <div className='client-details-item fixed-width'>{client.client_location}</div>
                  <div className='client-details-item fixed-width'>&nbsp;&nbsp;&nbsp;&nbsp;<img src={action} onClick={() => toggleActionMenu(index)}/></div>
                  {
                    showActionMenus[index] && (
                      <div className=' client-action-menu '>
                        {/* Display the action menu when showActionMenus[index] is true */}
                        <div className='action-menu-button-container'>
                        <button className="action-menu-button "onClick={() => handleEditClick(client)}>Edit
                        <img src={edit} />
                        </button>
                        <button className="action-menu-button"onClick={() => handleDeleteClick(client)}>Delete
                        <img src={deleteimg} />
                        </button>
                        <button className="action-menu-button">Preview
                        <img src={view} />
                        </button>
                        <button className="action-menu-button">Copy
                        <img src={copy} />
                        </button>
                        <button className="action-menu-button">Manage Assessment user
                        <img src={question} />
                        </button>
                        </div>
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
          </div><button className='campaign-button' onClick={() => navigate('/dashboard/createclient')}>Create New Client</button></>
     )
     }
     {showDeleteConfirmation && (
        <div className="delete-confirmation-dialog">
          <p>Are you sure you want to delete this client?</p>
          <div className='delete-confirmation-button-container'>
          <button className="delete-confirmation-button"onClick={confirmDeactivation}>Yes</button>
          <button className="delete-confirmation-button"onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        </div>
      )}
     
     


</div>
  );
};

export default Clients
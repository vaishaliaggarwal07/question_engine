import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import create from '../../images/createnew.png';
import users from '../../images/users.png';
import action from '../../images/action.png';
import add from '../../images/add.png';
import edit from '../../images/edit.png';
import deleteimg from '../../images/delete.png';
import view from '../../images/view.png';
import question from '../../images/question.png'
import copy from '../../images/copy.png'
const Questionaires = () => {
  const navigate = useNavigate();
  const [questionnaire, setquestionnaire] = useState([]);
  const [showActionMenus, setShowActionMenus] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmationMessage, setDeleteConfirmationMessage] = useState('');
  useEffect(() => {
    // Fetch campaigns when the component mounts
    fetch('http://20.55.109.32:8080/getQuestionaries') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setquestionnaire(data);
        console.log(questionnaire);
        setShowActionMenus(new Array(data.length).fill(false)); // Update the state with the fetched clients

      })
      .catch((error) => {
        console.error('Error fetching questionnaires:', error);
      });
  }, []);
  return (
    <div className='campaign-content'>
  
     <div className='campaign-container'>
     <div className='bread-crumbs'> 
<p>Home &nbsp;&lt;&nbsp; Questionnaires</p>

  </div>
      <h3 className='campaign-text'><u className='stroke'>Questionnaires</u></h3>
      
     </div>
     {questionnaire.length > 0 ? (
      <div>
        <button className='create-campaign-button-2'onClick={() => navigate('/dashboard/createquestionnaire')}>
          <img src={add} />
          New Questionnaire</button>
        <div className='client-display-big-container'>
        <div className='client-display-container'>
        <div className='client-details-heading'>
        <div className='client-details-item-heading fixed-width client-name-heading'>
          <img classname="client-name-image"src={users} />
          Questionnaire List</div>
            <div className='client-details-item-heading fixed-width'>Action</div>
            <div className='client-details-item-heading fixed-width'>Created by</div>
            <div className='client-details-item-heading fixed-width'>Status</div>
            <div className='client-details-item-heading fixed-width'>Date</div>

            <div className='client-details-item-heading fixed-width'>N/O Questions</div>

        </div>
        <ul className='client-list'>
          {questionnaire.map((questionnaires,index) => (
            <li key={questionnaire.id}>
              <button className='client-button'>
                  <div className='client-details-item-name fixed-width'>{questionnaires.questionnaire_name}</div>
                  <div className='client-details-item fixed-width'><img src={action} /></div>
                  <div className='client-details-item fixed-width'>{questionnaires.Created_by}</div>
                  <div className='client-details-item fixed-width'>{questionnaires.set_status}</div>
                  <div className='client-details-item fixed-width'>{questionnaires.Start_date}</div>


                  <div className='client-details-item fixed-width'>10</div>

                  
                  
                  
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
          </div><button className='campaign-button' onClick={() => navigate('/dashboard/createquestionnaire')}>Create New Questionnaire</button></>
     )
     }

{/* {showDeleteConfirmation && (
        <div className="delete-confirmation-dialog">
          <p>Are you sure you want to delete this campaign?</p>
          <div className='delete-confirmation-button-container'>
          <button className="delete-confirmation-button"onClick={handleConfirmDelete}>Yes</button>
          <button className="delete-confirmation-button" onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        </div>
      )} */}


     
    


</div>
  );
  
};

export default Questionaires
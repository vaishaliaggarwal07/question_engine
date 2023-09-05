import React from 'react';

// import './Sidebar.css';
import Campaign from '../images/campaigns.png';
import Questionnaire from '../images/questionnaires.png';
import Clients from '../images/clients.png';
import Questions from '../images/questions.png';
import { NavLink } from 'react-router-dom';
import create from '../images/createnew.png';
import { useState } from 'react';
function Sidebar({children,isOpen,toggle}) {
  const [selectedOption, setSelectedOption] = useState("Campaigns");
  const MenuItem = [
    {
      path:"/campaigns",
      name:"Campaigns",
      icon:<img src={Campaign} alt="Campaign" className="icon-img"/>
    },
    {
      path:"/questionaires",
      name:"Questionaires",
      icon:<img src={Questionnaire} alt="Questionnaire" className="icon-img"/>
    },
    {
      path:"/questions",
      name:"Questions",
      icon:<img src={Questions} alt="Questions" className="icon-img"/>
    },
    {
      path:"/clients",
      name:"Clients",
      icon:<img src={Clients} alt="Clients" className="icon-img"/>
    }

  ];
  const handleOptionSelect = (name) => {
    console.log(name);
    setSelectedOption(name);
  };
  
  return (
    <div className='container'>
      <div style={
        {
          width: isOpen ? "200px" : "80px", 
      backgroundColor: isOpen ? "inherit" : "red", }}className='sidebar'>
        <div className='top-section'>
          {
            MenuItem.map((item, index)=>(
              <NavLink to={item.path} key={index} className="link" activeclassName="active" onClick={() => handleOptionSelect(item.name)}>
                <div className='icon'>{item.icon}</div>
                <div style={{display: isOpen ? "block" : "none"}}className='link_text'>{item.name}</div>
              </NavLink>
            ))
          }
        </div>
<main>{children}</main>
      </div>
      <div className='campaign-content'>
     <div className='campaign-container'>
      <h3 className='campaign-text'>{selectedOption}</h3>
      
     </div>
     <div className='image-container'>
     <img src={create} className='campaign-image'/>
     </div>
     <button className='campaign-button'>Create New {selectedOption}</button>

</div>
    </div>
  );
}


export default Sidebar;

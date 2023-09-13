import React from 'react';
import hamburger from '../images/hamburger.png';
// import './Sidebar.css';
import Campaign from '../images/campaigns.png';
import Questionnaire from '../images/questionnaires.png';
import Clients from '../images/clients.png';
import Questions from '../images/questions.png';
import { NavLink } from 'react-router-dom';
import create from '../images/createnew.png';
import { useState } from 'react';
function Sidebar({children}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [selectedOption, setSelectedOption] = useState("Campaigns");
  const MenuItem = [
    {
      path:"/dashboard/campaigns",
      name:"Campaigns",
      icon:<img src={Campaign} alt="Campaign" className="icon-img"/>
    },
    {
      path:"/dashboard/questionaires",
      name:"Questionnaires",
      icon:<img src={Questionnaire} alt="Questionnaire" className="icon-img"/>
    },
    {
      path:"/dashboard/questions",
      name:"Questions",
      icon:<img src={Questions} alt="Questions" className="icon-img"/>
    },
    {
      path:"/dashboard/clients",
      name:"Clients",
      icon:<img src={Clients} alt="Clients" className="icon-img"/>
    }

  ];
  const handleOptionSelect = (name) => {
    console.log(name);
    setSelectedOption(name);
  };
  
  return (
    <>
    <div className='container'>
      <div style={
        {
          width: isOpen ? "200px" : "40px",
      backgroundColor: isOpen ? "inherit" : "red", }}className='sidebar'>
       
          <div className="icon hamburger-image icon-img">
            <img className="hamburger"src={hamburger} onClick={toggleSidebar}/>
          </div>
        
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

      </div>
      { children}
    </div>
    </>

  );
}


export default Sidebar;

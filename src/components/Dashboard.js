import React, { useState } from 'react';
import Sidebar from './Sidebar';
// import './Dashboard.css';
import menu from '../images/menu.png';
import logo from '../images/logo.png';
import 'font-awesome/css/font-awesome.min.css';
import setting from '../images/setting.png';
import profile from '../images/wrapper.png';
import Campaign from './campaigns/Campaigns';
import Questionaires from './questionnaires/Questionaires';
import Createquestionnaire from './questionnaires/Createquestionnaire';
import Questions from './Questions';
import Clients from './clients/Clients';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Createclient from './clients/Createclient';
import Editclient from './clients/Editclient';
import Createcampaign from './campaigns/Createcampaign';
import Editcampaign from './campaigns/Editcampaign';
function Dashboard() {
  
  return (
    <>
      <div className="top-bar">
        <div>
        <img
          src={menu}
          alt="Menu"
          className="menu-icon"
        />
<img src={logo} alt="logo" class="logo" />
</div>
<div className='search-container'>
<div className='search'>
<div className='search-icon'>
        <i className='fa fa-search'></i>
      </div>
      <div className='search-text'>
        Search for a file
      </div>
</div>
<img src={setting} alt="setting" className='setting'/>
<img src={profile} alt="profile" className='profile-img'/>
<div className='username'>
  username
</div>
</div>
      </div>
<div className='dashboard-content-container'><div className='sidebar-div'>
     
      <Sidebar  >
  
    {/* <Dashboard /> */}
        <Routes>
        
        <Route path="/dashboard/campaigns" element={<Campaign />} />
        <Route path="/dashboard/questionaires" element={<Questionaires />} />
        <Route path="/dashboard/createquestionnaire" element={<Createquestionnaire />} />
        <Route path="/dashboard/questions" element={<Questions />} />
        <Route path="/dashboard/clients" element={<Clients />} />
        <Route path="/dashboard/createclient" element={<Createclient />} />
        <Route path="/dashboard/editclient/:id" element={<Editclient />} />
        {/* <Route path="/dashboard/editclient" element={<Editclient />} /> */}
        <Route path="/dashboard/createcampaign" element={<Createcampaign />} />
        <Route path="/dashboard/editcampaign/:id" element={<Editcampaign />} />

        </Routes>
       
        </Sidebar>
        </div>
      {/* <Campaign /> */}
      </div>
      </>
  );
}

export default Dashboard;

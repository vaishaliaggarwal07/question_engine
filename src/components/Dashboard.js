import React, { useState } from 'react';
import Sidebar from './Sidebar';
// import './Dashboard.css';
import menu from '../images/menu.png';
import logo from '../images/logo.png';
import 'font-awesome/css/font-awesome.min.css';
import setting from '../images/setting.png';
import profile from '../images/wrapper.png';
function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard">
      <div className="top-bar">
        <div>
        <img
          src={menu}
          alt="Menu"
          className="menu-icon"
          onClick={toggleSidebar}
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

      
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
     
    </div>
  );
}

export default Dashboard;

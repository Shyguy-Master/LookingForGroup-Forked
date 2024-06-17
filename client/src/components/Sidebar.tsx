import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
// import homeIcon from '../img/AhomeIcon.png';
// import folder from '../img/folder.png';
// import message from '../img/message.png';
// import profile from '../img/profile-user.png';
// import setting from '../img/setting.png';
import * as paths from "../constants/routes";
import { useSelector } from 'react-redux';

import { profiles } from "../constants/fakeData";

// To Do:
// Make mobile friendly version stay at bottom of screen
// Ensure page content is not covered by sidebar
// Decide how/if width changes with window size
// Have profile pic displayed if a user is logged in


const SideBar = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = useSelector((state: any) => state.page.MOBILE_BREAKPOINT);

  const [headerText, setHeaderText] = useState('Group'); // State to manage the h1 text
  const [activeTab, setActiveTab] = useState('Home'); // State to manage the active tab [Home, Projects, Messages, Profile, Settings
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle the button clicks and update the h1 text
  const handleTextChange = (text, path, tab) => {
    setHeaderText(text);
    setActiveTab(tab);
    navigate(path); // Navigate to the specified path
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  })

  // Mobile layout
  if (width < breakpoint) {
    return (
      <div className='sideBarContainer' style={{
        position: 'fixed',
        bottom: 0,
        boxShadow: '0px -2px 5px 0px rgba(0,0,0,0.2)',
        zIndex: 100
      }}>
        <div className='containerButtonSideBar'>
          <button className={activeTab === 'Home' ? 'active' : ''} onClick={() => handleTextChange('Group', paths.routes.HOME, 'Home')}>
            <img src="./icons/home.png" className="navIcon" alt="Home" />
          </button>
          <button className={activeTab === 'Projects' ? 'active' : ''} onClick={() => handleTextChange('My Projects', paths.routes.MYPROJECTS, 'Projects')}>
            <img src="./icons/folder.png" className="navIcon" alt="Projects" />
          </button>
          <button className={activeTab === 'Messages' ? 'active' : ''} onClick={() => handleTextChange('Messages', paths.routes.MESSAGES, 'Messages')}>
            <img src="./icons/message.png" className="navIcon" alt="Messages" />
          </button>
          <button className={activeTab === 'Profile' ? 'active' : ''} onClick={() => handleTextChange('Profile', paths.routes.PROFILE, 'Profile')}>
            <img src="./icons/profile-user.png" className="navIcon" alt="Profile" />
          </button>
          <button className={activeTab === 'Settings' ? 'active' : ''} onClick={() => handleTextChange('Settings', paths.routes.SETTINGS, 'Settings')}>
            <img src="./icons/setting.png" className="navIcon" alt="Setting" />
          </button>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className='SideBarContainer'>
      <div className='headerContainer'>
        <h1>Looking For {headerText}</h1>
      </div>

      <div className='ProfileContainer'>
        <span className="dot">
          {/* <img src="./cat1.png" alt="profile picture" /> */}
          <img src={profiles[0].profilePicture.name} alt="profile picture" />
        </span>
        <h1>{profiles[0].name}</h1>
      </div>

      <div className='containerButtonSideBar'>
        <button className={activeTab === 'Home' ? 'active' : ''} onClick={() => handleTextChange('Group', paths.routes.HOME, 'Home')}>
          <img src="./icons/home.png" className="navIcon" alt="Home" /> Home
        </button>
        <button className={activeTab === 'Projects' ? 'active' : ''} onClick={() => handleTextChange('My Projects', paths.routes.MYPROJECTS, 'Projects')}>
          <img src="./icons/folder.png" className="navIcon" alt="Projects" /> My Projects
        </button>
        <button className={activeTab === 'Messages' ? 'active' : ''} onClick={() => handleTextChange('Messages', paths.routes.MESSAGES, 'Messages')}>
          <img src="./icons/message.png" className="navIcon" alt="Messages" /> Messages
        </button>
        <button className={activeTab === 'Profile' ? 'active' : ''} onClick={() => handleTextChange('Profile', paths.routes.PROFILE, 'Profile')}>
          <img src="./icons/profile-user.png" className="navIcon" alt="Profile" /> Profile
        </button>
        <button className={activeTab === 'Settings' ? 'active' : ''} onClick={() => handleTextChange('Settings', paths.routes.SETTINGS, 'Settings')}>
          <img src="./icons/setting.png" className="navIcon" alt="Setting" /> Settings
        </button>
      </div>

      <div className='Logout'>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import homeIcon from '../img/AhomeIcon.png';
import folder from '../img/folder.png';
import message from '../img/message.png';
import profile from '../img/profile-user.png';
import setting from '../img/setting.png';
import * as paths from "../constants/routes";

const SideBar = () => {
  const [headerText, setHeaderText] = useState('Group'); // State to manage the h1 text
  const navigate = useNavigate(); // Hook for navigation
  const dotRef = useRef(null);

  // Function to handle the button clicks and update the h1 text
  const handleTextChange = (text, path) => {
    setHeaderText(text);
    navigate(path); // Navigate to the specified path
  };

  useEffect(() => {
    const dotElement = dotRef.current;
    const rect1 = dotElement.querySelector('.rect1');
    const rect2 = dotElement.querySelector('.rect2');

    const handleRect1Click = () => {
    };

    const handleRect2Click = () => {
    };

    if (rect1) rect1.addEventListener('click', handleRect1Click);
    if (rect2) rect2.addEventListener('click', handleRect2Click);

    return () => {
      if (rect1) rect1.removeEventListener('click', handleRect1Click);
      if (rect2) rect2.removeEventListener('click', handleRect2Click);
    };
  }, []);

  return (
    <div className='SideBarContainer'>
      <div className='headerContainer'>
        <h1>Looking For {headerText}</h1>  
      </div>
      
      <div className='ProfileContainer'>
        <span className="dot" ref={dotRef}></span>
      </div>
      
      <h1>UserName</h1>
      
      <div className='containerButtonSideBar'>
        <button onClick={() => handleTextChange('Discovery', paths.routes.HOME)}> 
          <img src={homeIcon} width="32" height="32" alt="Home" /> Home 
        </button>
        <button onClick={() => handleTextChange('My Projects', paths.routes.MYPROJECTS)}> 
          <img src={folder} width="32" height="32" alt="Projects" /> My Projects
        </button>
        <button onClick={() => handleTextChange('Messages', paths.routes.MESSAGES)}> 
          <img src={message} width="32" height="32" alt="Messages" /> Messages
        </button>
        <button onClick={() => handleTextChange('Profile', paths.routes.PROFILE)}> 
          <img src={profile} width="32" height="32" alt="Profile" /> Profile
        </button>
        <button onClick={() => handleTextChange('Settings', paths.routes.SETTINGS)}> 
          <img src={setting} width="32" height="32" alt="Setting" /> Settings
        </button>
      </div>

      <div className='Logout'>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;
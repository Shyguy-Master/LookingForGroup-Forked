import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import homeIcon from '../img/AhomeIcon.png';
import folder from '../img/folder.png';
import message from '../img/message.png';
import profile from '../img/profile-user.png';
import setting from '../img/setting.png';
import * as paths from "../constants/routes";
import { useSelector } from 'react-redux';

// To Do:
// Make mobile friendly version stay at bottom of screen
// Ensure page content is not covered by sidebar
// Decide how/if width changes with window size
// Have profile pic displayed if a user is logged in


const SideBar = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = useSelector((state:any) => state.page.MOBILE_BREAKPOINT);

  const [headerText, setHeaderText] = useState('Group'); // State to manage the h1 text
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle the button clicks and update the h1 text
  const handleTextChange = (text, path) => {
    setHeaderText(text);
    navigate(path); // Navigate to the specified path
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  })

  // Mobile layout
  if (width < breakpoint) {
    return (
      <div className='sideBarContainer'>
        <div className='containerButtonSideBar'>
          <button onClick={() => handleTextChange('Discovery', paths.routes.HOME)}> 
            <img src={homeIcon} className="navIcon" alt="Home" />
          </button>
          <button onClick={() => handleTextChange('My Projects', paths.routes.MYPROJECTS)}> 
            <img src={folder} className="navIcon" alt="Projects" />
          </button>
          <button onClick={() => handleTextChange('Messages', paths.routes.MESSAGES)}> 
            <img src={message} className="navIcon" alt="Messages" />
          </button>
          <button onClick={() => handleTextChange('Profile', paths.routes.PROFILE)}> 
            <img src={profile} className="navIcon" alt="Profile" />
          </button>
          <button onClick={() => handleTextChange('Settings', paths.routes.SETTINGS)}> 
            <img src={setting} className="navIcon" alt="Setting" />
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
        <span className="dot"></span>
      </div>
      
      <h1>UserName</h1>
      
      <div className='containerButtonSideBar'>
        <button onClick={() => handleTextChange('Discovery', paths.routes.HOME)}> 
          <img src={homeIcon} className="navIcon" alt="Home" /> Home 
        </button>
        <button onClick={() => handleTextChange('My Projects', paths.routes.MYPROJECTS)}> 
          <img src={folder} className="navIcon" alt="Projects" /> My Projects
        </button>
        <button onClick={() => handleTextChange('Messages', paths.routes.MESSAGES)}> 
          <img src={message} className="navIcon" alt="Messages" /> Messages
        </button>
        <button onClick={() => handleTextChange('Profile', paths.routes.PROFILE)}> 
          <img src={profile} className="navIcon" alt="Profile" /> Profile
        </button>
        <button onClick={() => handleTextChange('Settings', paths.routes.SETTINGS)}> 
          <img src={setting} className="navIcon" alt="Setting" /> Settings
        </button>
      </div>

      <div className='Logout'>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;
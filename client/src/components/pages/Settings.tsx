import React, { useState, useEffect } from 'react';
import "./pages.css";
import ConfirmDelete from '../ConfirmDelete';
import ChangePassword from '../ChangePassword';

// TO DO:
// - Add general settings
//    Some Ideas: 
//     - theme, language, notification
//     - permissions, accessibility, blocked users, etc.
// - Add account settings
//    Some Ideas: 
//     - email, password, username, delete account, etc.
// - Add reset and save buttons


const Settings = (props) => {
  const [activeTab, setActiveTab] = useState("general");
  const [activeTheme, setActiveTheme] = useState('light'); // State to manage the active theme
  const [activeColor, setActiveColor] = useState('orange'); // State to manage the active color
  const [showDelete, setShowDelete] = useState(false);
  const [changePass, setChangePass] = useState(false);

  // Function to change the theme of the page
  const handleThemeChange = (theme) => {
    setActiveTheme(theme);
  };

  // Function to change the color of the buttons
  const handleColorChange = (color) => {
    setActiveColor(color);
  };

  // Function to change the password
  const changePassword = () => {
    // Placeholder
    alert('Password changed successfully');
  };

  // Function to delete the account
  const deleteAccount = () => {
    // Placeholder
    alert('Account deleted successfully');
  };

  return (
    <div className="page">
      <h1 className="page-title">Settings</h1>

      <div id="settings-page">
        {/* tab links */}
        <div className="tabs">
          <div className={`tab-links ${activeTab === "general" ? "active-link" : ""}`} onClick={() => setActiveTab("general")}>
            General
          </div>
          <div className={`tab-links ${activeTab === "account" ? "active-link" : ""}`} onClick={() => setActiveTab("account")}>
            Account
          </div>
        </div>

        {/* general settings */}
        <div className={`tab-contents ${activeTab === "general" ? "active-tab" : ""}`} id="general">
          <div>general settings go here,<br></br> these are just some placeholders/examples for now</div>
          <div className="setting">
            <h5>Main Theme</h5>
            <input type="radio" id="light" style={{ backgroundColor: '#FBFBFB', }} className={`theme-btn ${activeTheme === "light" ? "active-theme" : ""}`} onClick={() => handleThemeChange('light')} />
            <input type="radio" id="dark" style={{ backgroundColor: '#414141', }} className={`theme-btn ${activeTheme === "dark" ? "active-theme" : ""}`} onClick={() => handleThemeChange('dark')} />
          </div>
          <div className="setting">
            <h5>Accent Color</h5>
            <input type="radio" id="orange" style={{ backgroundColor: '#F35835', maxWidth: '40px', height: '40px' }} className={`theme-btn ${activeColor === "orange" ? "active-theme" : ""}`} onClick={() => handleColorChange('orange')} />
            <input type="radio" id="green" style={{ backgroundColor: '#97E5AB', maxWidth: '40px', height: '40px' }} className={`theme-btn ${activeColor === "green" ? "active-theme" : ""}`} onClick={() => handleColorChange('green')} />
            <input type="radio" id="blue" style={{ backgroundColor: '#99E6EA', maxWidth: '40px', height: '40px' }} className={`theme-btn ${activeColor === "blue" ? "active-theme" : ""}`} onClick={() => handleColorChange('blue')} />
            <input type="radio" id="purple" style={{ backgroundColor: '#B1A2DB', maxWidth: '40px', height: '40px' }} className={`theme-btn ${activeColor === "purple" ? "active-theme" : ""}`} onClick={() => handleColorChange('purple')} />
          </div>
          <div className="setting">
            <h5>Language</h5>
            <select id="language-select">
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>
          <div className="setting">
            <h5>Notifications</h5>
            <div className="row">
              <p className='text'>All notifications</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className='setting'>
            <h5></h5>
            <div className="column">
              <div className="row">
                <p className='text'>Push/Desktop notifications</p>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="row">
                <p className='text'>Chat messages</p>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="row">
                <p className='text'>Friend requests</p>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* account settings */}
        <div className={`tab-contents ${activeTab === "account" ? "active-tab" : ""}`} id="account">
          <div>account settings go here,<br></br> these are just some placeholders/examples for now</div>
          <div className="setting">
            <h5>Password</h5>
            <input type="password" className="password-change" name="password" value="password" disabled />
            <button className="pass-btn" onClick={() => { setChangePass(true); }}> Change Password</button>
          </div>
          <ChangePassword
            show={changePass}
            onClose={() => { setChangePass(false); }}
            onConfirm={() => {
              setChangePass(false);
              changePassword();
            }}
          />
          <div className="setting">
            <h5>Remove Account</h5>
            {/* Delete button: popup asking "are you sure" or require password to confirm */}
            <button className="delete-account-btn" onClick={() => { setShowDelete(true); }}>Delete Account</button>
          </div>
          <ConfirmDelete
            show={showDelete}
            onClose={() => { setShowDelete(false); }}
            onConfirm={() => {
              setShowDelete(false);
              deleteAccount();
            }}
          />
        </div>
        <br></br>
        <button className="buttonOne">Button Style</button>
      </div>F
    </div>
  );
}

export default Settings;
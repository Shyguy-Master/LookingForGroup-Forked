import React, { useState, useEffect } from 'react';
import "./pages.css";
import ConfirmDelete from '../ConfirmDelete';
import ChangePassword from '../ChangePassword';

// TO DO:
// - Add general settings
//     - theme, language, notification
//     - permissions, accessibility, blocked users, etc.
// - Add account settings
//     - email, password, username, delete account, etc.
// - Add reset and save buttons


const Settings = (props) => {
  const [activeTab, setActiveTab] = useState("general");
  const [activeTheme, setActiveTheme] = useState('light'); // State to manage the active theme
  const [activeColor, setActiveColor] = useState('orange'); // State to manage the active color
  const [showDelete, setShowDelete] = useState(false);

  // Function to handle the button clicks and update the h1 text
  const handleThemeChange = (theme) => {
    setActiveTheme(theme);
  };

  const handleColorChange = (color) => {
    setActiveColor(color);
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleConfirmDelete = () => {
    setShowDelete(false);
    deleteAccount();
  };

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
            <button style={{ backgroundColor: 'white', }} className={`theme-btn ${activeTheme === "light" ? "active-theme" : ""}`} onClick={() => handleThemeChange('light')}></button>
            <button style={{ backgroundColor: 'black', }} className={`theme-btn ${activeTheme === "dark" ? "active-theme" : ""}`} onClick={() => handleThemeChange('dark')}></button>
          </div>
          <div className="setting">
            <h5>Accent Color</h5>
            <button style={{ backgroundColor: '#FF006D', width: '40px', height: '40px' }} className={`theme-btn ${activeColor === "red" ? "active-theme" : ""}`} onClick={() => handleColorChange('red')}></button>
            <button style={{ backgroundColor: '#FF7D00', width: '40px', height: '40px' }} className={`theme-btn ${activeColor === "orange" ? "active-theme" : ""}`} onClick={() => handleColorChange('orange')}></button>
            <button style={{ backgroundColor: '#FFDD00', width: '40px', height: '40px' }} className={`theme-btn ${activeColor === "yellow" ? "active-theme" : ""}`} onClick={() => handleColorChange('yellow')}></button>
            <button style={{ backgroundColor: '#ADFF02', width: '40px', height: '40px' }} className={`theme-btn ${activeColor === "green" ? "active-theme" : ""}`} onClick={() => handleColorChange('green')}></button>
            <button style={{ backgroundColor: '#01BEFE', width: '40px', height: '40px' }} className={`theme-btn ${activeColor === "blue" ? "active-theme" : ""}`} onClick={() => handleColorChange('blue')}></button>
            <button style={{ backgroundColor: '#8F00FF', width: '40px', height: '40px' }} className={`theme-btn ${activeColor === "purple" ? "active-theme" : ""}`} onClick={() => handleColorChange('purple')}></button>
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
            {/* slider check */}
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* account settings */}
        <div className={`tab-contents ${activeTab === "account" ? "active-tab" : ""}`} id="account">
          <div>account settings go here,<br></br> these are just some placeholders/examples for now</div>
          <div className="setting">
            <h5>Password</h5>
            <input type="password" className="password-change" name="password" value="password" disabled />
            <button className="change-pass-btn" onClick={handleDelete}> Change Password</button>
          </div>
          <ChangePassword
            show={showDelete}
            onClose={handleClose}
            onConfirm={handleConfirmDelete}
          />
          <div className="setting">
            {/* Delete button: popup asking "are you sure" or require password to confirm */}
            <button className="delete-account-btn" onClick={handleDelete}>Delete Account</button>
          </div>
          <ConfirmDelete
            show={showDelete}
            onClose={handleClose}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
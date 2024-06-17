import React, { useState, useEffect } from 'react';
import "./pages.css";
import ConfirmDelete from '../ConfirmDelete';

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
  const [showDelete, setShowDelete] = useState(false);

  // Function to handle the button clicks and update the h1 text
  const handleThemeChange = (theme) => {
    setActiveTheme(theme);
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
          <div>general settings go here</div>
          <div className="setting">
            <h5>Theme</h5>
            <button id="light" className={`theme-btn ${activeTheme === "light" ? "active-theme" : ""}`} onClick={() => handleThemeChange('light')}></button>
            <button id="dark" className={`theme-btn ${activeTheme === "dark" ? "active-theme" : ""}`} onClick={() => handleThemeChange('dark')}></button>
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

          </div>
        </div>

        {/* account settings */}
        <div className={`tab-contents ${activeTab === "account" ? "active-tab" : ""}`} id="account">
          <div>account settings go here</div>
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
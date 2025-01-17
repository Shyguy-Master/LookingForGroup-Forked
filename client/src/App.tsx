import './App.css';
import './components/Styles/styles.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as paths from "./constants/routes";
import React, { useState } from 'react';
import Login from './components/pages/Login';
import SignUp from './components/pages/Signup';
import Home from "./components/pages/Home";
import Messages from "./components/pages/Messages";
import MyProjects from "./components/pages/MyProjects";
import Profile from "./components/pages/Profile";
import Project from "./components/pages/Project";
import ProjectPostPage from "./components/pages/ProjectPostPage";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound";
import SideBar from "./components/Sidebar";
import MessageHistory from './components/pages/MessageHistory';
import CreateProject from './components/pages/CreateProject';
import CreditsFooter from './components/CreditsFooter';
import Credits from './components/pages/CreditsPage';


function App() {
  const [avatarImage, setAvatarImage] = useState('images/tempProfilePic.png');
  const [profileImage, setProfileImage] = useState('');

  return (
    <BrowserRouter>
      <div className="App">
        <SideBar avatarImage={avatarImage} setAvatarImage={setAvatarImage} />
        <Routes>
          <Route path={paths.routes.DEFAULT} element={<Home />} />
          <Route path={paths.routes.LOGIN} element={<Login />} />
          <Route path={paths.routes.SIGNUP} element={<SignUp avatarImage={avatarImage} setAvatarImage={setAvatarImage} profileImage={profileImage} setProfileImage={setProfileImage} />} />
          <Route path={paths.routes.HOME} element={<Home />} />
          <Route path={paths.routes.MESSAGES} element={<Messages />} />
          <Route path={paths.routes.MYPROJECTS} element={<MyProjects />} />
          <Route path={paths.routes.PROFILE} element={<Profile />} />
          <Route path={paths.routes.PROJECT} element={<Project />}/>
          <Route path={paths.routes.CREATEPROJECT} element={<CreateProject />}/>
          <Route path={paths.routes.PROJECTPOST} element={<ProjectPostPage />} />
          <Route path={paths.routes.SETTINGS} element={<Settings avatarImage={avatarImage} setAvatarImage={setAvatarImage} profileImage={profileImage} setProfileImage={setProfileImage} />} />
          <Route path={paths.routes.NOTFOUND} element={<NotFound />} />
          <Route path={paths.routes.MESSAGEHISTORY} element={<MessageHistory />} />
          <Route path={paths.routes.CREDITS} element={<Credits />} />
        </Routes>
        {/* <CreditsFooter /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

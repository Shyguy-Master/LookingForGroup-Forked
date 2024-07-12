import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import * as paths from "./constants/routes";
import Home from "./components/pages/Home";
import Messages from "./components/pages/Messages";
import MyFeed from "./components/pages/MyFeed";
import MyProjects from "./components/pages/MyProjects";
import Profile from "./components/pages/Profile";
import Project from "./components/pages/Project";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound";
import SideBar from "./components/Sidebar";
import NavbarMenu from './components/NavbarMenu';
import HomePage from './components/pages/HomePage';
import DesignerHomePage from './components/pages/DesignerHomePage';
import DeveloperHomePage from './components/pages/DeveloperHomePage';
import MentorHomePage from './components/pages/MentorHomePage';
import ProjectHomePage from './components/pages/ProjectHomePage';
import FooterHomePage from './components/FooterHomePage';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Proficiencies from './components/pages/Proficiencies';
import HardSoftSkills from './components/pages/HardSoftSkills';

function ConditionalComponents() {
  const location = useLocation();
  const isSpecialHomePage = [
    paths.routes.HOMEPAGE,
    paths.routes.HOMEPAGEPROJECT,
    paths.routes.HOMEPAGEDESIGNER,
    paths.routes.HOMEPAGEDEVELOPER,
    paths.routes.HOMEPAGEMENTOR
  ].includes(location.pathname);

  const noNavBar = [
    paths.routes.LOGIN,
    paths.routes.SIGNUP,
    paths.routes.PROFICIENCIES,
    paths.routes.HARDSOFTSKILLS,
  ]

  if (noNavBar.includes(location.pathname)){
    return null
  }

  if (isSpecialHomePage) {
    return (
      <>
        <NavbarMenu />
        <FooterHomePage />
      </>
    );
  } else {
    return <SideBar />;
  }

}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ConditionalComponents />
        <Routes>
          <Route path={paths.routes.HOMEPAGE} element={<HomePage />} />
          <Route path={paths.routes.DEFAULT} element={<Home />} />
          <Route path={paths.routes.HOME} element={<Home />} />
          <Route path={paths.routes.MESSAGES} element={<Messages />} />
          <Route path={paths.routes.MYFEED} element={<MyFeed />} />
          <Route path={paths.routes.MYPROJECTS} element={<MyProjects />} />
          <Route path={paths.routes.PROFILE} element={<Profile />} />
          <Route path={paths.routes.PROJECT} element={<Project />} />
          <Route path={paths.routes.SETTINGS} element={<Settings />} />
          <Route path={paths.routes.NOTFOUND} element={<NotFound />} />
          <Route path={paths.routes.HOMEPAGEPROJECT} element={<ProjectHomePage />} />
          <Route path={paths.routes.HOMEPAGEDESIGNER} element={<DesignerHomePage />} />
          <Route path={paths.routes.HOMEPAGEDEVELOPER} element={<DeveloperHomePage />} />
          <Route path={paths.routes.HOMEPAGEMENTOR} element={<MentorHomePage />} />
          <Route path={paths.routes.FOOTER}element={<FooterHomePage />}/>
          <Route path={paths.routes.LOGIN}element={<Login/>}/>
          <Route path={paths.routes.SIGNUP}element={<SignUp/>}/>
          <Route path={paths.routes.PROFICIENCIES}element={<Proficiencies/>}/>
          <Route path={paths.routes.HARDSOFTSKILLS}element={<HardSoftSkills/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
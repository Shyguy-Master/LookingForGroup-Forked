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



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ConditionalNavbar />
        <SideBar />
        <Routes>
          <Route path={paths.routes.HOMEPAGE} element={<HomePage />} />
          <Route path={paths.routes.DEFAULT} element={<Home />} />
          <Route path={paths.routes.HOME} element={<Home />} />
          <Route path={paths.routes.MESSAGES} element={<Messages />} />
          <Route path={paths.routes.MYFEED} element={<MyFeed />} />
          <Route path={paths.routes.MYPROJECTS} element={<MyProjects />} />
          <Route path={paths.routes.PROFILE} element={<Profile />} />
          <Route path={paths.routes.PROJECT} element={<Project />}/>
          <Route path={paths.routes.SETTINGS} element={<Settings />} />
          <Route path={paths.routes.NOTFOUND} element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  const isHomePage = location.pathname === paths.routes.HOMEPAGE;
  return isHomePage ? <NavbarMenu /> : null;
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as paths from "./constants/routes";
import Home from "./components/pages/Home";
import Messages from "./components/pages/Messages";
import MyFeed from "./components/pages/MyFeed";
import MyProjects from "./components/pages/MyProjects";
import Profile from "./components/pages/Profile";
import Project from "./components/pages/Project";
import ProjectPostPage from "./components/pages/ProjectPostPage";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound";
import SideBar from "./components/Sidebar";
import MessageHistory from './components/pages/MessageHistory';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SideBar />
        <Routes>
          <Route path={paths.routes.DEFAULT} element={<Home />} />
          <Route path={paths.routes.HOME} element={<Home />} />
          <Route path={paths.routes.MESSAGES} element={<Messages />} />
          <Route path={paths.routes.MYFEED} element={<MyFeed />} />
          <Route path={paths.routes.MYPROJECTS} element={<MyProjects />} />
          <Route path={paths.routes.PROFILE} element={<Profile />} />
          <Route path={paths.routes.PROJECT} element={<Project />}/>
          <Route path={paths.routes.PROJECTPOST} element={<ProjectPostPage />}/>
          <Route path={paths.routes.SETTINGS} element={<Settings />} />
          <Route path={paths.routes.NOTFOUND} element={<NotFound />} />
          <Route path={paths.routes.MESSAGEHISTORY} element={<MessageHistory />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
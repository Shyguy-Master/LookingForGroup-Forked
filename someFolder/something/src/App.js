import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Proficiencies from "./Pages/Proficiencies";
import SoftHardSkills from "./Pages/SoftHardSkills";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Proficiencies" element={<Proficiencies />} />
        <Route path="/SoftHardSkills" element={<SoftHardSkills />} />
      </Routes>
    </Router>
  );
}

export default App;
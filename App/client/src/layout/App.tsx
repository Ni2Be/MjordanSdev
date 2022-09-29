import React from "react";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";
import AnimatedBackground from "../components/AnimatedBackground/AnimatedBackground";
import SideBar from "../components/SideBar/SideBar";
import About from "../components/About/About";
import UnderConstruction from "../components/UnderConstruction/UnderConstruction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectList from "../components/Projects/ProjectList";

const App = () => {
  const sideBarWidth = '12rem';

  return (
    <div className="App dark-theme" role="application">
      <UnderConstruction />

      <AnimatedBackground />

      <BrowserRouter>
        <div className="content">
          <SideBar sideBarWidth={sideBarWidth} />
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<ProjectList />} />
            <Route path='*' element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

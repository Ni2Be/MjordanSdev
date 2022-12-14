import React from "react";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";
import AnimatedBackground from "../components/AnimatedBackground/AnimatedBackground";
import SideBar from "../components/SideBar/SideBar";
import About from "../components/About/About";
import UnderConstruction from "../components/UnderConstruction/UnderConstruction";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProjectList from "../components/Projects/ProjectList";
import ProjectDetails from "../components/Projects/ProjectDetails";
import Contact from "../components/Contact/Contact";
import ProjectDesigner from "../components/Projects/ProjectDesigner";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

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
            <Route path='/projects' >
              <Route index element={<ProjectList />}></Route>
              <Route path='/projects/:id' element={<ProjectDetails />}></Route>
              <Route path='/projects/pd/:id' element={<ProjectDesigner />}></Route>
            </Route>
            <Route path='/contact' element={
              <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITEKEY!}>
                <Contact />
              </GoogleReCaptchaProvider>
            } />
            <Route path='*' element={<Navigate to="/about" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

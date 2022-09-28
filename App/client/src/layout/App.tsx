import React from "react";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";
import AnimatedBackground from "../components/AnimatedBackground/AnimatedBackground";
import SideBar from "../components/SideBar/SideBar";
import About from "../components/About/About";
import UnderConstruction from "../components/UnderConstruction/UnderConstruction";

const App = () => {
  const sideBarWidth = '12rem';

  return (
    <div className="App dark-theme" role="application">
      <UnderConstruction/>

      <AnimatedBackground />

      <SideBar sideBarWidth={sideBarWidth} />

      <div style={{ paddingLeft: sideBarWidth }}>
          <About/>
      </div>

    </div>
  );
}

export default App;

import React from "react";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";
import AnimatedBackground from "../components/AnimatedBackground/AnimatedBackground";
import SideBar from "../components/SideBar/SideBar";
import ProjectList from "../components/Projects/ProjectList";
import { Grid } from "semantic-ui-react";

const App = () => {
  const sideBarWidth = '12rem';

  return (
    <div className="App dark-theme" role="application">

      <AnimatedBackground />

      <SideBar sideBarWidth={sideBarWidth} />

      <Grid style={{ paddingLeft: sideBarWidth }}>
        <Grid.Column>
          <ProjectList />
        </Grid.Column>
      </Grid>

    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Placeholder } from 'semantic-ui-react';
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';
import SideBar from './components/SideBar/SideBar';

const App = () => {
  return (
    <div className="App">

      <AnimatedBackground />
      
      <SideBar />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Placeholder } from 'semantic-ui-react';
import MenuBar from './components/menu/Menu';
import Background from './components/Background/Background';
import { Canvas } from '@react-three/fiber';
import Box from './components/Box/Box';

const App = () => {
  return (
    <div className="App">

      <Grid columns={2} >
        <Grid.Column stretched>
          <Grid.Row columns={2}>
            <Placeholder>
            </Placeholder>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Placeholder>
              <Placeholder.Image />
            </Placeholder>
            <MenuBar />
          </Grid.Row>
        </Grid.Column>

        <Grid.Column>
        </Grid.Column>
      </Grid>
      <Background />
    </div>
  );
}

export default App;

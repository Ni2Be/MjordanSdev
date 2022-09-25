import "./App.css";
import "semantic-ui-css/semantic.min.css";
import AnimatedBackground from "./components/AnimatedBackground/AnimatedBackground";
import SideBar from "./components/SideBar/SideBar";
import ProjectList from "./features/Projects/ProjectList";


const App = () => {
  return (
    <div className="App">

      <AnimatedBackground />
      
      <SideBar />

      <ProjectList />
    </div>
  );
}

export default App;

import './App.css';
import Ratvis from './components/Ratvis';

function App() {
  return (
    <div className='main'>
      <h1>Rat In A Maze Visualizer</h1>
      <p>Click on the box to block the gates and click on start button to find path to end.</p>
      <Ratvis />

    </div>
  );
}

export default App;

import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import BinarySearchVisualizer from './pages/BinarySearchVisualizer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
          {/* <Home /> */}
          <BinarySearchVisualizer/>
      </div>
    </div>
  );
}

export default App;

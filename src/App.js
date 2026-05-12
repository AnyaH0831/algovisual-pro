import Home from './pages/Home';
import Navbar from './components/Navbar';
import BinarySearchVisualizer from './pages/BinarySearchVisualizer';

function App() {
  return (
    <div className="min-h-screen bg-[#001219ff]">
      <Navbar />
      <div className="content">
          {/* <Home /> */}
          <BinarySearchVisualizer/>
      </div>
    </div>
  );
}

export default App;

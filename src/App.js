import Navbar from './components/Navbar';
import DFSVisualizer from './pages/DFSVisualizer';

function App() {
  return (
    <div className="min-h-screen bg-[#001219ff]">
      <Navbar />
      <div className="content">
          {/* <Home /> */}
          {/* <BinarySearchVisualizer/> */}
          <DFSVisualizer/>

      </div>
    </div>
  );
}
  
export default App;

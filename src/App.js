import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import BinarySearchVisualizer from './pages/BinarySearchVisualizer';
import DFSVisualizer from './pages/DFSVisualizer';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    if (activePage === 'binary') return <BinarySearchVisualizer />;
    if (activePage === 'dfs') return <DFSVisualizer />;
    return <Home />;
  };

  return (
    <div className="min-h-screen bg-[#001219ff]">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <div className="content">
          {renderPage()}
      </div>
    </div>
  );
}
   
export default App;

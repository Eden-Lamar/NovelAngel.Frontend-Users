import { Routes, Route } from 'react-router-dom';
import NavbarSticky from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';

function App() {
  

  return (
  <div className="flex flex-col min-h-screen">
     {/* Navbar */}
      <NavbarSticky />

      {/* Main Content Area */}
      <div className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/novels" element={<h1 className="text-gray-500 text-3xl">Novels</h1>} />
            <Route path="/genres" element={<h1 className="text-gray-500 text-3xl">Genres</h1>} />
            <Route path="/buy-coins" element={<h1 className="text-gray-500 text-3xl">Buy Coins</h1>} />
          </Routes>
      </div>

      {/* Footer */}
      <Footer />
  </div>
  )
}

export default App

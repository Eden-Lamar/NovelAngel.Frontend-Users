import { Routes, Route } from 'react-router-dom';
import NavbarSticky from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import BookReader from './pages/BookReader';
import Novels from './pages/Novels';
import Genres from './pages/Genres';
import "./App.css"

function App() {
  

  return (
  <div className="flex flex-col min-h-screen">
     {/* Navbar */}
      <NavbarSticky />

      {/* Main Content Area */}
      <div className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/book/:bookId/read" element={<BookReader />} />
            <Route path="/novels" element={<Novels />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/buy-coins" element={<h1 className="text-gray-500 text-3xl">Buy Coins</h1>} />
          </Routes>
      </div>

      {/* Footer */}
      <Footer />
  </div>
  )
}

export default App

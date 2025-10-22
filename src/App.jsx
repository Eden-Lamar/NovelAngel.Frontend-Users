import { Routes, Route, useLocation } from 'react-router-dom';
import NavbarSticky from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import BookReader from './pages/BookReader';
import Novels from './pages/Novels';
import Genres from './pages/Genres';
import Login from './pages/Login';
import "./App.css"

function App() {
  const location = useLocation();

  // Check if the current path is NOT login or signup
  const showFooterAndNav = location.pathname !== "/login" && location.pathname !== "/signup";

  return (
  <div className="flex flex-col min-h-screen">
    {/* Navbar */}
    {showFooterAndNav && <NavbarSticky />}

      {/* Main Content Area */}
      <div className={`flex-grow ${
                      location.pathname === "/login" || location.pathname === "/signup"
                        ? ""
                        : "container mx-auto"
                    }`}
      >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/book/:bookId/read" element={<BookReader />} />
            <Route path="/novels" element={<Novels />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/buy-coins" element={<h1 className="text-gray-500 text-3xl">Buy Coins</h1>} />
          </Routes>
      </div>

      {/* Footer */}
      {showFooterAndNav && <Footer />}
  </div>
  )
}

export default App

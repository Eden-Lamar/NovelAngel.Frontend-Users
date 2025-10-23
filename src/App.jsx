import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavbarSticky from './components/Navbar';
import Footer from './components/Footer'; 
import ScrollToTop from "./components/ScrollToTop";
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import BookReader from './pages/BookReader';
import Novels from './pages/Novels';
import Genres from './pages/Genres';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyCoins from './pages/BuyCoins';
import PaymentSuccess from "./pages/PaymentSuccess";
import { useAuth } from "./context/useAuth";
import "./App.css"

function App() {
  const location = useLocation();
  const { refreshUser, isAuthenticated } = useAuth();

  // Paths that should NOT show the navbar or footer
  const hideNavAndFooterPaths = ["/login", "/signup", "/payment/success"];

  // Check if the current path starts with any of the excluded routes
  const showFooterAndNav = !hideNavAndFooterPaths.some(path =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
      let isMounted = true;

      const run = async () => {
        if (isAuthenticated && isMounted) {
          await refreshUser();
        }
      };

      run();

      return () => { isMounted = false; };
  }, [location.pathname]); // triggers on every page navigation

  return (
  <div className="flex flex-col min-h-screen">
    {/* Navbar */}
    {showFooterAndNav && <NavbarSticky />}

      {/* Main Content Area */}
      <div className={`flex-grow ${
        showFooterAndNav
            ? "container mx-auto"
            : ""
        }`}
      >
        {/* Scroll to Top */}
        <ScrollToTop />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/book/:bookId/read" element={<BookReader />} />
            <Route path="/novels" element={<Novels />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/buy-coins" element={<BuyCoins />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
          </Routes>
      </div>

      {/* Footer */}
      {showFooterAndNav && <Footer />}
  </div>
  )
}

export default App

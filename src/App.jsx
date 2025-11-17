import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NavbarSticky from './components/Navbar';
import Footer from './components/Footer'; 
import ScrollToTop from "./components/ScrollToTop";
import NetworkStatusAlert from './components/NetworkStatusAlert';
import SignUpBanner from './components/SignUpBanner';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import BookReader from './pages/BookReader';
import Novels from './pages/Novels';
import Genres from './pages/Genres';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyCoins from './pages/BuyCoins';
import PaymentSuccess from "./pages/PaymentSuccess";
import Profile from "./pages/Profile";
import Library from "./pages/Library";
import { useAuth } from "./context/useAuth";
import 'animate.css';
import "./App.css"

// Configure NProgress (like YouTube/GitHub)
NProgress.configure({
    showSpinner: false, // Don't show the spinner
    trickle: true,
		trickleSpeed: 200, // How fast the "trickle" runs
		minimum: 0.3,        // Never start below 30%
		easing: 'ease',
		speed: 500,    
});

function App() {
  const location = useLocation();

	// Add the NProgress effect hook
  useEffect(() => {
    NProgress.start();

		const timer = setTimeout(() => {
			NProgress.done();
		}, 300); // Minimum 300ms visible progress

		return () => {
			clearTimeout(timer);
			NProgress.done();
		};
  }, [location.pathname]); // Use pathname only to avoid unnecessary triggers

  useEffect(() => {
    const { pathname } = location;
    let title = "Novel Angel - Read Novels Online";

    switch (true) {
      case pathname === "/":
        title = "Novel Angel | Read Novels Online & Discover Web Novels";
        break;
      case pathname.startsWith("/book/") && pathname.endsWith("/read"):
        title = "Reading - Novel Angel";
        break;
      case pathname.startsWith("/book/"):
        title = "Book Details - Novel Angel";
        break;
      case pathname === "/novels":
        title = "All Novels - Novel Angel";
        break;
      case pathname === "/genres":
        title = "Genres - Novel Angel";
        break;
      case pathname === "/buy-coins":
        title = "Buy Coins - Novel Angel";
        break;
      case pathname === "/profile":
        title = "Your Profile - Novel Angel";
        break;
      case pathname === "/library":
        title = "Your Library - Novel Angel";
        break;
      case pathname === "/login":
        title = "Login - Novel Angel";
        break;
      case pathname === "/signup":
        title = "Sign Up - Novel Angel";
        break;
      case pathname === "/payment/success":
        title = "Payment Successful - Novel Angel";
        break;
      default:
        title = "Novel Angel - Read Novels Online";
    }

    document.title = title;
  }, [location]);

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
  }, [location.pathname]); // triggers on every page navigation (NOTE: can be optimized further if needed by removing it from here and only referencing in buy coin page, home page and book reader page)

  return (
  <div className="flex flex-col min-h-screen relative">
    {/* NEW: banner only when logged out */}
    {showFooterAndNav && !isAuthenticated && <SignUpBanner />}

    {/* Navbar */}
    {showFooterAndNav && <NavbarSticky />}

    {/* Network Status Alert - Always rendered, but conditionally visible */}
    <NetworkStatusAlert />

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/library" element={<Library />} />
          </Routes>
      </div>

      {/* Footer */}
      {showFooterAndNav && <Footer />}
  </div>
  )
}

export default App

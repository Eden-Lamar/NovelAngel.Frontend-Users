import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaDiscord, FaReddit } from 'react-icons/fa';
import logo from '../assets/logo.png';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-[#1a1b23] via-[#0f1419] dark:via-[gray-700] to-[#1a1b23] text-gray-300 pt-16 pb-8 mt-20 border-t border-gold/20">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      {/* Floating glow effects */}
      {/* <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" /> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo}
                alt="Novel Angel Logo"
                className="h-12 w-12 group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-3xl font-bold font-vibes text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500">
                Novel Angel
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover captivating Asian novels translated into English. 
              Your gateway to stories from China, Japan, and Korea.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gold/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-gold/50"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gold/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gold/50"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gold/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-gold/50"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gold/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-gold/50"
              >
                <FaDiscord className="text-lg" />
              </a>
              <a
                href="https://reddit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gold/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-gold/50"
              >
                <FaReddit className="text-lg" />
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-gold to-cyan-500 rounded-full" />
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/novels" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  Browse Novels
                </Link>
              </li>
              <li>
                <Link to="/genres" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  Genres
                </Link>
              </li> 
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-gold to-cyan-500 rounded-full" />
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/bl" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  BL Novels
                </Link>
              </li>
              <li>
                <Link to="/category/gl" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  GL Novels
                </Link>
              </li>
              <li>
                <Link to="/category/bg" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  BG Novels
                </Link>
              </li>
              <li>
                <Link to="/buy-coins" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  Buy Coins
                </Link>
              </li>
              <li>
                <Link to="/my-library" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  My Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-gold to-cyan-500 rounded-full" />
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="border-t border-gray-700 pt-8 pb-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-bold text-white">Stay Updated</h3>
            <p className="text-sm text-gray-400">
              Subscribe to get notified about new chapters, releases, and exclusive content
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 text-white placeholder-gray-500 transition-all duration-300"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-gold to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/50 hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Novel Angel. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="hover:text-gold transition-colors duration-300">
              Privacy
            </Link>
            <Link to="#" className="hover:text-gold transition-colors duration-300">
              Terms
            </Link>
            <Link to="#" className="hover:text-gold transition-colors duration-300">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import Hero from '../components/Hero';
import TrendingBooks from '../components/TrendingBooks';
import NewStories from '../components/NewStories';
import RecentlyAdded from '../components/RecentlyAdded';
import BLNovels from '../components/BLNovels';
import GLNovels from '../components/GLNovels';
import BGNovels from '../components/BGNovels';
import NoCPNovels from '../components/NoCPNovels';
import DiverseReaders from '../components/DiverseReaders'
import ContinueReadingHome from '../components/ContinueReadingHome';
import { useAuth } from '../context/useAuth';
import Logo from '../assets/logo.png';

// Define a key for storage and a cache duration (e.g., 5 minutes)
const CACHE_KEY = 'home_page_data';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Module-level variable to track if we've checked the navigation type for this session.
// This resets to 'false' only when the user refreshes/reloads the page.
let hasCheckedForReload = false;

function Home() {
  const { isAuthenticated } = useAuth();
  
  // Initialize states
  const [newBooks, setNewBooks] = useState([]);
  const [loadingNew, setLoadingNew] = useState(true);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [blNovels, setBLNovels] = useState([]);
  const [loadingBL, setLoadingBL] = useState(true);
  const [glNovels, setGLNovels] = useState([]);
  const [loadingGL, setLoadingGL] = useState(true);
  const [bgNovels, setBGNovels] = useState([]);
  const [loadingBG, setLoadingBG] = useState(true);
  const [noCPNovels, setNoCPNovels] = useState([]);
  const [loadingNoCP, setLoadingNoCP] = useState(true);

  // Fetch new books from API
  useEffect(() => {
    const fetchHomeData = async () => {
    
      // 0. CHECK FOR HARD REFRESH
      // If the user hit "Refresh/Reload", we want to clear the cache and fetch fresh data.
      // We only check this once per page load (using the flag).
      if (!hasCheckedForReload) {
        const navEntry = performance.getEntriesByType("navigation")[0];
        // 'reload' indicates a browser refresh
        if (navEntry?.type === 'reload' || (typeof performance !== 'undefined' && performance.navigation?.type === 1)) {
            sessionStorage.removeItem(CACHE_KEY);
        }
        hasCheckedForReload = true;
      }

      // 1. Check if we have valid cached data first
      const cached = sessionStorage.getItem(CACHE_KEY);
      
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;

        if (!isExpired) {
          // RESTORE DATA FROM CACHE INSTANTLY
          setNewBooks(data.newBooks);
          setTrendingBooks(data.trendingBooks);
          setRecentlyAdded(data.recentlyAdded);
          setBLNovels(data.blNovels);
          setGLNovels(data.glNovels);
          setBGNovels(data.bgNovels);
          setNoCPNovels(data.noCPNovels);

          // Turn off all loaders immediately
          setLoadingNew(false);
          setLoadingTrending(false);
          setLoadingRecent(false);
          setLoadingBL(false);
          setLoadingGL(false);
          setLoadingBG(false);
          setLoadingNoCP(false);
          
          return; // Exit function, no need to fetch
        }
      }

      // 2. If no cache or expired, fetch fresh data from API
      try {
        const [newRes, trendingRes, recentRes, blRes, glRes, bgRes, noCPRes] = await Promise.all([
          api.get('/books/new'),
          api.get('/books/trending'),
          api.get('/books/latest-updates'),
          api.get('/books/search?category=BL'),
          api.get('/books/search?category=GL'),
          api.get('/books/search?category=BG'),
          api.get('/books/search?category=No%20CP'),
        ]);

        const fetchedData = {
          newBooks: newRes.data.status === 'success' ? newRes.data.data : [],
          trendingBooks: trendingRes.data.status === 'success' ? trendingRes.data.data : [],
          recentlyAdded: recentRes.data.status === 'success' ? recentRes.data.data : [],
          blNovels: blRes.data.status === 'success' ? blRes.data.data : [],
          glNovels: glRes.data.status === 'success' ? glRes.data.data : [],
          bgNovels: bgRes.data.status === 'success' ? bgRes.data.data : [],
          noCPNovels: noCPRes.data.status === 'success' ? noCPRes.data.data : []
        };

        // Set State
        setNewBooks(fetchedData.newBooks);
        setTrendingBooks(fetchedData.trendingBooks);
        setRecentlyAdded(fetchedData.recentlyAdded);
        setBLNovels(fetchedData.blNovels);
        setGLNovels(fetchedData.glNovels);
        setBGNovels(fetchedData.bgNovels);
        setNoCPNovels(fetchedData.noCPNovels);

        // 3. Save to Session Storage
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: fetchedData
        }));

      } catch (error) {
        console.error('Error fetching new books:', error.message);
      } finally {
        setLoadingNew(false);
        setLoadingTrending(false);
        setLoadingRecent(false);
        setLoadingBL(false);
        setLoadingGL(false);
        setLoadingBG(false);
        setLoadingNoCP(false);
      }
    };

    fetchHomeData();
  }, []);

  // Mock data for development (remove when API is ready)
  const mockBooks = [
    { _id: '1', title: 'Novel Angel', bookImage: Logo },
    { _id: '2', title: 'Novel Angel', bookImage: Logo },
    { _id: '3', title: 'Novel Angel', bookImage: Logo },
    { _id: '4', title: 'Novel Angel', bookImage: Logo },
    { _id: '5', title: 'Novel Angel', bookImage: Logo },
    { _id: '6', title: 'Novel Angel', bookImage: Logo },
    { _id: '7', title: 'Novel Angel', bookImage: Logo },
    { _id: '8', title: 'Novel Angel', bookImage: Logo },
    { _id: '9', title: 'Novel Angel', bookImage: Logo },
    { _id: '10', title: 'Novel Angel', bookImage: Logo },
  ];

  const booksToDisplay = newBooks.length > 0 ? newBooks : mockBooks;
  const trendingBooksToDisplay = trendingBooks.length > 0 ? trendingBooks : mockBooks;
  const recentBooksToDisplay = recentlyAdded.length > 0 ? recentlyAdded : mockBooks;


  return (
    <div className=''>
      {/* Conditionally render Hero or ContinueReading */}
        {isAuthenticated ? (
          <ContinueReadingHome />
        ) : (
          <Hero books={booksToDisplay} loading={loadingNew} />
        )}

      <TrendingBooks books={trendingBooksToDisplay} loading={loadingTrending} />
      <NewStories books={booksToDisplay} loading={loadingNew} />
      <div className="divider px-4" />
      <RecentlyAdded books={recentBooksToDisplay} loading={loadingRecent} />
      
        {(blNovels.length > 0 || loadingBL) && (
          <>
            <div className="divider px-4" />
            <BLNovels books={blNovels} loading={loadingBL} />
          </>
        )}

        {(glNovels.length > 0 || loadingGL) && (
          <>
            <GLNovels books={glNovels} loading={loadingGL} />
          </>
        )}

        {(bgNovels.length > 0 || loadingBG) && (
          <>
            <BGNovels books={bgNovels} loading={loadingBG} />
          </>
        )}

        {(noCPNovels.length > 0 || loadingNoCP) && (
          <>
            <NoCPNovels books={noCPNovels} loading={loadingNoCP} />
            <div className="divider px-4" />
          </>
        )}
        
        <DiverseReaders />
    </div>
  );
}

export default Home;
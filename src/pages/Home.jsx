import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import TrendingBooks from '../components/TrendingBooks';

function Home() {
  const [newBooks, setNewBooks] = useState([]);
  const [loadingNew, setLoadingNew] = useState(true);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);


  // Fetch new books from API
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [newRes, trendingRes] = await Promise.all([
          axios.get('http://localhost:3000/api/v1/books/new'),
          axios.get('http://localhost:3000/api/v1/books/trending'),
        ]);

        if (newRes.data.status === 'success') {
          setNewBooks(newRes.data.data);
        }
        if (trendingRes.data.status === 'success') {
          setTrendingBooks(trendingRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching new books:', error);
      } finally {
        setLoadingNew(false);
        setLoadingTrending(false);
      }
    };

    fetchHomeData();
  }, []);

  // Mock data for development (remove when API is ready)
  const mockBooks = [
    { _id: '1', title: 'Heaven Official\'s Blessing', bookImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=450&fit=crop' },
    { _id: '2', title: 'Mo Dao Zu Shi', bookImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop' },
    { _id: '3', title: 'The Scum Villain', bookImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=450&fit=crop' },
    { _id: '4', title: 'Thousand Autumns', bookImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop' },
    { _id: '5', title: 'Silent Reading', bookImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=450&fit=crop' },
    { _id: '6', title: 'Guardian', bookImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop' },
    { _id: '7', title: 'Sha Po Lang', bookImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&h=450&fit=crop' },
    { _id: '8', title: 'Liu Yao', bookImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop' },
    { _id: '9', title: 'Poyun', bookImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop' },
    { _id: '10', title: 'Breaking Through the Clouds', bookImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=450&fit=crop' },
  ];

  const booksToDisplay = newBooks.length > 0 ? newBooks : mockBooks;
    const trendingBooksToDisplay = trendingBooks.length > 0 ? trendingBooks : mockBooks;


  return (
    <div>
      <Hero books={booksToDisplay} loading={loadingNew} />
      <TrendingBooks books={trendingBooksToDisplay} loading={loadingTrending} />
    </div>
  );
}

export default Home;
import { useEffect, useState } from "react";
import axios from "axios";
import { capitalize } from 'lodash';
import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Chip } from "@heroui/chip";
import { Link } from "react-router-dom";
import { startCase } from 'lodash';

function BookRecommendations() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/v1/books/recommendations");
        setBooks(res.data.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 p-2">
          {Array(5).fill(0).map((_, i) => (
            <Card key={i}>
              <CardBody className="p-0">
                <Skeleton className="w-full h-[220px] rounded-lg" />
                <Skeleton className="h-4 w-3/4 mt-2 rounded-full m-3 px-1" />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 mt-6 text-center">{error}</p>;
  }

  if (!books.length) {
    return <p className="text-gray-500 mt-6 text-center">No recommendations</p>;
  }

  return (
    <div className="mt-10">
			<div className="">
				<Chip
					color="secondary"
					variant="flat"
					size="md"
					className="text-sm"
				>
					You Might Also Like 💫
				</Chip>
			</div>
      <div className="flex gap-4 overflow-x-auto px-2 py-4 snap-x snap-mandatory">
        {books.map(book => (
          <Link
            key={book._id}
            to={`/book/${book._id}`}
            className="group block flex-shrink-0 w-[180px] transition-transform transform hover:scale-[1.01] snap-start"
          >
            <Card className="h-full border border-gray-700/50 transition-all duration-300 
							hover:border-amber-400/50 
							hover:shadow-[0_0_4px_rgba(251,191,36,0.6)]">
              <CardBody className="p-0 flex flex-col items-center">
                <div className="relative w-full ">
                  <img
                    src={book.bookImage}
                    alt={book.title}
                    decoding="async"
                    loading="lazy"
                    className="object-cover w-full h-[220px] rounded-lg"
                  />

                  {/* Status Badge */}
                  <Chip
                      color={book.status === 'ongoing' ? 'warning' : 'success'}
                      variant="flat"
                      size="sm"
                      classNames={{
                      base: "absolute top-2 left-2 uppercase font-bold backdrop-blur-md z-10",
                      content: book.status === "ongoing" 
                        ? "text-yellow-500" 
                        : "text-green-500"
                    }}
                  >
                    {capitalize(book.status)}
                  </Chip>

                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent"/>
                </div>

                <h3 className="text-sm font-semibold text-center my-2 text-gray-800 dark:text-gray-400 line-clamp-2 px-3 group-hover:text-amber-400 group-hover:dark:text-amber-400  transition-colors duration-300">
                  {startCase(book.title)}
                </h3>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookRecommendations;

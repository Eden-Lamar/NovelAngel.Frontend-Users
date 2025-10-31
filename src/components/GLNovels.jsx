import { useState } from 'react';
import { Chip } from "@heroui/chip";
import { capitalize } from "lodash";
import { useNavigate } from 'react-router-dom';
import HorizontalScrollContainer from "./HorizontalScrollContainer";
import BookHoverCard from "./BookHoverCard";
import { getCountryFlagCode } from "../helperFunction";
import SkeletonBookCard from './SkeletonBookCard';
import ViewMoreButton from './ViewMoreButton'

function GLNovels({ books, loading }) {
  const [hoveredBook, setHoveredBook] = useState(null);
  // const [showLeftArrow, setShowLeftArrow] = useState(false);
  // const [showRightArrow, setShowRightArrow] = useState(true);
  // const scrollContainerRef = useRef(null);

  const navigate = useNavigate();

  return (
    <div className="relative py-2.5 md:py-5 w-full">
      <div className="mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between">
          <Chip
            color="primary"
            variant="flat"
            size="md"
            className="text-sm"
          >
            GL Novels 🌸
          </Chip>
          <ViewMoreButton category="GL"/>
        </div>

        {loading ? (
          <HorizontalScrollContainer>
            <div className="overflow-x-auto overflow-y-visible pb-8 pt-4 scrollbar-hide">
              <div className="flex gap-14 min-w-max px-10">
                {[...Array(8)].map((_, index) => (
                  <SkeletonBookCard key={`gl-skeleton-${index}`} index={index} />
                ))}
              </div>
            </div>
          </HorizontalScrollContainer>
        ) : (
          <HorizontalScrollContainer gap="gap-14">
                {books.slice(0, 10).map((book) => (
                  <div
                    key={book._id}
                    className="relative group cursor-pointer overflow-visible flex-shrink-0 w-[220px]"
                    onMouseEnter={() => setHoveredBook(book._id)}
                    onMouseLeave={() => setHoveredBook(null)}
                    onClick={() => navigate(`/book/${book._id}`)}
                  >
                    <div
                      className={`relative z-10 w-[220px] transition-transform duration-500 ease-out ${
                        hoveredBook === book._id ? 'scale-110' : ''
                      }`}
                      style={{ transformOrigin: 'center center' }}
                    >
                      <div
                        className={`relative overflow-hidden rounded-xl shadow-md transition-all duration-500 ${
                          hoveredBook === book._id ? 'shadow-cyan-500/50' : ''
                        }`}
                      >
                        <div className="aspect-[3/4] w-full">
                          <img
                            src={book.bookImage}
                            alt={book.title}
                            decoding="async"
                            loading="lazy"
                            className="object-cover h-full w-full"
                          />
                        </div>

                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.1)_25%,transparent_50%,rgba(0,0,0,0.1)_75%,rgba(0,0,0,0.55)_100%)]" />

                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                          <h3 className="font-bold text-lg text-white line-clamp-2 mb-1">
                            {capitalize(book.title)}
                          </h3>
                        </div>
                      </div>

                      {book.status && (
                        <div className="absolute top-2 left-2 z-30">
                          <Chip
                            color={book.status === 'ongoing' ? 'warning' : 'success'}
                            variant="flat"
                            size="sm"
                            className={`uppercase text-[10px] ${book.status === "ongoing" ? "text-yellow-500" : "text-green-500" } tracking-wide backdrop-blur-md`}
                          >
                            {book.status}
                          </Chip>
                        </div>
                      )}

                      {book.country && (
                        <div className="absolute top-2 right-2 z-30 w-6 h-6 rounded-full overflow-hidden shadow-md backdrop-blur-sm">
                          <img
                            src={`https://hatscripts.github.io/circle-flags/flags/${getCountryFlagCode(book.country)}.svg`}
                            alt={`${book.country} flag`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://hatscripts.github.io/circle-flags/flags/un.svg';
                            }}
                          />
                        </div>
                      )}

                      {/* Expanded Content on Hover */}
                      {hoveredBook === book._id && <BookHoverCard book={book} />}
                    </div>
                  </div>
                ))}
            </HorizontalScrollContainer>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default GLNovels;
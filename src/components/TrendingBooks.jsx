import { useState, useRef } from 'react';
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { capitalize } from "lodash";
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { getCountryFlagCode } from "../helperFunction";
import SkeletonBookCard from './SkeletonBookCard';

function TrendingBooks({ books, loading }) {
  const [hoveredBook, setHoveredBook] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const navigate = useNavigate();

  // Handle scroll to check arrow visibility
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -800,
        behavior: 'smooth'
      });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 800,
        behavior: 'smooth'
      });
    }
  };


  return (
    <div className="relative bg-white dark:bg-[#1a1b23] py-2.5 md:py-10 w-full">
      <div className="mx-auto px-4">
        {/* Section Header */}
        <div className="mb-4">
          <Chip
            color="warning"
            variant="flat"
            size="lg"
            className="text-sm"
          >
            Trending This Week 🔥
          </Chip>
        </div>

        {loading ? (
         // Skeleton Loader
          <div className="relative group/container">
            {/* Skeleton scroll container */}
            <div className="overflow-x-auto overflow-y-visible pb-16 pt-4 scrollbar-hide">
              <div className="flex gap-14 min-w-max px-10">
                {[...Array(8)].map((_, index) => (
                  <SkeletonBookCard index={index} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative group/container">
             {/* Left Arrow Button */}
            {showLeftArrow && (
              <Button
                isIconOnly
                variant="flat"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm opacity-0 group-hover/container:opacity-100 transition-opacity duration-300 h-1/2 w-8 rounded-lg"
                onClick={scrollLeft}
              >
                <IoChevronBack className="text-3xl" />
              </Button>
            )}

            {/* Right Arrow Button */}
            {showRightArrow && (
              <Button
                isIconOnly
                variant="flat"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm opacity-0 group-hover/container:opacity-100 transition-opacity duration-300 h-1/2 w-8 rounded-lg"
                onClick={scrollRight}
              >
                <IoChevronForward className="text-3xl" />
              </Button>
            )}

            {/* Horizontal Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="overflow-x-auto overflow-y-visible pb-16 pt-4 scrollbar-hide"
            >
              <div className="flex gap-14 min-w-max px-10">
                {books.slice(0, 10).map((book, index) => (
                  <div
                    key={book._id}
                    className="relative group cursor-pointer overflow-visible"
                    onMouseEnter={() => setHoveredBook(book._id)}
                    onMouseLeave={() => setHoveredBook(null)}
                    onClick={() => navigate(`/book/${book._id}`)}
                  >
                    {/* Ranking Number - Behind the book */}
                    <div className="absolute -left-15 top-0 z-50 pointer-events-none">
                      <svg
                        width="160"
                        height="260"
                        viewBox="0 0 160 260"
                        className="drop-shadow-2xl"
                      >
                        <defs>
                          {/* Subtle blur for glow */}
                          <filter id={`glassBlur-${index}`}>
                            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
                          </filter>

                          {/* Frosted glass fill gradient (like backdrop-blur-md) */}
                          <linearGradient id={`frostedFill-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                          </linearGradient>

                          {/* Animated cyan shimmer applied to stroke */}
                          <linearGradient id={`animatedCyanStroke-${index}`} x1="0%" y1="0%" x2="200%" y2="0%">
                            <stop offset="0%" stopColor="#00FFFF" />
                            <stop offset="25%" stopColor="#00BFFF" />
                            <stop offset="50%" stopColor="#00FFFF" />
                            <stop offset="75%" stopColor="#00BFFF" />
                            <stop offset="100%" stopColor="#00FFFF" />
                            <animateTransform
                              attributeName="gradientTransform"
                              type="translate"
                              from="-1 0"
                              to="1 0"
                              dur="4s"
                              repeatCount="indefinite"
                            />
                          </linearGradient>
                        </defs>

                        {(() => {
                          const text = (index + 1).toString();
                          const isDoubleDigit = text.length > 1;
                          const fontSize = 120;
                          const spacing = isDoubleDigit ? '-2px' : '-8px';

                          return (
                            <>
                              {/* Glass translucent fill (frosted effect) */}
                              <text
                                x="50%"
                                y="50%"
                                dominantBaseline="middle"
                                textAnchor="middle"
                                fontSize={fontSize}
                                fontWeight="900"
                                fill={`url(#frostedFill-${index})`}
                                opacity="0.8"
                                style={{
                                  paintOrder: 'stroke fill',
                                  stroke: 'rgba(255,255,255,0.15)',
                                  strokeWidth: 2,
                                  letterSpacing: spacing,
                                  filter: 'blur(1px)',
                                }}
                              >
                                {text}
                              </text>

                              {/* Cyan shimmer stroke (animated) */}
                              <text
                                x="50%"
                                y="50%"
                                dominantBaseline="middle"
                                textAnchor="middle"
                                fontSize={fontSize}
                                fontWeight="900"
                                fill="none"
                                stroke={`url(#animatedCyanStroke-${index})`}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                filter={`url(#glassBlur-${index})`}
                                opacity="0.9"
                                style={{
                                  letterSpacing: spacing,
                                }}
                              >
                                {text}
                              </text>
                            </>
                          );
                        })()}
                      </svg>
                    </div>

                    {/* Book Card */}
                    <div
                      className={`relative z-10 w-[220px] sm:w-[160xp] transition-transform duration-500 ease-out ${
                      hoveredBook === book._id ? 'scale-110' : null
                    }`}
                      style={{ transformOrigin: 'center center' }}
                    >
                      {/* Book Cover */}
                      <div
                        className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ${
                          hoveredBook === book._id
                            ? 'shadow-cyan-500/50'
                            : null
                        }`}
                      >
                        <div className="aspect-[3/4] w-full">
                          <img
                            src={book.bookImage}
                            alt={book.title}
                            className="object-cover h-full w-full"
                          />
                        </div>

                        {/* Gradient overlay - always visible */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.1)_25%,transparent_50%,rgba(0,0,0,0.1)_75%,rgba(0,0,0,0.55)_100%)]" />

                        {/* Title - always visible at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                          <h3 className="font-bold text-lg text-white line-clamp-2 mb-1">
                            {capitalize(book.title)}
                          </h3>
                        </div>
                      </div>

                      {/* Book Status (Top-Left Corner) */}
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

                    {/* Country Flag */}
                    {book.country && (
                            <div className="absolute top-2 right-2 z-30 w-6 h-6 rounded-full overflow-hidden shadow-md backdrop-blur-sm">
                                <img
                                    src={`https://hatscripts.github.io/circle-flags/flags/${getCountryFlagCode(book.country)}.svg`}
                                    alt={`${book.country} flag`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to UN flag if flag fails to load
                                        e.target.src = 'https://hatscripts.github.io/circle-flags/flags/un.svg';
                                    }}
                                />
                            </div>
                          )}
                      

                      {/* Expanded Content on Hover */}
                      {hoveredBook === book._id && (
                        <div className={`hidden md:block absolute 
                          ${
                          book.title.length > 25 ? 'top-[40%]' : 'top-[48%]'}
                          left-0 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 z-30 animate-fadeIn`}>
												{/* Title */}
												<h4 className="font-bold text-base text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 leading-5">{capitalize(book.title)}</h4>

                          {/* Tags */}
                          <div className="flex gap-1 mb-3">
                            {book.tags?.slice(0, 3).map((tag, tagIndex) => (
                              <Chip
                                key={tagIndex}
                                color="primary"
                                variant="flat"
                                size="sm"
                                className="text-xs"
                              >
                                {capitalize(tag)}
                              </Chip>
                            ))}
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                            {book.description || 'No description available'}
                          </p>

                          {/* Stats */}
                          {/* <div className="flex gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                              <span>{book.views || 0} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                              <span>{book.likeCount || 0} likes</span>
                            </div>
                          </div> */}
                        </div>
                      )}
                    </div>

                    {/* Glow effect on hover */}
                    {/* {hoveredBook === book._id && (
                      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gold/20 to-amber-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
                    )} */}
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicator */}
            {/* <div className="flex justify-center mt-8 gap-2">
              <div className="h-1 w-16 bg-gold rounded-full" />
              <div className="h-1 w-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
              <div className="h-1 w-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div> */}
          </div>
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
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default TrendingBooks;
import { useState } from 'react';
import { Chip } from "@heroui/chip";
import { capitalize } from "lodash";
import { useNavigate } from 'react-router-dom';
import BookHoverCard from "./BookHoverCard";
import HorizontalScrollContainer from "./HorizontalScrollContainer";
import { getCountryFlagCode } from "../helperFunction";
import SkeletonBookCard from './SkeletonBookCard';

function TrendingBooks({ books, loading }) {
  const [hoveredBook, setHoveredBook] = useState(null);
  // const [showLeftArrow, setShowLeftArrow] = useState(false);
  // const [showRightArrow, setShowRightArrow] = useState(true);
  // const scrollContainerRef = useRef(null);

  const navigate = useNavigate();




  return (
    <div className="relative py-2.5 md:py-5 w-full">
      <div className="mx-auto px-4">
        {/* Section Header */}
        <div className="">
          <Chip
            color="warning"
            variant="flat"
            size="md"
            className="text-sm"
          >
            Trending This Week 🔥
          </Chip>
        </div>

        {loading ? (
            // Skeleton Loader
            <HorizontalScrollContainer>
              {/* Skeleton scroll container */}
                {[...Array(8)].map((_, index) => (
                  <SkeletonBookCard key={index} index={index} />
                ))}
            </HorizontalScrollContainer>
        ) : (
          <HorizontalScrollContainer gap="gap-14">
                {books.slice(0, 10).map((book, index) => (
                  <div
                    key={book._id}
                    className="relative group cursor-pointer overflow-visible"
                    onMouseEnter={() => setHoveredBook(book._id)}
                    onMouseLeave={() => setHoveredBook(null)}
                    onClick={() => navigate(`/book/${book._id}`)}
                  >
                    {/* Ranking Number - Behind the book */}
                    <div className="absolute -left-15 top-0 z-20 pointer-events-none">
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
                        className={`relative overflow-hidden rounded-xl shadow-md transition-all duration-500 ${
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
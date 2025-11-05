import { Button } from "@heroui/button";
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import { capitalize } from "lodash"
import 'animate.css';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


function Hero({ books, loading }) {
	const navigate = useNavigate();

  return (
		<div className="relative overflow-hidden">
      {/* Animated Asian-inspired Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-amber-50/30 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
        {/* Decorative Asian patterns */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="asian-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="currentColor" className="text-gold" />
                <circle cx="75" cy="75" r="2" fill="currentColor" className="text-gold" />
                <path d="M50 10 Q60 25 50 40 Q40 25 50 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#asian-pattern)" />
          </svg>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold/50 rounded-full blur-3xl animate__animated animate__pulse animate__infinite" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/0 dark:bg-cyan-500/20 rounded-full blur-3xl animate__animated animate__pulse animate__infinite delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-amber-500 rounded-full blur-2xl  animate__animated animate__pulse animate__infinite delay-500" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Section - Text Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1 w-full">
            {/* Decorative top accent */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-sm font-medium text-gold uppercase tracking-widest">
              Story Realm
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="block text-gray-900 dark:text-white mb-2">
								Where Stories
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-500 to-cyan-500 animate-gradient">
								Find Their Wings
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Explore unforgettable stories—translated Asian epics, passionate stories, and more.
							Every tale is a journey waiting to unfold.
							Sign up to get personalized picks made just for you.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                color="warning"
                className=" text-white font-semibold px-8 py-6 text-lg hover:scale-[1.02]"
                onClick={() => navigate('/novels')}
              >
                Explore Our Library
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              
              <Button
                size="lg"
                color="warning"
                variant="ghost"
                className=" font-semibold px-8 py-6 text-lg transition-all duration-300"
                onClick={() => navigate('/genres')}
              >
                Browse Genres
              </Button>
            </div>

            {/* Stats */}
            {/* <div className="flex gap-8 justify-center lg:justify-start pt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-500">
                  1000+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Novels</div>
              </div>
              <div className="h-16 w-px bg-gray-300 dark:bg-gray-700" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-500">
                  50K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Readers</div>
              </div>
              <div className="h-16 w-px bg-gray-300 dark:bg-gray-700" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-500">
                  Daily
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Updates</div>
              </div>
            </div> */}
          </div>

          {/* Right Section - 3D Book Carousel */}
          <div className="hidden lg:block order-1 lg:order-2">
            <div className="relative">
              {/* Glow effect behind carousel */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-cyan-500/20 blur-3xl rounded-full scale-110" />
              
              {loading ? (
                <div className="flex items-center justify-center h-[500px]">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gold" />
                </div>
              ) : (
                <Swiper
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView="auto"
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  modules={[EffectCoverflow, Autoplay, Pagination]}
                  className="mySwiper py-12"
                >
                  {books.map((book) => (
                    <SwiperSlide key={book._id} className="!w-64">
                      <div className="relative group cursor-pointer">
                        {/* Book Cover */}
                        <div className="relative overflow-hidden aspect-[3/4] w-full rounded-xl shadow-2xl transition-all duration-500 group-hover:shadow-gold/50">
                          <img
                            src={book.bookImage}
                            alt={book.title}
                            className="object-cover h-full w-full transform transition-transform duration-300 ease-in-out rounded-xl group-hover:scale-105"
                          />
                          
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <div className="text-white">
                              <h3 className="font-bold text-lg mb-2 line-clamp-2 text-cyan-500">{capitalize(book.title)}</h3>
                              <p className="text-sm text-gray-300">Click to read</p>
                            </div>
                          </div>

                          {/* New badge */}
                          {/* <div className="absolute top-4 right-4 bg-gradient-to-r from-gold to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            NEW
                          </div> */}
                        </div>

                        {/* Reflection effect */}
                        <div className="absolute -bottom-2 left-0 right-0 h-20 bg-gradient-to-b from-black/20 to-transparent blur-xl opacity-50" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* Decorative text */}
              {/* <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Latest Additions
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 fill-current text-gray-400 dark:text-gray-600" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .swiper-pagination-bullet {
          background: #FFD700;
        }

        .swiper-pagination-bullet-active {
          background: #FFD700;
        }

        .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
	)
}

export default Hero;

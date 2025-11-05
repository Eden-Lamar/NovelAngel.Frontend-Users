import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { startCase } from "lodash";
import { Card, CardBody } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { Skeleton } from "@heroui/skeleton";
import { Chip } from "@heroui/chip";
import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { useAuth } from "../context/useAuth";
import ViewMoreButton from "./ViewMoreButton";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

function ContinueReadingHome() {
    const { auth } = useAuth();
    const [continueReading, setContinueReading] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContinueReading = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/continue-reading');
                setContinueReading(response.data.data || []);
            } catch (err) {
                console.error("Error fetching continue reading:", err);
            } finally {
                setLoading(false);
            }
        };

        if (auth?.token) {
            fetchContinueReading();
        }
    }, [auth?.token]);

    // Calculate progress percentage
    const calculateProgress = (lastChapterNum, totalChapters) => {
        if (!totalChapters) return 0;
        return Math.round((lastChapterNum / totalChapters) * 100);
    };

    // Limit to 5 items
    const displayBooks = continueReading.slice(0, 6);

    if (!loading && displayBooks.length === 0) {
        return null; // Don't show anything if no continue reading items
    }

    return (
        <div className="relative py-2.5 md:py-5 w-full">
            <div className="mx-auto px-4">
                {/* Section Header */}
                <div className="flex justify-between items-center mb-4">
                    <Chip
                        color="danger"
                        variant="flat"
                        size="md"
                        className="text-sm"
                    >
                        <div className="flex items-center gap-1.5">
                            <FaPlay />
                            <span>Continue Reading</span>
                        </div>
                    </Chip>
                    {!loading && displayBooks.length > 0 && (
                        <ViewMoreButton to="/library" text="View More" />
                    )}
                </div>

                {loading ? (
                    <>
                        {/* Mobile: Horizontal Scroll Skeletons */}
                        <div className="block md:hidden">
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {Array(3).fill(0).map((_, idx) => (
                                    <Card key={idx} className="w-[280px] flex-shrink-0">
                                        <CardBody className="gap-3">
                                            <div className="flex gap-4">
                                                <Skeleton className="w-20 h-28 rounded-lg flex-shrink-0" />
                                                <div className="flex-1 space-y-2">
                                                    <Skeleton className="h-4 w-full rounded-full" />
                                                    <Skeleton className="h-3 w-3/4 rounded-full" />
                                                    <Skeleton className="h-2 w-full rounded-full" />
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Desktop: Grid Skeletons */}
                        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array(3).fill(0).map((_, idx) => (
                                <Card key={idx} className="w-full">
                                    <CardBody className="gap-3">
                                        <div className="flex gap-4">
                                            <Skeleton className="w-24 h-32 rounded-lg flex-shrink-0" />
                                            <div className="flex-1 space-y-3">
                                                <Skeleton className="h-5 w-3/4 rounded-full" />
                                                <Skeleton className="h-4 w-1/2 rounded-full" />
                                                <Skeleton className="h-3 w-full rounded-full" />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Mobile: Swiper with Touch Drag */}
                        <div className="block md:hidden">
                            <Swiper
                                slidesPerView="auto"
                                spaceBetween={16}
                                freeMode={true}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                modules={[FreeMode, Pagination]}
                                className="continue-reading-swiper pb-8"
                            >
                                {displayBooks.map((item) => {
                                    const progress = calculateProgress(item.lastChapter.number, item.totalChapters);
                                    return (
                                        <SwiperSlide key={item.bookId} className="!w-[280px]">
                                            <Card
                                                className="w-full transition-all duration-300 dark:bg-[#09090b] border border-amber-500/50"
                                            >
                                                <CardBody className="gap-3 p-3">
                                                    <div className="flex gap-3">
                                                        {/* Book Cover */}
                                                        <Link
                                                            to={`/book/${item.bookId}`}
                                                            className="flex-shrink-0"
                                                        >
                                                            <img
                                                                src={item.bookImage}
                                                                alt={item.bookTitle}
                                                                decoding="async"
                                                                loading="lazy"
                                                                className="w-20 h-28 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                                                            />
                                                        </Link>

                                                        {/* Book Info */}
                                                        <div className="flex-1 flex flex-col min-w-0">
                                                            <Link
                                                                to={`/book/${item.bookId}`}
                                                                className="hover:text-cyan-500 transition-colors"
                                                            >
                                                                <h3 className="font-bold text-sm line-clamp-2 mb-1">
                                                                    {startCase(item.bookTitle)}
                                                                </h3>
                                                            </Link>
                                                            <Link
                                                                to={`/book/${item.bookId}/read?chapterId=${item.lastChapter.id}`}
                                                                className="text-xs text-gray-600 dark:text-gray-400 hover:text-amber-500 hover:dark:text-amber-500 transition-colors line-clamp-1 mb-2"
                                                            >
                                                                <span className="text-amber-500">Ch {item.lastChapter.number}:</span> {startCase(item.lastChapter.title)}
                                                            </Link>

                                                            {/* Progress */}
                                                            <div className="space-y-1 mt-auto">
                                                                <div className="flex justify-end text-xs">
                                                                    <span className="font-semibold text-cyan-500">{progress}%</span>
                                                                </div>
                                                                <Progress
                                                                    value={progress}
                                                                    color="primary"
                                                                    size="sm"
                                                                    classNames={{
                                                                        indicator: "bg-gradient-to-r from-gold to-cyan-500"
                                                                    }}
                                                                />
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                    {item.lastChapter.number} / {item.totalChapters} chapters
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>

                        {/* Desktop: Grid */}
                        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayBooks.map((item) => {
                                const progress = calculateProgress(item.lastChapter.number, item.totalChapters);
                                return (
                                    <Card
                                        key={item.bookId}
                                        className="w-full transition-all duration-300 dark:bg-[#09090b] border border-amber-500/50"
                                    >
                                        <CardBody className="gap-4">
                                            <div className="flex gap-4">
                                                {/* Book Cover */}
                                                <Link
                                                    to={`/book/${item.bookId}`}
                                                    className="flex-shrink-0"
                                                >
                                                    <img
                                                        src={item.bookImage}
                                                        alt={item.bookTitle}
                                                        decoding="async"
                                                        loading="lazy"
                                                        className="w-24 h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                                                    />
                                                </Link>

                                                {/* Book Info */}
                                                <div className="flex-1 flex flex-col min-w-0">
                                                    <Link
                                                        to={`/book/${item.bookId}/read?chapterId=${item.lastChapter.id}`}
                                                        className="hover:text-cyan-500 transition-colors"
                                                    >
                                                        <h3 className="font-bold text-base line-clamp-1 mb-1">
                                                            {startCase(item.bookTitle)}
                                                        </h3>
                                                    </Link>
                                                    <Link
                                                        to={`/book/${item.bookId}/read?chapterId=${item.lastChapter.id}`}
                                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 hover:dark:text-amber-500 transition-colors line-clamp-1 mb-3"
                                                    >
                                                        <span className="text-amber-500">Chp {item.lastChapter.number}:</span> {startCase(item.lastChapter.title)}
                                                    </Link>

                                                    {/* Progress */}
                                                    <div className="space-y-2 mt-auto">
                                                        <div className="flex justify-end text-xs">
                                                            <span className="font-semibold text-cyan-500">{progress}%</span>
                                                        </div>
                                                        <Progress
                                                            value={progress}
                                                            color="primary"
                                                            size="sm"
                                                            classNames={{
                                                                indicator: "bg-gradient-to-r from-gold to-cyan-500"
                                                            }}
                                                        />
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                            {item.lastChapter.number} / {item.totalChapters} chapters
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                );
                            })}
                        </div>
                    </>
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
                
                .continue-reading-swiper .swiper-pagination-bullet {
                    background: #FFD700;
                }

                .continue-reading-swiper .swiper-pagination-bullet-active {
                    background: #FFD700;
                }
            `}</style>
        </div>
    );
}

export default ContinueReadingHome;
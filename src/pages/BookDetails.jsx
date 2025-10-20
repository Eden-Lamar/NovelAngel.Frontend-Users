import { useState, useEffect } from "react";
import axios from "axios";
import { startCase, truncate, capitalize } from 'lodash';
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegEye, FaBookOpen, FaBookReader, FaLock, FaBookmark } from "react-icons/fa";
import { RiArrowDownWideFill } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import 'animate.css';
import { getCountryFlagCode } from "../helperFunction";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [activeTab, setActiveTab] = useState('summary');
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [bookmarkLoading, setBookmarkLoading] = useState(false);
    
    // TODO: Replace with actual auth context when implemented
    const auth = null; // Set to null for anonymous access

		console.log(navigate)

    // Fetch book details
    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            try {
                const bookResponse = await axios.get(`http://localhost:3000/api/v1/books/${id}`);
                
                // If user is authenticated, fetch like/bookmark status
                // For now, these will remain false for anonymous users
                
                setBook(bookResponse.data.data);
                setError(null);
            } catch (err) {
                const errorMessage = err.response?.data?.message || "Failed to load book details.";
                setError(errorMessage);
                console.error("Error fetching book details:", errorMessage);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);
                
    // Clear error after 10 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 10000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    
    // Toggle Like (requires authentication)
    const handleToggleLike = async () => {
        if (!auth) {
            setError("Please log in to like this book.");
            // TODO: Navigate to login when auth is implemented
            // navigate('/login', { state: { from: `/book/${id}` } });
            return;
        }
        // Like logic will be implemented with auth
    };
    
    // Toggle Bookmark (requires authentication)
    const handleToggleBookmark = async () => {
        if (!auth) {
            setError("Please log in to bookmark this book.");
            // TODO: Navigate to login when auth is implemented
            // navigate('/login', { state: { from: `/book/${id}` } });
            return;
        }
        // Bookmark logic will be implemented with auth
    };

    // Calculate free and locked chapters
    const getChapterStats = (chapters) => {
        const free = chapters.filter(ch => ch.isLocked === false).length;
        const locked = chapters.length - free;
        return { free, locked };
    };

    // Format release date
    const formatDate = (date) => {
        const fullDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        const year = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric'
        });
        return { fullDate, year };
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            {/* Error Alert */}
            {error && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 w-4/5 lg:w-1/2 z-50 animate__animated animate__fadeInDown">
                    <div className="bg-red-500/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
                        <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            )}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Section: Image and Details */}
                <div className=" w-full lg:w-1/3 flex flex-col gap-4">
                    {/* Book Image */}
                    {loading ? (
											<Skeleton className="relative h-[442.2px] w-[300px] aspect-[3/4] sm:aspect-[2/2.5] md:aspect-[3/4] rounded-xl shadow-2xl" />
                    ) : book ? (
                        <div className="relative h-[442.2px] w-[300px] aspect-[3/4] sm:aspect-[2/2.5] md:aspect-[3/4] rounded-xl shadow-2xl group overflow-hidden">
                            <img
                                src={book.bookImage}
                                alt={book.title}
																width={300}
																height={400}
																decoding="async"
                                className="object-cover w-full h-full transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />
                            {/* Gradient Overlay */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent bg-opacity-100"></div> */}

														{/* Gradient Overlay */}
														<div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.1)_25%,transparent_50%,rgba(0,0,0,0.1)_75%,rgba(0,0,0,0.55)_100%)]" />

                            {/* Status Badge */}
                            <Chip
                                color={book.status === 'ongoing' ? 'warning' : 'success'}
                                variant="flat"
                                className={`absolute top-4 left-4 uppercase font-bold ${book.status === "ongoing" ? "text-yellow-500" : "text-green-500" } backdrop-blur-md`}
                            >
                                {capitalize(book.status)}
                            </Chip>
                                
                            {/* Stats */}
                            <div className="flex justify-between absolute bottom-0 left-0 p-4 w-full">
                                <p className="text-gold text-lg flex items-center gap-2 font-semibold">
                                    <FaHeart /> {book.likeCount || 0}
                                </p>
                                <p className="text-gray-300 text-lg flex items-center gap-2 font-semibold">
                                    <FaRegEye /> {book.views || 0}
                                </p>
                            </div>
                        </div>
                    ) : null}

                    {/* Tags */}
                    {loading ? (
                        <div className="flex gap-2 flex-wrap">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-18 rounded-full" />
                        </div>
                    ) : book ? (
                        <div className="flex gap-2 flex-wrap">
                            {book.tags.map((tag, index) => (
                                <Chip key={index} color="primary" variant="bordered" size="sm">
                                    {startCase(tag)}
                                </Chip>
                            ))}
                        </div>
                    ) : null}

                    {/* Book Details Card */}
                    {loading ? (
                        <Card className="w-[full]">
                            <CardBody className="gap-4">
															<div className="grid grid-cols-2 gap-4">
                                    {/* Mimic grid items */}
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </div>
                                    <div className="col-span-2">
                                        <Skeleton className="h-10 w-full rounded-lg" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ) : book ? (
                        <Card className="dark:bg-[#1a1b23] border-2 border-cyan-500 shadow-md shadow-cyan-500/30">
                            <CardBody className=" p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-[#afafaf]">Author</p>
                                        <p className="medium text-sm">{startCase(book.author)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-[#afafaf]">Released</p>
                                        <p className="medium text-sm">{formatDate(book.createdAt).year}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-[#afafaf]">Chapters</p>
                                        <p className="medium text-sm">{book.chapters.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-[#afafaf]">Free Chapters</p>
                                        <p className="medium text-sm text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500">
                                            {getChapterStats(book.chapters).free}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-[#afafaf]">Category</p>
                                        <p className="medium text-sm">{startCase(book.category)}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-[#afafaf]">Uploaded By</p>
                                        <p className="medium text-sm">{startCase(book.uploadedBy.username)}</p>
                                    </div>


                                    <div>
                                        <div className="flex items-center">
                                            {book.country && (
                                                <img
                                                    src={`https://hatscripts.github.io/circle-flags/flags/${getCountryFlagCode(book.country)}.svg`}
                                                    alt={`${book.country} flag`}
                                                    className="w-8 h-8 rounded-full"
                                                    onError={(e) => {
                                                        e.target.src = 'https://hatscripts.github.io/circle-flags/flags/un.svg';
                                                    }}
                                                />
                                            )}
                                
                                        </div>
                                    </div>
																		
																		<Button
                                    as={Link}
                                    to={`/book/${book._id}/read`}
                                    
																		variant="bordered"
                                    size="md"
                                    className="w-full border-cyan-500 text-cyan-500 force-cyan"
                                    startContent={<FaBookOpen />}
																		>
																				Start Reading
																		</Button>

                                </div>

                                
                            </CardBody>
                        </Card>
                    ) : null}

                    {/* Action Buttons */}
                    {loading ? (
                        <div className="flex gap-2">
                            <Skeleton className="flex-1 h-10 rounded-lg" />
                            <Skeleton className="flex-1 h-10 rounded-lg" />
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                color={isBookmarked ? 'success' : 'default'}
                                variant={isBookmarked ? 'solid' : 'bordered'}
                                className="flex-1"
                                startContent={<FaBookmark />}
                                onClick={handleToggleBookmark}
                                isLoading={bookmarkLoading}
                                isDisabled={!auth}
                            >
                                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                            </Button>
                            <Button
                                color={isLiked ? 'danger' : 'default'}
                                variant={isLiked ? 'solid' : 'bordered'}
                                className="flex-1"
                                startContent={<FaHeart />}
                                onClick={handleToggleLike}
                                isLoading={likeLoading}
                                isDisabled={!auth}
                            >
                                {isLiked ? 'Liked' : 'Like'}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Right Section: Title and Tabs */}
                <div className="w-full lg:w-2/3">
                    {loading ? (
                        <Card className="w-full">
                            <CardBody className="gap-4">
                                <Skeleton className="h-8 w-2/3 rounded-md" />
                                <div className="flex gap-2 mb-4">
																	<Skeleton className="flex-1 h-8 rounded-lg" />
																	<Skeleton className="flex-1 h-8 rounded-lg" /> 
                                </div>
                              {/* Mimic summary content (default tab) */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-4 w-4/6" />
                                    <div className="flex items-center gap-2 mt-4">
                                        <Skeleton className="h-5 w-24 rounded-md" /> {/* Show More button */}
                                        <Skeleton className="h-5 w-5 rounded-full" /> {/* Icon */}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ) : book ? (
                        <Card className="w-full shadow-xl dark:bg-[#1a1b23] bg-custom-striped-light dark:bg-custom-striped">
                            <CardBody className="p-6">
                                <h2 className="text-2xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500 mb-6 break-words">
                                    {startCase(book.title)}
                                </h2>

                                {/* Tabs */}
                                <div className="flex gap-2 mb-6 rounded-lg bg-[#e6e6e6] dark:bg-[#1a1b23]">
                                    <Button
                                        className={`w-1/2 ${activeTab === 'summary' ? 'bg-cyan-500 text-black' : ''}`}
                                        variant={activeTab === 'summary' ? 'solid' : 'light'}
																				size="sm"
                                        onClick={() => setActiveTab('summary')}
                                    >
                                        Summary
                                    </Button>
                                    <Button
                                        className={`w-1/2 ${activeTab === 'chapters' ? 'bg-cyan-500 text-black' : ''}`}
                                        variant={activeTab === 'chapters' ? 'solid' : 'light'}
																				size="sm"
                                        onClick={() => setActiveTab('chapters')}
                                    >
                                        Chapters
                                    </Button>
                                </div>

                                {/* Summary Tab */}
                                {activeTab === 'summary' && (
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="text-base leading-relaxed">
                                            {showFullDescription
                                                ? startCase(book.description)
                                                : truncate(startCase(book.description), { length: 300 })}
                                        </p>
                                        {book.description.length > 300 && !showFullDescription && (
                                            <button
                                                className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mt-4 font-semibold transition-colors cursor-pointer"
                                                onClick={() => setShowFullDescription(true)}
                                            >
                                                Show More
                                                <RiArrowDownWideFill className="text-xl" />
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Chapters Tab */}
                                {activeTab === 'chapters' && (
																	<>
																		<span className="text-gray-900 dark:text-white text-xl font-semibold p-2">Chapters</span>
                                    <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
                                        {book.chapters.map((chapter) => (
                                            <div
                                                key={chapter._id}
                                                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                                            >
                                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                                        chapter.isLocked 
                                                            ? 'border-red-500 shadow-lg shadow-red-500/50' 
                                                            : 'border-cyan-500 shadow-lg shadow-cyan-500/50'
                                                    }`}>
                                                        {chapter.isLocked ? (
                                                            <FaLock className="text-red-500 text-sm" />
                                                        ) : (
                                                            <FaBookReader className="text-cyan-500 text-sm" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-gray-900 dark:text-white break-words">
                                                            Chapter {chapter.chapterNo}: {startCase(chapter.title)}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            Released: {formatDate(chapter.createdAt).fullDate}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    as={Link}
                                                    to={`/book/${book._id}/read?chapterId=${chapter._id}`}
                                                    
                                                    variant="ghost"
                                                    size="sm"
                                                    className="ml-4 border border-cyan-500 text-cyan-500 force-cyan text-sm font-medium"
                                                    startContent={chapter.isLocked && chapter.coinCost ? <GiTwoCoins /> : null}
                                                >
                                                    {chapter.isLocked && chapter.coinCost ? chapter.coinCost : 'Read'}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
																		</>
                                )}
                            </CardBody>
                        </Card>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
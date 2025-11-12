import { useState, useEffect, useRef } from "react";
import api from '../api/axiosInstance';
import { startCase, truncate, capitalize } from 'lodash';
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegEye, FaBookOpen, FaBookReader, FaLock, FaBookmark, FaLockOpen, FaShareAlt } from "react-icons/fa";
import { RiArrowDownWideFill } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import AlertMessage from "../components/AlertMessage";
import BookComments from '../components/BookComments';
import BookRecommendations from '../components/BookRecommendations';
import { useAuth } from "../context/useAuth";
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
    
    const { auth, isAuthenticated } = useAuth(); // Set to null for anonymous access
		
		const startReadingButtonRef = useRef(null);
		const [showFloatingButton, setShowFloatingButton] = useState(false);
		// console.log(navigate)

    // Fetch book details
    useEffect(() => {
        const fetchBookData  = async () => {
            setLoading(true);
            try {
							// Base requests
							const promises = [api.get(`/books/${id}`)];
							
							// Conditionally add like/bookmark requests if logged in
							if (isAuthenticated) {
									promises.push(api.get(`/books/${id}/like-status`));
									promises.push(api.get(`/books/${id}/bookmark-status`));
								}
								
								// Fetch book details, like status, and bookmark status in parallel
								const results = await Promise.allSettled(promises);

								const bookRes = results[0];
								const likeRes = isAuthenticated ? results[1] : null;
								const bookmarkRes = isAuthenticated ? results[2] : null;

								if (bookRes.status === "fulfilled") setBook(bookRes.value.data.data);
								if (likeRes?.status === "fulfilled") setIsLiked(likeRes.value.data.isLiked);
								if (bookmarkRes?.status === "fulfilled") setIsBookmarked(bookmarkRes.value.data.isBookmarked);
                
                setError(null);
            } catch (err) {
                const errorMessage = err.response?.data?.message || "Failed to load book details.";
                setError(errorMessage);
                console.error("Error fetching book details:", errorMessage);
            } finally {
                setLoading(false);
            }
        };
        fetchBookData();
    }, [id, isAuthenticated]);

		useEffect(() => {
			if (!startReadingButtonRef.current || typeof window === 'undefined') return;

			const button = startReadingButtonRef.current;

			const observer = new IntersectionObserver(
				([entry]) => {
					// Show floating button ONLY when the button is completely out of view
					setShowFloatingButton(entry.intersectionRatio === 0);
				},
				{
					root: null,
					threshold: [0, 1.0], // Track fully visible vs fully out of view
				}
			);

			observer.observe(button);

			// Initial check after layout stabilizes
			const runInitialCheck = () => {
				requestAnimationFrame(() => {
					const rect = button.getBoundingClientRect();
					const fullyVisible =
						rect.top >= 0 && rect.bottom <= window.innerHeight;
					setShowFloatingButton(!fullyVisible);
				});
			};

			// Run after layout + images load
			const timeoutId = setTimeout(runInitialCheck, 150);

			window.addEventListener('resize', runInitialCheck);

			return () => {
				observer.unobserve(button);
				clearTimeout(timeoutId);
				window.removeEventListener('resize', runInitialCheck);
			};
		}, [book]); // Re-run when book loads


		// Dynamically update tab title
		useEffect(() => {
			if (loading) {
				document.title = "Loading Book… | Novel Angel";
			} else if (book?.title) {
				document.title = `${startCase(book.title)} | Novel Angel`;
			} else {
				document.title = "Book Not Found | Novel Angel";
			}
		}, [loading, book?.title]);
				
    // Toggle Like (requires authentication)
    const handleToggleLike = async () => {
        if (!isAuthenticated) {
            setError("Please log in to like this book.");
            // TODO: Navigate to login when auth is implemented
            // navigate('/login', { state: { from: `/book/${id}` } });
            return;
        }

				// Optimistically update UI
				const prevLiked = isLiked;
				const prevLikeCount = book.likeCount || 0;
				const newLiked = !prevLiked;
				const newLikeCount = prevLikeCount + (newLiked ? 1 : -1);
				
				setIsLiked(newLiked);
				setBook((prev) => ({ ...prev, likeCount: newLikeCount }));
        
				try {
					await api.post(`/books/${id}/toggle-like`);
				} catch (err) {
					// Revert on failure
					setIsLiked(prevLiked);
					setBook((prev) => ({ ...prev, likeCount: prevLikeCount }));
					setError(err.response?.data?.message || "Unable to like this book.");
				} 
    };
    
    // Toggle Bookmark (requires authentication)
    const handleToggleBookmark = async () => {
        if (!isAuthenticated) {
            setError("Please log in to bookmark this book.");
            // TODO: Navigate to login when auth is implemented
            // navigate('/login', { state: { from: `/book/${id}` } });
            return;
        }
        
				// Optimistically update UI
				const prevBookmarked = isBookmarked;
				setIsBookmarked(!prevBookmarked);

				try {
					await api.post(`/books/${id}/toggle-bookmark`);
				} catch (err) {
					// Revert on failure
					setIsBookmarked(prevBookmarked);
					setError(err.response?.data?.message || "Unable to bookmark this book.");
				}
    };

		const handleShare = async () => {
			if (!book) return;

			const shareData = {
				title: book.title,
				text: `Check out this novel: ${book.title}`,
				url: window.location.href,
			};

			try {
				if (navigator.share) {
					await navigator.share(shareData);
				} else {
					// fallback: copy link to clipboard
					await navigator.clipboard.writeText(shareData.url);
					setError("Link copied to clipboard!");
				}
			} catch (err) {
				console.error("Error sharing:", err);
			}
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

		console.log("book", book)

    return (
        <div className="container mx-auto px-2 md:px-10 py-8 min-h-screen">
            {/* Error Alert */}
            {error && (
							<AlertMessage message={error} onClose={() => setError(null)} />
            )}
						
            <div className="relative flex flex-col lg:flex-row gap-8">
                {/* Left Section: Image and Details */}
                <div className="w-full md:w-1/3 md:sticky md:top-20 flex flex-col gap-4 md:self-start ">
                    {/* Book Image */}
                    {loading ? (
											<Skeleton className="relative h-[342.2px] md:h-[442.2px] w-[60%] md:w-[300px] aspect-[2/2.5] md:aspect-[3/4] rounded-xl shadow-2xl group overflow-hidden self-center md:self-start" />
                    ) : book ? (
                        <div className="relative flex justify-center md:justify-start">
													{/* ────────  GLOW (mobile only)  ──────── */}
													<div className="absolute inset-0 flex items-center justify-center md:hidden -z-10 pointer-events-none">
														<div
															className="w-[200%] h-[200%] rounded-full blur-3xl animate-pulse-slow"
															style={{
																background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(251, 191, 36, 0.1) 40%, transparent 70%)',
															}}
														/>
													</div>

														{/* Book cover */}
														{/* Original container — keep overflow-hidden for image zoom */}
														<div className="relative h-[336px] md:h-[442.2px] w-[60%] md:w-[300px] aspect-[2/2.5] md:aspect-[3/4] rounded-xl shadow-2xl group overflow-hidden">
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
                        <div className="flex gap-2 flex-wrap self-center md:self-start">
                            {book.tags.map((tag, index) => (
                                <Chip 
																	key={index} 
																	color="primary" 
																	variant="bordered" 
																	size="sm"
																	isPressable
																	onClick={() => navigate(`/novels?tags=${encodeURIComponent(tag)}`)}
																	className="cursor-pointer hover:bg-cyan-500/10 transition-all"
																	>
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
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-3/4 rounded-full" />
                                        <Skeleton className="h-4 w-full rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-3/4 rounded-full" />
                                        <Skeleton className="h-4 w-full rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-3/4 rounded-full" />
                                        <Skeleton className="h-4 w-full rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-3/4 rounded-full" />
                                        <Skeleton className="h-4 w-full rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-3/4 rounded-full" />
                                        <Skeleton className="h-4 w-full rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-3/4 rounded-full" />
                                        <Skeleton className="h-4 w-full rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </div>
                                    <div className="">
                                        <Skeleton className="h-10 w-full rounded-xl" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ) : book ? (
                        <Card
													
													className="bg-gray-50 dark:bg-[#0f1419] border border-cyan-500 shadow-md shadow-cyan-500/30">
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


                                    <div className="">
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

																		{/* Start Reading button (inside card) */}
																			<Button
																				ref={startReadingButtonRef}
																				as={Link}
																				to={`/book/${book._id}/read`}
																				variant="bordered"
																				size="md"
																				className="w-full border-cyan-500 text-cyan-500 force-cyan"
																				startContent={<FaBookOpen />}
																			>
																					Start Reading
																			</Button>

																		{/* Floating Start Reading button — appears after scroll past card */}
																		{showFloatingButton && (
																			<div className="fixed bottom-1 left-0 right-0 z-20 px-4 md:hidden animate__animated animate__fadeInUp">
																				<Button
																					as={Link}
																					to={`/book/${book._id}/read`}
																					variant="solid"
																					size="md"
																					radius="md"
																					className="w-full force-cyan-solid">
																					<FaBookOpen className="mr-2" /> Start Reading
																				</Button>
																			</div>
																	)}

                                </div>

                                
                            </CardBody>
                        </Card>
                    ) : null}

                    {/* Action Buttons */}
                    {loading ? (
                        <div className="flex gap-2">
                            <Skeleton className="flex-1 h-10 rounded-lg" />
                            <Skeleton className="flex-1 h-10 rounded-lg" />
														<Skeleton className="flex-1 h-10 rounded-lg" />
                        </div>
                    ) : 
											book && (
                        <div className="flex gap-2">
                            <Button
                                color={isBookmarked ? 'success' : 'default'}
                                variant={isBookmarked ? 'solid' : 'bordered'}
                                className="flex-1"
                                startContent={<FaBookmark />}
                                onClick={handleToggleBookmark}
                                isDisabled={!auth}
                            >
                                {isBookmarked ? 'Added' : 'Add'}
                            </Button>
                            <Button
                                color={isLiked ? 'danger' : 'default'}
                                variant={isLiked ? 'solid' : 'bordered'}
                                className="flex-1"
                                startContent={<FaHeart />}
                                onClick={handleToggleLike}
                                isDisabled={!auth}
                            >
                                {isLiked ? 'Liked' : 'Like'}
                            </Button>
														<Button
																color="primary"
																variant="ghost"
																className="flex-1"
																startContent={<FaShareAlt />}
																onClick={handleShare}
															>
																Share
														</Button>
													</div>
													)}
                    
                </div>

								{/* Sentinel div for floating button visibility */}
								{/* <div ref={cardRef} style={{ height: '1px' }} /> */}

                {/* Right Section: Title and Tabs */}
							<div className="w-full lg:w-2/3 flex flex-col gap-5">
                <div className="">
                    {loading ? (
                        <Card className="w-full">
                            <CardBody className="gap-4">
                                <Skeleton className="h-8 w-2/3 rounded-2xl" />
                                <div className="flex gap-2 mb-4">
																	<Skeleton className="flex-1 h-8 rounded-lg" />
																	<Skeleton className="flex-1 h-8 rounded-lg" /> 
                                </div>
                              {/* Mimic summary content (default tab) */}
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-full rounded-full" />
                                    <Skeleton className="h-5 w-full rounded-full" />
                                    <Skeleton className="h-5 w-5/6 rounded-full" />
                                    <Skeleton className="h-5 w-4/6 rounded-full" />
                                    
                                </div>
                            </CardBody>
                        </Card>
                    ) : book ? (
                        <Card className="w-full shadow-xl bg-custom-striped-light dark:bg-custom-striped">
                            <CardBody className="md:p-6">
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
                                        <span className="text-base leading-relaxed mr-2">
                                            {showFullDescription
                                                ? startCase(book.description)
                                                : truncate(startCase(book.description), { length: 300 })}
                                        </span>
                                        {book.description.length > 300 && !showFullDescription && (
                                            <Button
																							// color="primary"
																							variant="flat"
																							size="sm"
																							radius="full"
																							onClick={() => setShowFullDescription(true)}
																							endContent={<RiArrowDownWideFill className="text-xl" />}
																							// className="ml-2"
                                            >
                                                Show More
                                                
                                            </Button>
                                        )}
                                    </div>
                                )}

                                {/* Chapters Tab */}
                                {activeTab === 'chapters' && (
																	<>
																		<span className="text-gray-900 dark:text-white text-xl font-semibold p-2">Chapters</span>
                                    <div className="space-y-2">
                                        {book.chapters.map((chapter) => {
																					const isUnlocked = auth?.user?.unlockedChapters?.includes(chapter._id) || !chapter.isLocked;
																					return(
                                            <div
                                                key={chapter._id}
                                                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                                            >
                                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
																											chapter.isLocked && !isUnlocked
																											? 'border-red-500 shadow-lg shadow-red-500/50' // Locked
																											: chapter.isLocked && isUnlocked 
																											? 'border-green-500 shadow-lg shadow-green-500/50' // Unlocked (purchased)
																											: 'border-cyan-500 shadow-lg shadow-cyan-500/50' // Free
                                                    }`}>
																											{chapter.isLocked && !isUnlocked ? (
																													<FaLock className="text-red-500 text-sm" />
																												) : chapter.isLocked && isUnlocked ? (
																													<FaLockOpen className="text-green-500 text-sm" />
																												) : (
																													<FaBookReader className="text-cyan-500 text-sm" />
																											)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm md:text-base font-normal md:font-semibold text-gray-900 dark:text-white break-words">
                                                            {chapter.chapterNo}. {startCase(chapter.title)}
                                                        </p>
                                                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
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
                                                    startContent={chapter.isLocked && !isUnlocked && chapter.coinCost
																											? <GiTwoCoins />
																											: null}
																										>
                                                    {chapter.isLocked && chapter.coinCost && !isUnlocked ? chapter.coinCost : 'Read'}
                                                </Button>
                                            </div>
																				)
																					})}
                                    </div>
																		</>
                                )}
                            </CardBody>
                        </Card>
                    ) : null}
                </div>

								{/* Comments Section */}
								{activeTab === 'summary' && (
									<div className="">
											<BookComments 
												bookId={id} 
												isAuthenticated={isAuthenticated}
											/>
									</div>
								)}

							</div>
            </div>

					{/* Recommendations Section - Full Width */}
					<BookRecommendations />
        </div>
    );
}

export default BookDetails;
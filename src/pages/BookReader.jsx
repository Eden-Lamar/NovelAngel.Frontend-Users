import { useState, useEffect } from "react";
import api from '../api/axiosInstance';
import { startCase } from 'lodash';
import { useParams, useSearchParams, Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import { CiLock, CiUnlock } from "react-icons/ci";
import { RiArrowLeftSLine, RiArrowRightSLine, RiSettings3Line, RiCloseLine } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import { LuCalendarRange } from "react-icons/lu";
import { GoShareAndroid } from "react-icons/go";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Switch } from "@heroui/switch";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { useAuth } from "../context/useAuth";
import AlertMessage from "../components/AlertMessage";
import BookRecommendations from '../components/BookRecommendations';


import 'animate.css';

function BookReader() {
    const { auth, refreshUser } = useAuth();
    
    const { bookId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const chapterId = searchParams.get('chapterId');
    const [chapterData, setChapterData] = useState(null);
    const [bookChapters, setBookChapters] = useState([]);
    const [bookImage, setBookImage] = useState(null);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unlockLoading, setUnlockLoading] = useState(false);
    const [unlockError, setUnlockError] = useState(null);
    
    // Settings sidebar state
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('text');
    
    // Reading settings
    const [readingSettings, setReadingSettings] = useState({
        fontSize: 20,
        fontFamily: 'serif',
        lineSpacing: 1.6,
        backgroundGradient: true,
        textAlignment: 'left',
        letterSpacing: 0,
        wordSpacing: 0,
    });

    // Modal control
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Fetch book and chapter details
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const bookResponse = await api.get(`/books/${bookId}`);
                setBookChapters(bookResponse.data.data.chapters);
								setBookImage(bookResponse.data.data.bookImage);

                if (chapterId) {
                    const chapterResponse = await api.get(`/books/${bookId}/chapters/${chapterId}`);
                    setChapterData(chapterResponse.data.data);
                    const index = bookResponse.data.data.chapters.findIndex(ch => ch._id === chapterId);
                    setCurrentChapterIndex(index);
                } else {
                    const firstChapter = bookResponse.data.data.chapters[0];
                    if (firstChapter) {
                        const chapterResponse = await api.get(`/books/${bookId}/chapters/${firstChapter._id}`);
                        setChapterData(chapterResponse.data.data);
                        setCurrentChapterIndex(0);
                        setSearchParams({ chapterId: firstChapter._id });
                    }
                }
                setError(null);
            } catch (err) {
                const errorMessage = err.response?.data?.message || "Failed to load chapter.";
                setError(errorMessage);
                console.error("Error fetching data:", err.response);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [bookId, chapterId, setSearchParams]);

		// Dynamically update tab title
	useEffect(() => {
		if (loading) {
			document.title = "Loading Reader… | Novel Angel";
		} else if (chapterData?.chapter?.title && chapterData?.bookTitle) {
			document.title = `Chapter ${chapterData.chapter?.chapterNo}: ${startCase(chapterData.chapter?.title)} – ${startCase(chapterData.bookTitle)} | Novel Angel`;
		} else if (chapterData?.bookTitle) {
			document.title = `${chapterData.bookTitle} | Novel Angel`;
		} else {
			document.title = "Novel Reader | Novel Angel";
		}
	}, [loading, chapterData]);

    // Clear errors
    // useEffect(() => {
    //     if (error || unlockError) {
    //         const timer = setTimeout(() => {
    //             setError(null);
    //             setUnlockError(null);
    //         }, 5000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [error, unlockError]);

    // Handle unlock chapter
    const handleUnlockChapter = async () => {
        if (!auth) {
            setUnlockError("Please log in to unlock chapters.");
            return;
        }
        
        setUnlockLoading(true);
        setUnlockError(null);
        try {
            await api.post(`/books/${bookId}/chapters/${chapterId}/unlock`);

						// ✅ If successful, refresh the user (update coin balance)
						await refreshUser();

            // Refetch chapter data
            const chapterResponse = await api.get(`/books/${bookId}/chapters/${chapterId}`);
            setChapterData(chapterResponse.data.data);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to unlock chapter.";
            setUnlockError(errorMessage);
        } finally {
            setUnlockLoading(false);
        }
    };

    // Navigate chapters
    const handleNavigation = (direction) => {
        const newIndex = direction === 'next' ? currentChapterIndex + 1 : currentChapterIndex - 1;
        if (newIndex >= 0 && newIndex < bookChapters.length) {
            setSearchParams({ chapterId: bookChapters[newIndex]._id });
        }
    };

    // Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Calculate reading time
    const calculateReadingTime = (content) => {
        if (!content) return "0 min";
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        if (minutes < 1) return "Less than 1 min";
        if (minutes === 1) return "1 min";
        return `${minutes} mins`;
    };

    // Update settings
    const updateSetting = (key, value) => {
        setReadingSettings(prev => ({ ...prev, [key]: value }));
    };

    // Content styles
    const getContentStyles = () => {
        const fontFamilyMap = {
            serif: 'serif',
            'sans-serif': 'sans-serif',
            monospace: 'monospace'
        };

        return {
            fontSize: `${readingSettings.fontSize}px`,
            fontFamily: fontFamilyMap[readingSettings.fontFamily],
            lineHeight: readingSettings.lineSpacing,
            textAlign: readingSettings.textAlignment,
            letterSpacing: `${readingSettings.letterSpacing}px`,
            wordSpacing: `${readingSettings.wordSpacing}px`,
        };
    };

		const handleShare = async () => {
			if (!chapterData?.bookTitle) return;

			const shareData = {
				title: chapterData.bookTitle,
				text: `I'm reading "${chapterData.chapter.title}" on NovelAngel!`,
				url: window.location.href,
			};

			try {
				if (navigator.share) {
					await navigator.share(shareData);
				} else {
					await navigator.clipboard.writeText(shareData.url);
					setError("Link copied to clipboard!");
				}
			} catch (err) {
				console.error("Error sharing:", err);
			}
		};


    return (
        <div className="container mx-auto px-2 md:px-4 py-4 flex flex-col">
            {/* Error Alert */}
            {(error || unlockError) && (
                <AlertMessage message={error || unlockError} onClose={() => {setError(null); setUnlockError(null);}} />
            )}

            {/* Settings Sidebar */}
            {isSettingsOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                        onClick={() => setIsSettingsOpen(false)}
                    />
                    
                    <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white dark:bg-[#1a1b23] border-l border-cyan-500/50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gold">Reading Settings</h3>
                            <Button
                                isIconOnly
                                variant="light"
                                onClick={() => setIsSettingsOpen(false)}
                            >
                                <RiCloseLine className="text-2xl" />
                            </Button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setActiveTab('text')}
                                className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors ${
                                    activeTab === 'text'
                                        ? 'text-gold border-b-2 border-gold bg-gray-50 dark:bg-gray-800'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gold'
                                }`}
                            >
                                Text
                            </button>
                            <button
                                onClick={() => setActiveTab('appearance')}
                                className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors ${
                                    activeTab === 'appearance'
                                        ? 'text-gold border-b-2 border-gold bg-gray-50 dark:bg-gray-800'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gold'
                                }`}
                            >
                                Appearance
                            </button>
                        </div>

                        {/* Settings Content */}
                        <div className="p-6 space-y-8">
                            {activeTab === 'text' && (
                                <>
                                    <Slider
                                        label="Text Size"
                                        size="sm"
                                        step={1}
                                        minValue={12}
                                        maxValue={32}
                                        value={readingSettings.fontSize}
                                        onChange={(value) => updateSetting('fontSize', value)}
                                        className="max-w-md"
                                        color="warning"
                                        getValue={(value) => `${value}px`}
                                    />

                                    <Select
                                        label="Font Family"
                                        selectedKeys={[readingSettings.fontFamily]}
                                        onChange={(e) => updateSetting('fontFamily', e.target.value)}
                                        className="max-w-md"
                                    >
                                        <SelectItem key="serif" value="serif">Serif</SelectItem>
                                        <SelectItem key="sans-serif" value="sans-serif">Sans Serif</SelectItem>
                                        <SelectItem key="monospace" value="monospace">Monospace</SelectItem>
                                    </Select>

                                    <Slider
                                        label="Line Spacing"
                                        size="sm"
                                        step={0.1}
                                        minValue={1}
                                        maxValue={3}
                                        value={readingSettings.lineSpacing}
                                        onChange={(value) => updateSetting('lineSpacing', value)}
                                        className="max-w-md"
                                        color="warning"
                                        getValue={(v) => (Array.isArray(v) ? v[0] : v).toFixed(1)}
                                    />


																	<div>
																		<div className="flex items-center justify-between">
																			<div className="flex flex-col">
																				<label className="text-sm font-medium">Background Gradient</label>
																				<span className="text-xs text-gray-500">Enable striped gradient background</span>
																			</div>
																			<Switch
																					isSelected={readingSettings.backgroundGradient}
																					onValueChange={(value) => updateSetting('backgroundGradient', value)}
																					color="warning"
																			/>
																		</div>
																			

																	</div>	
																		
																	


                                    <div>
                                        <label className="block text-sm font-medium mb-3">Text Alignment</label>
                                        <div className="flex gap-2">
                                            {['left', 'center', 'justify'].map((align) => (
                                                <Button
                                                    key={align}
                                                    size="sm"
                                                    color={readingSettings.textAlignment === align ? 'warning' : 'default'}
                                                    variant={readingSettings.textAlignment === align ? 'solid' : 'bordered'}
                                                    onClick={() => updateSetting('textAlignment', align)}
                                                    className="flex-1"
                                                >
                                                    {startCase(align)}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <Slider
                                        label="Letter Spacing"
                                        size="sm"
                                        step={0.5}
                                        minValue={-2}
                                        maxValue={5}
                                        value={readingSettings.letterSpacing}
                                        onChange={(value) => updateSetting('letterSpacing', value)}
                                        className="max-w-md"
                                        color="warning"
                                        getValue={(value) => `${value}px`}
                                    />

                                    <Slider
                                        label="Word Spacing"
                                        size="sm"
                                        step={0.5}
                                        minValue={-2}
                                        maxValue={10}
                                        value={readingSettings.wordSpacing}
                                        onChange={(value) => updateSetting('wordSpacing', value)}
                                        className="max-w-md"
                                        color="warning"
                                        getValue={(value) => `${value}px`}
                                    />

																		{/* Divider */}
																		<div className="divider !h-[1px]"/>
																		
																		{/* Reset to Default Button */}
																		<div className="flex justify-center">
																			<Button
																				color="danger"
																				variant="flat"
																				onClick={() => setReadingSettings({
																					fontSize: 20,
																					fontFamily: 'serif',
																					lineSpacing: 1.6,
																					backgroundGradient: true,
																					textAlignment: 'left',
																					letterSpacing: 0,
																					wordSpacing: 0,
																				})}
																				className="w-full"
																			>
																				Reset to Default
																			</Button>
																		</div>

                                </>
                            )}

                            {activeTab === 'appearance' && (
                                <div className="text-center text-gray-500 py-12">
                                    <p>Appearance settings coming soon...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Header */}
            {loading ? (
                <Skeleton className="h-14 mx-auto w-full md:rounded-xl mb-6" />
            ) : chapterData ? (
							<>
                <div className="sticky top-0 z-20 flex justify-between items-center p-1 md:p-2 md:rounded-xl mb-6 bg-white/40 dark:bg-[#1a1b23]/40 backdrop-blur-md shadow-md">
									<div className=" ">
                    <Link to={`/book/${bookId}`} className="flex items-center group">
                        <RiArrowLeftSLine className="text-gold text-2xl md:text-2xl transition-all duration-200 group-hover:mr-1 group-hover:scale-105 md:group-hover:scale-125" />

                        <div className="relative w-10 aspect-[2/3] shadow-md rounded-sm md:rounded-md overflow-hidden bg-gray-200 dark:bg-gray-800 mr-2 group-hover:shadow-lg transition-all">
													<img 
													src={bookImage} 
													alt={chapterData.bookTitle} 
													decoding="async"
													loading="lazy"
													className="object-cover w-full h-full" 
													/>
												</div>

                        <h2 className="text-sm md:text-xl font-medium md:font-bold line-clamp-2 md:line-clamp-none text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500">
                            {startCase(chapterData.bookTitle)}
                        </h2>
                    </Link>
									</div>

										{/* Setting and Share icon */}
										<div className="flex items-center gap-2">
										{!chapterData.chapter.isLocked && (
											<>
                        <Button
                            isIconOnly
                            variant="light"
														size="sm"
                            onClick={() => setIsSettingsOpen(true)}
                            className="text-gray-400"
													>
                            <RiSettings3Line className="text-lg md:text-2xl" />
													</Button>

													<Button
														isIconOnly
														variant="light"
														size="sm"
														onClick={handleShare}
														className="text-gray-400 dark:text-gray-300"
														aria-label="Share Chapter"
													>
														<GoShareAndroid className="text-lg md:text-xl" />
													</Button>
												</>
                    )}
										</div>
                </div>
							</>
            ) : null}

						 {/* Chapter List Dropdown */}
            {!loading && chapterData && bookChapters.length > 0 && (
                <div className="w-3/4 md:w-1/2 self-center mb-6">
                    <Select
                        // label="Select Chapter"
                        placeholder="Choose a chapter to read"
                        selectedKeys={chapterId ? [chapterId] : []}
                        onChange={(e) => {
                            if (e.target.value) {
                                setSearchParams({ chapterId: e.target.value });
                            }
                        }}
                        className="max-w-full"
                        classNames={{
                            trigger: "border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1b23] cursor-pointer",
                            value: "text-gold font-semibold",
                            label: "text-gold font-bold",
                        }}
                        startContent={(() => {
																			const currentChapter = bookChapters.find((ch) => ch._id === chapterId);

																			if (!currentChapter)
																				return <FaBookOpen className="text-cyan-500 text-lg" />;

																			const isLocked = currentChapter.isLocked;
																			const isUnlocked =
																				auth?.user?.unlockedChapters?.includes(currentChapter._id) || !isLocked;

																			if (!isLocked) {
																				return <FaBookOpen className="text-cyan-500 text-lg" />; // Free
																			} else if (isUnlocked) {
																				return <CiUnlock className="text-green-500 text-lg" />; // Unlocked (paid)
																			} else {
																				return <CiLock className="text-red-500 text-lg" />; // Still locked
																			}
																		})()
																	}
																>
                        {bookChapters.map((chapter) => {
													const isLocked = chapter.isLocked
													const isUnlocked = auth?.user?.unlockedChapters?.includes(chapter._id) || !isLocked;

													// Determine icon and label color dynamically
													const icon = isLocked
														? isUnlocked
															? <CiUnlock className="text-green-500 text-sm" /> // unlocked (paid)
															: <CiLock className="text-red-500 text-sm" /> // still locked
														: <FaBookOpen className="text-cyan-500 text-sm" />; // free

													const StatusLabel = isLocked ? (
														isUnlocked ? (
																<span className="text-xs text-green-500 ml-2">Unlocked</span>
															) : (
																<span className="text-xs text-red-500 ml-2">Locked</span>
															)
														) : <span className="text-xs text-cyan-500 ml-2">Free</span>;

													return (
                            <SelectItem
                                key={chapter._id}
                                value={chapter._id}
                                textValue={`Chapter ${chapter.chapterNo}: ${startCase(chapter.title)}`}
                                startContent={icon}
                                className={isLocked && !isUnlocked ? "text-gray-500" : ""}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span className={isLocked && !isUnlocked
																					? "text-gray-500"
																					: "font-semibold text-amber-500"
																			}>
                                        {chapter.chapterNo}. {startCase(chapter.title)}
                                    </span>
                                    {StatusLabel}
                                </div>
                            </SelectItem>
													)
											})}
                    </Select>
                </div>
            )}

            {/* Chapter Content */}
            <Card className={`w-full md:w-4/5 self-center md:border md:border-cyan-500 shadow-md md:shadow-cyan-500/30 ${
                readingSettings.backgroundGradient ? 'bg-custom-striped-light dark:bg-custom-striped' : ''
            }`}>
                {loading ? (
                    <CardBody className="p-6 space-y-4">
                        <Skeleton className="h-6 w-1/2 rounded-xl" />
                        <Skeleton className="h-4 w-3/4 rounded-xl" />
                        <Skeleton className="h-32 w-full rounded-xl" />
                        <div className="flex justify-between">
                            <Skeleton className="h-10 w-24 rounded-xl" />
                            <Skeleton className="h-10 w-24 rounded-xl" />
                        </div>
                    </CardBody>
                ) : chapterData ? (
                    <CardBody className="p-3 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                chapterData.chapter.isLocked
                                    ? 'border-red-500 shadow-lg shadow-red-500/50'
                                    : 'border-cyan-500 shadow-lg shadow-cyan-500/50'
                            }`}>
                                {chapterData.chapter.isLocked ? (
                                    <CiLock className="text-red-500 text-lg" />
                                ) : (
                                    <FaBookOpen className="text-blue-500 text-sm" />
                                )}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gold flex gap-2">
                                <span className="whitespace-nowrap">{chapterData.chapter.chapterNo}.</span>
                                <span className="break-words text-amber-500 line-clamp-2">{startCase(chapterData.chapter.title)}</span>
                            </h3>
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                            <p className="flex items-center gap-2">
                                <LuCalendarRange />
                                {formatDate(chapterData.chapter.createdAt)}
                            </p>
                            <p className="flex items-center gap-2">
                                <span>📖</span>
                                Estimated reading time: {calculateReadingTime(chapterData.chapter.content)}
                            </p>
                        </div>

                        {chapterData.chapter.isLocked ? (
                            <div className="flex flex-col items-center gap-4 py-12">
                                <div className="flex items-center justify-center w-20 h-20 border-2 border-red-500 shadow-lg shadow-red-500/50 rounded-full">
                                    <CiLock className="text-red-500 text-4xl" />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight">Chapter Locked</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-center">
                                    Unlock with coins to continue reading
                                </p>
                                <Button
																		variant="solid"
                                    size="lg"
                                    onClick={onOpen}
                                    isDisabled={!auth}
																		className="border-cyan-500 force-cyan-solid"
                                >
                                    Unlock this chapter - 
																		<GiTwoCoins className="text-gold text-xl" />
																		{chapterData?.chapter?.coinCost.toFixed(2)}
                                </Button>
                                {!auth && (
																	<>
																		<p className="text-sm text-gray-500">Please log in to unlock chapters</p>
																		{/* Login & Register buttons for guests */}
																		<div className="flex  items-center gap-3">
																			<Button
																				as={Link} 
																				onClick={() => sessionStorage.setItem("lastVisited", window.location.pathname)}
																				to="/login" 
																				color="primary" 
																				variant="flat" 
																				radius="md" 
																				size="md"
																				>
																				Login
																			</Button>

																			<Button 
																				as={Link}
																				onClick={() => sessionStorage.setItem("lastVisited", window.location.pathname)}
																				to="/signup" 
																				color="danger" 
																				variant="solid" 
																				radius="md" 
																				size="md"
																				>
																				Register
																			</Button>

																		</div>
																	</>
                                )}
                            </div>
                        ) : (
                            <div
                                draggable="false"
                                className="whitespace-pre-wrap select-none mt-6"
                                style={getContentStyles()}
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                {chapterData.chapter.content}
                            </div>
                        )}

                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                className="border-cyan-500 text-cyan-500 force-cyan"
                                variant="ghost"
                                onClick={() => handleNavigation('prev')}
                                isDisabled={currentChapterIndex <= 0}
                                startContent={<RiArrowLeftSLine className="text-xl" />}
                            >
                                Previous
                            </Button>
                            <Button
                                className="border-cyan-500 text-cyan-500 force-cyan"
                                variant="ghost"
                                onClick={() => handleNavigation('next')}
                                isDisabled={currentChapterIndex >= bookChapters.length - 1}
                                endContent={<RiArrowRightSLine className="text-xl" />}
                            >
                                Next
                            </Button>
                        </div>
                    </CardBody>
                ) : null}
            </Card>
						
							{/* Recommendations Section - Full Width */}
							<div className="w-full md:w-4/5 mx-auto">
								<BookRecommendations />
							</div>


            {/* Unlock Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-gold">Confirm Purchase</ModalHeader>
                            <ModalBody>
                                <p className="text-gray-600 dark:text-gray-400 text-wrap">
                                    Are you sure you want to unlock this chapter for{' '}
																		<GiTwoCoins className="inline-flex font-bold text-gold" />{' '} 
																		{chapterData?.chapter?.coinCost} ?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        handleUnlockChapter();
                                        onClose();
                                    }}
                                    isLoading={unlockLoading}
                                >
                                    Purchase
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default BookReader;
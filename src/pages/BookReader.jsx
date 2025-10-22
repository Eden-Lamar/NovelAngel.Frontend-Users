import { useState, useEffect } from "react";
import axios from "axios";
import { startCase } from 'lodash';
import { useParams, useSearchParams, Link } from "react-router-dom";
import { FaBookOpen, FaLock } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { RiArrowLeftSLine, RiArrowRightSLine, RiSettings3Line, RiCloseLine } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import { LuCalendarRange } from "react-icons/lu";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Switch } from "@heroui/switch";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import 'animate.css';

function BookReader() {
    // TODO: Replace with actual auth when implemented
    const auth = null;
    
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
                const bookResponse = await axios.get(`http://localhost:3000/api/v1/books/${bookId}`);
                setBookChapters(bookResponse.data.data.chapters);
								setBookImage(bookResponse.data.data.bookImage);

                if (chapterId) {
                    const chapterResponse = await axios.get(`http://localhost:3000/api/v1/books/${bookId}/chapters/${chapterId}`);
                    setChapterData(chapterResponse.data.data);
                    const index = bookResponse.data.data.chapters.findIndex(ch => ch._id === chapterId);
                    setCurrentChapterIndex(index);
                } else {
                    const firstChapter = bookResponse.data.data.chapters[0];
                    if (firstChapter) {
                        const chapterResponse = await axios.get(`http://localhost:3000/api/v1/books/${bookId}/chapters/${firstChapter._id}`);
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

    // Clear errors
    useEffect(() => {
        if (error || unlockError) {
            const timer = setTimeout(() => {
                setError(null);
                setUnlockError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, unlockError]);

    // Handle unlock chapter
    const handleUnlockChapter = async () => {
        if (!auth) {
            setUnlockError("Please log in to unlock chapters.");
            return;
        }
        
        setUnlockLoading(true);
        setUnlockError(null);
        try {
            await axios.post(
                `http://localhost:3000/api/v1/books/${bookId}/chapters/${chapterId}/unlock`,
                {},
                { headers: { Authorization: `Bearer ${auth?.token}` } }
            );
            
            const chapterResponse = await axios.get(`http://localhost:3000/api/v1/books/${bookId}/chapters/${chapterId}`, {
                headers: { Authorization: `Bearer ${auth?.token}` }
            });
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

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col">
            {/* Error Alert */}
            {(error || unlockError) && (
                <div className="fixed left-1/2 top-20 -translate-x-1/2 z-50 animate__animated animate__fadeInDown w-4/5 lg:w-1/2">
                    <div className="bg-red-500/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
                        <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error || unlockError}</span>
                    </div>
                </div>
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
                <Skeleton className="h-16 mx-auto w-full rounded-xl mb-6" />
            ) : chapterData ? (
                <div className="sticky top-0 z-5 flex justify-between items-center border-2 border-gray-200 dark:border-gray-700 p-2 rounded-xl mb-6 bg-white/80 dark:bg-[#1a1b23]/80 backdrop-blur-md shadow-md">
									<div className=" ">
                    <Link to={`/book/${bookId}`} className="flex items-center group">
                        <RiArrowLeftSLine className="text-gold text-2xl transition-all duration-200 group-hover:mr-1 group-hover:scale-110" />
												
												<img 
												src={bookImage} 
												alt={chapterData.bookTitle} 
												decoding="async"
												loading="lazy"
												className="w-12 h-16 object-cover shadow-md rounded-md mr-2" 
												/>
                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500">
                            {startCase(chapterData.bookTitle)}
                        </h2>
                    </Link>
									</div>

                    {!chapterData.chapter.isLocked && (
                        <Button
                            isIconOnly
                            variant="light"
                            onClick={() => setIsSettingsOpen(true)}
                            className="text-gold"
                        >
                            <RiSettings3Line className="text-2xl" />
                        </Button>
                    )}
                </div>
            ) : null}

						 {/* Chapter List Dropdown */}
            {!loading && chapterData && bookChapters.length > 0 && (
                <div className="w-1/2 self-center mb-6">
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
                            trigger: "border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1b23] cursor-pointer",
                            value: "text-gold font-semibold",
                            label: "text-gold font-bold",
                        }}
                        startContent={<FaBookOpen className="text-cyan-500" />}
                    >
                        {bookChapters.map((chapter) => (
                            <SelectItem
                                key={chapter._id}
                                value={chapter._id}
                                textValue={`Chapter ${chapter.chapterNo}: ${startCase(chapter.title)}`}
                                startContent={
                                    chapter.isLocked ? (
                                        <CiLock className="text-red-500 text-sm" />
                                    ) : (
                                        <FaBookOpen className="text-cyan-500 text-sm" />
                                    )
                                }
                                className={chapter.isLocked ? "text-gray-500" : ""}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span className={chapter.isLocked ? "text-gray-500" : "font-semibold text-amber-500"}>
                                        {chapter.chapterNo}. {startCase(chapter.title)}
                                    </span>
                                    {chapter.isLocked && (
                                        <span className="text-xs text-red-500 ml-2">Locked</span>
                                    )}
                                </div>
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            )}

            {/* Chapter Content */}
            <Card className={`w-4/5 self-center border border-cyan-500 shadow-md shadow-cyan-500/30 ${
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
                                <span className="whitespace-nowrap">Chapter {chapterData.chapter.chapterNo}:</span>
                                <span className="break-words text-amber-500">{startCase(chapterData.chapter.title)}</span>
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
                                    <p className="text-sm text-gray-500">Please log in to unlock chapters</p>
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

            {/* Unlock Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-gold">Confirm Purchase</ModalHeader>
                            <ModalBody>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Are you sure you want to unlock this chapter for{' '}
                                    <span className="inline-flex items-center gap-1 font-bold text-gold">
                                        <GiTwoCoins /> {chapterData?.chapter?.coinCost}
                                    </span>{' '}
                                    coins?
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
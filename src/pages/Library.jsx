import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { startCase, truncate } from "lodash";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Skeleton } from "@heroui/skeleton";
import { Chip } from "@heroui/chip";
import { Tabs, Tab } from "@heroui/tabs";
import { FaBookOpen, FaHistory, FaBookmark, FaPlay } from "react-icons/fa";
import { RiBook2Line } from "react-icons/ri";
import { useAuth } from "../context/useAuth";

function Library() {
    const { auth } = useAuth();
    const [activeTab, setActiveTab] = useState("continue");
    const [continueReading, setContinueReading] = useState([]);
    // const [readingHistory, setReadingHistory] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLibraryData = async () => {
            setLoading(true);
            try {
                const [continueRes, bookmarksRes] = await Promise.all([
                    axios.get('http://localhost:3000/api/v1/user/continue-reading'),
                    // axios.get('http://localhost:3000/api/v1/user/history'),
                    axios.get('http://localhost:3000/api/v1/user/bookmarks')
                ]);

                setContinueReading(continueRes.data.data || []);
                setBookmarks(bookmarksRes.data.data || []);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load library data");
                console.error("Error fetching library data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (auth?.token) {
            fetchLibraryData();
        }
    }, [auth?.token]);

    // Calculate progress percentage
    const calculateProgress = (lastChapterNum, totalChapters) => {
        if (!totalChapters) return 0;
        return Math.round((lastChapterNum / totalChapters) * 100);
    };

    // Format date
    // const formatDate = (date) => {
    //     const now = new Date();
    //     const readDate = new Date(date);
    //     const diffMs = now - readDate;
    //     const diffDays = Math.floor(diffMs / 86400000);

    //     if (diffDays === 0) return "Today";
    //     if (diffDays === 1) return "Yesterday";
    //     if (diffDays < 7) return `${diffDays} days ago`;
        
    //     return readDate.toLocaleDateString('en-US', {
    //         month: 'short',
    //         day: 'numeric',
    //         year: readDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    //     });
    // };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500 mb-2">
                    My Library
                </h1>
                <p className="text-base-content/60">
                    Your reading journey in one place
                </p>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="alert alert-error mb-6">
                    <span>{error}</span>
                </div>
            )}

            {/* Tabs */}
            <Tabs
                selectedKey={activeTab}
                onSelectionChange={setActiveTab}
                variant="underlined"
                color="primary"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-cyan-500",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-cyan-500"
                }}
            >
                <Tab
                    key="continue"
                    title={
                        <div className="flex items-center gap-2">
                            <FaPlay />
                            <span>Continue Reading</span>
                            {!loading && continueReading.length > 0 && (
                                <Chip size="sm" variant="flat" color="primary">
                                    {continueReading.length}
                                </Chip>
                            )}
                        </div>
                    }
                />
                {/* <Tab
                    key="history"
                    title={
                        <div className="flex items-center gap-2">
                            <FaHistory />
                            <span>Reading History</span>
                            {!loading && readingHistory.length > 0 && (
                                <Chip size="sm" variant="flat" color="primary">
                                    {readingHistory.length}
                                </Chip>
                            )}
                        </div>
                    }
                /> */}
                <Tab
                    key="bookmarks"
                    title={
                        <div className="flex items-center gap-2">
                            <FaBookmark />
                            <span>Bookmarks</span>
                            {!loading && bookmarks.length > 0 && (
                                <Chip size="sm" variant="flat" color="primary">
                                    {bookmarks.length}
                                </Chip>
                            )}
                        </div>
                    }
                />
            </Tabs>

            {/* Tab Content */}
            <div className="mt-8">
                {/* Continue Reading Tab */}
                {activeTab === "continue" && (
                    <div>
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array(3).fill(0).map((_, idx) => (
                                    <Card key={idx} className="w-full">
                                        <CardBody className="gap-3">
                                            <div className="flex gap-4">
                                                <Skeleton className="w-24 h-32 rounded-lg flex-shrink-0" />
                                                <div className="flex-1 space-y-3">
                                                    <Skeleton className="h-5 w-3/4 rounded-full" />
                                                    <Skeleton className="h-4 w-1/2 rounded-full" />
                                                    <Skeleton className="h-3 w-full rounded-full" />
                                                    <Skeleton className="h-10 w-full rounded-xl" />
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        ) : continueReading.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {continueReading.map((item) => {
                                    const progress = calculateProgress(item.lastChapter.number, item.totalChapters);
                                    return (
                                        <Card
                                            key={item.bookId}
                                            className="w-full transition-all duration-300 bg-custom-striped-light dark:bg-custom-striped"
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
                                                            className="w-24 h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                                                        />
                                                    </Link>

                                                    {/* Book Info */}
                                                    <div className="flex-1 flex flex-col justify-between min-w-0">
                                                        <div>
                                                            <Link
                                                                to={`/book/${item.bookId}`}
                                                                className="hover:text-cyan-500 transition-colors"
                                                            >
                                                                <h3 className="font-bold text-base line-clamp-2 mb-1">
                                                                    {startCase(item.bookTitle)}
                                                                </h3>
                                                            </Link>
                                                            <p className="text-sm text-base-content/60 mb-2">
                                                                Chapter {item.lastChapter.number}: {truncate(startCase(item.lastChapter.title), { length: 30 })}
                                                            </p>
                                                        </div>

                                                        {/* Progress */}
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between text-xs">
                                                                <span className="text-base-content/60">Progress</span>
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
                                                            <p className="text-xs text-base-content/50">
                                                                {item.lastChapter.number} / {item.totalChapters} chapters
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                            <CardFooter>
                                                <Button
                                                    as={Link}
                                                    to={`/book/${item.bookId}/read?chapterId=${item.lastChapter.id}`}
                                                    color="primary"
                                                    variant="solid"
                                                    className="w-full"
                                                    startContent={<FaBookOpen />}
                                                >
                                                    Continue Reading
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    );
                                })}
                            </div>
                        ) : (
                            <EmptyState
                                icon={<FaPlay className="text-6xl" />}
                                title="No books in progress"
                                description="Start reading a book to see it here"
                            />
                        )}
                    </div>
                )}

                {/* Reading History Tab
                {activeTab === "history" && (
                    <div>
                        {loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {Array(6).fill(0).map((_, idx) => (
                                    <Card key={idx}>
                                        <CardBody className="p-0">
                                            <Skeleton className="w-full aspect-[2/3] rounded-t-lg" />
                                        </CardBody>
                                        <CardFooter className="flex-col gap-2">
                                            <Skeleton className="h-4 w-full rounded-full" />
                                            <Skeleton className="h-3 w-2/3 rounded-full" />
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : readingHistory.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {readingHistory.map((entry) => (
                                    <Link
                                        key={entry._id}
                                        to={`/book/${entry.book._id}/read?chapterId=${entry.lastChapterRead._id}`}
                                        className="group"
                                    >
                                        <Card
                                            isPressable
                                            className="h-full"
                                        >
                                            <CardBody className="p-0 w-[240px]">
                                                <img
                                                    src={entry.book.bookImage}
                                                    alt={entry.book.title}
                                                    decoding="async"
																										loading='lazy'
																										width={100}
																										height={200}
                                                    className="w-full aspect-[3/4] object-cover"
                                                />
                                            </CardBody>
                                            <CardFooter className="flex-col items-start gap-1 p-3">
                                                <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-cyan-500 transition-colors">
                                                    {startCase(entry.book.title)}
                                                </h4>
                                                <p className="text-xs text-base-content/60">
                                                    Ch. {entry.lastChapterRead.chapterNo}
                                                </p>
                                                <p className="text-xs text-base-content/40">
                                                    {formatDate(entry.updatedAt)}
                                                </p>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={<FaHistory className="text-6xl" />}
                                title="No reading history"
                                description="Books you read will appear here"
                            />
                        )}
                    </div>
                )} */}

                {/* Bookmarks Tab */}
                {activeTab === "bookmarks" && (
                    <div>
                        {loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {Array(6).fill(0).map((_, idx) => (
                                    <Card key={idx}>
                                        <CardBody className="p-0">
                                            <Skeleton className="w-full aspect-[2/3] rounded-t-lg" />
                                        </CardBody>
                                        <CardFooter className="flex-col gap-2">
                                            <Skeleton className="h-4 w-full rounded-full" />
                                            <Skeleton className="h-3 w-2/3 rounded-full" />
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : bookmarks.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {bookmarks.map((book) => (
                                    <Link
                                        key={book._id}
                                        to={`/book/${book._id}`}
                                        className="group"
                                    >
                                        <Card
                                            isPressable
                                            className="h-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                                        >
                                            <CardBody className="p-0 relative">
                                                <img
                                                    src={book.bookImage}
                                                    alt={book.title}
                                                    className="w-full aspect-[2/3] object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                                                    loading="lazy"
                                                />
                                                <div className="absolute top-2 right-2 bg-amber-500 p-2 rounded-full shadow-lg">
                                                    <FaBookmark className="text-white text-xs" />
                                                </div>
                                            </CardBody>
                                            <CardFooter className="flex-col items-start gap-1 p-3">
                                                <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-cyan-500 transition-colors">
                                                    {startCase(book.title)}
                                                </h4>
                                                <p className="text-xs text-base-content/60">
                                                    {startCase(book.author)}
                                                </p>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={<FaBookmark className="text-6xl" />}
                                title="No bookmarks yet"
                                description="Bookmark your favorite books to find them easily"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Empty State Component
function EmptyState({ icon, title, description }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-base-content/30 mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-base-content/60 mb-6">{description}</p>
            <Button
                as={Link}
                to="/browse"
                color="primary"
                variant="bordered"
                startContent={<RiBook2Line />}
            >
                Browse Books
            </Button>
        </div>
    );
}

export default Library;
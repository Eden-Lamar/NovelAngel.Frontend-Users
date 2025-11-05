import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { capitalize, startCase } from 'lodash';
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import { Pagination } from "@heroui/pagination";
import { Skeleton } from "@heroui/skeleton";
import {Button} from "@heroui/button";
import { FaHeart, FaRegEye, FaChevronLeft, FaChevronRight  } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { BiBookContent } from "react-icons/bi";
import { GiBookshelf } from "react-icons/gi";
import { getCountryFlagCode } from "../helperFunction";


  // Filter options
    const categories = ['BL', 'GL', 'BG', 'No CP'];
    const tags = [
        'Action', 'Adventure', 'Drama', 'Romance', 'Sci-fic', 
        'Horror', 'Thriller', 'Female Protagonist', 'Male Protagonist', 
        'Historical', 'Mystery', 'Supernatural'
];


function Novels() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
		const scrollRef = useRef(null);

		const scroll = (direction) => {
			if (scrollRef.current) {
				const scrollAmount = 150; // adjust scroll speed
				scrollRef.current.scrollBy({
					left: direction === "left" ? -scrollAmount : scrollAmount,
					behavior: "smooth",
				});
			}
		};


    // State
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filters
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
    const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || '');
    const [selectedFilters, setSelectedFilters] = useState(() => {
        const category = searchParams.get('category');
        const tags = searchParams.get('tags');
        const filters = [];
        if (category) filters.push(category);
        if (tags) filters.push(...tags.split(','));
        return filters;
    });
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

  
    // const allFilters = [...categories, ...tags];

    // Fetch books
    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:3000/api/v1/books';
                const params = new URLSearchParams();
                
                // Check if we have any filters
                const hasFilters = keyword || selectedStatus || selectedFilters.length > 0;
                
                if (hasFilters) {
                    url = 'http://localhost:3000/api/v1/books/search';
                    
                    if (keyword) params.append('keyword', keyword);
                    if (selectedStatus) params.append('status', selectedStatus);
                    
                    // Separate category and tags
                    const category = selectedFilters.find(f => categories.includes(f));
                    const selectedTags = selectedFilters.filter(f => tags.includes(f));
                    
                    if (category) params.append('category', encodeURIComponent(category));
                    if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));
                }
                
                params.append('page', currentPage);
                params.append('limit', 12);
                
                const response = await axios.get(`${url}?${params}`);
                
                if (response.data.status === 'success') {
                    setBooks(response.data.data);
                    setTotalPages(response.data.pagination.totalPages);
                    setTotal(response.data.pagination.total);
                }
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch books');
                console.error('Error fetching books:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [keyword, selectedStatus, selectedFilters, currentPage]);

    // Update URL params
    useEffect(() => {
        const params = new URLSearchParams();
        if (keyword) params.set('keyword', keyword);
        if (selectedStatus) params.set('status', selectedStatus);
        if (currentPage > 1) params.set('page', currentPage);
        
        const category = selectedFilters.find(f => categories.includes(f));
        const selectedTags = selectedFilters.filter(f => tags.includes(f));
        if (category) params.set('category', category);
        if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
        
        setSearchParams(params);
    }, [keyword, selectedStatus, selectedFilters, currentPage, setSearchParams]);

    // Handle filter toggle
    const toggleFilter = (filter) => {
        setSelectedFilters(prev => {
            // If it's a category, remove any existing category first
            if (categories.includes(filter)) {
                const withoutCategories = prev.filter(f => !categories.includes(f));
                return prev.includes(filter) ? withoutCategories : [...withoutCategories, filter];
            }
            // For tags, just toggle
            return prev.includes(filter) 
                ? prev.filter(f => f !== filter)
                : [...prev, filter];
        });
        setCurrentPage(1); // Reset to first page
    };

    // Handle status change
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        setCurrentPage(1);
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    // Clear all filters
    const clearFilters = () => {
        setKeyword('');
        setSelectedStatus('');
        setSelectedFilters([]);
        setCurrentPage(1);
    };
// console.log('Books:', books);
    return (
        <div className="container mx-auto px-10 py-8">
            {/* Header */}
            <div className="mb-4">
                {/* <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500 mb-2">
                    Browse Novels
                </h1> */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Discover <span className="text-gold">{total}</span> amazing stories
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search and Status */}
                <div className="flex flex-col md:flex-row gap-4">
                    <form onSubmit={handleSearch} className="w-1/2 ">
                        <Input
                            placeholder="Search by title or author"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            startContent={<CiSearch className="text-2xl"/>}
                            size="md"
														radius="full"
                            classNames={{
                                input: "text-base",
																inputWrapper: "h-12"
                            }}
                        />
                    </form>
                    <Select
                        label="Status"
                        placeholder="All Status"
                        selectedKeys={selectedStatus ? [selectedStatus] : []}
                        onChange={handleStatusChange}
                        className="w-full md:w-48"
                        size="sm"
												radius="full"
                    >
                        <SelectItem key="" value="">All Status</SelectItem>
                        <SelectItem key="ongoing" value="ongoing">Ongoing</SelectItem>
                        <SelectItem key="completed" value="completed">Completed</SelectItem>
                    </Select>
                </div>

								<div className="relative flex items-center">
								{/* Left Button */}
								<Button
									onClick={() => scroll("left")}
									radius='full'
									variant='solid'
									isIconOnly
									size='lg'
									className="absolute left-0 z-10 h-full bg-white dark:bg-[#1a1b23] rounded-2xl group"
								>
									<FaChevronLeft className="text-gray-600 dark:text-gray-300 group-hover:dark:text-gray-100 group-hover:text-gray-800" />
								</Button>

								{/* Scrollable Chip List */}
                {/* Category and Tag Chips */}
                <div 
									ref={scrollRef}
									className="flex items-center gap-2 overflow-x-auto py-1 px-10 scrollbar-hide w-[95%] mx-auto">

									{/* Category Chips */}
									{categories.map((filter) => {
										const isSelected = selectedFilters.includes(filter);
										return (
											<Chip
												key={filter}
												onClick={() => toggleFilter(filter)}
												className="cursor-pointer whitespace-nowrap"
												color={isSelected ? "success" : "default"}
												variant={isSelected ? "flat" : "bordered"}
											>
												{filter}
											</Chip>
										);
									})}

									{/* Divider */}
									<div className="divider divider-horizontal mx-0.5 !h-[0.9rem] !w-[0.01rem] !self-center bg-gray-400 dark:bg-gray-600"/>

									{/* Tag Chips */}
									{tags.map((filter) => {
										const isSelected = selectedFilters.includes(filter);
										return (
											<Chip
												key={filter}
												onClick={() => toggleFilter(filter)}
												className="cursor-pointer whitespace-nowrap"
												color={isSelected ? "warning" : "default"}
												variant={isSelected ? "flat" : "bordered"}
											>
												{filter}
											</Chip>
										);
									})}

									{/* Clear All */}
									{(keyword || selectedStatus || selectedFilters.length > 0) && (
										<Chip
											onClick={clearFilters}
											className="cursor-pointer whitespace-nowrap"
											color="danger"
											variant="flat"
										>
											Clear All
										</Chip>
									)}
                </div>

								{/* Right Button */}
								<Button
									onClick={() => scroll("right")}
									radius='full'
									variant='solid'
									isIconOnly
									size='lg'
									className="absolute right-0 z-10 h-full bg-white dark:bg-[#1a1b23] rounded-2xl group"
								>
									<FaChevronRight className="text-gray-600 dark:text-gray-300" />
								</Button>
							</div>

            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
                    {error}
                </div>
            )}

            {/* Books Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    {[...Array(12)].map((_, i) => (
                        <Card key={i} className="w-full">
                            <CardBody className="flex flex-row gap-4 p-4">
                                <Skeleton className="w-32 h-48 rounded-lg flex-shrink-0" />
                                <div className="flex-1 space-y-3">
                                    <Skeleton className="h-6 w-3/4 rounded-lg" />
                                    <Skeleton className="h-4 w-full rounded-lg" />
                                    <Skeleton className="h-4 w-full rounded-lg" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                    </div>
                                    <div className="flex gap-4">
                                        <Skeleton className="h-4 w-20 rounded-lg" />
                                        <Skeleton className="h-4 w-20 rounded-lg" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            ) : books.length === 0 ? (
                <div className="text-center py-16 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-500/5 space-y-2">
										<GiBookshelf className="text-6xl text-blue-500 mx-auto"/>
                    <h3 className="text-xl text-gray-700 dark:text-gray-300">
                        No Novel found
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                        Try adjusting your filters or search terms
                    </p>
                    <Button
                        onClick={clearFilters}
                        color="primary"
                        variant="ghost"
												size="md"
												radius="full"
												className="font-medium"
                    >
                        Clear Filters
                    </Button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 p-2">
                        {books.map((book) => (
                            <Card
                                key={book._id}
                                isPressable
																shadow='md'
                                onPress={() => navigate(`/book/${book._id}`)}
                                className="h-60 w-full transition-all duration-300 bg-gray-50 dark:bg-[#09090b] group border border-amber-500/50"
                            >
                                <CardBody className="flex flex-row gap-0 p-0">
                                    {/* Book Image */}
                                    <div className="relative w-[40%] aspect-[3/4] h-full flex-shrink-0 overflow-hidden group">
                                        <img
                                            src={book.bookImage}
                                            alt={book.title}
																						decoding="async"
																						loading='lazy'
																						width={100}
																						height={200}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        />

																			{/* Gradient Overlay */}
																		<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/70 bg-opacity-100"/>

                                        {/* Status Badge */}
                                        <Chip
                                            size="sm"
                                            color={book.status === 'ongoing' ? 'warning' : 'success'}
                                            variant="flat"
																						classNames={{
																							base: "absolute top-2 left-2 uppercase text-[10px] backdrop-blur-md",
																							content: book.status === "ongoing" 
																								? "text-yellow-500" 
																								: "text-green-500"
																						}}
                                        >
                                            {book.status}
                                        </Chip>
                                        {/* Country Flag */}
                                        {book.country && (
                                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full overflow-hidden shadow-md">
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
                                    </div>

                                    {/* Book Info */}
                                    <div className="flex-1 flex flex-col justify-between min-w-0 p-3">
                                        <div>
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-gold dark:group-hover:text-gold mb-2 line-clamp-1">
                                                {startCase(book.title)}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 mb-3">
                                                {capitalize(book.description)}
                                            </p>
																						
                                            {/* Tags */}
                                            {book.tags && book.tags.length > 0 && (
                                                <div className="flex gap-2 mb-3 flex-wrap">
                                                    {book.tags.slice(0, 2).map((tag, index) => (
                                                        <Chip
                                                            key={index}
                                                            size="sm"
                                                            color="primary"
                                                            variant="flat"
                                                        >
                                                            {capitalize(tag)}
                                                        </Chip>
                                                    ))}

																										{book.tags.length > 2 && (
																											<Chip
																												size="sm"
																												color="primary"
																												variant="flat"
																											>
																												+{book.tags.length - 2}
																											</Chip>
																										)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Stats */}
																				<div className="flex justify-between px-2">
																					<p className="text-gray-400 text-sm flex items-center">
																							<FaRegEye className="mr-1" /> {book.views || 0}
																					</p>
																					
																					<p className="text-gold text-sm flex items-center">
																							<FaHeart className="mr-1" /> {book.likeCount || 0}
																					</p>
																					
																					<p className="text-cyan-500 text-sm flex items-center">
																							<BiBookContent className="mr-1" /> {book.chapters?.length || 0}
																					</p>
																				</div>
																				
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages  && (
                        <div className="flex justify-center">
                            <Pagination
                                total={totalPages}
                                page={currentPage}
                                onChange={setCurrentPage}
                                showControls
                                color="primary"
                                size="lg"
                            />
                        </div>
                    )}
                </>
            )}

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}

export default Novels;
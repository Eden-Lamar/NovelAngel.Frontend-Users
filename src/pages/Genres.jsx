import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from "@heroui/card";
import {Button} from "@heroui/button";
import { GiBookshelf } from "react-icons/gi";


function Genres() {
    const navigate = useNavigate();

    // Categories and Tags with gradient colors
    const categories = [
        { 
            name: 'BL', 
            fullName: 'Boys Love',
            gradient: 'from-blue-900 via-purple-900 to-gray-900',
            description: 'Romantic stories between male characters'
        },
        { 
            name: 'GL', 
            fullName: 'Girls Love',
            gradient: 'from-pink-900 via-rose-900 to-gray-900',
            description: 'Romantic stories between female characters'
        },
        { 
            name: 'BG', 
            fullName: 'Boy Girl',
            gradient: 'from-blue-900 via-indigo-900 to-gray-900',
            description: 'Traditional romance between opposite genders'
        },
				{
						name: 'No CP',
						fullName: 'No Couple',
						gradient: 'from-gray-900 via-teal-900 to-gray-900',
						description: 'Stories without romantic pairings'
				},
    ];

    const genres = [
        {
            name: 'Action',
            gradient: 'from-gray-900 via-orange-900 to-gray-900',
            icon: '⚔️',
            description: 'High-octane thrills and epic battles'
        },
        {
            name: 'Adventure',
            gradient: 'from-gray-900 via-teal-900 to-gray-900',
            icon: '🗺️',
            description: 'Exciting journeys to unknown lands'
        },
        {
            name: 'Drama',
            gradient: 'from-gray-900 via-purple-900 to-gray-900',
            icon: '🎭',
            description: 'Emotional depth and complex narratives'
        },
        {
            name: 'Romance',
            gradient: 'from-gray-900 via-rose-900 to-gray-900',
            icon: '💕',
            description: 'Love stories that warm the heart'
        },
        {
            name: 'Sci-fi',
            gradient: 'from-gray-900 via-blue-900 to-gray-900',
            icon: '🚀',
            description: 'Futuristic worlds and technology'
        },
        {
            name: 'Horror',
            gradient: 'from-gray-900 via-orange-900 to-gray-900',
            icon: '🧟',
            description: 'Spine-chilling tales of terror'
        },
        {
            name: 'Thriller',
            gradient: 'from-gray-800 via-gray-700 to-gray-900',
            icon: '🔪',
            description: 'Suspenseful edge-of-your-seat stories'
        },
        {
            name: 'Female Protagonist',
            gradient: 'from-gray-900 via-pink-900 to-gray-900',
            icon: '👸',
            description: 'Stories led by strong female leads'
        },
        {
            name: 'Male Protagonist',
            gradient: 'from-gray-900 via-indigo-900 to-gray-900',
            icon: '🤴',
            description: 'Stories led by compelling male leads'
        },
        {
            name: 'Historical',
            gradient: 'from-gray-900 via-yellow-900 to-gray-900',
            icon: '🏛️',
            description: 'Tales from ages past'
        },
        {
            name: 'Mystery',
            gradient: 'from-gray-900 via-purple-900 to-gray-900',
            icon: '🔍',
            description: 'Puzzles waiting to be solved'
        },
        {
            name: 'Supernatural',
            gradient: 'from-gray-900 via-amber-900 to-gray-900',
            icon: '🧛',
            description: 'Beyond the realm of natural'
        },
    ];

    const handleCategoryClick = (name) => {
        navigate(`/novels?category=${name}`);
    };

    const handleGenreClick = (name) => {
        navigate(`/novels?tags=${name}`);
    };

    return (
        <div className="container mx-auto px-2 md:px-10 py-8">
            {/* Header */}
            {/* <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500 mb-3">
                    Explore Genres
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Discover stories that match your taste
                </p>
            </div> */}

            {/* Categories Section */}
            <div className="mb-16 space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                    Categories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 overflow-hidden">
                    {categories.map((category) => (
                        <Card
                            key={category.name}
                            isPressable
														isBlurred
                            onPress={() => handleCategoryClick(category.name)}
                            className={`relative overflow-hidden group cursor-pointer h-48 transition-all duration-300 hover:scale-105 card-shine`}
                        >
                            <CardBody className="p-0">
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                                
                                {/* Overlay pattern */}
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                                
                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                                    <div className="space-y-2">
                                        <div className="text-white/80 text-sm font-medium uppercase tracking-wider">
                                            Category
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-medium text-white">
                                            {category.fullName}
                                        </h3>
                                        <p className="text-white/90 text-sm mt-2">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Shine effect on hover */}
                                {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                </div> */}
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Genres Section */}
            <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                    Genres & Tags
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {genres.map((genre) => (
                        <Card
                            key={genre.name}
                            isPressable
                            onPress={() => handleGenreClick(genre.name)}
                            className="relative overflow-hidden group cursor-pointer h-40 transition-all duration-300 hover:scale-105 hover:shadow-md card-shine p-0"
                        >
                            <CardBody className="p-0">
                                <div className={`absolute inset-0 bg-gradient-to-br ${genre.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/30" />
                                
                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-between p-4">
                                    <div className="text-4xl">
                                        {genre.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-medium text-white drop-shadow-md mb-1">
                                            {genre.name}
                                        </h3>
                                        <p className="text-white/80 text-xs line-clamp-2">
                                            {genre.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16">
                <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-500/5 rounded-2xl">
                    <div className="p-8">
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                            Can't Find What You're Looking For?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Browse all novels or use our advanced search to find your perfect story
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Button
                                onClick={() => navigate('/novels')}
																size='md'
																color='warning'
																variant='ghost'
																startContent={<GiBookshelf />}
                                className="font-medium"
                            >
                                Browse All Novels
                            </Button>
                            <Button
                                // onClick={() => navigate('/novels')}
																isDisabled
                                className="font-medium cursor-not-allowed"
                            >
                                Advanced Search
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Genres;
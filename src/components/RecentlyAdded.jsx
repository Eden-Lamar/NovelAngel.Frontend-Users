import { Chip } from "@heroui/chip";
// import { Button } from "@heroui/button";
import { capitalize } from "lodash";
import { useNavigate } from 'react-router-dom';
import { GoClock } from "react-icons/go";
import { RiArrowRightWideLine } from "react-icons/ri";

function RecentlyAdded({ books, loading }) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white dark:bg-[#1a1b23] py-2.5 md:py-5 w-full">
      <div className="container mx-auto px-4">

        {loading ? (
          null
        ) : (
					<>
						{/* Section Header */}
						<div className="mb-4">
							<Chip
								color="warning"
								variant="flat"
								size="md"
								className="text-sm"
							>
								Recently Added 📚
							</Chip>
						</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								{books.map((book) => (
									<div
										key={book.bookId}
										className="group relative bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-3 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] border border-transparent hover:border-cyan-500/20"
										onClick={() => navigate(`/book/${book.bookId}`)}
									>
										<div className="flex gap-3">
											{/* Book Cover */}
											<div className="relative flex-shrink-0">
												<div className="w-16 h-20 rounded-lg overflow-hidden">
													<img
														src={book.bookImage}
														alt={book.title}
														decoding="async"
														loading="lazy"
														className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
													/>
												</div>
												
												{/* Subtle glow on hover */}
												{/* <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10" /> */}
											</div>

											{/* Book Info */}
											<div className="flex-1 min-w-0 flex flex-col justify-between">
												{/* Title */}
												<h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 leading-tight">
													{capitalize(book.title)}
												</h3>

												{/* Chapter Info */}
												<div className="space-y-1">
													<p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
														<span className="font-semibold text-yellow-500">
															CH {book.latestChapter.chapterNo}:
														</span>{' '}
														{capitalize(book.latestChapter.title)}
													</p>

													{/* Time Ago */}
													<div className="flex items-center gap-2">
														<GoClock className="text-xs" />
														<span className="text-xs text-yellow-500">
															{book.latestChapter.updatedAt}
														</span>
													</div>
												</div>
											</div>

											{/* Chevron indicator */}
											<div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												<RiArrowRightWideLine className="text-yellow-500" />
											</div>
										</div>

										{/* Bottom border accent */}
										<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>
								))}
							</div>
					</>
        )}

        {/* View All Button */}
        {/* {!loading && books.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => navigate('/latest-updates')}
							variant="bordered"
							color="warning"
							size="lg"
							radius="full"
            >
              View All Updates →
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default RecentlyAdded;
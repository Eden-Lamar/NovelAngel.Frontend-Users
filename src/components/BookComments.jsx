import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { Skeleton } from "@heroui/skeleton";
import { FiSend } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { formatDate } from "../helperFunction";

function BookComments({ bookId, isAuthenticated }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalComments, setTotalComments] = useState(0);
    const [error, setError] = useState(null);
    
    const observerTarget = useRef(null);

    // Fetch comments
    const fetchComments = useCallback(async (pageNum = 1, append = false) => {
        try {
            if (pageNum === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const response = await axios.get(
                `http://localhost:3000/api/v1/books/${bookId}/comments?page=${pageNum}&limit=10`
            );

            const { data, total, totalPages } = response.data;

            if (append) {
                setComments(prev => [...prev, ...data]);
            } else {
                setComments(data);
            }

            setTotalComments(total);
            setHasMore(pageNum < totalPages);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load comments");
            console.error("Error fetching comments:", err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [bookId]);

    // Initial fetch
    useEffect(() => {
        fetchComments(1, false);
    }, [fetchComments]);

    // Infinite scroll observer
    useEffect(() => {
				const currentObserverTarget = observerTarget.current; // Store ref value

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        if (currentObserverTarget) {
            observer.observe(currentObserverTarget);
        }

        return () => {
            if (currentObserverTarget) {
                observer.unobserve(currentObserverTarget);
            }
        };
    }, [hasMore, loadingMore, loading]);

    // Fetch more comments when page changes
    useEffect(() => {
        if (page > 1) {
            fetchComments(page, true);
        }
    }, [page, fetchComments]);

    // Submit comment
    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/books/${bookId}/comments`,
                { content: newComment }
            );

            // Add new comment to the top
            setComments(prev => [response.data.data, ...prev]);
            setTotalComments(prev => prev + 1);
            setNewComment("");
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to post comment");
            console.error("Error posting comment:", err);
        } finally {
            setSubmitting(false);
        }
    };
console.log("comments:", comments)
    

    return (
        <Card className="w-full shadow-lg border border-gray-500/30">
            <CardBody className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <BiMessageSquareDetail className="text-3xl text-primary" />
                    <div>
                        <h3 className="text-2xl font-bold text-primary">Comments</h3>
                        <p className="text-sm text-base-content/60">
                            {totalComments} {totalComments === 1 ? 'comment' : 'comments'}
                        </p>
                    </div>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="alert alert-error alert-soft mb-4">
                        <span>{error}</span>
                    </div>
                )}

                {/* Comment Input or Login Prompt */}
                {isAuthenticated ? (
                    <div className="mb-6">
                        <Textarea
                            placeholder="Share your thoughts about this book..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            minRows={3}
                            maxRows={6}
                            variant="bordered"
                            classNames={{
                                input: "resize-none",
                                inputWrapper: "border-cyan-500/50 dark:border-cyan-500/30"
                            }}
                        />
                        <div className="flex justify-end mt-3">
                            <Button
                                color="primary"
                                endContent={<FiSend />}
                                onPress={handleSubmitComment}
                                isDisabled={!newComment.trim() || submitting}
                                isLoading={submitting}
                            >
                                {submitting ? "Posting..." : "Post Comment"}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Card className="mb-4 ">
                        <CardBody className="text-center py-3">
                            <p className="text-lg font-medium mb-4 text-gray-600 dark:text-gray-400">
                                Sign in to join the discussion
                            </p>
														<div className="flex items-center justify-center gap-3">
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
                        </CardBody>
                    </Card>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                    {loading && page === 1 ? (
                        // Loading skeletons
                        Array(3).fill(0).map((_, idx) => (
                            <Card key={idx} className="dark:bg-gray-800/50">
                                <CardBody className="p-4">
                                    <div className="flex gap-3">
                                        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-32 rounded-full" />
                                            <Skeleton className="h-3 w-full rounded-full" />
                                            <Skeleton className="h-3 w-4/5 rounded-full" />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                    ) : comments.length > 0 ? (
                        <>
                            {comments.map((comment) => (
                                <Card 
                                    key={comment._id}
                                    className="dark:bg-gray-800/50 hover:dark:bg-gray-800/70 transition-colors"
                                >
                                    <CardBody className="p-4">
                                        <div className="flex gap-3">
                                            <Avatar
																								isBordered
                                                name={comment.user?.username}
                                                className="flex-shrink-0"
                                                size="sm"
																								radius="sm"
																								src={comment.user?.avatar}
                                                showFallback
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-sm">
                                                        {comment.user?.username || "Anonymous"}
                                                    </span>
                                                    <span className="text-xs text-base-content/50">
                                                        {formatDate(comment.createdAt)}
                                                    </span>
                                                </div>
                                                <p className="text-base leading-relaxed break-words">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}

                            {/* Loading more indicator */}
                            {loadingMore && (
                                <Card className="dark:bg-gray-800/50">
                                    <CardBody className="p-4">
                                        <div className="flex gap-3">
                                            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                                            <div className="flex-1 space-y-2">
                                                <Skeleton className="h-4 w-32 rounded-full" />
                                                <Skeleton className="h-3 w-full rounded-full" />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            )}

                            {/* Intersection observer target */}
                            {hasMore && <div ref={observerTarget} className="h-4" />}

                            {/* End of comments message */}
                            {!hasMore && comments.length > 5 && (
                                <p className="text-center text-sm text-base-content/50 py-4">
                                    No more comments to load
                                </p>
                            )}
                        </>
                    ) : (
                        // No comments yet
                        <div className="text-center py-2">
                            <BiMessageSquareDetail className="text-5xl text-gray-600 dark:text-gray-600 mx-auto" />
                            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                                No comments yet
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Be the first to share your thoughts about this book
                            </p>
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default BookComments;
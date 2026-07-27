import { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Skeleton } from "@heroui/skeleton";
import api from '../api/axiosInstance';

function LegacyUrlRedirect() {
    const { bookId } = useParams(); // Gets the old ID from /book/:bookId/read
    const [searchParams] = useSearchParams();
    const chapterId = searchParams.get('chapterId'); // Gets the old ?chapterId=...
    const navigate = useNavigate();

    // /book/6984550ec65acad13ad01e91/read?chapterId=69a041366cbf9993a4a4f454
    useEffect(() => {
        const redirectUrl = async () => {
            try {
                // 1. Fetch the book using the old ID
                const response = await api.get(`/books/${bookId}`);
                const book = response.data.data;
                
                // 2. Find the correct chapter number based on the old chapterId
                let chapterNo = 1; // Default to chapter 1 if not found
                if (chapterId && book.chapters) {
                    const targetChapter = book.chapters.find(ch => ch._id === chapterId);
                    if (targetChapter) {
                        chapterNo = targetChapter.chapterNo;
                    }
                }

                // 3. Redirect to the new URL format (using replace so they can't hit 'back' into a loop)
                navigate(`/book/${book.slug}/chapter/${chapterNo}`, { replace: true });
                
            } catch (error) {
                console.error("Failed to redirect old URL:", error);
                // Fallback to home if the book doesn't exist anymore
                navigate('/', { replace: true });
            }
        };

        if (bookId) {
            redirectUrl();
        }
    }, [bookId, chapterId, navigate]);

    // Show a loading skeleton while we calculate the redirect
    return (
        <div className="flex justify-center items-center h-screen">
          {/* You can replace this with your actual loading spinner component */}
          <p>Loading your chapter...</p>
        </div>
    );
}

export default LegacyUrlRedirect;
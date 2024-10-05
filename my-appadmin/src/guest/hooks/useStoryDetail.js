import { useState, useEffect, useCallback } from 'react';
import { getStoryBySlug } from '../services/HomeStoryService';
import { addView } from '../services/ViewService';
import {rateStory} from '../services/RatingService'
import { getUserProgressByStory, saveOrUpdateUserProgress, getUserFollow, followStory, unfollowStory, likeStory, unlikeStory, checkIfLiked } from '../services/UserService';
import {jwtDecode} from 'jwt-decode';
import { listchapter } from '../services/HomeStoryService';
import { createComment,getCommentsByStoryId,deleteComment } from '../services/CommentService';
import { toast } from "react-toastify";

export const useStoryDetail = (slug) => {
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('authToken');
    const userId = token ? jwtDecode(token).userId : null;
    const [userProgress, setUserProgress] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [comments, setComments] = useState([]);
    const [chapter,setChapter] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    


    const [lastRatingTime, setLastRatingTime] = useState(0); // Thời gian gửi đánh giá gần nhất
    const ratingCooldown = 60 * 1000; // 1 phút trong mili giây


    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await getStoryBySlug(slug);
                setStory(response.data);

                if (userId) {
                    const { id: storyId } = response.data;

                    const progressResponse = await getUserProgressByStory(userId, storyId);
                    setUserProgress(progressResponse.data);

                    const followResponse = await getUserFollow(userId, storyId, null);
                    setIsBookmarked(followResponse.data);

                    const likeResponse = await checkIfLiked(userId, storyId);
                    setIsLiked(likeResponse.data);


                    const chapterresponse = await listchapter(storyId);
                    const chapters = chapterresponse.data;

                    if (chapters.length > 0) {
                        setChapter(chapters[0]); // Set the first chapter
                    }

                    const commentsResponse = await getCommentsByStoryId(storyId);
                    setComments(commentsResponse);

                    // const ratingResponse = await getRating(userId, storyId);
                    // setUserRating(ratingResponse.data);
                }
            } catch (error) {
                console.error('Error fetching story:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [slug, userId]);

    const handleBookmarkClick = async () => {
        if (userId && story) {
            try {
                if (isBookmarked) {
                    await unfollowStory(userId, story.id, null);
                    setIsBookmarked(false);
                } else {
                    await followStory(userId, story.id, null);
                    setIsBookmarked(true);
                }
            } catch (error) {
                console.error('Error updating bookmark:', error);
            }
        }else{
            toast.error("Bạn phải đăng nhập để sử dụng tính năng này!");
          }
    };

    const handleLikeClick = async () => {
        if (userId && story) {
            try {
                if (isLiked) {
                    await unlikeStory(userId, story.id);
                    setIsLiked(false);
                } else {
                    await likeStory(userId, story.id);
                    setIsLiked(true);
                }
            } catch (error) {
                console.error('Error updating like:', error);
            }
        }else{
            toast.error("Bạn phải đăng nhập để sử dụng tính năng này!");
          }
    };
 

    // const handleButtonClick = async () => {
    //      // Tăng số lượt xem ngay cả khi người dùng không đăng nhập
    //      await addView(story.id);
    //     if (userId && story) {
    //         const nextChapterNumber = userProgress ? userProgress.chapterNumber : 1;
    //         await saveOrUpdateUserProgress(userId, story.slug, nextChapterNumber);
    //     }
    // };
    const handleButtonClick = async (event) => {
        // Kiểm tra nếu chapterCount bằng 0
        if (story.chapterCount === 0) {
            event.preventDefault(); // Ngăn chặn điều hướng và tất cả các hành động khác
            return; // Không thực hiện thêm hành động nào khác
        }
    
        // Tăng số lượt xem ngay cả khi người dùng không đăng nhập
        await addView(story.id);
    
        if (userId && story) {
            const nextChapterNumber = userProgress ? userProgress.chapterNumber : 1;
            await saveOrUpdateUserProgress(userId, story.slug, nextChapterNumber);
        }
    };

    const handleRatingSubmit = useCallback(async (newRating) => {
        const currentTime = Date.now();
        // Kiểm tra xem thời gian hiện tại có cách thời gian gửi đánh giá gần nhất ít hơn 1 phút không
        if (currentTime - lastRatingTime < ratingCooldown) {
            toast.info("Bạn hãy đợi một phút trước khi gửi đánh giá tiếp theo.");
            return;
        }

        if (userId && story) {
            try {
                await rateStory(userId, story.id, newRating); // Gửi điểm đánh giá mới lên server
                setLastRatingTime(currentTime); // Cập nhật thời gian gửi đánh giá gần nhất
                toast.success("Đánh giá của bạn đã được gửi!");
            } catch (error) {
                console.error('Error submitting rating:', error);
                toast.error("Đã xảy ra lỗi khi gửi đánh giá.");
            }
        } else {
            toast.error("Bạn phải đăng nhập để đánh giá!");
        }
    }, [userId, story, lastRatingTime,ratingCooldown]);

    const handleCommentSubmit = useCallback(async (commentText, chapterId) => {
    if (!commentText.trim()) {
        toast.error("Bình luận không được để trống.");
        return;
    }

    if (userId && story) {
        const commentDTO = {
            storyId: story.id,
            chapterId: chapter.chapterId,  // Thêm chapterId vào đây
            userId: userId,
            commentText: commentText,
        };
        console.log(commentDTO);

        try {
            await createComment(commentDTO);
            toast.success("Bình luận của bạn đã được gửi!");
        } catch (error) {
            console.error('Error submitting comment:', error);
            toast.error("Đã xảy ra lỗi khi gửi bình luận.");
        }
    } else {
        toast.error("Bạn phải đăng nhập để bình luận!");
    }
    }, [userId, story,chapter]);

    const handleDeleteComment = useCallback(async (commentId) => {
        if (userId) {
            try {
                await deleteComment(commentId);
                // Cập nhật danh sách bình luận sau khi xóa
                setComments(prevComments => prevComments.filter(c => c.commentId !== commentId));
                toast.success("Bình luận đã được xóa!");
            } catch (error) {
                console.error('Error deleting comment:', error);
                toast.error("Đã xảy ra lỗi khi xóa bình luận.");
            }
        } else {
            toast.error("Bạn phải đăng nhập để xóa bình luận!");
        }
    }, [userId]); 

    return {
        story,
        loading,
        userProgress,
        isBookmarked,
        isLiked,
        comments,
        userId,
        handleBookmarkClick,
        handleLikeClick,
        handleButtonClick,
        handleRatingSubmit,
        handleCommentSubmit,
        handleDeleteComment
    };
};

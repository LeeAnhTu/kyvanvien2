import React, { useState, useEffect } from 'react';
import { timeSince } from '../../utils/timeUtils';
import { createComment, getCommentsByStoryId, deleteComment } from '../services/CommentService';
import { toast } from 'react-toastify';

const Comment = ({ storyId, chapterId, userId, userName }) => {
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState([]); // Lưu tất cả bình luận
  const [displayedComments, setDisplayedComments] = useState([]); // Bình luận hiển thị
  const [showDeleteMenu, setShowDeleteMenu] = useState(null);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [commentsPerPage] = useState(5); // Số lượng bình luận trên mỗi trang
  const [hasMoreComments, setHasMoreComments] = useState(true); // Kiểm tra có còn bình luận để tải thêm không
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true); // Bắt đầu tải dữ liệu
        const response = await getCommentsByStoryId(storyId);
        setAllComments(response);
        setHasMoreComments(response.length > commentsPerPage); // Có bình luận để tải thêm
        setPage(1); // Reset trang khi có dữ liệu mới
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false); // Kết thúc tải dữ liệu
      }
    };

    fetchComments();
  }, [storyId, chapterId,commentsPerPage]);

  useEffect(() => {
    const startIndex = (page - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    setDisplayedComments(allComments.slice(0, endIndex));
    setHasMoreComments(endIndex < allComments.length); // Cập nhật trạng thái có bình luận để tải thêm
  }, [page, allComments,commentsPerPage]);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      toast.error("Bình luận không được để trống.");
      return;
    }

    if (userId) {
      const commentDTO = {
        storyId,
        chapterId,
        userId,
        commentText,
      };

      try {
        await createComment(commentDTO);
        // Cập nhật bình luận mới vào danh sách
        setAllComments([{
          commentId: Date.now(),
          userName: userName,
          createdAt: new Date(),
          commentText,
          chapterName: 'Chương hiện tại'
        }, ...allComments]);
        setCommentText("");
        toast.success("Bình luận của bạn đã được gửi!");
      } catch (error) {
        console.error('Error submitting comment:', error);
        toast.error("Đã xảy ra lỗi khi gửi bình luận.");
      }
    } else {
      toast.error("Bạn phải đăng nhập để bình luận!");
    }
  };

  const handleDeleteClick = (commentId) => {
    setShowDeleteMenu(showDeleteMenu === commentId ? null : commentId);
  };

  const onDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setAllComments(allComments.filter(c => c.commentId !== commentId));
      setDisplayedComments(displayedComments.filter(c => c.commentId !== commentId));
      setShowDeleteMenu(null);
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error("Đã xảy ra lỗi khi xóa bình luận.");
    }
  };

  const loadMoreComments = () => {
    setLoading(true); // Bắt đầu tải dữ liệu
    setTimeout(() => {
      setPage(prevPage => prevPage + 1);
      setLoading(false); // Kết thúc tải dữ liệu
    }, 1000); // Thay đổi thời gian chờ nếu cần
  };

  return (
    <div className="tab-content container story-detail">
      <div className="tab-pane fade show active">
        <div className="comment-section">
          <textarea
            placeholder="Bình Luận..."
            value={commentText}
            onChange={handleCommentChange}
            rows={4}
            cols={50}
            style={{ background: '#000', color: '#fff' }}
          />
          <div className="button-container" style={{ justifyContent: 'flex-end', margin: '4px' }}>
            <button onClick={handleCommentSubmit} className="submit-button">
              Gửi Bình Luận
            </button>
          </div>
        </div>

        <div className="comments-list">
          {displayedComments.length > 0 ? (
            displayedComments.map((c) => (
              <div key={c.commentId} className="comment-item">
                <div className="comment-header">
                  <strong>{c.userName}</strong> <span>{timeSince(new Date(c.createdAt))}</span>
                  {c.userId === userId && (
                    <div className="ellipsis-menu">
                      <button className="ellipsis-button" onClick={() => handleDeleteClick(c.commentId)}>
                        ...
                      </button>
                      {showDeleteMenu === c.commentId && (
                        <div className="delete-menu">
                          <button onClick={() => onDeleteComment(c.commentId)}>Xóa</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="comment-body" dangerouslySetInnerHTML={{ __html: c.commentText.replace(/\n/g, '<br/>') }}></div>
                <div className="comment-footer">
                  <span>{c.chapterName}</span>
                </div>
              </div>
            ))
          ) : (
            <p>Chưa có bình luận nào.</p>
          )}
          {hasMoreComments && (
            <div className="load-more-container">
              <button onClick={loadMoreComments} className="load-more-button" disabled={loading}>
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i> // Biểu tượng spinner từ Font Awesome 
                ) : (
                  'Xem thêm'
                )}
              </button>
              {loading && <p>Đang tải...</p>} {/* Thông báo đang tải */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;

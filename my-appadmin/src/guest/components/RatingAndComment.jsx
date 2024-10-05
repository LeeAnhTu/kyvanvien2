// Component RatingAndComment
import React, { useEffect, useState } from 'react';
import Slider from 'react-slider';
import { timeSince } from '../../utils/timeUtils';

const RatingAndComment = ({ onSubmitRating, onSubmitComment, comments = [], currentUser, onDeleteComment }) => {
    const [activeTab, setActiveTab] = useState('rating');
    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState('');
    const [showDeleteMenu, setShowDeleteMenu] = useState(null);
    const [displayedComments, setDisplayedComments] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const commentsPerPage = 5; // Số bình luận mỗi trang


    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleRatingSubmit = () => {
        if (onSubmitRating) {
            onSubmitRating(rating);
        }
        setRating(3);
    };

    const handleCommentSubmit = () => {
        if (onSubmitComment) {
            onSubmitComment(comment);
        }
        setComment('');
    };

    const handleDeleteClick = (commentId) => {
        setShowDeleteMenu(showDeleteMenu === commentId ? null : commentId);
    };

    const loadMoreComments = () => {
        setLoading(true); // Bắt đầu tải dữ liệu
        setTimeout(() => {
            setPage(prevPage => prevPage + 1);
            setLoading(false); // Kết thúc tải dữ liệu
        }, 1000); // Thay đổi thời gian chờ nếu cần
    };

    // Cập nhật bình luận hiển thị khi page thay đổi
    useEffect(() => {
        const startIndex = (page - 1) * commentsPerPage;
        const endIndex = startIndex + commentsPerPage;
        setDisplayedComments(comments.slice(0, endIndex));
    }, [page, comments]);


    return (
        <div className="container">
            <div className="row top-ratings">
                <div className="col-12 top-ratings__tab mb-2">
                    <div className="list-group d-flex flex-row" id="list-tab" role="tablist">
                        <button
                            className={`list-group-item list-group-item-action ${activeTab === 'rating' ? 'active' : ''}`}
                            onClick={() => setActiveTab('rating')}
                            role="tab"
                        >
                            Đánh Giá
                        </button>
                        <button
                            className={`list-group-item list-group-item-action ${activeTab === 'comment' ? 'active' : ''}`}
                            onClick={() => setActiveTab('comment')}
                            role="tab"
                        >
                            Bình Luận
                        </button>
                    </div>
                </div>
            </div>

            <div className="tab-content">
                {activeTab === 'rating' && (
                    <div className="tab-pane fade show active">
                        <div className="rating-section">
                            <h4>Chấm điểm nội dung: {rating}</h4>
                            <Slider
                                min={3}
                                max={5}
                                step={0.1}
                                value={rating}
                                onChange={handleRatingChange}
                                className="slider"
                            />
                            <div className="button-container">
                                <button onClick={handleRatingSubmit} className="submit-button">
                                    Gửi Đánh Giá
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'comment' && (
                    <div className="tab-pane fade show active">
                        <div className="comment-section">
                            <textarea
                                placeholder="Bình Luận..."
                                value={comment}
                                onChange={handleCommentChange}
                                rows={4}
                                cols={50}
                                style={{ background: '#000', color: '#fff' }}
                            />
                            <div className="button-container">
                                <button onClick={handleCommentSubmit} className="submit-button">
                                    Gửi Bình Luận
                                </button>
                            </div>
                        </div>

                        <div className="comments-list">
                            <h4>Bình luận</h4>
                            {comments.length > 0 ? (
                                displayedComments.map((c) => (
                                    <div key={c.commentId} className="comment-item">
                                        <div className="comment-header">
                                            <strong>{c.userName}</strong> <span> {timeSince(new Date(c.createdAt))}</span>
                                            {c.userId === currentUser && (
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
                            {comments.length > displayedComments.length && (
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
                )}
            </div>
        </div>
    );
};

export default RatingAndComment;

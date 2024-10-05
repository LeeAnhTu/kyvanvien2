import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ListChapterHome from '../components/ListChapterHome';
import { useStoryDetail } from '../hooks/useStoryDetail';
import RatingAndComment from '../components/RatingAndComment';
import StarRatings from 'react-star-ratings'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 


const StoryDetailHome = () => {
    const { slug } = useParams();
    const {
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
    } = useStoryDetail(slug);

    if (loading) {
        return <div className="story-detail container" ><p>Loading...</p></div>;
    }

    if (!story) {
        return <p>Story not found.</p>;
    }


    const nextChapterNumber = userProgress ? userProgress.chapterNumber: 1;
    const readLink = `/truyen/${story.slug}/chuong/${nextChapterNumber}`;
    const buttonText = userProgress ? "Đọc tiếp" : "Đọc truyện";

    return (
        <main className='main-sub' style={{ backgroundColor: '#fff' }}>
            <div className="story-detail container" >
                <div className="row align-items-start">
                    <div className="col-12 col-md-7 col-lg-11" >
                        <div className="head-title-global d-flex justify-content-between mb-4">
                            <div className="col-12 col-md-12 col-lg-4 head-title-global__left d-flex">
                                <h2 className="me-2 mb-0 border-bottom border-secondary pb-1" style={{ fontWeight: 'bold' }}>
                                    <span className="d-block text-decoration-none text-dark fs-4 title-head-name" title="Thông tin truyện">
                                        Thông tin truyện
                                    </span>
                                </h2>
                            </div>
                        </div>

                        <div className="story-detail">
                            <div className="story-detail__top d-flex custom-items-start">
                                <div className="row custom-items-start">
                                        <div className="col-12 col-md-12 col-lg-3 story-detail__top--image">
                                            <div className="book-3d">
                                                <img
                                                src={story.storyImg}
                                                alt={story.title}
                                                className="img-fluid w-100"
                                                width="200"
                                                height="300"
                                                loading="lazy"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-12 col-lg-9">
                                            <h3 className="text-center story-name px-3" style={{ fontWeight:'bold',textAlign: 'unset !important' }}>{story.title}</h3>
                                            <div className="story-detail__bottom mb-3">
                                                <div className="row px-3">
                                                    <div className="story-detail__bottom--info">
                                                        <div className="mb-1" style={{display:'flex',alignItems:'center'}}>
                                                            <Link className="text-decoration-none text-dark hover-title">{story.author}</Link> &nbsp;&nbsp;
                                                            <div style={{paddingBottom:'3px'}}>
                                                                <span>
                                                                    <StarRatings
                                                                        rating={story.averageRating || 0} // Cung cấp rating để hiển thị sao
                                                                        starRatedColor="gold"
                                                                        starDimension="15px"
                                                                        starSpacing="2px"
                                                                        numberOfStars={5}
                                                                        name='rating'
                                                                    />
                                                                </span>
                                                                <span>{(story.averageRating || 0).toFixed(1)}</span>&nbsp;
                                                                <span>({story.ratingCount || 0})</span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="action-buttons d-flex justify-content-start mb-3">
                                                            <Link to={readLink} onClick={handleButtonClick}>
                                                                <button className={userProgress ? 'read-next' : 'read-start'}>
                                                                    {buttonText}
                                                                </button>
                                                            </Link>

                                                            <button
                                                                className='btn1 ms-2 btn-primary'
                                                                onClick={handleBookmarkClick}
                                                            >
                                                                <i className={isBookmarked ? "fa-regular fa-circle-check" : "fa-regular fa-bookmark"}></i>
                                                                
                                                            </button>

                                                            <button
                                                                className='btn1 ms-2 btn-primary'
                                                                onClick={handleLikeClick}
                                                            >
                                                                <i className={isLiked ? "fa-solid fa-heart liked-heart" : "fa-regular fa-heart"}></i>
                                                            </button>
                                                        </div>

                                                        <div className="d-flex align-items-center mb-1 flex-wrap">
                                                            <strong className="me-1">Thể loại: </strong>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <Link className="text-decoration-none text-dark hover-title me-1" style={{ width: 'max-content' }}>
                                                                    {story.genreName}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <p className="mb-1">
                                                            <strong>Số chương: </strong>
                                                        <span className="text-info">{story.chapterCount}</span>
                                                        </p>
                                                        <p className="mb-1">
                                                            <strong>Trạng thái: </strong>
                                                            <span className="text-info">{story.statusName}</span>
                                                        </p>

                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* <div className="rate-story mb-2">
                                                <div className="rate-story__holder">
                                                    <StarRatings
                                                        rating={story.averageRating || 0} // Cung cấp rating để hiển thị sao
                                                        starRatedColor="gold"
                                                        starDimension="20px"
                                                        starSpacing="2px"
                                                        numberOfStars={5}
                                                        name='rating'
                                                    />
                                                </div>
                                            <div
                                                className="rate-story__value"
                                                itemProp="aggregateRating"
                                                itemScope
                                                itemType="https://schema.org/AggregateRating"
                                            >
                                                <em>
                                                    Đánh giá: 
                                                    <strong>
                                                        <span itemProp="ratingValue"> {(story.averageRating || 0).toFixed(1)}</span>
                                                    </strong>
                                                    / <span className="" itemProp="bestRating">5 </span>
                                                    từ <strong><span itemProp="ratingCount"> {story.ratingCount || 0}</span> lượt</strong>
                                                </em>
                                            </div>
                                            </div> */}

                                        </div>
                                </div>
                            </div>

                            <div className='info'>
                                <h4>Giới thiệu</h4>
                            </div>
                            <div
                                className="story-detail__top--desc px-3"
                                dangerouslySetInnerHTML={{ __html: story.description }}
                            >
                            </div>

                            <ListChapterHome />
                            <RatingAndComment 
                                            storyId={story.id}
                                            comments={comments}
                                            currentUser={userId}
                                            onSubmitRating={handleRatingSubmit} // Truyền hàm xử lý đánh giá
                                            onSubmitComment={handleCommentSubmit} // Truyền hàm xử lý bình luận
                                            onDeleteComment={handleDeleteComment}
                                        />
                        </div>
                    </div>

                    {/* <div className="col-12 col-md-5 col-lg-4 sticky-md-top">
                        <TopRating />
                    </div> */}
                </div>
            </div>
        </main>
    );
};

export default StoryDetailHome;



import React, { useEffect, useState } from 'react';
import { Link  } from 'react-router-dom';
import { listStoryRating } from '../services/HomeStoryService';
import StarRatings from 'react-star-ratings'; 



const StoryRating = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const LIMIT = 16;


      useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await listStoryRating();
                setStories(response.data.slice(0, LIMIT)); // Giới hạn số lượng câu chuyện
            } catch (error) {
                console.error("Error fetching stories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);
    
      return (
        <div className="section-stories-full mb-3 mt-3">
        <div className="container">
            <div className="row">
                <div className="head-title-global d-flex justify-content-between mb-2">
                    <div className="col-12 col-md-4 head-title-global__left d-flex" style={{cursor:'pointer'}}>
                        <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                                <span className="d-block text-decoration-none text-dark fs-4 title-head-name"
                                title="Truyện đã hoàn thành">Truyện đánh giá cao</span>
                        </h2>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                {loading ? (
                            <p>Đang tải dữ liệu...</p>
                        ) : (
                            <div className="section-stories-full__list">
                            {stories.map(story => (
                                
                                <div key={story.id} className="story-item-full text-center">
                                    <Link to={`/truyen/${story.slug}`} className="d-block story-item-full__image">
                                        <img src={story.storyImg} alt={story.title}  className="img-fluid w-100"
                                            width="150" height="230" loading="lazy" />
                                    </Link>
                                    <h3 className="fs-6 story-item-full__name fw-bold text-center mb-0">
                                        <Link to={`/truyen/${story.slug}`} className="text-decoration-none text-one-row story-name">
                                            {story.title}
                                        </Link>
                                    </h3>
                                    <span className="story-item-full__badge badge text-bg-success">{story.averageRating}&#160; 
                                        <StarRatings
                                        rating={1} // Cung cấp rating để hiển thị sao
                                        starRatedColor="gold"
                                        starDimension="15px"
                                        starSpacing="2px"
                                        numberOfStars={1}                                        
                                        />
                                        </span>
                                </div>
                            ))}
                            </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    );
}

export default StoryRating;

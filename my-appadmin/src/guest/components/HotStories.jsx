import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listStoryView } from '../services/HomeStoryService';

const StoriesHot = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const LIMIT = 16; // Giới hạn số câu chuyện 

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await listStoryView();
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
        <div className="section-stories-hot mb-3">
            <div className="container">
                <div className="row">
                    <div className="head-title-global d-flex justify-content-between mb-2">
                        <div className="col-6 col-md-4 col-lg-4 head-title-global__left d-flex align-items-center">
                            <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                                <Link to="/" className="d-block text-decoration-none text-dark fs-4 story-name" title="Truyện Hot">
                                    Truyện Hot
                                </Link>
                            </h2>
                            <i className="fa-solid fa-fire-flame-curved"></i>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {loading ? (
                            <div className="section-stories-hot__list wrapper-skeleton">
                                {Array(LIMIT).fill().map((_, index) => (
                                    <div className="skeleton" style={{ maxWidth: '150px', width: '100%', height: '230px' }} key={index}></div>
                                ))}
                            </div>
                        ) : (
                            <div className="section-stories-hot__list">
                                {stories.map((story, index) => (
                                    <div className="story-item" key={index}>
                                        <Link to={`/truyen/${story.slug}`} className="d-block text-decoration-none">
                                            <div className="story-item__image">
                                                <img src={story.storyImg} alt={story.title} className="img-fluid" width="150" height="230" loading="lazy" />
                                            </div>
                                            <h3 className="story-item__name text-one-row story-name" style={{whiteSpace: 'nowrap'}}>{story.title}</h3>

                                            <div className="list-badge">
                                                {/* <span className="story-item__badge badge text-bg-success">Full</span> */}
                                                <span className="story-item__badge story-item__badge-hot badge text-bg-danger">Hot</span>
                                                {/* <span className="story-item__badge story-item__badge-new badge text-bg-info text-light">New</span> */}
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoriesHot;

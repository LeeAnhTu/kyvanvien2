import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReadingHistory from './ReadingHistory';
import { listStoryNewChapter } from '../services/HomeStoryService';

const StoryNew = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const LIMIT = 15;

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await listStoryNewChapter();
                if (response.data) {
                    setStories(response.data.slice(0, LIMIT));
                } else {
                    setStories([]);
                }
            } catch (error) {
                console.error("Error fetching stories:", error);
                setStories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Hiển thị thông báo đang tải dữ liệu
    }

    if (stories.length === 0) {
        return <p>No stories available.</p>; // Hiển thị thông báo không có dữ liệu
    }

    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md-8 col-lg-9">
                    <div className="section-stories-new mb-3">
                        <div className="row">
                            <div className="head-title-global d-flex justify-content-between mb-2">
                                <div className="col-6 col-md-4 col-lg-4 head-title-global__left d-flex align-items-center">
                                    <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                                        <Link
                                            to="https://suustore.com/" // Thay vì href, dùng to cho Link
                                            className="d-block text-decoration-none text-dark fs-4 story-name"
                                            title="Truyện Mới"
                                        >
                                            Truyện Mới Lên Chương
                                        </Link>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="section-stories-new__list">
                                    {stories.map((story) => (
                                        <div key={story.id} className="story-item-no-image">
                                            <div className="story-item-no-image__name d-flex align-items-center">
                                                <h3 className="me-1 mb-0 d-flex align-items-center">
                                                    <svg
                                                        style={{ width: '10px', marginRight: '5px' }}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="1em"
                                                        viewBox="0 0 320 512"
                                                    >
                                                        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                                    </svg>
                                                    <Link
                                                        to={`/truyen/${story.slug}`} // Thay đổi đường dẫn để dẫn đến trang chi tiết truyện
                                                        className="text-decoration-none text-dark fs-6 hover-title text-one-row story-name"
                                                    >
                                                        {story.title}
                                                    </Link>
                                                </h3>
                                            </div>

                                            <div className="story-item-no-image__categories ms-2 d-none d-lg-block">
                                                <p className="mb-0">
                                                    
                                                        <Link
                                                            className="hover-title text-decoration-none text-dark category-name"
                                                        >
                                                            {story.genreName}
                                                        </Link>
                                                </p>
                                            </div>

                                            <div className="story-item-no-image__chapters ms-2">
                                                <div className=" text-decoration-none text-info">
                                                    Chương {story.chapterCount}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ReadingHistory />
            </div>
        </div>
    );
};

export default StoryNew;

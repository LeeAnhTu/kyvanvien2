import React, { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { listStorycompleted } from '../services/HomeStoryService';


const StoryCompleted = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const LIMIT = 16;


    const navigate = useNavigate();
      const handleFilterCompleted = () => {
        localStorage.setItem('statusId', 3); // Lưu giá trị vào localStorage
        navigate('/truyen/danh-sach'); // Điều hướng đến trang Filter
      };

      useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await listStorycompleted();
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
                        <h2 className="me-2 mb-0 border-bottom border-secondary pb-1" onClick={handleFilterCompleted}>
                                <span className="d-block text-decoration-none text-dark fs-4 title-head-name"
                                title="Truyện đã hoàn thành">Truyện đã hoàn thành</span>
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
                                    <span className="story-item-full__badge badge text-bg-success">Full - {story.chapterCount} chương</span>
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

export default StoryCompleted;



import React, { useState, useEffect } from 'react';
import { listchapter1 } from '../services/HomeStoryService';
import { Link, useParams } from 'react-router-dom';
import { saveOrUpdateUserProgress } from '../services/UserService';
import { addView } from '../services/ViewService';
import { jwtDecode } from 'jwt-decode';

const ListChapterHome = () => {
    const { slug } = useParams();
    const [chapters, setChapters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(50); // số lượng chương mỗi trang
    const [inputPage, setInputPage] = useState('');
    const [token] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await listchapter1(slug);
                setChapters(response.data); // Dữ liệu chương
                
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };

        fetchChapters();
    }, [slug]);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentChapters = chapters.slice(startIndex, endIndex);
    const totalPages = Math.ceil(chapters.length / pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleGoToPage = () => {
        const page = parseInt(inputPage, 10);
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleChapterClick = async (chapterNumber) => {
        if (token) {
            const userId = jwtDecode(token).userId;
            await saveOrUpdateUserProgress(userId, slug, chapterNumber);
        }
        // Gọi hàm addView khi người dùng nhấn vào chương
        await addView(chapters[chapterNumber - 1].storyId);
    };

    return (
        <div className="story-detail__list-chapter">
            <div className="head-title-global d-flex justify-content-between mb-4">
                <div className="col-6 col-md-12 col-lg-4 head-title-global__left d-flex">
                    <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                        <span
                            className="d-block text-decoration-none text-dark fs-4 title-head-name"
                            title="Truyện hot"
                        >
                            Danh sách chương
                        </span>
                    </h2>
                </div>
            </div>

            <div className="story-detail__list-chapter--list">
                <div className="row">
                    {currentChapters.length > 0 ? (
                        currentChapters.map((chapter) => (
                            <div key={chapter.chapterId} className="col-12 col-sm-6 col-lg-6 story-detail__list-chapter--list__item">
                                <ul>
                                    <li>
                                        <Link
                                            to={`/truyen/${slug}/chuong/${chapter.chapterNumber}`} // Cập nhật link nếu cần
                                            className="text-decoration-none text-dark hover-title"
                                            style={{ color: '#333', textDecoration: 'none' }}
                                            onMouseOver={(e) => e.currentTarget.style.color = '#007bff'}
                                            onMouseOut={(e) => e.currentTarget.style.color = '#333'}
                                            onClick={() => handleChapterClick(chapter.chapterNumber)} // Gọi hàm lưu tiến trình đọc
                                        >
                                            {chapter.title}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>Không có chương nào để hiển thị.</p>
                    )}
                </div>
            </div>

            <div className="pagination" style={{justifyContent:'center'}}>
                <ul>
                    {currentPage > 1 && (
                        <li className="pagination__item pagination__arrow">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                aria-label="Previous Page"
                            >
                                &lt;&lt;
                            </button>
                        </li>
                    )}

                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`pagination__item ${currentPage === index + 1 ? 'page-current' : ''}`}
                        >
                            <button
                                onClick={() => handlePageChange(index + 1)}
                                className="page-link story-ajax-paginate "
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    {currentPage < totalPages && (
                        <li className="pagination__item pagination__arrow">
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                aria-label="Next Page"
                            >
                                &gt;&gt;
                            </button>
                        </li>
                    )}

                    <div className="dropup-center dropup choose-paginate me-1">
                        <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Chọn trang
                        </button>
                        <div className="dropdown-menu">
                            <input
                                type="number"
                                className="form-control input-paginate me-1"
                                value={inputPage}
                                onChange={(e) => setInputPage(e.target.value)}
                            />
                            <button
                                className="btn btn-success btn-go-paginate"
                                onClick={handleGoToPage}
                            >
                                Đi
                            </button>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default ListChapterHome;

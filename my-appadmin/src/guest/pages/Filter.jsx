


import React, { useEffect, useState } from 'react';
import { filterStories } from '../services/FilterService';
import { listGenre } from '../services/CategoryService';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Filter = () => {
  const [stories, setStories] = useState([]);
  const [typeId, setTypeId] = useState(null);
  const [genreId, setGenreId] = useState(null);
  const [genres, setGenres] = useState([]);
  const [statusId, setStatusId] = useState(localStorage.getItem('statusId') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("lastChapter");

  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage] = useState(10);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await listGenre();
        setGenres(response.data);
        setLoading(false);
      } catch (error) {
        setError('Không thể tải thể loại');
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    // Cuộn lên đầu trang khi thay đổi sắp xếp
    setLoading(true); // Bắt đầu quá trình tải dữ liệu

    const fetchStoriesWithSort = async () => {
      try {
        const filteredStories = await filterStories(typeId, genreId, statusId, sortBy);
        setStories(filteredStories);
      } catch (error) {
        setError('Failed to fetch stories');
      } finally {
        setLoading(false);
      }
    };

    
    setTimeout(() => {
      fetchStoriesWithSort();
    }, 1500);
  }, [sortBy, typeId, genreId, statusId]);

  useEffect(() => {
    const savedStatusId = localStorage.getItem('statusId');
    if (savedStatusId) {
      setStatusId(parseInt(savedStatusId, 10));
      localStorage.removeItem('statusId');
      document.documentElement.scrollTop = 0;
    }
  }, []);

  // Hàm phân trang
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

  const totalPages = Math.ceil(stories.length / storiesPerPage);

  const paginate = (pageNumber) => {
    setLoading(true); // Bắt đầu quá trình tải dữ liệu
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Cuộn lên đầu trang ngay lập tức

    // Dừng trạng thái loading sau khi tải xong
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const toggleFilter = (setter, value) => {
    setter((prev) => (prev === value ? null : value));
    setCurrentPage(1);
  };

  const stripHtmlTags = (text) => {
    return text.replace(/<\/?[^>]+>/gi, ' ');
  };

  return (
    <main className='main-sub'>
      <div className='danh-sach container' style={{ display: 'flex' }}>
        {/* Phần Filter */}
        <div style={{ flex: 1, padding: '20px', borderRight: '1px solid rgb(51 51 54)' }}>
          {/* Phần Type */}
          <div className='loc' style={{ marginBottom: '20px' }}>
            <h4>Kiểu</h4>
            <button
              onClick={() => toggleFilter(setTypeId, 1)}
              style={{
                backgroundColor: typeId === 1 ? '#007BFF' : '#f0f0f0',
                color: typeId === 1 ? 'white' : 'black',
              }}
            >
              Chuyển ngữ
            </button>
            <button
              onClick={() => toggleFilter(setTypeId, 2)}
              style={{
                backgroundColor: typeId === 2 ? '#007BFF' : '#f0f0f0',
                color: typeId === 2 ? 'white' : 'black',
              }}
            >
              Sáng tác
            </button>
          </div>
          
          {/* Phần Genre */}
          <div className='loc' style={{ marginBottom: '20px' }}>
            <h4>Thể Loại</h4>
            {genres.map((genre) => (
              <button
                key={genre.genreId}
                onClick={() => toggleFilter(setGenreId, genre.genreId)}
                style={{
                  backgroundColor: genreId === genre.genreId ? '#28A745' : '#f0f0f0',
                  color: genreId === genre.genreId ? 'white' : 'black',
                }}
              >
                {genre.genreName}
              </button>
            ))}
          </div>
          
          {/* Phần Status */}
          <div className='loc' style={{ marginBottom: '20px' }}>
            <h4>Tình Trạng</h4>
            <button
              onClick={() => toggleFilter(setStatusId, 1)}
              style={{
                backgroundColor: statusId === 1 ? '#FFC107' : '#f0f0f0',
                color: statusId === 1 ? 'white' : 'black',
              }}
            >
              Đang Ra
            </button>
            <button
              onClick={() => toggleFilter(setStatusId, 2)}
              style={{
                backgroundColor: statusId === 2 ? '#FFC107' : '#f0f0f0',
                color: statusId === 2 ? 'white' : 'black',

              }}
            >
              Tạm Dừng
            </button>
            <button
              onClick={() => toggleFilter(setStatusId, 3)}
              style={{
                backgroundColor: statusId === 3 ? '#FFC107' : '#f0f0f0',
                color: statusId === 3 ? 'white' : 'black',

              }}
            >
              Hoàn Thành
            </button>
          </div>
        </div>
        {/* Phần danh sách câu chuyện */}
        <div style={{ flex: 3, padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="sort-select">Sắp xếp theo:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              style={{ padding: '8px', borderRadius: '4px' }}
            >
              <option value="lastChapter">Mới lên chương</option>
              <option value="createdAt">Mới đăng</option>
              <option value="viewCount">Lượt đọc</option>
            </select>
          </div>

          {loading ? (
            <div className="load-more-container">
              <i className="fa-solid fa-spinner fa-spin" style={{color:'rgb(183 138 40 )',fontSize: '24px' }}></i>
            </div>
          ) :(
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {currentStories.map((story) => (
                  <div
                    key={story.id}
                    style={{
                      flex: '1 1 calc(50% - 20px)',
                      display: 'flex',
                      marginBottom: '15px',
                      borderBottom: '1px solid rgb(51 51 54)',
                      overflow: 'hidden',
                      maxWidth: 'calc(50% - 20px)',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Link to={`/truyen/${story.slug}`}>
                      <img
                        src={story.storyImg}
                        alt={story.title}
                        style={{
                          width: '120px',
                          height: '170px',
                          objectFit: 'cover',
                          marginRight: '20px',
                        }}
                      />
                    </Link>
                    <div className='title-loc'>
                      <Link to={`/truyen/${story.slug}`}>
                        <h2>{story.title}</h2>
                      </Link>
                      <p className='description'>
                        {story.description ? (stripHtmlTags(story.description).length > 150 ? stripHtmlTags(story.description).substring(0, 150) + '...' : stripHtmlTags(story.description)) : 'No description available'}
                      </p>
                      <div className='sub-loc'>
                        <div className='author-loc' style={{ marginBottom: '5px' }}>
                          <span><strong><i className="fa-solid fa-user"></i></strong> {story.author}</span>
                        </div>
                        <div className='chapterCount-loc' style={{ marginBottom: '5px' }}>
                          <span><strong>{story.chapterCount} chương</strong></span>
                        </div>
                      </div>
                      <div className='sub-loc' style={{ color: '#888' }}>
                        <div style={{ marginBottom: '5px' }}>
                          <strong><i className="fa-solid fa-book"></i></strong> {story.genreName}
                        </div>
                        <Link to={`/truyen/${story.slug}`}>
                          <button
                            style={{
                              backgroundColor: '#B78A28',
                              color: 'white',
                              padding: '4px',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              alignSelf: 'flex-start',
                            }}
                          >
                            Đọc
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {!loading && (
                  <>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      style={{
                        margin: '0 5px',
                        padding: '10px',
                        border: 'none',
                        backgroundColor: '#B78A28',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <span className='pa' style={{ margin: '0 5px' }}>{currentPage}/{totalPages}</span>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      style={{
                        margin: '0 5px',
                        padding: '10px',
                        border: 'none',
                        backgroundColor: '#B78A28',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Filter;


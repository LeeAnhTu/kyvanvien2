import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { listHistory, updateUserProgressStatusToDeleted, saveOrUpdateUserProgress, getActiveUserFollows, unfollowStory } from '../services/UserService';
import { getStoryById } from '../services/HomeStoryService';
import { timeSince } from '../../utils/timeUtils';
import { Link } from 'react-router-dom';

const BookCase = () => {
  const [activeTab, setActiveTab] = useState('reading'); // Tab mặc định là 'reading'
  const [history, setHistory] = useState([]);
  const [follow, setFollow] = useState([]);
  const [storyDetails, setStoryDetails] = useState([]);
  const [loading, setLoading] = useState(false); // State để theo dõi trạng thái tải
  const token = localStorage.getItem('authToken'); // Lấy token từ Local Storage
  const userId = token ? jwtDecode(token).userId : null;

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return; // Nếu không có userId, không thực hiện gọi API
      setLoading(true); // Bắt đầu quá trình tải
      try {
        const response = await listHistory(userId);
        setHistory(response.data);
        console.log(response);

        const details = [];

        for (let item of response.data) {
          const storyId = item.storyId;
          const res = await getStoryById(storyId);
          details.push({
            storyId: storyId,
            chapterCount: res.data.chapterCount,
            slug: res.data.slug,
            cover: res.data.storyImg, // Giả sử API trả về ảnh bìa truyện
            title: res.data.title, // Giả sử API trả về tên truyện
          });
        }

        setStoryDetails(details);

        const followResponse = await getActiveUserFollows(userId);
        setFollow(followResponse.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false); // Kết thúc quá trình tải
      }
    };

    fetchHistory();
    document.documentElement.scrollTop = 0;
  }, [userId]);

  useEffect(() => {
    // Cuộn về đầu trang khi người dùng chuyển trang
    window.scrollTo(0, 0);
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = history.slice(indexOfFirstItem, indexOfLastItem);
  const currentFollow = follow.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setLoading(true); // Bắt đầu quá trình tải
    setCurrentPage(pageNumber);

    // Giả lập thời gian tải 2 giây
    setTimeout(() => {
      setLoading(false); // Kết thúc quá trình tải
    }, 1500);
  };

  const handleDeleteProgress = async (storyId, slug, chapterNumber) => {
    try {
      await updateUserProgressStatusToDeleted(userId, slug, chapterNumber);
      setHistory((prevHistory) => prevHistory.filter(item => item.storyId !== storyId));
    } catch (error) {
      console.error("Error updating progress status:", error);
    }
  };

  const handleDeleteFollow = async (storyId, chapterId) => {
    try {
      await unfollowStory(userId, storyId, chapterId);
      setFollow((prevFollow) => prevFollow.filter(item => item.storyId !== storyId));
    } catch (error) {
      console.error("Error updating progress status:", error);
    }
  };

  const handleUpdateProgress = async (storyId, slug, chapterNumber) => {
    try {
      await saveOrUpdateUserProgress(userId, slug, chapterNumber);
      setHistory(prevHistory => prevHistory.map(item =>
        item.storyId === storyId ? { ...item, chapterNumber } : item
      ));
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const totalPagesHistory = Math.ceil(history.length / itemsPerPage);
  const totalPagesFollow = Math.ceil(follow.length / itemsPerPage);

  return (
    <main className='main-sub'>
      <div className="bookcase container">
        <div className="tabs">
          <button 
            className={activeTab === 'reading' ? 'active' : ''} 
            onClick={() => {
              setActiveTab('reading');
              handlePageChange(1); // Reset về trang đầu tiên khi chuyển tab
            }}
          >
            Truyện Đang Đọc
          </button>
          <button 
            className={activeTab === 'bookmarked' ? 'active' : ''} 
            onClick={() => {
              setActiveTab('bookmarked');
              handlePageChange(1); // Reset về trang đầu tiên khi chuyển tab
            }}
          >
            Truyện Đánh Dấu
          </button>
        </div>

        <div className="tab-content">
        {loading ? (
            <div className="load-more-container">
              <i className="fa-solid fa-spinner fa-spin" style={{color:'rgb(183 138 40 )',fontSize: '24px' }}></i>
            </div>
          ) : (
            <>
              {activeTab === 'reading' && (
                <div className="reading-list">
                  {currentHistory.length > 0 ? (
                    currentHistory.map((item) => {
                      const storyDetail = storyDetails.find(detail => detail.storyId === item.storyId);
                      return storyDetail ? (
                        <div key={item.storyId} className="story-book">
                          <img src={storyDetail.cover} alt={storyDetail.title} className="story-cover" />
                          <div className="story-details">
                            <Link to={`/truyen/${storyDetail.slug}/chuong/${item.chapterNumber}`}
                                onClick={() => handleUpdateProgress(item.storyId, storyDetail.slug, item.chapterNumber)}
                            >
                              <div className='space-y-2'>
                                <h3 className="story-title1">{storyDetail.title}</h3>
                                <p className="story-status">{`Đã đọc ${item.chapterNumber}/${storyDetail.chapterCount} chương`}</p>
                              </div>
                            </Link>
                            <div style={{ width: '200px' }}>
                              <p className="story-last-read">{timeSince(new Date(item.lastRead))}</p>
                            </div>
                            <div>
                              <button className="delete-button" onClick={() => handleDeleteProgress(item.storyId, storyDetail.slug, item.chapterNumber)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <p className="no-stories">Bạn chưa đọc truyện nào...</p>
                  )}
                </div>
              )}
              {activeTab === 'bookmarked' && (
                <div className="reading-list">
                  {currentFollow.length > 0 ? (
                    currentFollow.map((item) => {
                      const storyDetail = storyDetails.find(detail => detail.storyId === item.storyId);
                      return storyDetail ? (
                        <div key={item.storyId} className="story-book">
                          <img src={storyDetail.cover} alt={storyDetail.title} className="story-cover" />
                          <div className="story-details">
                            <Link 
                              to={item.chapterNumber === 0
                                ? `/truyen/${storyDetail.slug}`
                                : `/truyen/${storyDetail.slug}/chuong/${item.chapterNumber}`
                              }
                              onClick={() => {
                                if (item.chapterNumber !== 0) {
                                  handleUpdateProgress(item.storyId, storyDetail.slug, item.chapterNumber);
                                }
                              }}
                            >
                              <div className='space-y-2'>
                                <h3 className="story-title1">{storyDetail.title}</h3>
                                <p className="story-status">{`[ ${item.chapterNumber}/${storyDetail.chapterCount} ]`}</p>
                              </div>
                            </Link>
                            <div style={{ width: '200px' }}>
                              <p className="story-last-read">{timeSince(new Date(item.followedAt))}</p>
                            </div>
                            <div>
                              <button className="delete-button" onClick={() => handleDeleteFollow(item.storyId, item.chapterId)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <p className="no-stories">Bạn chưa đánh dấu truyện nào...</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Hiển thị phân trang chỉ khi không đang tải dữ liệu */}
        {!loading && (
          <div className="pagination">
            {Array.from({ length: activeTab === 'reading' ? totalPagesHistory : totalPagesFollow }, (_, index) => (
              <button
                key={index + 1}
                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default BookCase;

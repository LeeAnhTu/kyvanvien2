import React, { useState,useCallback } from 'react';
import Slider from 'react-slider';
import { toast } from 'react-toastify'; // Đảm bảo bạn đã cài đặt react-toastify
import {rateStory} from '../services/RatingService'
import {getUser} from '../services/UserService'
import { giftToUser } from '../services/historyGiftService'; // Dịch vụ gửi quà
import { Link } from 'react-router-dom';

const GiftAndRating = ({ slug, currentChapterNumber, isFirstChapter, isLastChapter,userId,storyId }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [rating, setRating] = useState(3);
  const [lastRatingTime, setLastRatingTime] = useState(0); 
  const ratingCooldown = 60000; // 1 phút

  const [giftAmount, setGiftAmount] = useState(''); // Giá trị mặc định của quà tặng
  const [giftError, setGiftError] = useState('');


  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRatingSubmit = useCallback(async () => {
    const currentTime = Date.now();

    // Kiểm tra thời gian gửi đánh giá gần nhất
    if (currentTime - lastRatingTime < ratingCooldown) {
      toast.info("Bạn hãy đợi một phút trước khi gửi đánh giá tiếp theo.");
      return;
    }

    if (userId && storyId) {
      try {
        await rateStory(userId, storyId, rating); // Gửi điểm đánh giá mới lên server
        setLastRatingTime(currentTime); // Cập nhật thời gian gửi đánh giá gần nhất
        toast.success("Đánh giá của bạn đã được gửi!");
        setRating(3);
      } catch (error) {
        console.error('Error submitting rating:', error);
        toast.error("Đã xảy ra lỗi khi gửi đánh giá.");
      }
    } else {
      toast.error("Bạn phải đăng nhập để đánh giá!");
    }
  }, [userId, storyId, rating, lastRatingTime, ratingCooldown]);


  const handleGiftAmountChange = (e) => {
    setGiftAmount(e.target.value);
  };

  const handleGiftSubmit = useCallback(async () => {
    if (userId && storyId) {
      try {

        const user = await getUser(userId);
        console.log(user.data.balance);
        // Gửi quà đến người dùng
        if (user.data.balance >= giftAmount) {
          // Gửi quà đến người dùng
          await giftToUser(userId, giftAmount, storyId);
          toast.success("Quà đã được gửi thành công!");
          setGiftAmount(''); // Reset giá trị quà tặng sau khi gửi
          setGiftError(''); // Xóa lỗi nếu có
      } else {
          toast.error("Số tiền của bạn không đủ để gửi quà.");
      }
      } catch (error) {
        console.error('Error sending gift:', error);
        setGiftError('Đã xảy ra lỗi khi gửi quà.');
        toast.error("Đã xảy ra lỗi khi gửi quà.");
      }
    } else {
      toast.error("Bạn phải đăng nhập để gửi quà!");
    }
  }, [userId, storyId, giftAmount]);

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null); // Nếu tab đang hiển thị, ẩn nó đi
    } else {
      setActiveTab(tab); // Hiển thị tab được chọn
    }
  };

  return (
    <div>
      <div className="nav-container d-flex align-items-center justify-content-between mb-3">
        <Link
          className={`btn btn-success ${isFirstChapter ? 'disabled' : ''}`}
          to={isFirstChapter ? '#' : `/truyen/${slug}/chuong/${currentChapterNumber - 1}`}
          title="Chương trước"
          onClick={(e) => isFirstChapter && e.preventDefault()}
        >
          Chương trước
        </Link>

        <div className="tabs-container d-flex align-items-center"> 
          <button
            className={`nav-link1 ${activeTab === 'gifts' ? 'active' : ''}`}
            onClick={() => handleTabClick('gifts')}
          >
            Tặng Quà
          </button>
          <button
            className={`nav-link1 ${activeTab === 'ratings' ? 'active' : ''}`}
            onClick={() => handleTabClick('ratings')}
          >
            Đánh Giá
          </button>
        </div>

        <Link
          className={`btn btn-success ${isLastChapter ? 'disabled' : ''}`}
          to={isLastChapter ? '#' : `/truyen/${slug}/chuong/${currentChapterNumber + 1}`}
          title="Chương tiếp"
          onClick={(e) => isLastChapter && e.preventDefault()}
        >
          Chương tiếp
        </Link>
      </div>

      <div className="tab-content story-detail">

      {activeTab === 'gifts' && (
          <div className="tab-pane fade show active">
            <div className="gift-section">
              <h5>Gửi Quà</h5>
              <div className="gift-input-container">
                <input
                  type="number"
                  value={giftAmount}
                  onChange={handleGiftAmountChange}
                  min="10000"
                  step="1000"
                  placeholder="Nhập số"
                  className="gift-input"
                />
                <img src="/assets/img/kim-cuong.png" alt="Gift Icon" className="gift-icon" />
              </div>
              {giftError && <p className="text-danger">{giftError}</p>}
              <button onClick={handleGiftSubmit} className="btn btn-primary">
                Gửi Quà
              </button>
            </div>
          </div>
        )}
        {activeTab === 'ratings' && (
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
      </div>
    </div>
  );
};

export default GiftAndRating;

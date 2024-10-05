// services/historyGiftService.js
import axios from 'axios';

// Thiết lập base URL cho axios
const API_URL = 'http://localhost:8080/api/v1/history-gift';

// Lấy lịch sử tặng quà theo userId
export const getGiftHistoryByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data; // Trả về danh sách lịch sử quà tặng
  } catch (error) {
    console.error('Error fetching gift history:', error);
    throw error; // Để có thể xử lý lỗi tại nơi gọi
  }
};

// Thực hiện tặng quà
export const giftToUser = async (userId, amount, storyId) => {
  try {
    const response = await axios.post(`${API_URL}/gift`, null, {
      params: { userId,storyId, amount  },
    });
    return response.data; // Trả về thông báo thành công
  } catch (error) {
    console.error('Error gifting to user:', error);
    throw error; // Để có thể xử lý lỗi tại nơi gọi
  }
};

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/ratings'; // Đổi BASE_URL theo server của bạn

export const rateStory = async (userId, storyId, ratingValue) => {
    try {
        const response = await axios.post(`${BASE_URL}/rate`, null, {
            params: {
                userId: userId,
                storyId: storyId,
                ratingValue: ratingValue,
            },
        });
        console.log('Response data:', response.data);
        return response.data; // Trả về kết quả nếu cần
    } catch (error) {
        console.error('Error rating story:', error);
        throw error; // Có thể ném lỗi ra ngoài để xử lý ở component
    }
};
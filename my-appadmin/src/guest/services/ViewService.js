import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/views'; // Đổi BASE_URL theo server của bạn

export const addView = async (storyId) => {
    try {
        await axios.post(`${BASE_URL}/add-view`, null, {
            params: {
                storyId: storyId,
            },
        });
    } catch (error) {
        console.error('Error adding view:', error);
    }
};

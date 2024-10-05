import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/comments'; // Đổi BASE_URL theo server của bạn

export const getCommentsByStoryId = async (storyId, sortOrder = 'desc', offset = 0, limit = 5) => {
    try {
        const response = await axios.get(`${API_URL}/story/${storyId}`, {
            params: { sortOrder }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

// Tạo mới một comment
export const createComment = async (commentDTO) => {
    try {
        const response = await axios.post(API_URL, commentDTO);
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

// Xóa một comment theo ID
export const deleteComment = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

import axios from "axios";

const URL = 'http://localhost:8080/api/v1/gift-request'

// Read (Danh sách)
export const listRequest = () => axios.get(URL);

// Read (1 yêu cầu)
export const request = (rgId) => axios.get(`{URL}/${rgId}`);

export const approveRequest = async (requestId, adminId, adminResponse) => {
    try {
        const response = await axios.put(`${URL}/approve/${requestId}`, null, {
            params: { adminId, adminResponse }
        });
        return response.data; // Trả về GiftRequestDTO đã được phê duyệt
    } catch (error) {
        console.error('Error approving request:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

export const rejectRequest = async (requestId, adminId, adminResponse) => {
    try {
        const response = await axios.put(`${URL}/reject/${requestId}`, null, {
            params: { adminId, adminResponse }
        });
        return response.data; // Trả về GiftRequestDTO đã bị từ chối
    } catch (error) {
        console.error('Error rejecting request:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};
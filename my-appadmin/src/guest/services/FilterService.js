import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/stories'; // Đổi BASE_URL theo server của bạn


// export const filterStories = async (typeId, genreId, statusId,sortByViewCount = false) => {
//     try {
//         const response = await axios.get(`${API_URL}/filter`, {
//             params: {
//                 typeId: typeId,
//                 genreId: genreId,
//                 statusId: statusId,
//                 sortByViewCount: sortByViewCount
//             }
//         });

//         return response.data; // Danh sách StoryDTO được trả về từ API
//     } catch (error) {
//         console.error('Error fetching filtered stories:', error);
//         throw error; // Bạn có thể xử lý lỗi ở đây tùy theo yêu cầu
//     }
// };

export const filterStories = async (typeId, genreId, statusId, sortBy) => {
    try {
        const response = await axios.get(`${API_URL}/filter`, {
            params: {
                typeId: typeId,
                genreId: genreId,
                statusId: statusId,
                sortBy: sortBy // Thêm sortBy vào tham số của yêu cầu
            }
        });

        return response.data; // Danh sách StoryDTO được trả về từ API
    } catch (error) {
        console.error('Error fetching filtered stories:', error);
        throw error; // Bạn có thể xử lý lỗi ở đây tùy theo yêu cầu
    }
};


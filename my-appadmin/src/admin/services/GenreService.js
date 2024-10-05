import axios from "axios";

const URL = 'http://localhost:8080/api/v1/genre'

// Read (Danh sách)
export const listGenre = () => axios.get(URL);

// Read (Chi tiết theo ID)
export const getGenreById = (id) => axios.get(`${URL}/${id}`);

// Create (Tạo mới)
export const createGenre = async (genre) => {
    return await axios.post(`${URL}`, genre, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Update (Cập nhật)
export const updateGenre = (id, genre) => axios.put(`${URL}/${id}`, genre);

// Delete (Xóa)
// export const deleteGenre = (id) => axios.delete(`${URL}/${id}`);

export const deleteGenre = (id) => {
    const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
    console.log('Token:', token);
    return axios.delete(`${URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}` // Thêm token vào header
        }
    });
};
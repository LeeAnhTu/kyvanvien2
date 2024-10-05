import axios from "axios";

const URL = 'http://localhost:8080/api/v1/types'

// Read (Danh sách)
export const listType = () => axios.get(URL);

// Read (Chi tiết theo ID)
export const getTypeById = (id) => axios.get(`${URL}/${id}`);

// Create (Tạo mới)
export const createType = (type) => axios.post(URL, type);

// Update (Cập nhật)
export const updateType = (id, type) => axios.put(`${URL}/${id}`, type);

// Delete (Xóa)
export const deleteType = (id) => axios.delete(`${URL}/${id}`);
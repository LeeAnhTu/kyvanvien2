import axios from "axios";

const URL = 'http://localhost:8080/api/v1/stories'

// Read (Danh sách)
export const listStory = () => axios.get(URL);

// Read (Chi tiết theo ID)
export const getStoryById = (id) => axios.get(`${URL}/${id}`);

// Create (Tạo mới)
export const createStory = (story) => axios.post(URL, story);

// Update (Cập nhật)
export const updateStory = (id, story) => axios.put(`${URL}/${id}`, story);

// Delete (Xóa)
export const deleteStory = (id) => axios.delete(`${URL}/${id}`);

//Read Chapters sắp xếp
export const listchapter = (id) => axios.get(`${URL}/${id}/chapters`);

//Read Chapters không
export const listchapter1 = (id) => axios.get(`${URL}/${id}/chapters1`);

export const createStory1 = (formData) => {
    return axios.post('http://localhost:8080/api/v1/stories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  

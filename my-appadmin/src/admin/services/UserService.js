import axios from "axios";

const URL = 'http://localhost:8080/auth' 

export const loginApi = (user) => axios.post(`${URL}/login`,user)

const URL_2 = 'http://localhost:8080/api/v1/user' 

export const listusers = (user) => axios.get(URL_2)

export const countusers = (user) => axios.get(`${URL_2}/count`)

export const getUser = (id) => axios.get(`${URL_2}/${id}`)

export const updateProfile = async (changeProfileDTO) => {
    try {
        const response = await axios.put(`${URL_2}/update-profile`, changeProfileDTO);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        if (error.response && error.response.status === 400) {
            alert('User not found or invalid data');
        } else {
            alert('Something went wrong');
        }
        throw error; // Xử lý lỗi nếu cần
    }
  };

  export const changePassword = (changePasswordDTO) => {
    return axios.post(`${URL_2}/change-password`, changePasswordDTO)
      .then(response => response.data)
      .catch(error => {
        throw error; // Hoặc xử lý lỗi theo cách bạn muốn
      });
  };
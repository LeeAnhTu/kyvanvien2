import axios from "axios";


const API_URL = 'http://localhost:8080/api/v1/user';

export const getUser = (id) => axios.get(`${API_URL}/${id}`);

export const updateProfile = async (changeProfileDTO) => {
  try {
      const response = await axios.put(`${API_URL}/update-profile`, changeProfileDTO);
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

const URL1 = 'http://localhost:8080/api/v1/stories';

export const getListStory = (id) => axios.get(`${URL1}/user/${id}`);

const URL = 'http://localhost:8080/api/v1/reading-history';

// Read (Danh sách)
export const listHistory = (id) => axios.get(`${URL}/user/${id}`);

// Update status to deleted
export const updateUserProgressStatusToDeleted = (userId, slug, chapterNumber) => {
    return axios.put(`${URL}/update-status-to-deleted`, null, {
        params: {
            userId: userId,
            slug: slug,
            chapterNumber: chapterNumber
        }
    });
};

export const saveOrUpdateUserProgress = (userId, slug, chapterNumber) => {
    return axios.post(`${URL}/saveOrUpdate`, null, {
        params: {
            userId: userId,
            slug: slug,
            chapterNumber: chapterNumber
        }
    });
};

export const getUserProgressByStory = (userId, storyId) => {
    return axios.get(`${URL}/by-story`, {
        params: {
            userId: userId,
            storyId: storyId
        }
    });
};

const URL_2 = 'http://localhost:8080/api/v1/user-follows'
// Hàm theo dõi một câu chuyện
export const followStory = async (userId, storyId, chapterId) => {
    return await axios.post(`${URL_2}/follow`, null, {
            params: {
                userId,
                storyId,
                chapterId
            }
    });
};

// Hàm bỏ theo dõi một câu chuyện
export const unfollowStory = async (userId, storyId, chapterId) => {
    return   await axios.post(`${URL_2}/unfollow`, null, {
            params: {
                userId,
                storyId,
                chapterId
            }
        });
};

// Hàm lấy danh sách các theo dõi hoạt động của người dùng
export const getActiveUserFollows = async (userId) => {
    return await axios.get(`${URL_2}/user/${userId}`);
}; 

// Hàm lấy thông tin theo dõi của người dùng với một câu chuyện và tùy chọn chương
export const getUserFollow = async (userId, storyId, chapterId) => {
        return await axios.get(`${URL_2}/one-follow`, {
            params: {
                userId,
                storyId,
                chapterId
            }
        });
};



const URL_3 = 'http://localhost:8080/api/v1/user-likes';

// Kiểm tra xem người dùng đã thích câu chuyện chưa
export const checkIfLiked = async (userId, storyId) => {
    return await axios.get(`${URL_3}/check`, {
        params: {
          userId,
          storyId,
        },
      });

  };


  
  // Thích câu chuyện
  export const likeStory = async (userId, storyId) => {
    try {
      const response = await axios.post(`${URL_3}/like`, null, {
        params: {
          userId,
          storyId,
        },
      });
      return response.data; // Trả về dữ liệu DTO của UserLike
    } catch (error) {
      console.error('Error liking story:', error);
      throw error; // Xử lý lỗi theo cách bạn muốn
    }
  };
  
  // Bỏ thích câu chuyện
  export const unlikeStory = async (userId, storyId) => {
    try {
      await axios.post(`${URL_3}/unlike`, null, {
        params: {
          userId,
          storyId,
        },
      });
      // Không trả về dữ liệu vì endpoint trả về 204 No Content
    } catch (error) {
      console.error('Error unliking story:', error);
      throw error; // Xử lý lỗi theo cách bạn muốn
    }
  };
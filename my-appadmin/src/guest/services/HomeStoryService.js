import axios from "axios";

const URL = 'http://localhost:8080/api/v1/stories'

// Read (Danh sách) 
export const listStory = () => axios.get(URL);

// Read (Danh sách truyện mới lên chương) 
export const listStoryNewChapter = () => axios.get(`${URL}/new-chapters`);

// Read (Danh sách truyện hoàn thành) 
export const listStorycompleted = () => axios.get(`${URL}/completed-stories`);

// Read (Danh sách truyện theo lượt đọc) 
export const listStoryView = () => axios.get(`${URL}/view-count-stories`);

// Read (Danh sách truyện theo điểm dánh giá) 
export const listStoryRating = () => axios.get(`${URL}/average-rating-stories`);

// Read (Danh sách truyện theo lượt đánh dấu) 
export const listStoryFollow = () => axios.get(`${URL}/follow-stories`);

// Read (Chi tiết theo ID)
export const getStoryById = (id) => axios.get(`${URL}/${id}`);

// Read (Chi tiết theo Slug)
export const getStoryBySlug = (slug) => axios.get(`${URL}/slug/${slug}`); 

// Create (Tạo mới)
export const createStory = (story) => axios.post(URL, story);

// Update (Cập nhật)
export const updateStory = (id, story) => axios.put(`${URL}/${id}`, story);


//Read Chapters sắp xếp
export const listchapter = (id) => axios.get(`${URL}/${id}/chapters1`);

//Read Chapters không
export const listchapter1 = (slug) => axios.get(`${URL}/${slug}/chapters2`);


const BASE_URL = 'http://localhost:8080/api/v1/chapters';

export const getChaptersBySlugAndChapterNumber = (slug, chapterNumber) => 
  axios.get(`${BASE_URL}/story/${slug}/number/${chapterNumber}`);


// export const listchapter2 = (slug, page = 0, size = 10) => 
//   axios.get(`${URL}/${slug}/chapters2`, { params: { page, size } });

export const createStory1 = (formData) => {
    return axios.post('http://localhost:8080/api/v1/stories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  

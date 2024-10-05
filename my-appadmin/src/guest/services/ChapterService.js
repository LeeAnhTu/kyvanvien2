import axios from "axios";

const URL = 'http://localhost:8080/api/v1/chapters' 

// Read (Chi tiết theo ID)
export const getChapterDetail = (storyId, chapterId) => {
    return axios.get(`${URL}/stories/${storyId}/chapters/${chapterId}`);
  };
  export const updateChapter = (storyId, chapterId, chapterData) => 
    axios.put(`${URL}/stories/${storyId}/chapters/${chapterId}`, chapterData);

  export const addChapter = (chapter) => axios.post(URL, chapter);

import axios from "axios";

const URL_GENRE = 'http://localhost:8080/api/v1/genre'

// Read (Danh sách thể loại)
export const listGenre = () => axios.get(URL_GENRE);


const URL_STATUS = 'http://localhost:8080/api/v1/statusstory'

// Read (Danh sách trạng thái)
export const listStatus = () => axios.get(URL_STATUS);



const URL_TYPE = 'http://localhost:8080/api/v1/types'

// Read (Danh sách Kiểu)
export const listType = () => axios.get(URL_TYPE);
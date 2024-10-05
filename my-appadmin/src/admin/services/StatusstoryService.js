import axios from "axios";

const URL = 'http://localhost:8080/api/v1/statusstory'

// Read (Danh sách)
export const listStatus = () => axios.get(URL);
import axios from "axios";

const URL = 'http://localhost:8080/api/v1/genre'

// Read (Danh sách)
export const listGenre = () => axios.get(URL);

import axios from "axios";

const URL = 'http://localhost:8080/api/v1/comments' 

export const listcomments = (comment) => axios.get(URL)

export const deletecomments = (id) => axios.delete(`${URL}/${id}`)
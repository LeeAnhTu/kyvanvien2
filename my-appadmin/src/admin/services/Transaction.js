import axios from "axios";

const URL_1 = 'http://localhost:8080/api/v1/history-gift' 

export const listgifts = (gift) => axios.get(URL_1)

const URL_2 = 'http://localhost:8080/api/v1/transactions' 

export const listtransactions = (transaction) => axios.get(URL_2)

export const listtotal = (transaction) => axios.get(`${URL_2}/total`)



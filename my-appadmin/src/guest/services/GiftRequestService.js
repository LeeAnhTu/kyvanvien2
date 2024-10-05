import axios from "axios";

const URL = 'http://localhost:8080/api/v1/gift-request'

// Read (Danh sách)
export const listRequest = (userId) => axios.get(`${URL}/user/${userId}`);

// Read (1 yêu cầu)
export const request = (rgId) => axios.get(`${URL}/${rgId}`);

export const createGiftRequest = (userId, cardValue, diamondsUsed) => {
    return axios.post(URL, null, {
      params: {
        userId: userId,
        cardValue: cardValue,
        diamondsUsed: diamondsUsed
      }
    });
  };
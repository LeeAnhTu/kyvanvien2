import axios from "axios";

const URL = 'http://localhost:8080/api/v1/transactions'

// Hàm để thêm giao dịch
export const addTransaction = async (userId, amount) => {
    try {
        const response = await axios.post(`${URL}/add`, null, {
            params: {
                userId: userId,
                amount: amount
            }
        });
        console.log('Transaction added:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding transaction:', error);
        throw error;
    }
};

export const getTransactionsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${URL}/list`, {
            params: { userId: userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};
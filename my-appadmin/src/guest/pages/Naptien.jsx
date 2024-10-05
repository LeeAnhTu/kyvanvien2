

import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { addTransaction } from '../services/WalletService';
import { jwtDecode } from 'jwt-decode';
import { toast } from "react-toastify";



const initialOptions = {
    clientId: 'AR4ZKzp16FxDcpoBbwDkYLiC49-uNhcpOB8DAHuXqeOhecJARucFmfeHgGc-IJ4Di5ifUnoLvL3RoytK', // Thay thế bằng Client ID của bạn
    currency: 'USD',
};

const NapTien = ({ onSuccess, onError }) => {
    const [amountVND, setAmountVND] = useState('10000'); // Giá trị mặc định là 10000 VND
    const [amountUSD, setAmountUSD] = useState((10000 / 23500).toFixed(2)); // Chuyển đổi sang USD
    const [notification, setNotification] = useState('');

    const token = localStorage.getItem('authToken');
    const userId = token ? jwtDecode(token).userId : null;

    // Cập nhật giá trị USD khi amountVND thay đổi
    useEffect(() => {
        const vnd = parseFloat(amountVND);
        if (!isNaN(vnd) && vnd >= 10000) {
            const usdAmount = (vnd / 23500).toFixed(2);
            setAmountUSD(usdAmount);
            setNotification('');
        }
    }, [amountVND]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setAmountVND(value);
    };

    const handleBlur = () => {
        let vnd = parseFloat(amountVND);

        if (isNaN(vnd) || vnd < 10000) {
            vnd = 10000;
        } else {
            // Làm tròn số tiền nhập vào tới bội số của 1000
            vnd = Math.round(vnd / 1000) * 1000;
        }

        setAmountVND(vnd.toString());

        // Cập nhật số USD tương ứng
        const usdAmount = (vnd / 23500).toFixed(2);
        setAmountUSD(usdAmount);

        // Cập nhật thông báo
        if (vnd < 10000) {
            setNotification('Số tiền phải lớn hơn hoặc bằng 10.000 VND.');
        } else {
            setNotification('');
        }
    };
    const formatNumber = (number) => {
        return new Intl.NumberFormat('vi-VN').format(number);
    };

    const handleSuccess = async (details) => {
        try {
            await addTransaction(userId, amountVND/1000); // Gọi API để thêm giao dịch
            toast.success('Giao dịch thành công!');
            if (onSuccess) onSuccess(details);
        } catch (error) {
            console.error('Error adding transaction:', error);
            toast.error('Đã xảy ra lỗi khi lưu giao dịch.');
        }
    };


    return (
            <div className='chapter-wrapper container nap-tien' style={{borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
                <h3 className='chapter-content' style={{ marginBottom: '20px', fontFamily:"'Roboto',sans-serif" }}>Nạp tiền vào ví</h3>
                <input 
                    type="number" 
                    value={amountVND} 
                    onChange={handleInputChange} 
                    onBlur={handleBlur} // Xử lý khi người dùng rời khỏi ô nhập
                    placeholder="Nhập số tiền VND" 
                    min="10000" 
                    step="1000"
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                {/* <p>Số tiền tương đương bằng USD: {amountUSD}</p> */}
                <p>1000 VDN = 1 kim cương: {formatNumber(amountVND)} VND = {amountVND/1000}</p>
                {notification && <p style={{ color: 'red' }}>{notification}</p>}

                {amountUSD && (
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            forceReRender={[amountUSD]} // Đảm bảo nút PayPal được re-render khi amountUSD thay đổi
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: 'USD',
                                                value: amountUSD, // Sử dụng giá trị USD đã chuyển đổi
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                return actions.order.capture().then(async (details) => {
                                    console.log('Giao dịch hoàn tất bởi ', details.payer.name.given_name);
                                    await handleSuccess(details);
                                    if (onSuccess) onSuccess(details);
                                });
                            }}
                            onError={(err) => {
                                console.error('Lỗi khi thanh toán PayPal', err);
                                setNotification('Đã xảy ra lỗi trong quá trình thanh toán.');
                                if (onError) onError(err);
                            }}
                        />
                    </PayPalScriptProvider>
                )}
            </div>
    );
};

export default NapTien;


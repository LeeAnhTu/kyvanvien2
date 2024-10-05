

import React, { useState } from 'react';
import { createGiftRequest } from '../services/GiftRequestService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import {getUser} from '../services/UserService'


const GiftExchange = () => {
  const [selectedValue, setSelectedValue] = useState(null);  // Giá trị thẻ đã chọn
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('authToken'); // Lấy token từ Local Storage
  const userId = token ? jwtDecode(token).userId : null;

  // Danh sách các mức giá
  const giftValues = [10000, 20000, 50000, 100000, 200000, 500000];

  // Đối tượng chứa các hình ảnh tương ứng với từng giá trị thẻ
  const giftImages = {
    10000: '/assets/img/the-10k.jpg',
    20000: '/assets/img/the-20k.jpg',
    50000: '/assets/img/the-50k.jpg',
    100000: '/assets/img/the-100k.jpg',
    200000: '/assets/img/the-200k.jpg',
    500000: '/assets/img/the-500k.jpg',
  };

  // Tính toán số kim cương sẽ sử dụng
  const calculateDiamonds = (value) => {
    const baseDiamonds = value / 1000; // Giá trị cơ bản (1 kim cương = 1000 VND)
    const extraDiamonds = baseDiamonds * 0.2; // 20% của số kim cương cơ bản
    return baseDiamonds + extraDiamonds; // Tổng số kim cương sử dụng
  };

  const handleGiftExchange = async () => {
    if (!selectedValue) {
      setMessage('Vui lòng chọn một giá trị thẻ để đổi.');
      setTimeout(() => {
        setMessage(''); // Xóa thông báo
      }, 5000); // 5000ms tương đương 5 giây
      return;
    }
  
    try {
      // Lấy thông tin người dùng
      const user = await getUser(userId);
      const userBalance = user.data.balance; // Số dư hiện tại của người dùng
      console.log(userBalance);
  
      // Tính số kim cương cần sử dụng
      const diamondsUsed = calculateDiamonds(selectedValue);
  
      // Kiểm tra nếu người dùng có đủ kim cương
      if (userBalance < diamondsUsed) {
        setMessage(`Bạn không đủ kim cương để đổi thẻ trị giá ${selectedValue.toLocaleString()} VND. Cần ${diamondsUsed} kim cương.`);
        // Sau 5 giây xóa thông báo
        setTimeout(() => {
          setMessage(''); // Xóa thông báo
        }, 5000); // 5000ms tương đương 5 giây
        return;
      }
  
      // Nếu đủ kim cương, gọi API để đổi quà
      const response = await createGiftRequest(userId, selectedValue, diamondsUsed);
      if (response.status === 200) {
        toast.success('Đổi quà thành công!');
        setMessage(`Bạn đã đổi thành công thẻ trị giá ${selectedValue.toLocaleString()} VND.`);
        setTimeout(() => {
          setMessage(''); // Xóa thông báo
        }, 5000); // 5000ms tương đương 5 giây
        
      } else {
        setMessage('Không thể thực hiện yêu cầu đổi quà.');
        setTimeout(() => {
          setMessage(''); // Xóa thông báo
        }, 5000); // 5000ms tương đương 5 giây
      }
    } catch (error) {
      console.error(error);
      setMessage('Có lỗi xảy ra khi đổi quà, vui lòng thử lại.');
      setTimeout(() => {
        setMessage(''); // Xóa thông báo
      }, 5000); // 5000ms tương đương 5 giây
    }
  };
  

  return (
    <main className="main-sub">
      <div className="gift-exchange container">
        <h1 style={{ marginTop: '100px' }}>Đổi Quà</h1>
        <div className="gift-grid">
          {giftValues.map((value, index) => (
            <button
              key={index}
              onClick={() => setSelectedValue(value)}
              className={`gift-button ${selectedValue === value ? 'selected' : ''}`}
              style={{
                backgroundImage: `url(${giftImages[value]})`,
              }}
            >
              {value.toLocaleString()} VND
              <br />
              <span style={{ fontSize: '12px', color: '#000' }}>
                Sử dụng {Math.round(calculateDiamonds(value))} kim cương
              </span>

            </button>
          ))}
        </div>
        <button onClick={handleGiftExchange} className="confirm-button btn btn-success">Xác nhận đổi quà</button>
        {message && <p className="message">{message}</p>}
      </div>
    </main>
  );
};

export default GiftExchange;


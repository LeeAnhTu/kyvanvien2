// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className='main-sub'>
        <div className='not-found' style={{ textAlign: 'center', marginTop: '150px' }}>
            <h1>404 - Trang không tồn tại</h1>
            <p>Xin lỗi, trang bạn tìm kiếm không tồn tại.</p>
            <Link to="/">
                <button className="btn btn-primary">Quay về trang chủ</button>
            </Link>
        </div>
    </main>
    
  );
};

export default NotFound;

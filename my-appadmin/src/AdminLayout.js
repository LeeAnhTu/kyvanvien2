// src/admin/components/AdminLayout.js

import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './admin/components/Header';
import Sidebar from './admin/components/Sidebar';

const AdminLayout = () => {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn là /admin/login, không hiển thị Header và Sidebar
  const showHeaderAndSidebar = !location.pathname.startsWith('/admi/login');

  return (
    <div  id='dong'>
      {showHeaderAndSidebar && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <div className="admin-content">
        {/* Render các route con */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

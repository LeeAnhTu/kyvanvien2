import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, roles = [] }) => {
  const user = useSelector(state => state.user.account);

  // Debugging log
  // console.log('User from Redux:', user);
  // console.log('Required Roles:', roles);

  // Check for authentication
  if (user.auth === null || user.auth === false) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check for role
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.user.account.auth);
    return isAuthenticated ? children : <Navigate to="/account" />;
};


export default PrivateRoute;

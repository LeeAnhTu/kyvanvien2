import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { loginApi } from '../../admin/services/UserService';

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const USER_LOGOUT = 'USER_LOGOUT'; 
export const USER_REFRESH = 'USER_REFRESH';

export const handleLoginRedux = (email, password) => {
    return async (dispatch,getState) => {
        dispatch({ type: FETCH_USER_LOGIN });
        try {
            const response = await loginApi({ email, password });
            const { token } = response.data;

            const decodedToken = jwtDecode(token);
            const role = decodedToken.authorities ? decodedToken.authorities[0].authority : '';

            localStorage.setItem('authToken',token);
            localStorage.setItem('email',email);
            localStorage.setItem('role',role);

            dispatch({ type: FETCH_USER_SUCCESS, data: { email, token, role } });
            return true;

        } catch (error) {
            console.error("Login error:", error);
            toast.error('Đăng nhập không thành công. Vui lòng kiểm tra lại email hoặc mật khẩu.');
            dispatch({ type: FETCH_USER_ERROR });
        }
    }
}

export const handleLogoutRedux = () =>{
    return (dispatch,getState) =>{
        dispatch({
            type: USER_LOGOUT
        })
    }
}

export const handleRefresh = () =>{
    return (dispatch) => {
        // Khôi phục trạng thái người dùng từ localStorage
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('role');
        const auth = !!token; // Kiểm tra nếu có token

        dispatch({
            type: USER_REFRESH,
            data: {
                email,
                token,
                role,
                auth,
            },
        });
    };
}
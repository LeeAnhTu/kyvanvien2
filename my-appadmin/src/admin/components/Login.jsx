import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {handleLoginRedux} from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account);

    const navigate = useNavigate();
    const location = useLocation();

   

    // useEffect(() => {
    //     // Kiểm tra nếu người dùng đã đăng nhập và có quyền admin
    //     if (account.auth) {
    //         if (account.role === 'ADMIN') {
    //             // Kiểm tra nếu chưa có thông báo thành công
    //             if (!localStorage.getItem('loginSuccessShown')) {
    //                 toast.success("Login Success!");
    //                 localStorage.setItem('loginSuccessShown', 'true');
    //             }
    //             // Nếu đang ở trang đăng nhập và đã đăng nhập, điều hướng đến trang admin
    //             if (location.pathname === '/admin/login') {
    //                 navigate("/admin");
    //             }
    //         } else {
    //             // Nếu người dùng đã đăng nhập nhưng không phải admin
    //             if (location.pathname === '/admin/login') {
    //                 toast.error("You do not have admin privileges!");
    //                 setTimeout(() => {
    //                     navigate("/admin/login");
    //                 }, 2000);
    //             }
    //         }
    //     } else if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
    //         // Nếu chưa đăng nhập và đang ở các trang admin khác, điều hướng đến trang đăng nhập
    //         navigate("/admin/login");
    //     }
    // }, [account, location.pathname, navigate]);

    useEffect(() => {
        // console.log('Account:', account);
        // console.log('Location Pathname:', location.pathname);
        if (account.auth) {
            if (account.role === 'ADMIN') {
                // Kiểm tra nếu chưa có thông báo thành công
                if (!localStorage.getItem('loginSuccessShown')) {
                    // toast.success("Login Success!");
                    localStorage.setItem('loginSuccessShown', 'true');
                }
                // Nếu đang ở trang đăng nhập, điều hướng đến trang admin
                if (location.pathname === '/admin/login') {
                    navigate("/admin");
                }
            } else {
                // Nếu người dùng đã đăng nhập nhưng không phải admin, điều hướng về trang đăng nhập với thông báo lỗi
                if (location.pathname !== '/admin/login') {
                    toast.error("You do not have admin privileges!");
                    navigate("/admin/login");
                }
            }
        }
    }, [account, location.pathname, navigate]);


    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email or Password is required!"); 
            return;
        }

        dispatch(handleLoginRedux(email, password));
        if (account.role === 'ADMIN') {
            navigate("/admin");
        } else {
            // Xử lý cho các vai trò khác nếu cần
        }

    };

    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <main>
            <div className='login-container container col-12 col-sm-4'>
                <div className='title'>Đăng Nhập</div>
                <div className='text'>Email (ngocanh@gmail.com)</div>
                <input
                    type='text'
                    placeholder='Email...'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className='pass'>
                    <input
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder='Password...'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handlePressEnter(event)}
                    />
                    <i className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>
                <button
                    className={email && password ? "active" : ""}
                    disabled={!email || !password || isLoading}
                    onClick={handleLogin}
                >
                    {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
                    &nbsp; Login
                </button>
                <div className='back'>
                    <Link to="/admin">
                        <i className="fa-solid fa-chevron-left"></i> Go back
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Login;

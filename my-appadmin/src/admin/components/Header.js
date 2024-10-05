import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"; 
import { handleLogoutRedux } from "../../redux/actions/userAction";

    const Header = (props) =>{

        const user = useSelector(state => state.user.account);

        const navigate =  useNavigate();

        const dispatch = useDispatch();

        const handleLogout = () =>{
            dispatch(handleLogoutRedux());
        }

        useEffect(() =>{
            if(user && user.auth === false){
                navigate("/admin/login");
                toast("Logout Success!");
            }
        },[user, navigate]);

        useEffect(() => {
            const toggleButton = document.querySelector('.toggle-sidebar-btn');
            const rootElement = document.getElementById('root');
    
            if (toggleButton) {
                toggleButton.addEventListener('click', () => {
                    rootElement.classList.toggle('toggle-sidebar');
                });
            }
    
            // Cleanup event listener on component unmount
            return () => {
                if (toggleButton) {
                    toggleButton.removeEventListener('click', () => {});
                }
            };
        }, []);


        return(
            <header id="header-admin" className="header-admin fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <Link to="/admin" className="logo d-flex align-items-center">
                        <img src="/assets/img/KyVanVien2.png" alt=""/>
                        <span className="d-none d-lg-block">Kỳ Văn Viện</span>
                    </Link>
                    <i className="bi bi-list toggle-sidebar-btn"></i>
                </div>

                <nav className="header-admin-nav ms-auto">
                    <ul className="d-flex align-items-center">

                        <li className="nav-item d-block d-lg-none">
                        <Link to="" className="nav-link nav-icon search-bar-toggle ">
                            <i className="bi bi-search"></i>
                        </Link>
                        </li>

                        <li className="nav-item dropdown pe-3">
                        <Link to="" className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                            <img src="/assets/img/OIP.jpg" alt="Profile" className="rounded-circle"/>
                            {user && user.email && <span className="d-none d-md-block dropdown-toggle ps-2">{user.email}</span>}
                        </Link>

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header-admin">
                            {user && user.email && <h6>{user.email}</h6>}
                            
                            </li>
                            <li>
                            <hr className="dropdown-divider"/>
                            </li>

                            <li>
                            <Link to="/admin/profile" className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                <i className="bi bi-person"></i>
                                <span>My Profile</span>
                            </Link>
                            </li>
                            <li>
                            <hr className="dropdown-divider"/>
                            </li>

                            {/* <li>
                            <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                <i className="bi bi-gear"></i>
                                <span>Account Settings</span>
                            </a>
                            </li> */}
                            <li>
                            <hr className="dropdown-divider"/>
                            </li>

                            <li>
                            <hr className="dropdown-divider"/>
                            </li>

                            <li>
                                <Link className="dropdown-item d-flex align-items-center" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Sign Out</span>
                                </Link>
                            </li>

                        </ul>
                        </li>

                    </ul>
                </nav>

            </header>
        )
    }

    export default Header

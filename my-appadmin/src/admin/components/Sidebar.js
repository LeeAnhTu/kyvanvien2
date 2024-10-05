import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { checkstory } from '../services/StoryService';
import { listRequest } from '../services/GiftRequestService';


// import "./style.css"

const Sidebar = (props) => {

    // const { user } = useContext(UserContext);
    const user = useSelector(state => state.user.account);
    const [storyCount, setStoryCount] = useState(0); // Thêm state để lưu số lượng truyện
    const [requestCount, setrequestCount] = useState(0); 

  useEffect(() => {
    checkstory().then((response) => {
      setStoryCount(response.data.length); // Lưu số lượng truyện
    }).catch(error => {
      console.error(error);
    });

    listRequest().then((response) => {
    const processingRequests = response.data.filter(request => request.status === 'Đang Xử Lý');
    setrequestCount(processingRequests.length); // Lưu số lượng yêu cầu đang xử lý
    }).catch(error => {
        console.error(error);
    });
  }, []);

    return(
        <div id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav"> 

                <li className="nav-item">
                    <Link to="/admin" className="nav-link ">
                    <i className="bi bi-house-door"></i>
                    <span>Dashboard</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="" className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse">
                        <i className="bi bi-menu-button-wide"></i><span>Quản lý Truyện</span><i className="bi bi-chevron-down ms-auto"></i>
                    </Link>
                    <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <Link to="/admin/liststory">
                        <i className="bx bxs-file"></i><span>Danh Sách Truyện</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/listgenre">
                        <i className="bi bi-grid "></i><span>Thể Loại</span>
                        </Link>
                    </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" >
                    <i className="bi bi-journal-text"></i><span>Thành Viên</span><i className="bi bi-chevron-down ms-auto"></i>
                    </Link>
                    <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <Link to="/admin/listuser">
                        <i className="bi bi-person-lines-fill"></i><span>Danh sách thành viên</span>
                        </Link>
                    </li>
                    </ul>
                </li>
                
                
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                    <i className="bi bi-bar-chart"></i><span>Giao Dịch</span><i className="bi bi-chevron-down ms-auto"></i>
                    </Link>
                    <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="/admin/historyrecharge">
                            <i className="bi bi-currency-exchange"></i><span>Lịch sử nạp</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/historygift">
                            <i className="bi bi-gift"></i><span>Lịch sử tặng quà</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className="nav-heading">Pages</li>


                <li className="nav-item">
                    <Link to="/admin/comments" className="nav-link collapsed">
                    <i className="bi bi-chat"></i>
                    <span>Bình Luận</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/check" className="nav-link collapsed">
                    <i className="bi bi-check-circle"></i>
                    <span>Duyệt Truyện</span><sup className="count-badge">{storyCount}</sup>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/giftrequest" className="nav-link collapsed">
                    <i className="bi bi-gift"></i>
                    <span>Yêu Cầu Đổi Quà</span><sup className="count-badge">{requestCount}</sup>
                    </Link>
                </li>
                
                <li className="nav-item">
                { user && user.auth === true
                ?   <Link className="nav-link collapsed">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                    </Link>
                : 
                    <Link className="nav-link collapsed" to="/admin/login">
                    <i className="bi bi-envelope"></i>
                    <span>Login</span>
                    </Link>
                }
                    
                </li>

            </ul>

        </div>
    )
}
export default Sidebar
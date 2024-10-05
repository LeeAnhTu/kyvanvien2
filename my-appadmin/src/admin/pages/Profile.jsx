import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react';
import { getUser, updateProfile,changePassword } from "../services/UserService";
import { useSelector } from 'react-redux';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toast, ToastContainer } from 'react-toastify';


const Profile = () => {
    const [user, setUser] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [croppedImageData, setCroppedImageData] = useState(null); // Lưu ảnh cắt vào trạng thái
    const cropperRef = useRef(null);
    const token = useSelector((state) => state.user.token) || localStorage.getItem("authToken");

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                console.error("No token found");
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                const response = await getUser(userId);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [token]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            const cropper = cropperRef.current.cropper;
            const croppedCanvas = cropper.getCroppedCanvas({
                width: 200,
                height: 200,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high'
            });

            // Tạo canvas mới để cắt thành hình tròn
            const circularCanvas = document.createElement('canvas');
            const circularContext = circularCanvas.getContext('2d');
            circularCanvas.width = circularCanvas.height = 200;
            circularContext.beginPath();
            circularContext.arc(100, 100, 100, 0, 2 * Math.PI);
            circularContext.clip();
            circularContext.drawImage(croppedCanvas, 0, 0, 200, 200);
            const croppedImage = circularCanvas.toDataURL();
            
            // Lưu ảnh đã cắt vào trạng thái
            setCroppedImageData(croppedImage);
        }
    };

    const handleSave = async () => {
        // Tạo đối tượng chứa thông tin cập nhật
        const updatedData = {
            userId: user.userId,
            fullName: user.fullName, // Lưu tên hiện tại
            userImg: croppedImageData || user.userImg, // Nếu có ảnh cắt thì dùng, không thì dùng ảnh cũ
        };
    
        // Nếu đã cắt ảnh, cập nhật ảnh mới
        if (croppedImageData) {
            setUser((prevUser) => ({
                ...prevUser,
                userImg: croppedImageData,
            }));
            setImagePreview(null);
            setShowCropper(false);
        }
    
        // Gọi API để cập nhật thông tin người dùng
        try {
            await updateProfile(updatedData);
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    

    // Đóng Cropper và đặt lại ảnh
    const handleClose = () => {
        setShowCropper(false);
        setImagePreview(null); // Đặt lại ảnh nếu đóng mà không cắt
    };

    const cropperContent = showCropper && imagePreview && (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        }}>
            <div style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                textAlign: "center",
                position: "relative",
            }}>
                <button
                    onClick={handleClose}
                    style={{
                        position: "absolute",
                        top: "0px",
                        right: "1px",
                        background: "transparent",
                        border: "none",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                >
                    &times;
                </button>
                <Cropper
                    src={imagePreview}
                    style={{ height: 200, width: '30%' }}
                    aspectRatio={1}
                    guides={false}
                    ref={cropperRef}
                />
                <button
                    onClick={handleCrop}
                    style={{
                        marginTop: '10px',
                        padding: '10px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Crop
                </button>
                <button
                    onClick={handleSave}
                    style={{
                        marginTop: '10px',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );

    const handleChangePassword = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    
        // Lấy giá trị từ các trường nhập liệu
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
    
        // Kiểm tra xem các trường có giá trị không
        if (!currentPassword || !newPassword || !confirmPassword) {
            console.error('Please fill in all fields.');
            return;
        }
    
        // Kiểm tra xem mật khẩu mới có khớp không
        if (newPassword !== confirmPassword) {
            console.error('New passwords do not match.');
            return;
        }
    
        // Tạo đối tượng dữ liệu cho việc thay đổi mật khẩu
        const changePasswordDTO = {
            email: user.email, // Sử dụng email của người dùng
            oldPassword: currentPassword,
            newPassword,
        };

    
        // Gọi API để đổi mật khẩu
        try {
            await changePassword(changePasswordDTO);
            toast.success('Đổi Mật Khẩu Thành Công');
            console.log('Password changed successfully');
        } catch (error) {
            toast.error('Kiểm Tra lại');
        }
    };
    
    
    

    // Xử lý hình ảnh và tên người dùng
    const profileImage = user?.userImg || '../assets/img/OIP.jpg';
    const fullName = user?.fullName || 'No name available';
    const email = user?.email || 'No email available';
    const balance = user?.balance || 'No balance available';
    const createdAt = user?.createdAt || 'No createdAt available';

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Profile</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item">Users</li>
                        <li className="breadcrumb-item active">Profile</li>
                    </ol>
                </nav>
            </div>

            <section className="section profile">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                <img src={profileImage} alt="Profile" className="rounded-circle" />
                                <h2>{fullName}</h2>
                                <div className="social-links mt-2">
                                    {/* Các liên kết mạng xã hội của người dùng nếu có */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-body pt-3">
                                <ul className="nav nav-tabs nav-tabs-bordered">
                                    <li className="nav-item">
                                        <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Chi tiết</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Sửa Hồ Sơ</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Đổi Mật Khẩu</button>
                                    </li>
                                </ul>
                                <div className="tab-content pt-2">
                                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                        <h5 className="card-title">Chi tiết hồ sơ</h5>
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Tên</div>
                                            <div className="col-lg-9 col-md-8">{fullName}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Email</div>
                                            <div className="col-lg-9 col-md-8">{email}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Số dư</div>
                                            <div className="col-lg-9 col-md-8">{balance}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Ngày tạo</div>
                                            <div className="col-lg-9 col-md-8">{createdAt}</div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                        <form>
                                            <div className="row mb-3">
                                                <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Ảnh đại diện</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input type="file" id="profileImage" className="form-control" onChange={handleAvatarChange} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Tên đầy đủ</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input type="text" id="fullName" className="form-control" value={user?.fullName || ''} onChange={(e) => setUser({ ...user, fullName: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="button" className="btn btn-primary" onClick={handleSave}>Lưu thay đổi</button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="tab-pane fade profile-change-password pt-3" id="profile-change-password">
                                        <form onSubmit={handleChangePassword}>
                                            <div className="row mb-3">
                                                <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Mật khẩu hiện tại</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input type="password" id="currentPassword" className="form-control" required />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">Mật khẩu mới</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input type="password" id="newPassword" className="form-control" required />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label htmlFor="confirmPassword" className="col-md-4 col-lg-3 col-form-label">Xác nhận mật khẩu mới</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input type="password" id="confirmPassword" className="form-control" required />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary">Thay đổi mật khẩu</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {cropperContent}
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </main>
    );
};

export default Profile;

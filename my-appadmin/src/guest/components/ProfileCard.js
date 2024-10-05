// src/guest/components/ProfileCard.js

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { PiDiamondsFourFill } from "react-icons/pi";
import "cropperjs/dist/cropper.css";

const ProfileCard = ({ user, isDarkMode, handleAvatarChange, cropperContent, setCurrentSection }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedSection, setSelectedSection] = useState("profile");
    const [showTopupButton, setShowTopupButton] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setShowMenu(!showMenu);

    const handleRemoveImage = () => setShowMenu(false);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleProfileClick = () => {
        setSelectedSection("profile");
        setCurrentSection("accountDetails"); 
        navigate("#account");
    };

    const handleTopupClick = () => {
        setSelectedSection("transaction");
        setCurrentSection("napTien");
        navigate("#transaction");
    };

    return (
        <div className="profile"
            style={{
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                width: "300px",
                textAlign: "left",
                backgroundColor: isDarkMode ? "#2c3e50" : "#ecf0f1",
                color: isDarkMode ? "#ecf0f1" : "#2c3e50",
                userSelect: "none",
            }}
        >
            <div style={{ marginBottom: "20px", position: "relative", textAlign: "center" }}>
                <div
                    style={{
                        position: "relative",
                        display: "inline-block",
                        cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.children[0].style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
                        e.currentTarget.children[1].style.display = "flex";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.children[0].style.boxShadow = "none";
                        e.currentTarget.children[1].style.display = "none";
                    }}
                >
                    <img
                        src={user.userImg || "https://via.placeholder.com/150"}
                        alt="Avatar"
                        style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        }}
                    />
                    <span
                        style={{
                            display: "none",
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                            padding: "5px",
                            transition: "transform 0.3s ease",
                        }}
                        onClick={toggleMenu}
                    >
                        <MdOutlinePowerSettingsNew />
                    </span>
                </div>
                <input
                    type="file"
                    id="avatar-upload"
                    style={{ display: "none" }}
                    accept=".jpg,.jpeg,.png"
                    onChange={handleAvatarChange}
                />
                {showMenu && (
                    <div
                        ref={menuRef}
                        style={{
                            position: "absolute",
                            top: "25%",
                            right: "0",
                            backgroundColor: isDarkMode ? "#34495e" : "#fff",
                            color: isDarkMode ? "#ecf0f1" : "#2c3e50",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                            borderRadius: "10px",
                            overflow: "hidden",
                            zIndex: 1000,
                        }}
                    >
                        <div
                            style={{
                                padding: "10px",
                                cursor: "pointer",
                                borderBottom: isDarkMode ? "1px solid #555" : "1px solid #ddd",
                            }}
                            onClick={() => document.getElementById("avatar-upload").click()}
                        >
                            Upload Avatar
                        </div>
                        <div
                            style={{
                                padding: "10px",
                                cursor: "pointer",
                            }}
                            onClick={handleRemoveImage}
                        >
                            Remove Image
                        </div>
                    </div>
                )}
            </div>
            {cropperContent}

            <div className='profile-name' style={{ marginBottom: "20px", padding: "10px" }}>
                <h2  style={{ fontSize: "20px", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span >{user.fullName}</span>
                    <span
                        style={{ cursor: "pointer", position: "relative", display: "flex", alignItems: "center" }}
                        onMouseEnter={() => setShowTopupButton(true)}
                        onMouseLeave={() => setShowTopupButton(false)}
                    >
                        {!showTopupButton && (
                            <>
                                {user.balance}&nbsp;<PiDiamondsFourFill />
                            </>
                        )}
                        {showTopupButton && (
                            <button
                                onClick={handleTopupClick}
                                style={{
                                    marginLeft: "10px",
                                    padding: "2px 5px",
                                    fontSize: "12px",
                                    backgroundColor: "#2ecc71",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    animation: "fadeIn 0.3s",
                                }}
                            >
                                Nạp tiền
                            </button>
                        )}
                    </span>
                </h2>
                <p>
                    <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
                </p>
            </div>
            <div
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                    backgroundColor: isDarkMode ? "#34495e" : "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
            >
                <div
                    style={{
                        padding: "10px",
                        backgroundColor: selectedSection === "profile" ? "#2ecc71" : "transparent",
                        color: selectedSection === "profile" ? "#fff" : "#2ecc71",
                        borderBottom: "1px solid #333",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                        textAlign: "left",
                    }}
                    onClick={handleProfileClick}
                >
                    Thông tin tài khoản
                </div>
                <div
                    style={{
                        padding: "10px",
                        backgroundColor: selectedSection === "transaction" ? "#2ecc71" : "transparent",
                        color: selectedSection === "transaction" ? "#fff" : "#2ecc71",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                        textAlign: "left",
                    }}
                    onClick={handleTopupClick}
                >
                    Thanh toán
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
// src/guest/pages/ProfilePage.jsx

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getUser, updateProfile } from "../services/UserService";
import ProfileCard from "../components/ProfileCard";
import AccountDetails from "../components/AccountDetails";
import NapTien from "../pages/Naptien";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentSection, setCurrentSection] = useState("accountDetails");
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

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === "#transaction") {
                setCurrentSection("napTien");
            } else {
                setCurrentSection("accountDetails");
            }
        };

        window.addEventListener("hashchange", handleHashChange);
        handleHashChange(); // Initial check

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = async () => {
        if (cropperRef.current) {
            const cropper = cropperRef.current.cropper;
            const croppedCanvas = cropper.getCroppedCanvas({
                width: 200,
                height: 200,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: "high",
            });

            const circularCanvas = document.createElement("canvas");
            const circularContext = circularCanvas.getContext("2d");
            circularCanvas.width = circularCanvas.height = 200;
            circularContext.beginPath();
            circularContext.arc(100, 100, 100, 0, 2 * Math.PI);
            circularContext.clip();
            circularContext.drawImage(croppedCanvas, 0, 0, 200, 200);
            const croppedImageData = circularCanvas.toDataURL();

            setUser((prevUser) => ({
                ...prevUser,
                userImg: croppedImageData,
            }));
            setImage(null);
            setShowCropper(false);

            const updatedData = {
                userId: user.userId,
                fullName: user.fullName,
                userImg: croppedImageData,
            };

            try {
                await updateProfile(updatedData);
                console.log("Profile updated successfully");
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
    };

    const handleClose = () => {
        setShowCropper(false);
        setImage(null);
    };

    const cropperContent = showCropper && image && (
        <div
            style={{
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
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    textAlign: "center",
                    position: "relative",
                }}
            >
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
                    src={image}
                    style={{ height: 200, width: "30%" }}
                    aspectRatio={1}
                    guides={false}
                    ref={cropperRef}
                />
                <button
                    onClick={handleCrop}
                    style={{
                        marginTop: "10px",
                        padding: "10px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Crop and Save
                </button>
            </div>
        </div>
    );

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <div className="container">
                <div style={{ fontFamily: "'Roboto', sans-serif" }}>
                    <div className="profile" style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                        <ProfileCard
                            user={user}
                            setUser={setUser}
                            isDarkMode={isDarkMode}
                            handleAvatarChange={handleAvatarChange}
                            cropperContent={cropperContent}
                            setCurrentSection={setCurrentSection} // Pass the function to ProfileCard
                        />
                        <div className="profile"
                            style={{
                                borderRadius: "10px",
                                padding: "20px",
                                marginLeft: "20px",
                                flex: 1,
                                backgroundColor: isDarkMode ? "#555" : "#f9f9f9",
                                color: isDarkMode ? "#fff" : "#000",
                            }}
                        >
                            {currentSection === "accountDetails" && <AccountDetails user={user} />}
                            {currentSection === "napTien" && <NapTien />}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
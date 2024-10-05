import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useSelector } from "react-redux";
import { getUser } from "../services/UserService";
import { timeSince } from "../../utils/timeUtils";

const AccountDetails = () => {
    const [user, setUser] = useState(null);
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

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="account-details">
            <h2>Thông tin tài khoản</h2>
            <p><strong>Full Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            <p><strong>Member for:</strong> {timeSince(new Date(user.createdAt))}</p>
            <p><strong>Balance:</strong> {user.balance}</p>
            {/* <p><strong>Avatar:</strong> <img src={user.userImg || "https://via.placeholder.com/150"} alt="Avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }} /></p> */}
        </div>
    );
};

export default AccountDetails;
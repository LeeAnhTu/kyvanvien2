import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,Link } from "react-router-dom";
import {handleLoginRedux} from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';


const Account = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user.account);
    const isError = useSelector((state) => state.user.isError);


  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  const validatePassword = (password) => password.length >= 8;

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }
    try {
      await dispatch(handleLoginRedux(email, password));
      // Chờ Redux state được cập nhật và sau đó điều hướng
    } catch (error) {
      console.error("Login error:", error);
      // Xử lý lỗi nếu cần
    }
  };
  useEffect(() => {
    if (account.auth) {
      toast.success("Đăng nhập thành công");
      navigate("/");
    } else if (isError) {
      navigate("/account");
    }
  }, [account.auth, isError, navigate]);


  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/auth/register", {
        fullName,
        email,
        password,
      });
      toast.success("Registration successful!");

      dispatch(handleLoginRedux(email, password));
    } catch (error) {
      if (
        error.response &&
        error.response.data.message.includes("Duplicate entry")
      ) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };


  const inputStyle = {
    marginTop: "0.25rem",
    display: "block",
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #cbd5e0",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: "#1a202c",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "#5a67d8",
    color: "#ffffff",
    fontWeight: "600",
    borderRadius: "0.375rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.2s, transform 0.2s",
  };

  return (
    <main className='main-sub'>
    <div 
      style={{
        position: "relative",
        backgroundColor: "#f7fafc",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
      }}
    >
      
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(90vh + 4rem)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "2rem",
              backgroundColor: "#ffffff",
              borderRadius: "0.75rem",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                marginBottom: "1.5rem",
                backgroundColor: "#ffffff",
                borderRadius: "0.75rem",
                paddingBottom: "1rem",
              }}
            >
              {isSignIn ? (
                <div>
                  <h2
                    style={{
                      fontSize: "2xl",
                      fontWeight: "semibold",
                      marginBottom: "6",
                      color: "black",
                    }}
                  >
                    Sign In
                  </h2>
                  <form style={{ paddingBottom: "8" }} onSubmit={handleSignIn}>
                    <div
                      style={{ marginBottom: "1.5rem", position: "relative" }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#4a5568",
                        }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        required
                        value={email}
                        onChange={handleEmailChange}
                        style={inputStyle}
                      />
                    </div>
                    <div
                      style={{ marginBottom: "1.5rem", position: "relative" }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#4a5568",
                        }}
                      >
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ ...inputStyle, paddingRight: "2.5rem" }}
                      />
                      {password && (
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "1rem",
                            cursor: "pointer",
                            color: "#4a5568",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        marginBottom: "1.5rem",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <input
                        type="checkbox"
                        style={{
                          width: "1rem",
                          height: "1rem",
                          marginRight: "0.5rem",
                        }}
                      />
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#4a5568",
                        }}
                      >
                        Remember me
                      </label>
                    </div>
                    <button type="submit" style={buttonStyle}>
                      Sign In
                    </button>
                  </form>
                  <div
                    style={{
                      marginTop: "1.5rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "#4a5568" }}>
                      Don't have an account?{" "}
                      <Link
                        onClick={() => setIsSignIn(!isSignIn)}
                        style={{
                          color: "#5a67d8",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Register
                      </Link>
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <h2
                    style={{
                      fontSize: "2xl",
                      fontWeight: "semibold",
                      marginBottom: "6",
                      color: "black",
                    }}
                  >
                    Register
                  </h2>
                  <form
                    style={{ paddingBottom: "8" }}
                    onSubmit={handleRegister}
                  >
                    <div
                      style={{ marginBottom: "1.5rem", position: "relative" }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#4a5568",
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        value={fullName}
                        onChange={handleFullNameChange}
                        style={inputStyle}
                      />
                    </div>
                    <div
                      style={{ marginBottom: "1.5rem", position: "relative" }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#4a5568",
                        }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        required
                        value={email}
                        onChange={handleEmailChange}
                        style={inputStyle}
                      />
                    </div>
                    <div
                      style={{ marginBottom: "1.5rem", position: "relative" }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#4a5568",
                        }}
                      >
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ ...inputStyle, paddingRight: "2.5rem" }}
                      />
                      {password && (
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "1rem",
                            cursor: "pointer",
                            color: "#4a5568",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      )}
                    </div>
                    <div
                      style={{ marginBottom: "1.5rem", position: "relative" }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#4a5568",
                        }}
                      >
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        style={{ ...inputStyle, paddingRight: "2.5rem" }}
                      />
                      {confirmPassword && (
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "1rem",
                            cursor: "pointer",
                            color: "#4a5568",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      )}
                    </div>
                    <button type="submit" style={buttonStyle}>
                      Register
                    </button>
                  </form>
                  <div
                    style={{
                      marginTop: "1.5rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "#4a5568" }}>
                      Already have an account?{" "}
                      <Link
                        onClick={() => setIsSignIn(!isSignIn)}
                        style={{
                          color: "#5a67d8",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Sign In
                      </Link>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
    </main>
  );
};

export default Account;
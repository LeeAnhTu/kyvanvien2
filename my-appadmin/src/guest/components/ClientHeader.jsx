

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaSun, FaMoon, FaUserAstronaut } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleLogoutRedux } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";


const ClientHeader = () => {

    const user = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const handleLogout = () =>{
        dispatch(handleLogoutRedux());
        navigate("/");
            toast("Logout Success!");
    }


  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGenres,setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const dropdownRef = useRef(null);

  const handleSearch = async () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/stories/search?query=${query}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyUp = (e) => {
    setQuery(e.target.value);
    handleSearch();
  };

    const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setQuery("");
      setResults([]);
    }
  };

  const handleGenreClick = (genreId) => {
    setSelectedGenres((prevSelectedGenres) =>
        prevSelectedGenres.includes(genreId)
            ? prevSelectedGenres.filter((id) => id !== genreId)
            : [...prevSelectedGenres, genreId]
    );
    navigate(`/truyen/danh-sach?genreId=${genreId}`);
  };

    const handleResultClick = () => {
    setIsDropdownOpen(false);
    setQuery("");
    setResults([]);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   return navigate(() => {
  //     setResults([]);
  //   });
  // }, [navigate]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/genre");
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);


  return (
    <>
      <header className="header d-none d-lg-block" style={{ height: "100px" }}>
        <nav className="navbar navbar-expand-lg navbar-dark header__navbar">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img
                src="/assets/img/logo.png"
                alt="Logo Ky Vien"
                className="img-fluid"
                style={{ width: "50px" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
              style={{ justifyContent: "center" }}
            >
              <form
                  className="d-flex header__form-search"
                  onSubmit={(e) => e.preventDefault()}
                  style={{
                    width: "60%",
                    marginLeft: "auto",
                    position: "relative",
                    marginRight: "18vh",
                  }}
                  ref={dropdownRef}
              >
                <input
                    className="form-control search-story"
                    type="text"
                    placeholder="Tìm truyện, thể loại etc..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={handleKeyUp}
                    onFocus={() => setIsDropdownOpen(true)}
                    style={{
                      width: "100%",
                      outline: "none",
                      boxShadow: "none",
                    }}
                />
                <div
                    className="dropdown ms-2"
                    style={{
                      position: "absolute",
                      right: "0",
                    }}
                >
                  <button
                      className="btn btn-secondary"
                      type="button"
                      id="genreDropdown"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      style={{
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                      }}
                  >
                    Thể Loại
                  </button>
                </div>
                {isDropdownOpen && (
                    <div
                        className="search-results"
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          width: "100%",
                          backgroundColor:  "white",
                          color:  "black",
                          border: "1px solid black",
                          borderRadius: "5px",
                          zIndex: 1000,
                        }}
                    >
                      <div
                          className="genres"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(6, 1fr)",
                            gap: "10px",
                            padding: "10px",
                            borderBottom: "1px solid black",
                          }}
                      >
                        {genres.map((genre) => (
                            <span
                                key={genre.genreId}
                                className="genre-tag"
                                onClick={() => handleGenreClick(genre.genreId)}
                                style={{
                                  fontWeight: "bold",
                                  padding: "3px",
                                  borderRadius: "12px",
                                  fontSize: "0.7rem",
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                            >
                        {genre.genreName}
                      </span>
                        ))}
                      </div>
                      {query && (
                          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                            {results.slice(0, 5).map((result) => (
                                <li
                                    key={result.id}
                                    style={{
                                      borderBottom: "1px solid black",
                                      padding: "10px",
                                      position: "relative",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                >
                                  <Link
                                      to={`/truyen/${result.slug}`}
                                      onClick={handleResultClick}
                                      style={{
                                        textDecoration: "none",
                                      }}
                                  >
                                    {result.title}
                                  </Link>
                                  <span>{`~ ${result.author}`}</span>
                                </li>
                            ))}
                          </ul>
                      )}
                    </div>
                )}
              </form>

              

              <div className="form-check form-switch d-flex align-items-center ms-auto">
                <label className="form-check-label">
                  <FaSun style={{ fill: "#fff" }} />
                </label>
                <input
                  className="form-check-input theme_mode"
                  type="checkbox"
                  style={{
                    transform: "scale(1.3)",
                    marginLeft: "12px",
                    marginRight: "12px",
                  }}
                />
                <label className="form-check-label">
                  <FaMoon style={{ fill: "#fff" }} />
                </label>
              </div>

              <div className="ms-3 position-relative">
                {user && user.auth === true ? (
                    <div className="dropdown">
                      <button
                          className="btn btn-secondary d-flex"
                          type="button"
                          id="accountDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            borderRadius: "50%",
                            padding: "5px",
                          }}
                      >
                        <FaUserAstronaut
                            className="icon-transition"
                            style={{ fill: "#fff", fontSize: "1.5rem" }}
                        />
                      </button>
                      <ul
                          className="dropdown-menu menu-home"
                          aria-labelledby="accountDropdown"
                          style={{
                            width: "200px",
                            position: "absolute",
                            top: "100%",
                            left: "100%",
                            transform: "translateX(-100%)",
                          }}
                      >
                        <li>
                          <Link
                              to="/tai-khoan/ho-so"
                              className="dropdown-item"
                          >
                            Tài Khoản
                          </Link>
                        </li>
                        <li>
                          <Link
                              to="/tai-khoan/tu-truyen"
                              className="dropdown-item"
                          >
                            Tủ Truyện
                          </Link>
                        </li>
                        <li>
                          <Link
                              to="/tai-khoan/lich-su-giao-dich"
                              className="dropdown-item"
                          >
                            Lịch sử giao dịch
                          </Link>
                        </li>
                        <li>
                          <Link
                              to="/dang-truyen/danh-sach-truyen"
                              className="dropdown-item"
                          >
                            Đăng truyện
                          </Link>
                        </li>
                        <li>
                          <Link
                              to="/tai-khoan/doi-qua"
                              className="dropdown-item"
                          >
                            Đổi quà
                          </Link>
                        </li>
                        <li>
                          <button
                              className="dropdown-item"
                              onClick={handleLogout}
                          >
                            Đăng xuất
                          </button>
                        </li>
                      </ul>
                    </div>
                ) : (
                  <Link to="/account">
                    <button
                        className="btn btn-secondary d-flex"
                        type="button"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          borderRadius: "50%",
                          padding: "5px",
                        }}
                    >
                      <FaUserAstronaut
                          style={{ fill: "#fff", fontSize: "1.5rem" }}
                      />
                    </button>
                    </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default ClientHeader;
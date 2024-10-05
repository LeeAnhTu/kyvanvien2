import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { listHistory, saveOrUpdateUserProgress } from "../services/UserService";
import { getStoryById } from "../services/HomeStoryService";
import { Link } from "react-router-dom";

const ReadingHistory = () => {
  const [history, setHistory] = useState([]);
  const [storyDetails, setStoryDetails] = useState([]);
  const token = localStorage.getItem("authToken");
  const userId = token ? jwtDecode(token).userId : null;
  const LIMIT = 5;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;
      try {
        const response = await listHistory(userId);
        setHistory(response.data.slice(0, LIMIT));

        const details = [];
        for (let item of response.data.slice(0, LIMIT)) {
          const storyId = item.storyId;
          const res = await getStoryById(storyId);
          details.push({
            storyId: storyId,
            chapterCount: res.data.chapterCount,
            slug: res.data.slug,
          });
        }
        setStoryDetails(details);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [userId]);

  const handleUpdateProgress = async (storyId, slug, chapterNumber) => {
    try {
      await saveOrUpdateUserProgress(userId, slug, chapterNumber);
      setHistory((prevHistory) =>
        prevHistory.map((item) =>
          item.storyId === storyId ? { ...item, chapterNumber } : item
        )
      );
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="col-12 col-md-4 col-lg-3 sticky-md-top">
      <div className="row">
        <div className="col-12">
          <div className="section-list-category bg-light p-3 rounded card-custom">
            <div className="head-title-global mb-3">
              <div className="col-12 col-md-12 head-title-global__left">
                <h2 className="mb-0 border-bottom border-secondary pb-2">
                  <Link to={'/tai-khoan/tu-truyen'}>
                    <span
                      className="d-block text-decoration-none text-dark fs-4"
                      title="Truyện vừa đọc"
                    >
                      Truyện vừa đọc
                    </span>
                  </Link>
                </h2>
              </div>
            </div>
            <div className="row">
              <ul className="list-category" style={{ display: "block" }}>
                {history.map((item, index) => {
                  const details =
                    storyDetails.find(
                      (detail) => detail.storyId === item.storyId
                    ) || {};
                  return (
                    <li 
                      key={index}
                      style={{
                        display: "block",
                        padding: "1rem 1.5rem",
                        borderBottom: "1px solid #ddd",
                        backgroundColor: "#ffffff",
                        marginBottom: "0.75rem",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Link
                            to={`/truyen/${details.slug}/chuong/${item.chapterNumber}`}
                            className="text-dark"
                            onClick={() =>
                              handleUpdateProgress(
                                item.storyId,
                                details.slug,
                                item.chapterNumber
                              )
                            }
                          >
                            <span
                              style={{
                                fontWeight: "600",
                                color: "#000",
                                textDecoration: "none",
                              }}
                              className="hover-title"
                            >
                              {item.storyTitle}
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <span
                          style={{
                            color: "#6c757d",
                            fontSize: "0.875rem",
                          }}
                        >
                          Đã đọc: {item.chapterNumber}/{details.chapterCount}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingHistory;


import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { getListStory } from '../../services/UserService';
import { deleteStory } from '../../services/StoryService';
import { DataTable } from 'simple-datatables';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

const ListStoryUser = () => {
  const [stories, setStories] = useState([]);
  const [activeTab, setActiveTab] = useState('published'); // Tab hiện tại: "published", "pending", "rejected"
  const tableRef = useRef(null);
  const token = localStorage.getItem('authToken'); // Lấy token từ Local Storage
  const userId = token ? jwtDecode(token).userId : null;

 // Hàm lấy danh sách truyện
const fetchStories = () => {
  getListStory(userId).then((response) => {
    setStories(response.data);
  }).catch(error => {
    console.error(error);
  });
};

useEffect(() => {
  fetchStories();
}, []);

  useEffect(() => {
    if (tableRef.current && stories.length > 0) {
      new DataTable(tableRef.current, {
        perPage: 20,
        perPageSelect: [20, 30, 50, 100],
        labels: {
          placeholder: "Tìm kiếm...",
          perPage: "Số mục mỗi trang",
          noRows: "Không tìm thấy mục nào",
          info: "Hiển thị {start} đến {end} của {rows} mục",
        },
      });
    }
  }, [stories]);

  // Xử lý xóa truyện
  const handleDeleteStory = (storyId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa truyện này không?')) {
      deleteStory(storyId).then(() => {
        alert('Xóa truyện thành công!');
        fetchStories(); // Cập nhật danh sách truyện sau khi xóa
      }).catch(error => {
        console.error('Xóa truyện thất bại:', error);
        alert('Xóa truyện thất bại.');
      });
    }
  };

  // Lọc truyện theo trạng thái
  const filteredStories = stories.filter(story => {
    if (activeTab === 'published') {
      return story.checkStory === 1;
    } else if (activeTab === 'pending') {
      return story.checkStory === 2;
    } else if (activeTab === 'rejected') {
      return story.checkStory === 3;
    }
    return story;
  });

  return (
    <main className='add-story'>
      <div className="pagetitle container" style={{ paddingTop: '20px', background: 'rgb(90, 90, 95)' }}>
        <h1>Danh Sách Truyện</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Truyện</li>
          </ol>
        </nav>
      </div>

      <section className="section container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div style={{ marginTop: '20px' }}>
                  <Link to={"/dang-truyen/them-truyen"}>
                    <button className="btn btn-primary">Thêm truyện</button>
                  </Link>

                  {/* Tabs */}
                  <ul className="nav nav-tabs" role="tablist" style={{ marginTop: '20px' }}>
                    <li className="nav-item">
                      <button
                        className={`nav-link text-tab ${activeTab === 'published' ? 'active' : ''}`}
                        onClick={() => setActiveTab('published')}
                      >
                        Truyện đã đăng
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link text-tab ${activeTab === 'pending' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pending')}
                      >
                        Truyện đang chờ duyệt
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link text-tab ${activeTab === 'rejected' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rejected')}
                      >
                        Truyện bị từ chối
                      </button>
                    </li>
                  </ul>

                  {/* Danh sách truyện */}
                  <table ref={tableRef} className="table datatable">
                    <thead>
                      <tr>
                        <th>Truyện</th>
                        <th>Tác giả</th>
                        <th>Thể loại</th>
                        <th>Trạng thái</th>
                        <th>Thời Gian</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStories.length > 0 ? (
                        filteredStories.map(story => (
                          <tr key={story.id}>
                            <td className='story-title'>{story.title}</td>
                            <td>{story.author}</td>
                            <td>{story.genreName}</td>
                            <td>{story.statusName}</td>
                            <td>{formatDate(story.createdAt)}</td>
                            <td>
                              {activeTab === 'published' ? (
                                <>
                                  <Link to={`/dang-truyen/sua-truyen/${story.id}`}>
                                    <button className="btn btn-warning">Sửa</button>
                                  </Link>&nbsp;&nbsp;
                                  <Link to={`/dang-truyen/sua-truyen/danh-sach-chuong/${story.id}`}>
                                    <button className="btn btn-success">Chương truyện</button>
                                  </Link>
                                </>
                              ) : (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteStory(story.id)}
                                >
                                  Xóa
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">Không có truyện trong mục này</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ListStoryUser;

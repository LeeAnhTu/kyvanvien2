import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { checkstory } from '../services/StoryService';
import { DataTable } from 'simple-datatables';

const CheckStory = () => {
  const [stories, setStory] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    checkstory().then((response) => {
      setStory(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);



  useEffect(() => {
    if (tableRef.current && stories.length > 0) {
      new DataTable(tableRef.current, {
        perPage: 20, // Số lượng bản ghi hiển thị trên mỗi trang
        perPageSelect: [20, 30, 50, 100] // Tùy chọn số lượng bản ghi trên mỗi trang
      });
    }
  }, [stories]);

  

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Danh Sách Truyện</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
              <li className="breadcrumb-item active">Duyệt Truyện</li> 
            </ol>
          </nav>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Danh Sách Duyệt</h5>
                  <div>

                    <table ref={tableRef} className="table datatable">
                      <thead>
                        <tr>
                          <th>Tên Truyện</th>
                          <th>Tác Giả</th>
                          <th>Người Đăng</th>
                          <th>Kiểu</th>
                          <th>Thể Loại</th>
                          <th>Trạng Thái</th>
                          <th>Hành Động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stories.length > 0 ? (
                          stories.map(story => (
                            <tr key={story.id}>
                              <td className='story-title'>{story.title}</td>
                              <td>{story.author}</td>
                              <td>{story.userName}</td>
                              <td>{story.typeName}</td>
                              <td>{story.genreName}</td>
                              <td>{story.statusName}</td>
                              <td>
                                <Link to={`/admin/story/${story.id}`}>
                                  <button className="btn btn-info">Chi tiết</button>
                                </Link>&nbsp;&nbsp;
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">Không có yêu cầu nào</td>
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
    </div>
  );
}

export default CheckStory;

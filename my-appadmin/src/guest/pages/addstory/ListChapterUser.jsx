import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listchapter1, getStoryById } from '../../services/StoryService';
import { DataTable } from 'simple-datatables';

function ListChapterUser() {
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [storyTitle, setStoryTitle] = useState("");
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await listchapter1(id);
        setChapters(response.data);

        const storyResponse = await getStoryById(id);
        setStoryTitle(storyResponse.data.title);
      } catch (error) {
        console.error("Error fetching chapters or story:", error);
      }
    };
    fetchChapters();
  }, [id]);

  useEffect(() => {
    if (tableRef.current && chapters.length > 0) {
      new DataTable(tableRef.current, {
        perPage: 20,
        perPageSelect: [20, 40, 60, 80, 100],
        labels: {
            placeholder: "Tìm kiếm...", // Placeholder text in the search input
            perPage: "Số mục mỗi trang", // Entries per page
            noRows: "Không tìm thấy mục nào", // Message shown when there are no matching entries
            info: "Hiển thị {start} đến {end} của {rows} mục", // Information text
          },
      });
    }
  }, [chapters]);

  return (
    <main className="add-story">
      <div className="pagetitle container" style={{paddingTop:'20px',background:'rgb(90, 90, 95)'}}>
        <h1>Danh Sách Chương</h1>
        <nav>
          <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/dang-truyen/danh-sach-truyen">Truyện</Link></li>
            <li className="breadcrumb-item active">Danh Sách Chương</li>
          </ol>
        </nav>
      </div>

      <section className="section container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Danh sách chương : "{storyTitle}"</h5>
                <div>
                  <Link to={`/dang-truyen/them-chuong/${id}`}>
                    <button className="btn btn-primary">Thêm chương mới</button>
                  </Link>
                  <table ref={tableRef} className="table datatable">
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'center' }}>Số Chương</th>
                        <th style={{ textAlign: 'center' }}>Tiêu đề</th>
                        <th style={{ textAlign: 'center' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {chapters.length > 0 ? (
                        chapters.map(chapter => (
                          <tr key={chapter.chapterId}>
                            <td style={{ width: '200px' }}>{chapter.chapterNumber}</td>
                            <td>{chapter.title}</td>
                            <td>
                              <Link to={`/dang-truyen/sua-truyen/truyen/${id}/chuong/${chapter.chapterId}`}>
                                <button className="btn btn-info">Sửa chương</button>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No chapters found</td>
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
}

export default ListChapterUser;

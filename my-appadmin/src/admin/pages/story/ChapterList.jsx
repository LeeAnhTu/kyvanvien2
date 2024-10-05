import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listchapter1, getStoryById } from '../../services/StoryService';
import { DataTable } from 'simple-datatables';

function ChapterList() {
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
      });
    }
  }, [chapters]);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Danh Sách Chương</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/admin/liststory">Truyện</Link></li>
            <li className="breadcrumb-item active">Danh Sách Chương</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Danh sách chương : "{storyTitle}"</h5>
                <div>
                  <Link to={`/admin/story/${id}/addchapter`}>
                    <button className="btn btn-primary">Thêm Chương</button>
                  </Link>
                  <table ref={tableRef} className="table datatable">
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'center' }}>Số Chương</th>
                        <th style={{ textAlign: 'center' }}>Tiêu Đề</th>
                        <th style={{ textAlign: 'center' }}>Hành Động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chapters.length > 0 ? (
                        chapters.map(chapter => (
                          <tr key={chapter.chapterId}>
                            <td style={{ width: '200px' }}>{chapter.chapterNumber}</td>
                            <td>{chapter.title}</td>
                            <td>
                              <Link to={`/admin/stories/${id}/chapters/${chapter.chapterId}`}>
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

export default ChapterList;

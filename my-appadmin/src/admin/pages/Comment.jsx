import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { listcomments, deletecomments } from '../services/CommentService';
import { DataTable } from 'simple-datatables';

const Comment = () => {
  const [comments, setComment] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    // Tải danh sách comments khi component được gắn vào DOM
    loadComments();
  }, []);

  useEffect(() => {
    // Khởi tạo DataTable khi comments được cập nhật
    if (tableRef.current && comments.length > 0) {
      new DataTable(tableRef.current, {
        perPage: 20, // Số lượng bản ghi hiển thị trên mỗi trang
        perPageSelect: [20, 30, 50, 100] // Tùy chọn số lượng bản ghi trên mỗi trang
      });
    }
  }, [comments]);

  const loadComments = async () => {
    try {
      const response = await listcomments();
      setComment(response.data);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa thể loại này?'); 
    if (confirmDelete) {
      try {
        await deletecomments(id);
        // Tải lại danh sách comments sau khi xóa thành công
        loadComments();
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Danh Sách Bình Luận</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
              <li className="breadcrumb-item active">Bình Luận</li>
            </ol>
          </nav>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Bình Luận</h5>
                  <div>
                    <table ref={tableRef} className="table datatable">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên</th>
                          <th>Truyện</th>
                          <th>Ngày</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comments.length > 0 ? (
                          comments.map(comment => (
                            <tr key={comment.commentId}>
                              <td>{comment.commentId}</td>
                              <td>{comment.userName}</td>
                              <td className='story-title'>{comment.storyName}</td>
                              <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
                              <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(comment.commentId)}>Xóa</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">No entries found</td>
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

export default Comment;


import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { listRequest, approveRequest, rejectRequest } from '../../services/GiftRequestService';
import { DataTable } from 'simple-datatables';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const GiftRequest = () => {
  const [requests, setRequest] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");
  const token = localStorage.getItem('authToken'); // Lấy token từ Local Storage
  const adminId = token ? jwtDecode(token).userId : null;
  const tableRef = useRef(null);

  useEffect(() => {
    listRequest().then((response) => {
      setRequest(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    if (tableRef.current && requests.length > 0) {
      new DataTable(tableRef.current, {
        perPage: 20,
        perPageSelect: [20, 30, 50, 100]
      });
    }
  }, [requests]);

  const handleShow = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setAdminResponse(""); // Đặt lại phản hồi
  };

  const handleApprove = () => {
    approveRequest(selectedRequest.rgId, adminId, adminResponse)
      .then(() => {
        // Cập nhật danh sách yêu cầu sau khi phê duyệt
        listRequest().then((response) => {
          setRequest(response.data);
        });
        setShowApproveModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleReject = () => {
    rejectRequest(selectedRequest.rgId, adminId, adminResponse)
      .then(() => {
        // Cập nhật danh sách yêu cầu sau khi từ chối
        listRequest().then((response) => {
          setRequest(response.data);
        });
        setShowRejectModal(false); 
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Danh Sách Yêu Cầu</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
              <li className="breadcrumb-item active">Yêu Cầu</li>
            </ol>
          </nav>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Danh Sách Yêu Cầu</h5>
                  <div>
                    <table ref={tableRef} className="table datatable">
                      <thead>
                        <tr>
                          <th>Tên</th>
                          <th>Giá Trị Thẻ</th>
                          <th>Số Kim Cương</th>
                          <th>Trạng Thái</th>
                          <th>Ngày Gửi</th>
                          <th>Hành Động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.length > 0 ? (
                          requests.map(request => (
                            <tr key={request.rgId}>
                              <td className='story-title'>{request.userName}</td>
                              <td>{request.cardValue}</td>
                              <td>{request.diamondsUsed}</td>
                              <td>
                                <span
                                  className={ 
                                    request.status === 'Đang Xử Lý' ? 'badge bg-warning' :
                                    request.status === 'Đã Xử Lý' ? 'badge bg-success' :
                                    request.status === 'Từ Chối' ? 'badge bg-danger' :
                                    ''
                                  }
                                >
                                  {request.status}
                                </span>
                                
                              </td>
                              <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                              <td>
                                <button className="btn btn-info" onClick={() => handleShow(request)}>Chi Tiết</button>&nbsp;&nbsp;
                                <button 
                                  className="btn btn-success" 
                                  onClick={() => { setSelectedRequest(request); setShowApproveModal(true); }} 
                                  disabled={request.status !== 'Đang Xử Lý'} // Disable nếu không phải "Đang Xử Lý"
                                >
                                  Chấp Nhận
                                </button>&nbsp;&nbsp;
                                <button 
                                  className="btn btn-danger" 
                                  onClick={() => { setSelectedRequest(request); setShowRejectModal(true); }} 
                                  disabled={request.status !== 'Đang Xử Lý'} // Disable nếu không phải "Đang Xử Lý"
                                >
                                  Từ Chối
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6">Không có yêu cầu nào</td>
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
        
        {/* Modal hiển thị thông tin yêu cầu */}
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thông Tin Yêu Cầu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedRequest && (
                <div>
                    <p><strong>Tên người gửi:</strong> {selectedRequest.userName}</p>
                    <p><strong>Giá trị thẻ:</strong> {selectedRequest.cardValue.toLocaleString()} VND</p>
                    <p><strong>Số kim cương:</strong> {selectedRequest.diamondsUsed}</p>
                    <p><strong>Trạng thái:</strong> {selectedRequest.status}</p>
                    <p><strong>Ngày gửi:</strong> {new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                    
                    {/* Kiểm tra trạng thái trước khi hiển thị thông tin xử lý */}
                    {selectedRequest.status !== 'Đang Xử Lý' && (
                    <>
                        <p><strong>Người Xử lý:</strong> {selectedRequest.adminName}</p>
                        <p><strong>Phản Hồi:</strong> {selectedRequest.adminResponse}</p>
                        <p><strong>Ngày Xử lý:</strong> {new Date(selectedRequest.adminResponseDate).toLocaleDateString()}</p>
                    </>
                    )}
                </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>Đóng</button>
            </Modal.Footer>
        </Modal>

        {/* Modal xác nhận chấp nhận yêu cầu */}
        <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Xác Nhận Chấp Nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có chắc chắn muốn chấp nhận yêu cầu này không?</p>
                <div className="form-group">
                    <label>Phản hồi của quản trị viên:</label>
                    <input type="text" className="form-control" value={adminResponse} onChange={(e) => setAdminResponse(e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => setShowApproveModal(false)}>Đóng</button>
                <button className="btn btn-success" onClick={handleApprove}>Chấp Nhận</button>
            </Modal.Footer>
        </Modal>

        {/* Modal xác nhận từ chối yêu cầu */}
        <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Xác Nhận Từ Chối</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có chắc chắn muốn từ chối yêu cầu này không?</p>
                <div className="form-group">
                    <label>Phản hồi của quản trị viên:</label>
                    <input type="text" className="form-control" value={adminResponse} onChange={(e) => setAdminResponse(e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => setShowRejectModal(false)}>Đóng</button>
                <button className="btn btn-danger" onClick={handleReject}>Từ Chối</button>
            </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
}

export default GiftRequest;


import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getGiftHistoryByUserId } from '../services/historyGiftService';
import { getTransactionsByUserId } from '../services/WalletService';
import { listRequest } from '../services/GiftRequestService';
import { timeSince } from '../../utils/timeUtils';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('vi-VN', options).format(date);
}

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState('reading'); // Tab mặc định là 'reading'
  const [historygift, setHistoryGift] = useState([]);
  const [historytransaction, setHistoryTransaction] = useState([]);
  const [giftrequest, setGiftRequest] = useState([]);
  const [loading, setLoading] = useState(false); // State để theo dõi trạng thái tải
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const token = localStorage.getItem('authToken'); // Lấy token từ Local Storage
  const userId = token ? jwtDecode(token).userId : null;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return; // Nếu không có userId, không thực hiện gọi API
      setLoading(true); // Bắt đầu quá trình tải
      try {

        const giftResponse = await getGiftHistoryByUserId(userId);
        setHistoryGift(giftResponse);
        const transaction =   await getTransactionsByUserId(userId);
        setHistoryTransaction(transaction);
        const requestResponse = await listRequest(userId);
        setGiftRequest(requestResponse.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false); // Kết thúc quá trình tải
      }
    };

    fetchHistory();
    document.documentElement.scrollTop = 0;
  }, [userId]);

  useEffect(() => {
    // Cuộn về đầu trang khi người dùng chuyển trang
    window.scrollTo(0, 0);
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = historygift.slice(indexOfFirstItem, indexOfLastItem);
  const currentTransaction = historytransaction.slice(indexOfFirstItem, indexOfLastItem);
  const currentRequest = giftrequest.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setLoading(true); // Bắt đầu quá trình tải
    setCurrentPage(pageNumber);

    // Giả lập thời gian tải 2 giây
    setTimeout(() => {
      setLoading(false); // Kết thúc quá trình tải
    }, 1500);
  };

  const openModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
};

const handleClose = () => setShowModal(false);



  const totalPagesHistory = Math.ceil(historygift.length / itemsPerPage);
  const totalPagestransaction= Math.ceil(historytransaction.length / itemsPerPage);
  const totalPagesRequest = Math.ceil(giftrequest.length / itemsPerPage);

  return (
    <main className='main-sub'>
      <div className="bookcase container">
        <div className="tabs">
          <button 
            className={activeTab === 'reading' ? 'active' : ''} 
            onClick={() => {
              setActiveTab('reading');
              handlePageChange(1); // Reset về trang đầu tiên khi chuyển tab
            }}
          >
            Lịch Sử Nạp Tiền
          </button>
          <button 
            className={activeTab === 'bookmarked' ? 'active' : ''} 
            onClick={() => {
              setActiveTab('bookmarked');
              handlePageChange(1); // Reset về trang đầu tiên khi chuyển tab
            }}
          >
            Lịch Sử Tặng Quà
          </button>
          <button 
            className={activeTab === 'exchanged' ? 'active' : ''} 
            onClick={() => {
              setActiveTab('exchanged');
              handlePageChange(1); // Reset về trang đầu tiên khi chuyển tab
            }}
          >
            Lịch Sử Đổi Quà
          </button>
        </div>

        <div className="tab-content">
        {loading ? (
            <div className="load-more-container">
              <i className="fa-solid fa-spinner fa-spin" style={{color:'rgb(183 138 40 )',fontSize: '24px' }}></i>
            </div>
          ) : (
            <>
              {activeTab === 'reading' && (
                <div className="reading-list">
                  {currentTransaction.length > 0 ? (
                  <div className="transaction-container">
                      <div className="transaction-header">
                          <div className="transaction-cell">Tên người dùng</div>
                          <div className="transaction-cell">Số kim cương</div>
                          <div className="transaction-cell">Thời gian nạp</div>
                      </div>
                      <div className="transaction-body">
                          {currentTransaction.map((item) => (
                              <div key={item.transactionId} className="transaction-row">
                                  <div className="transaction-cell">{item.userName}</div>
                                  <div className="transaction-cell">{item.amount}</div>
                                  <div className="transaction-cell">{timeSince(new Date(item.createdAt))} ({formatDate(new Date(item.createdAt))})</div>
                              </div>
                          ))}
                      </div>
                  </div>
              ) : (
                  <p className="no-stories transaction-cell">Bạn chưa có giao dịch nào ...</p>
              )}


                </div>
              )}
              {activeTab === 'bookmarked' && (
                <div className="reading-list">
                    {currentHistory.length > 0 ? (
                    <div className="transaction-container">
                        <div className="transaction-header">
                            <div className="transaction-cell">Tên truyện</div>
                            <div className="transaction-cell">Số kim cương</div>
                            <div className="transaction-cell">Thời gian tặng</div>
                        </div>
                        <div className="transaction-body">
                            {currentHistory.map((item) => (
                                <div key={item.hgId} className="transaction-row">
                                    <div className="transaction-cell">{item.storyName}</div>
                                    <div className="transaction-cell">{item.amount}</div>
                                    <div className="transaction-cell">{timeSince(new Date(item.createAt))} ({formatDate(new Date(item.createAt))})</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="no-stories transaction-cell">Bạn chưa có giao dịch nào ...</p>
                )}
                  </div>
                )}
              {activeTab === 'exchanged' && (
                <div className="reading-list">
                    {currentRequest.length > 0 ? (
                    <div className="transaction-container">
                        <div className="transaction-header">
                            <div className="transaction-cell">Giá trị thẻ</div>
                            <div className="transaction-cell">Số kim cương cần</div>
                            <div className="transaction-cell">Trạng thái</div>
                            <div className="transaction-cell">Thời gian tặng</div>
                        </div>
                        <div className="transaction-body">
                            {currentRequest.map((item) => (
                                <div key={item.grId} className="transaction-row exchanged" onClick={() => openModal(item)}>
                                    <div className="transaction-cell">{item.cardValue.toLocaleString()} VND</div>
                                    <div className="transaction-cell">{item.diamondsUsed}</div>
                                    <div className="transaction-cell">{item.status}</div>
                                    <div className="transaction-cell">{timeSince(new Date(item.requestDate))} ({formatDate(new Date(item.requestDate))})</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="no-stories transaction-cell">Bạn chưa có giao dịch nào ...</p>
                )}
                  </div>
                )}
            </>
          )}
        </div>
        
        {/* Hiển thị phân trang chỉ khi không đang tải dữ liệu */}
        {!loading && (
          <div className="pagination">
            {activeTab === 'reading' && totalPagesHistory > 1 && (
              <>
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt; Trước
                </button>
                {Array.from({ length: totalPagesHistory }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPagesHistory}
                >
                  Sau &gt;
                </button>
              </>
            )}

            {activeTab === 'bookmarked' && totalPagestransaction > 1 && (
              <>
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt; Trước
                </button>
                {Array.from({ length: totalPagestransaction }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPagestransaction}
                >
                  Sau &gt;
                </button>
              </>
            )}

            {activeTab === 'request' && totalPagesRequest > 1 && (
              <>
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt; Trước
                </button>
                {Array.from({ length: totalPagesRequest }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPagesRequest}
                >
                  Sau &gt;
                </button>
              </>
            )}
          </div>
        )}

      </div>
      {/* Modal cho phần Exchanged */}
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
    </main>
  );
}

export default HistoryPage;


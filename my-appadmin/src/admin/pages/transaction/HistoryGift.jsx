import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { DataTable } from 'simple-datatables';
import { listgifts } from '../../services/Transaction';


const HistoryGift = () => {
  const [gifts, setGift] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    listgifts().then((response) => {
        setGift(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);


  useEffect(() => {
    if (tableRef.current && gifts.length > 0) {
      new DataTable(tableRef.current, {
        perPage: 20,
        perPageSelect: [20, 30, 50, 100],
        labels: {
            placeholder: "Tìm kiếm...", // Placeholder text in the search input
            perPage: "Số mục mỗi trang", // Entries per page
            noRows: "Không tìm thấy mục nào", // Message shown when there are no matching entries
            info: "Hiển thị {start} đến {end} của {rows} mục", // Information text
          },
      });
    }
  }, [gifts]);

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Lịch Sử Tặng Quà</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
              <li className="breadcrumb-item active">Tặng Quà</li>
            </ol>
          </nav>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Lịch Sử Tặng Quà</h5>
                  <div>
                    
                    <table ref={tableRef} className="table datatable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tên</th>
                          <th>Truyện</th>
                          <th>Kim Cương</th>
                          <th>Ngày Tặng</th>
                          <th>Hành Động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gifts.length > 0 ? (
                          gifts.map(gift => (
                            <tr key={gift.hgId}>
                              <td>{gift.hgId}</td>
                              <td>{gift.userName}</td>
                              <td className='story-title'>{gift.storyName}</td>
                              <td>{gift.amount}</td>
                              <td>{new Date(gift.createAt).toLocaleDateString()}</td>
                              <td>
                                {/* <Link to={`/admin/story/${story.id}`}>
                                  <button className="btn btn-info">View</button>
                                </Link>&nbsp;&nbsp;
                                <Link to={`/admin/story/edit/${story.id}`}>
                                  <button className="btn btn-warning">Edit</button>
                                </Link>&nbsp;&nbsp;
                                <Link to={`/admin/story/${story.id}/chapters`}>
                                  <button className="btn btn-success">Chapter</button>
                                </Link> */}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">No entries found</td>
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

export default HistoryGift;

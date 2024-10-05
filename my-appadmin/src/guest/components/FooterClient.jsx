import React from 'react';
import { Link } from 'react-router-dom';

const FooterClient = () => {
    return (
        <div id="footer" className="footer border-top pt-2">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5">
                        <strong>Kỳ Văn Viện</strong> - 
                        <Link title="Đọc truyện online" className="text-dark text-decoration-none" to="#">Đọc truyện</Link> 
                        online một cách nhanh nhất. Hỗ trợ mọi thiết bị như di động và máy tính bảng.
                    </div>
                    <ul className="col-12 col-md-7 list-unstyled d-flex flex-wrap list-tag">
                        <li className="me-1">
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="đam mỹ hài">đam mỹ hài</Link>
                            </span>
                        </li>
                        <li>
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="truyện xuyên nhanh">truyện xuyên nhanh</Link>
                            </span>
                        </li>
                        {/* Lặp lại các <li> như trong HTML của bạn */}
                        <li className="me-1">
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="đam mỹ hài">đam mỹ hài</Link>
                            </span>
                        </li>
                        <li>
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="truyện xuyên nhanh">truyện xuyên nhanh</Link>
                            </span>
                        </li>
                        <li className="me-1">
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="đam mỹ hài">đam mỹ hài</Link>
                            </span>
                        </li>
                        <li>
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="truyện xuyên nhanh">truyện xuyên nhanh</Link>
                            </span>
                        </li>
                        <li className="me-1">
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="đam mỹ hài">đam mỹ hài</Link>
                            </span>
                        </li>
                        <li>
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="truyện xuyên nhanh">truyện xuyên nhanh</Link>
                            </span>
                        </li>
                        <li className="me-1">
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="đam mỹ hài">đam mỹ hài</Link>
                            </span>
                        </li>
                        <li>
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="truyện xuyên nhanh">truyện xuyên nhanh</Link>
                            </span>
                        </li>
                        <li className="me-1">
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="đam mỹ hài">đam mỹ hài</Link>
                            </span>
                        </li>
                        <li>
                            <span className="badge text-bg-light">
                                <Link className="text-dark text-decoration-none" to="#" title="truyện xuyên nhanh">truyện xuyên nhanh</Link>
                            </span>
                        </li>
                    </ul>
                    {/* <div className="col-12">
                        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
                            <img
                                alt="Creative Commons License"
                                style={{ borderWidth: 0, marginBottom: '10px' }}
                                src="./assets/images/88x31.png"
                            />
                        </a>
                        <br />
                        <p>
                            Website hoạt động dưới Giấy phép truy cập mở 
                            <a rel="license" className="text-decoration-none text-dark hover-title" href="http://creativecommons.org/licenses/by/4.0/">
                                Creative Commons Attribution 4.0 International License
                            </a>
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default FooterClient;

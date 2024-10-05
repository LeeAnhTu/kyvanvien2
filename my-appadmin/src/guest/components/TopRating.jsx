import React from 'react'
import { Link } from 'react-router-dom'


const TopRating = () => {
  return (
        <div className="row top-ratings"> 
            <div className="col-12 top-ratings__tab mb-2">
                <div className="list-group d-flex flex-row" id="list-tab" role="tablist">
                    <Link className="list-group-item list-group-item-action active" id="top-day-list"
                        data-bs-toggle="list"
                        href="https://suustore.com/truyen/nang-khong-muon-lam-hoang-hau#top-day" role="tab"
                        aria-controls="top-day" aria-selected="true">Ngày</Link>
                    <Link className="list-group-item list-group-item-action" id="top-month-list"
                        data-bs-toggle="list"
                        href="https://suustore.com/truyen/nang-khong-muon-lam-hoang-hau#top-month"
                        role="tab" aria-controls="top-month" aria-selected="false" tabIndex="-1">Tháng</Link>
                    <Link className="list-group-item list-group-item-action" id="top-all-time-list"
                        data-bs-toggle="list"
                        href="https://suustore.com/truyen/nang-khong-muon-lam-hoang-hau#top-all-time"
                        role="tab" aria-controls="top-all-time" aria-selected="false" tabIndex="-1">All
                        time</Link>
                </div>
            </div>
            <div className="col-12 top-ratings__content">
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="top-day" role="tabpanel"
                        aria-labelledby="top-day-list">
                        <ul>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-danger rounded-circle">
                                        <span className="text-light">1</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/linh-vu-thien-ha"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Linh
                                            Vũ Thiên Hạ</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/di-gioi"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Dị
                                                Giới
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Huyền
                                                Huyễn
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/xuyen-khong"
                                                className="text-decoration-none text-dark hover-title ">Xuyên
                                                Không
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-success rounded-circle">
                                        <span className="text-light">2</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/than-dao-dan-ton"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Thần
                                            Đạo Đan Tôn</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-info rounded-circle">
                                        <span className="text-light">3</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/me-vo-khong-loi-ve"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Mê
                                            Vợ Không Lối Về</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/ngon-tinh"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Ngôn
                                                Tình
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/nguoc"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Ngược
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/sung"
                                                className="text-decoration-none text-dark hover-title ">Sủng
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">4</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/dau-pha-thuong-khung"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Đấu
                                            Phá Thương Khung</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/di-gioi"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Dị
                                                Giới
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">5</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/the-gioi-hoan-my"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Thế
                                            Giới Hoàn Mỹ</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/kiem-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Kiếm
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">6</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/co-vo-ngot-ngao-co-chut-bat-luong-vo-moi-bat-luong-co-chut-ngot"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Cô
                                            Vợ Ngọt Ngào Có Chút Bất Lương (Vợ Mới Bất Lương Có Chút
                                            Ngọt)</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/ngon-tinh"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Ngôn
                                                Tình
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/trong-sinh"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Trọng
                                                Sinh
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/sung"
                                                className="text-decoration-none text-dark hover-title ">Sủng
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">7</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/pham-nhan-tu-tien"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Phàm
                                            Nhân Tu Tiên</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/kiem-hiep"
                                                className="text-decoration-none text-dark hover-title ">Kiếm
                                                Hiệp
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">8</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/nhat-niem-vinh-hang"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Nhất
                                            Niệm Vĩnh Hằng</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">9</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/de-ba"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Đế
                                            Bá</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">10</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/re-quy-troi-cho"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Rể
                                            Quý Trời Cho</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/ngon-tinh"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Ngôn
                                                Tình
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/do-thi"
                                                className="text-decoration-none text-dark hover-title ">Đô Thị
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>

                    <div className="tab-pane fade" id="top-month" role="tabpanel"
                        aria-labelledby="top-month-list">
                        <ul>
                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-danger rounded-circle">
                                        <span className="text-light">1</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/linh-vu-thien-ha"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Linh
                                            Vũ Thiên Hạ</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/di-gioi"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Dị
                                                Giới
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Huyền
                                                Huyễn
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/xuyen-khong"
                                                className="text-decoration-none text-dark hover-title ">Xuyên
                                                Không
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-success rounded-circle">
                                        <span className="text-light">2</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/than-dao-dan-ton"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Thần
                                            Đạo Đan Tôn</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-info rounded-circle">
                                        <span className="text-light">3</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/me-vo-khong-loi-ve"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Mê
                                            Vợ Không Lối Về</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/ngon-tinh"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Ngôn
                                                Tình
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/nguoc"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Ngược
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/sung"
                                                className="text-decoration-none text-dark hover-title ">Sủng
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">4</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/dau-pha-thuong-khung"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Đấu
                                            Phá Thương Khung</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/di-gioi"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Dị
                                                Giới
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">5</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/the-gioi-hoan-my"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Thế
                                            Giới Hoàn Mỹ</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/kiem-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Kiếm
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">6</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/co-vo-ngot-ngao-co-chut-bat-luong-vo-moi-bat-luong-co-chut-ngot"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Cô
                                            Vợ Ngọt Ngào Có Chút Bất Lương (Vợ Mới Bất Lương Có Chút
                                            Ngọt)</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/ngon-tinh"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Ngôn
                                                Tình
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/trong-sinh"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Trọng
                                                Sinh
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/sung"
                                                className="text-decoration-none text-dark hover-title ">Sủng
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">7</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/pham-nhan-tu-tien"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Phàm
                                            Nhân Tu Tiên</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/kiem-hiep"
                                                className="text-decoration-none text-dark hover-title ">Kiếm
                                                Hiệp
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">8</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/nhat-niem-vinh-hang"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Nhất
                                            Niệm Vĩnh Hằng</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">9</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/de-ba"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Đế
                                            Bá</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">10</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/re-quy-troi-cho"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Rể
                                            Quý Trời Cho</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/ngon-tinh"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Ngôn
                                                Tình
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/do-thi"
                                                className="text-decoration-none text-dark hover-title ">Đô Thị
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-pane fade" id="top-all-time" role="tabpanel"
                        aria-labelledby="top-all-time-list">
                        <ul>
                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-danger rounded-circle">
                                        <span className="text-light">1</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/linh-vu-thien-ha"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Linh
                                            Vũ Thiên Hạ</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/di-gioi"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Dị
                                                Giới
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Huyền
                                                Huyễn
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/xuyen-khong"
                                                className="text-decoration-none text-dark hover-title ">Xuyên
                                                Không
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-success rounded-circle">
                                        <span className="text-light">2</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/than-dao-dan-ton"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Thần
                                            Đạo Đan Tôn</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-info rounded-circle">
                                        <span className="text-light">3</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/dau-pha-thuong-khung"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Đấu
                                            Phá Thương Khung</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/di-gioi"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Dị
                                                Giới
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">4</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/co-vo-ngot-ngao-co-chut-bat-luong-vo-moi-bat-luong-co-chut-ngot"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Cô
                                            Vợ Ngọt Ngào Có Chút Bất Lương (Vợ Mới Bất Lương Có Chút
                                            Ngọt)</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/ngon-tinh"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Ngôn
                                                Tình
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/trong-sinh"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Trọng
                                                Sinh
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/sung"
                                                className="text-decoration-none text-dark hover-title ">Sủng
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">5</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/pham-nhan-tu-tien"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Phàm
                                            Nhân Tu Tiên</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/kiem-hiep"
                                                className="text-decoration-none text-dark hover-title ">Kiếm
                                                Hiệp
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">6</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/nhat-niem-vinh-hang"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Nhất
                                            Niệm Vĩnh Hằng</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">7</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/de-ba"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Đế
                                            Bá</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">8</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/vu-dong-can-khon"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Vũ
                                            Động Càn Khôn</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="rating-item d-flex align-items-center">
                                    <div className="rating-item__number bg-light border rounded-circle">
                                        <span className="text-dark">9</span>
                                    </div>
                                    <div className="rating-item__story">
                                        <Link href="https://suustore.com/truyen/doc-ton-tam-gioi"
                                            className="text-decoration-none hover-title rating-item__story--name text-one-row">Độc
                                            Tôn Tam Giới</Link>
                                        <div className="d-flex flex-wrap rating-item__story--categories">
                                            <Link href="https://suustore.com/the-loai/tien-hiep"
                                                className="text-decoration-none text-dark hover-title  me-1 ">Tiên
                                                Hiệp
                                                ,
                                            </Link>
                                            <Link href="https://suustore.com/the-loai/huyen-huyen"
                                                className="text-decoration-none text-dark hover-title ">Huyền
                                                Huyễn
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TopRating
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { countusers } from '../services/UserService';
import { countstory,listStoryView } from '../services/StoryService';
import {listtotal} from '../services/Transaction';




const Dashboard = ()  => {
    const [user, setUser] = useState([]);
    const [story, setStory] = useState([]);
    const [topStories, setTopStories] = useState([]);
    const [totalViews, setTotalViews] = useState(0);
    const [totalAmount, setTotalAmount] = useState([]);
    const LIMIT = 10;
    let index =0;
    let index1 =0;


    useEffect(() => {
        // Thực hiện các cuộc gọi API song song
        Promise.all([countusers(), countstory(), listStoryView(),listtotal()])
            .then(([userResponse, storyResponse, topStoriesResponse,totalAmountResponse]) => {
                // Cập nhật trạng thái với dữ liệu nhận được
                setUser(userResponse.data);
                setStory(storyResponse.data);

                // Giới hạn số lượng câu chuyện hàng đầu là 10
                const limitedTopStories = topStoriesResponse.data.slice(0, LIMIT);
                setTopStories(limitedTopStories);
                const totalViews = topStoriesResponse.data.reduce((sum, story) => sum + story.viewCount, 0);
                setTotalViews(totalViews);

                setTotalAmount(totalAmountResponse.data.slice(0, LIMIT));

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return(
                <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div >
                            <div className="row">
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="filter">
                                        </div>
                                        <div className="card-body">
                                        <h5 className="card-title">Số thành viên <span></span></h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-person"></i>
                                            </div>
                                            <div className="ps-3">
                                            <h6>{user}</h6>
                                            </div>
                                        </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card revenue-card">
                                        <div className="card-body">
                                        <h5 className="card-title">Số truyện <span></span></h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-book"></i>
                                            </div>
                                            <div className="ps-3">
                                            <h6>{story}</h6>
                                            </div>
                                        </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-12">
                                    <div className="card info-card customers-card">

                                        <div className="card-body">
                                        <h5 className="card-title">Lượt đọc</h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-eye"></i>
                                            </div>
                                            <div className="ps-3">
                                            <h6>{totalViews}</h6>

                                            </div>
                                        </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                        <h5 className="card-title">Top lượt xem <span></span></h5>
                                        <table className="table table-borderless datatable">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Tác giả</th>
                                                <th scope="col">Truyện</th>
                                                <th scope="col">Lượt xem</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {topStories.map(story => (
                                                <tr key={story.id}>
                                                    <th scope="row">{++index}</th>
                                                    <td>{story.author}</td>
                                                    <td><Link to={`/admin/story/${story.id}`} className="text-primary">{story.title}</Link></td>
                                                    <td>{story.viewCount}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">

                                        <div className="card-body">
                                        <h5 className="card-title">Top nạp tiền</h5>

                                        <table className="table table-borderless datatable">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Tên</th>
                                                <th scope="col">Số Kim Cương</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {totalAmount.map(total =>(
                                                    <tr key={total.walletId}>
                                                        <th scope="row">{++index1}</th>
                                                        <td>{total.userName}</td>
                                                        <td>{total.total}</td>
                                                    </tr>
                                                ))}
                                                

                                            </tbody>
                                        </table>

                                        </div>

                                    </div>
                                </div>
                                {/* <div className="col-12">
                                    <div className="card top-selling overflow-auto">

                                        <div className="filter">
                                        <Link className="icon"   data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                            </li>

                                            <li><Link className="dropdown-item"  >Today</Link></li>
                                            <li><Link className="dropdown-item"  >This Month</Link></li>
                                            <li><Link className="dropdown-item"  >This Year</Link></li>
                                        </ul>
                                        </div>

                                        <div className="card-body pb-0">
                                        <h5 className="card-title">Top Selling <span>| Today</span></h5>

                                        <table className="table table-borderless">
                                            <thead>
                                            <tr>
                                                <th scope="col">Preview</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Sold</th>
                                                <th scope="col">Revenue</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th scope="row"><Link  ><img src="assets/img/product-1.jpg" alt=""/></Link></th>
                                                <td><Link   className="text-primary fw-bold">Ut inventore ipsa voluptas nulla</Link></td>
                                                <td>$64</td>
                                                <td className="fw-bold">124</td>
                                                <td>$5,828</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link ><img src="assets/img/product-2.jpg" alt=""/></Link></th>
                                                <td><Link   className="text-primary fw-bold">Exercitationem similique doloremque</Link></td>
                                                <td>$46</td>
                                                <td className="fw-bold">98</td>
                                                <td>$4,508</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link  ><img src="assets/img/product-3.jpg" alt=""/></Link></th>
                                                <td><Link   className="text-primary fw-bold">Doloribus nisi exercitationem</Link></td>
                                                <td>$59</td>
                                                <td className="fw-bold">74</td>
                                                <td>$4,366</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link  ><img src="assets/img/product-4.jpg" alt=""/></Link></th>
                                                <td><Link   className="text-primary fw-bold">Officiis quaerat sint rerum error</Link></td>
                                                <td>$32</td>
                                                <td className="fw-bold">63</td>
                                                <td>$2,016</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><Link  ><img src="assets/img/product-5.jpg" alt=""/></Link></th>
                                                <td><Link   className="text-primary fw-bold">Sit unde debitis delectus repellendus</Link></td>
                                                <td>$79</td>
                                                <td className="fw-bold">41</td>
                                                <td>$3,239</td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        </div>

                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
                </main>        
    )
}

export default Dashboard
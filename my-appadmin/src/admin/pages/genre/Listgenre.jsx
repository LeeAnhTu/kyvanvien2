

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listGenre, createGenre, updateGenre, deleteGenre } from '../../services/GenreService';

export const Listgenre = () => {
    const [genres, setGenres] = useState([]);
    const [currentGenre, setCurrentGenre] = useState({ genreName: '' }); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const genresResponse = await listGenre();
                setGenres(genresResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentGenre({ ...currentGenre, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateGenre(currentGenre.genreId, currentGenre);
                setGenres(genres.map(genre =>
                    genre.genreId === currentGenre.genreId ? currentGenre : genre
                ));
            } else {
                const response = await createGenre(currentGenre);
                setGenres([...genres, response.data]);
            }
            setCurrentGenre({ genreName: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving genre:', error);
        }
    };

    const handleEdit = (genre) => {
        setCurrentGenre(genre);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa thể loại này?'); 
        if (confirmDelete) {
            try {
                await deleteGenre(id);
                setGenres(genres.filter(genre => genre.genreId !== id));
            } catch (error) {
                console.error('Error deleting genre:', error);
            }
        }
    };
    

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Danh Sách Thể Loại Truyện</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                        <li className="breadcrumb-item active">Thể Loại</li>
                    </ol>
                </nav>
            </div>

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Danh Sách Thể Loại</h5>
                                <button className="btn btn-primary" onClick={() => { setIsModalOpen(true); setIsEditing(false); }}>Thêm mới</button>

                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên</th>
                                                <th>Slug</th>
                                                <th>Hành Động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {genres.map((genre) => (
                                                <tr key={genre.genreId}>
                                                    <td>{genre.genreId}</td>
                                                    <td>{genre.genreName}</td>
                                                    <td>{genre.slug}</td>
                                                    <td>
                                                        <button className="btn btn-warning" onClick={() => handleEdit(genre)}>Chỉnh sửa</button>&nbsp;&nbsp;
                                                        <button className="btn btn-danger" onClick={() => handleDelete(genre.genreId)}>Xóa</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="genreModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="genreModalLabel">{isEditing ? 'Chỉnh Sửa Thể Loại' : 'Thêm Thể Loại Mới'}</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form id="genreForm" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="genreName">Tên</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="genreName"
                                            name="genreName"
                                            value={currentGenre.genreName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Đóng</button>
                                        <button type="submit" className="btn btn-primary">{isEditing ? 'Cập Nhật' : 'Thêm'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};



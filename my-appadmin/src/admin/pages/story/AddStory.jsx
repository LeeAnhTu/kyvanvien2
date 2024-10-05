import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import { useNavigate, Link } from 'react-router-dom';
import { createStory } from '../../services/StoryService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { listType } from '../../services/TypeService'; 
import { listGenre } from '../../services/GenreService'; 
import { listStatus } from '../../services/StatusstoryService';

function AddStory() {
  const token = localStorage.getItem('authToken');
  const userId = token ? jwtDecode(token).userId : null;
  const [story, setStory] = useState({
    title: '',
    storyImg: "",
    author: '',
    description: '',
    userId: '',
    typeId: '',
    genreId: '',
    statusId: '',
  });

  const [types, setTypes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesResponse = await listType();
        const genresResponse = await listGenre();
        const statusesResponse = await listStatus();

        setTypes(typesResponse.data);
        setGenres(genresResponse.data);
        setStatuses(statusesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory(prevStory => ({ ...prevStory, [name]: value }));
  };

  const handleDescriptionChange = (event, editor) => {
    setStory(prevStory => ({ ...prevStory, description: editor.getData() }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStory(prevStory => ({ ...prevStory, storyImg: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const storyData = {
      title: story.title,
      author: story.author,
      description: story.description,
      userId: userId,
      typeId: story.typeId,
      genreId: story.genreId,
      statusId: story.statusId,
      storyImg: story.storyImg,
      checkStory:1,
    };

    try {
      await createStory(storyData);
      navigate(`/admin/liststory`);
    } catch (error) {
      console.error('Error adding story:', error);
    }
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Data Tables</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/admin/liststory">Truyện</Link></li>
            <li className="breadcrumb-item active">Thêm Truyện Mới</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Thêm Truyện Mới</h5>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Tên Truyện:</label>
                      <div className="col-sm-10">
                        <input type="text" id="inputTitle" name="title" value={story.title} onChange={handleChange} required className="form-control" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputAuthor" className="col-sm-2 col-form-label">Tác Giả:</label>
                      <div className="col-sm-10">
                        <input type="text" id="inputAuthor" name="author" value={story.author} onChange={handleChange} required className="form-control" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-1 col-form-label">Kiểu</label>
                      <div className="col-sm-3">
                        <select className="form-select" name="typeId" value={story.typeId} onChange={handleChange} aria-label="Default select example" required>
                          <option value="">Kiểu</option>
                          {types.map((type) => (
                            <option key={type.typeId} value={type.typeId}>
                              {type.typeName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label className="col-sm-1 col-form-label">Thể Loại</label>
                      <div className="col-sm-3">
                        <select className="form-select" name="genreId" value={story.genreId} onChange={handleChange} aria-label="Default select example" required >
                          <option value="">Thể Loại</option>
                          {genres.map((genre) => (
                            <option key={genre.genreId} value={genre.genreId}>
                              {genre.genreName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label className="col-sm-2 col-form-label">Trạng Thái</label>
                      <div className="col-sm-2">
                        <select className="form-select" name="statusId" value={story.statusId} onChange={handleChange} aria-label="Default select example" required >
                          <option value="">Trạng Thái</option>
                          {statuses.map((status) => (
                            <option key={status.statusId} value={status.statusId}>
                              {status.statusName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputImage" className="col-sm-2 col-form-label">Ảnh:</label>
                      <div className="col-sm-10">
                        <input
                          type="file"
                          id="inputImage"
                          name="storyImg"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="custom-editor">
                      <label>Mô Tả</label>
                      <CKEditor editor={ClassicEditor} data={story.description} onChange={handleDescriptionChange} />
                    </div>

                    {/* <div>
                      <label>User Id</label>
                      <input type="text" name="userId" value={story.userId} onChange={handleChange} required />
                    </div> */}

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10px' }}>
                      <button className="btn btn-success" type="submit">Thêm</button>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AddStory;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getStoryById, updateStory } from '../../services/StoryService';
import { listType } from '../../services/TypeService'; 
import { listGenre } from '../../services/GenreService'; 
import { listStatus } from '../../services/StatusstoryService';
import { toast, ToastContainer } from 'react-toastify';

function EditStory() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [checkStory, setCheckStory] = useState('');
  const [genreId, setGenreId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [types, setTypes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [storyImg, setStoryImg] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await getStoryById(id);
        setStory(response.data);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setDescription(response.data.description);
        setUserId(response.data.userId);
        setGenreId(response.data.genreId);
        setStatusId(response.data.statusId);
        setTypeId(response.data.typeId);
        setStoryImg(response.data.storyImg);
        setCheckStory(response.data.checkStory);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    fetchStory();
  }, [id]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await listType();
        setTypes(response.data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await listGenre();
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await listStatus();
        setStatuses(response.data);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoryImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      if (story) {
        const updatedStory = {
          ...story,
          title,
          author,
          description,
          userId,
          genreId,
          statusId,
          typeId,
          storyImg,
          checkStory,
        };
        await updateStory(id, updatedStory);
        toast.success('Story update successfully');
        setTimeout(() => {
          window.location.href = `/admin/story/edit/${id}`; // Redirect to list story page
        }, 2000); // Redirect to list story page
      }
    } catch (error) {
      console.error('Error updating story:', error);
    }
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Sửa Truyện</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/admin/liststory">Truyện</Link></li>
            <li className="breadcrumb-item active">Sửa</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Sửa Truyện</h5>
                <div>
                  {story ? (
                    <div>
                      <div className="row mb-3">
                        <label htmlFor="inputTitle" className="col-sm-1 col-form-label">Tên:</label>
                        <div className="col-sm-10">
                          <input type="text" id="inputTitle" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control"/>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label htmlFor="inputAuthor" className="col-sm-1 col-form-label">Tác giả:</label>
                        <div className="col-sm-10">
                          <input type="text" id="inputAuthor" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control"/>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label htmlFor="selectType" className="col-sm-1 col-form-label"></label>
                        <div className="col-sm-3">
                          <select id="selectType" className="form-select" value={typeId} onChange={(e) => setTypeId(e.target.value)} aria-label="Default select example">
                            {types.map(type => (
                              <option key={type.typeId} value={type.typeId}>
                                {type.typeName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <label htmlFor="selectGenre" className="col-sm-1 col-form-label"></label>
                        <div className="col-sm-2">
                          <select id="selectGenre" className="form-select" value={genreId} onChange={(e) => setGenreId(e.target.value)} aria-label="Default select example">
                            {genres.map(genre => (
                              <option key={genre.genreId} value={genre.genreId}>
                                {genre.genreName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <label htmlFor="selectStatus" className="col-sm-1 col-form-label"></label>
                        <div className="col-sm-3">
                          <select id="selectStatus" className="form-select" value={statusId} onChange={(e) => setStatusId(e.target.value)} aria-label="Default select example">
                            {statuses.map(status => (
                              <option key={status.statusId} value={status.statusId}>
                                {status.statusName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-10">
                          <input
                            type="hidden"
                            id="inputUserId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="form-control" 
                          />
                        </div>
                      </div>

                      <div className="row mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="inputImage" className="col-sm-1 col-form-label">Ảnh:</label>
                        <div className="col-sm-5">
                          <input
                            type="file"
                            id="inputImage"
                            onChange={handleFileChange}
                            className="form-control"
                          />
                        </div>
                        {storyImg && (
                          <div className="col-sm-6" style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={storyImg}
                              alt="Story"
                              style={{ width: '150px', height: 'auto', marginLeft: '20px' }}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <CKEditor
                          editor={ClassicEditor}
                          data={description}
                          onChange={(event, editor) => {
                            setDescription(editor.getData());
                          }}
                        />
                      </div>
                      <br/>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className="btn btn-success" onClick={handleSave}>Lưu thay đổi</button>
                      </div>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </main>
  );
}

export default EditStory;

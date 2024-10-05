import React, { useState,useEffect } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import { addChapter } from '../../services/ChapterService';
import { getStoryById } from '../../services/StoryService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast, ToastContainer } from 'react-toastify';


const AddChapter = () => {
    const { id } = useParams();
    const [chapter, setChapter] = useState({
        storyId: id,
        chapterNumber: '',
        title: '',
        content: ''
    });
    const [storyTitle, setStoryTitle] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        const fetchStoryTitle = async () => {
            try {
                const response = await getStoryById(id);
                setStoryTitle(response.data.title);
            } catch (error) {
                console.error('Error fetching story title:', error);
            }
        };

        fetchStoryTitle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChapter(prevChapter => ({ ...prevChapter, [name]: value }));
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setChapter(prevChapter => ({ ...prevChapter, content: data }));
    };

    const handleSave = async () => {
        try {
            await addChapter({ ...chapter, storyId: id });
            // const newChapterId = response.data.chapterId; // Giả sử response chứa ID của chương vừa tạo
            setMessage('Chapter added successfully');
            toast.success('Thêm Chương Mới Thành Công');
            setTimeout(() => {
                navigate(`/admin/story/${id}/chapters`); }, 2000);
        } catch (error) {
            console.error('Error adding chapter:', error);
            setMessage('Failed to add chapter');
        }
    };

    return (
        <main id="main" className="main">

            <div className="pagetitle">
                <h1>Thêm Chương Mới</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/liststory">Truyện</Link></li>
                        <li className="breadcrumb-item"><Link to={`/admin/story/${id}/chapters`}>Chương</Link></li>
                        <li className="breadcrumb-item active">Thêm Mới Chương</li>
                    </ol>
                </nav>
            </div>
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Thêm chương mới cho truyện: {storyTitle}</h5>
                            <div>
                                {message && <div className="alert alert-info">{message}</div>}

                                <div className="row mb-3">
                                    
                                    <label htmlFor="title" className="col-sm-1 col-form-label"><strong>Tiêu đề</strong></label>
                                    <div className='col-sm-6'>
                                        <input type="text" id="title" name="title" className="form-control" value={chapter.title} onChange={handleChange} required />
                                    </div>

                                    <label htmlFor="chapterNumber" className="col-sm-2 col-form-label"><strong>Chương số</strong></label>
                                    <div className='col-sm-2'>
                                        <input type="number" id="chapterNumber" name="chapterNumber" className="form-control" value={chapter.chapterNumber} onChange={handleChange} required/>
                                    </div>
                                </div>



                                <div className="mb-3 custom-editor">
                                        <label htmlFor="content" className="form-label">Nội dung</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={chapter.content}
                                            onChange={handleEditorChange}
                                            required
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10px' }}>
                                        <button className="btn btn-primary" onClick={handleSave}>Lưu</button>
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </section>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </main>
        
    );
};

export default AddChapter;

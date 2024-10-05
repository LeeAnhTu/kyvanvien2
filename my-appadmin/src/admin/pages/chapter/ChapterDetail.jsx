import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getChapterDetail, updateChapter } from '../../services/ChapterService';
import { getStoryById } from '../../services/StoryService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChapterDetail = () => {
    const { storyId, chapterId } = useParams();
    const navigate = useNavigate();
    const [storyTitle, setStoryTitle] = useState("");
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChapterDetail = async () => {
            try {
                const response = await getChapterDetail(storyId, chapterId);

                setChapter(response.data);

                const storyResponse = await getStoryById(storyId);
                setStoryTitle(storyResponse.data.title);
            } catch (error) {
                console.error('Error fetching chapter details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChapterDetail();
    }, [storyId, chapterId]);

    const handleTitleChange = (event) => {
        setChapter(prevChapter => ({ ...prevChapter, title: event.target.value }));
    };

    const handleContentChange = (event, editor) => {
        const data = editor.getData();
        setChapter(prevChapter => ({ ...prevChapter, content: data }));
    };

    const handleSave = async () => {
        try {
            await updateChapter(storyId, chapterId, chapter);
            toast.success('Chapter update successfully');
            setTimeout(() => navigate(`/admin/stories/${storyId}/chapters/${chapterId}`), 2000); // Điều hướng sau 2 giây
        } catch (error) {
            console.error('Error updating chapter:', error);
            toast.error('Failed to update chapter');
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!chapter) return <div>Chapter not found.</div>;

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Chapter Details</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/liststory">Truyện</Link></li>
                        <li className="breadcrumb-item"><Link to={`/admin/story/${storyId}/chapters`}>Chương</Link></li>
                        <li className="breadcrumb-item active">Chi tiết chương</li>
                    </ol>
                </nav>
            </div>
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Tên truyện: {storyTitle}</h5>
                                <div>
                                    <div className="row mb-3">
                                        <label htmlFor="chapterTitle" className="col-sm-1 col-form-label"><strong>Tiêu đề:</strong></label>
                                        <div className="col-sm-6">
                                            <input type="text" id="chapterTitle" className="form-control" value={chapter.title} onChange={handleTitleChange} />
                                        </div>
                                        <label htmlFor="chapterNumber" className="col-sm-2 col-form-label"><strong>Chương số:</strong></label>
                                        <div className="col-sm-3">
                                            <input type="number" id="chapterTitle" className="form-control" value={chapter.chapterNumber} onChange={handleTitleChange} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={chapter.content}
                                            onChange={handleContentChange}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10px' }}>
                                        <button className="btn btn-success" onClick={handleSave}>Cập nhật</button>
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

export default ChapterDetail;

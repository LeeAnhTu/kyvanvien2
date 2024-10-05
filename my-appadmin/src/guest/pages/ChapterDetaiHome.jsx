

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link,useNavigate  } from 'react-router-dom';
import { getChaptersBySlugAndChapterNumber, getStoryBySlug, listchapter1 } from '../services/HomeStoryService';
import { saveOrUpdateUserProgress,getUserFollow, followStory, unfollowStory } from '../services/UserService';
import { toast } from "react-toastify";
import { jwtDecode } from 'jwt-decode';
import ChapterModal from '../components/ChapterModal';
import { addView } from '../services/ViewService';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import Comment from '../components/Comment';
import GiftAndRating from '../components/GiftAndRating';


const ChapterDetailHome = () => {
  const { slug, number } = useParams();
  const [chapter, setChapter] = useState(null);
  const [story, setStory] = useState("");
  const [chapters, setChapters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('authToken');
  const userId = token ? jwtDecode(token).userId : null;
  const userName = token ? jwtDecode(token).fullName : null;
  const [isBookmarked, setIsBookmarked] = useState(false);


  const navigate = useNavigate(); // Để điều hướng

  // const location = useLocation();

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await getChaptersBySlugAndChapterNumber(slug, number);
        setChapter(response.data);
        const { chapterId: chapterid } = response.data;

        const storyResponse = await getStoryBySlug(slug);
        setStory(storyResponse.data);

        const { id: storyId } = storyResponse.data;

        const chaptersResponse = await listchapter1(slug);
        setChapters(chaptersResponse.data);
       

        if (userId) {
          await saveOrUpdateUserProgress(userId, slug, number);

          
          const followResponse = await getUserFollow(userId, storyId, chapterid);
          setIsBookmarked(followResponse.data);
        }
      } catch (error) {
        console.error('Error fetching chapter details:', error);
      }
    };

    fetchChapter();

    document.documentElement.scrollTop = 0;
  }, [slug, number,userId]);


  const handleBookmarkClick = async () => {
    if (userId && chapter) {
        try {
            if (isBookmarked) {
                await unfollowStory(userId, story.id,chapter.chapterId);
                setIsBookmarked(false);
            } else {
                await followStory(userId, story.id,chapter.chapterId);
                setIsBookmarked(true);
            }
        } catch (error) {
            console.error('Error updating bookmark:', error);
        }
    }else{
      toast.error("Bạn phải đăng nhập để sử dụng tính năng này!");
    }
  };


  const handleChangeChapter = useCallback(async (newChapterNumber) => {
  
    if (token) {
      const userId = jwtDecode(token).userId;
      await saveOrUpdateUserProgress(userId, slug, newChapterNumber);
    }
    await addView(story.id);
  
    navigate(`/truyen/${slug}/chuong/${newChapterNumber}`, { replace: true });
  }, [token, slug, navigate, story.id]);
  
  useEffect(() => {
    const handleKeydown = (event) => {
      const currentChapter = parseInt(number);
      const totalChapters = chapters.length;

      switch (event.key) {
        case 'ArrowLeft':
          if (currentChapter > 1) {
            handleChangeChapter(currentChapter - 1);
          }
          break;
        case 'ArrowRight':
          if (currentChapter < totalChapters) {
            handleChangeChapter(currentChapter + 1);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [number, chapters.length,handleChangeChapter]);


  if (!chapter) {
    return <p>Loading...</p>;
  }

  const currentChapterNumber = parseInt(number);
  const totalChapters = chapters.length; // Tổng số chương
  const isFirstChapter = currentChapterNumber === 1;
  const isLastChapter = currentChapterNumber === totalChapters; 

  return (
    <main className='main-sub' style={{ backgroundColor: ' rgb(234, 228, 211)',marginBottom:'-35px' }}>
      <div className="chapter-wrapper container">
          <div className="text-decoration-none ">
          <h1 className="text-center " style={{ paddingTop: '40px' }}>
            <Link to={`/truyen/${slug}`} className="">
              <span className='text-success'>{story.title}</span>
            </Link>
          </h1>
          </div>
        
        <div className="text-decoration-none">
          <p className="text-center text-dark">{chapter.title}</p>
        </div>
        <hr className="chapter-start container-fluid" />

        <div className="chapter-nav text-center">
          <div className="chapter-actions chapter-actions-origin d-flex align-items-center justify-content-center">
            <Link
              className={`btn btn-success me-1 chapter-prev ${isFirstChapter ? 'disabled' : ''}`}
              to={isFirstChapter ? '#' : `/truyen/${slug}/chuong/${parseInt(number) - 1}`}
              title="Chương trước"
              onClick={(e) => {
                if (isFirstChapter) {
                  e.preventDefault();
                } else {
                  handleChangeChapter(currentChapterNumber - 1);
                }
              }} // Ngăn chặn hành động click nếu là chương đầu tiên
            >
              <span>Chương trước</span>
            </Link>

            <button className="btn btn-success chapter_jump me-1" onClick={() =>{console.log("Button clicked"); setIsModalOpen(true)}}>
              <span>
                <svg style={{ fill: '#fff' }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32-14.3 32 32z">
                  </path>
                </svg>
              </span>
            </button> 
            
            <button
                className='btn btn-success'
                onClick={handleBookmarkClick}
            >
                <i className={isBookmarked ? "fa-regular fa-circle-check" : "fa-regular fa-bookmark"}></i>
                {isBookmarked ? '' : ''}
            </button>
            &nbsp;
            <Link
              className={`btn btn-success chapter-next ${isLastChapter ? 'disabled' : ''}`}
              to={isLastChapter ? '#' : `/truyen/${slug}/chuong/${currentChapterNumber + 1}`}
              title="Chương tiếp"
              onClick={(e) => {
                if (isLastChapter) {
                  e.preventDefault();
                } else {
                  handleChangeChapter(currentChapterNumber + 1);
                }
              }} // Ngăn chặn hành động click nếu là chương cuối cùng
            >
              <span>Chương tiếp</span>
            </Link>
          </div>
        </div>
        <hr className="chapter-end container-fluid" />

        <div className="chapter-content mb-3" style={{ marginTop: '30px',paddingBottom:'20px' }} dangerouslySetInnerHTML={{ __html: chapter.content }}>
        </div>

        <GiftAndRating
          isFirstChapter={isFirstChapter}
          isLastChapter={isLastChapter}
          currentChapterNumber={currentChapterNumber}
          slug={slug}
          userId={userId}
          storyId={chapter.storyId}
        
        />
        <Comment
        userId={userId}
        storyId={chapter.storyId}
        chapterId={chapter.chapterId}
        userName={userName}
      />
      </div>
      

      <ChapterModal chapters={chapters} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} storyId={story.id} />
    </main>
  )
}

export default ChapterDetailHome;


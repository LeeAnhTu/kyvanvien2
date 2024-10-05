

import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { saveOrUpdateUserProgress } from '../services/UserService'; // Thêm import này
import { addView } from '../services/ViewService';
import { jwtDecode } from 'jwt-decode';

const ChapterModal = ({ chapters, isOpen, onClose,storyId }) => {
  const modalRef = useRef(null); 
  const { slug } = useParams();
  const token = localStorage.getItem('authToken'); // Lấy token từ localStorage 

  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleChapterSelect = async (chapterNumber) => {
    if (token) {
      const userId = jwtDecode(token).userId;
      await saveOrUpdateUserProgress(userId, slug, chapterNumber);
    }
    await addView(storyId);
    onClose(); // Đóng modal sau khi chọn chương
  };

  if (!isOpen) return null;

  return (
    <div className="modal1" onClick={onClose}>
      <div className="modal-content1" onClick={(e) => e.stopPropagation()} ref={modalRef} tabIndex="-1">
        <button className="btn btn-danger close-modal" onClick={onClose}>
          X
        </button>
        <h2 style={{ color: 'white' }}>Danh sách chương</h2>
        <ul className="chapter-list">
          {chapters.map((chapter) => (
            <li key={chapter.chapterNumber}>
              <Link className='a' to={`/truyen/${slug}/chuong/${chapter.chapterNumber}`} onClick={() => handleChapterSelect(chapter.chapterNumber)}>
                {chapter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChapterModal;

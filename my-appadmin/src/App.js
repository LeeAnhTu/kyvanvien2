
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute'; // Import PrivateRoute
import Dashboard from './admin/pages/Dashboard';
import Profile from './admin/pages/Profile';
import Story from './admin/pages/story/Story';
import StoryDetail from './admin/pages/story/StoryDetail';
import EditStory from './admin/pages/story/EditStory';
import ChapterList from './admin/pages/story/ChapterList';
import AddStory from './admin/pages/story/AddStory';
import ChapterDetail from './admin/pages/chapter/ChapterDetail';
import AddChapter from './admin/pages/chapter/AddChapter';
import Login from './admin/components/Login';
import { Listgenre } from './admin/pages/genre/Listgenre';
import AdminLayout from './AdminLayout';
import NoHeaderLayout from './NoHeaderLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from './redux/actions/userAction';
import Home from './guest/pages/Home';
import StoryDetailHome from './guest/pages/StoryDetail';
import ChapterDetailHome from './guest/pages/ChapterDetaiHome';
// import NapTien from './guest/pages/Naptien';
import BookCase from './guest/pages/BookCase';
import Account from './guest/pages/AccountPage';
import Filter from './guest/pages/Filter';
import ProfileUser from './guest/pages/ProfilePage';
import AddStoryUser from './guest/pages/addstory/AddStoryUser';
import ListStoryUser from './guest/pages/addstory/ListStoryUser';
import EditStoryUser from './guest/pages/addstory/EditStoryUser';
import ListChapterUser from './guest/pages/addstory/ListChapterUser';
import ChapterDeatailUser from './guest/pages/addstory/ChapterDeatailUser';
import AddChapterUser from './guest/pages/addstory/AddChapterUser';
import HistoryPage from './guest/pages/HistoryPage';
import ListUser from './admin/pages/user/Listuser';
import Comment from './admin/pages/Comment';
import HistoryGift from './admin/pages/transaction/HistoryGift';
import HistoryRecharge from './admin/pages/transaction/HistoryRecharge';
import CheckStory from './admin/pages/CheckStory';
import GiftRequest from './admin/pages/giftrequest/GiftRequest';
import GiftExchange from './guest/pages/GiftExchange';
import NotFound from './guest/pages/NotFound';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const account = useSelector(state => state.user.account);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      dispatch(handleRefresh());
    }
  }, [dispatch]);

  

  

  return (
    <div className="App">
      {location.pathname.startsWith('/admin') && account.auth === false && <Navigate to="/admin/login" replace />}
      {location.pathname.startsWith('/admin') ? (
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            {/* Admin Routes */}
            <Route path='' element={<ProtectedRoute roles={['ADMIN']}><Dashboard /></ProtectedRoute>} />
            <Route path='profile' element={<ProtectedRoute roles={['ADMIN']}><Profile /></ProtectedRoute>} />
            <Route path='listuser' element={<ProtectedRoute roles={['ADMIN']}><ListUser /></ProtectedRoute>} />
            <Route path='comments' element={<ProtectedRoute roles={['ADMIN']}><Comment /></ProtectedRoute>} />
            <Route path='liststory' element={<ProtectedRoute roles={['ADMIN']}><Story /></ProtectedRoute>} />
            <Route path='listgenre' element={<ProtectedRoute roles={['ADMIN']}><Listgenre /></ProtectedRoute>} />
            <Route path='check' element={<ProtectedRoute roles={['ADMIN']}><CheckStory /></ProtectedRoute>} />
            <Route path='giftrequest' element={<ProtectedRoute roles={['ADMIN']}><GiftRequest /></ProtectedRoute>} />
            <Route path='historygift' element={<ProtectedRoute roles={['ADMIN']}><HistoryGift /></ProtectedRoute>} />
            <Route path='historyrecharge' element={<ProtectedRoute roles={['ADMIN']}><HistoryRecharge /></ProtectedRoute>} />
            <Route path='story/:id' element={<ProtectedRoute roles={['ADMIN']}><StoryDetail /></ProtectedRoute>} />
            <Route path='story/edit/:id' element={<ProtectedRoute roles={['ADMIN']}><EditStory /></ProtectedRoute>} />
            <Route path='story/:id/chapters' element={<ProtectedRoute roles={['ADMIN']}><ChapterList /></ProtectedRoute>} />
            <Route path='addstory' element={<ProtectedRoute roles={['ADMIN']}><AddStory /></ProtectedRoute>} />
            <Route path="stories/:storyId/chapters/:chapterId" element={<ProtectedRoute roles={['ADMIN']}><ChapterDetail /></ProtectedRoute>} />
            <Route path='story/:id/addchapter' element={<ProtectedRoute roles={['ADMIN']}><AddChapter /></ProtectedRoute>} />
            {/* Route catch-all */}
            <Route path="/admin/*" element={<Dashboard />} />
          </Route>
        </Routes>
      ) : (
        <NoHeaderLayout>
          <Routes>            
            <Route path='/' element={<Home />} />
            <Route path="/truyen/:slug" element={<StoryDetailHome/>} />
            <Route path="/truyen/:slug/chuong/:number" element={<ChapterDetailHome />} />
            <Route path="/truyen/danh-sach" element={<Filter />} />
            <Route path="/tai-khoan/ho-so" element={<PrivateRoute><ProfileUser/></PrivateRoute>} />
            <Route path="/tai-khoan/doi-qua" element={<PrivateRoute><GiftExchange/></PrivateRoute>} />
            <Route path="/tai-khoan/tu-truyen" element={<PrivateRoute><BookCase/></PrivateRoute>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/tai-khoan/lich-su-giao-dich" element={<PrivateRoute><HistoryPage/></PrivateRoute>} />
            <Route path="/dang-truyen/them-truyen" element={<PrivateRoute><AddStoryUser/></PrivateRoute>} />
            <Route path="/dang-truyen/danh-sach-truyen" element={<PrivateRoute><ListStoryUser/></PrivateRoute>} />
            <Route path="/dang-truyen/sua-truyen/:id" element={<PrivateRoute><EditStoryUser/></PrivateRoute>} />
            <Route path="/dang-truyen/sua-truyen/danh-sach-chuong/:id" element={<PrivateRoute><ListChapterUser/></PrivateRoute>} />
            <Route path="/dang-truyen/them-chuong/:id" element={<PrivateRoute><AddChapterUser/></PrivateRoute>} />
            <Route path="/dang-truyen/sua-truyen/truyen/:storyId/chuong/:chapterId" element={<PrivateRoute><ChapterDeatailUser/></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NoHeaderLayout>
      )}
    </div>
  );
};

export default App;

import { Routes, Route } from 'react-router-dom';
import './scss/index.scss';
import RegistrPage from './pages/RegistrPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';
import PostPage from './pages/PostPage';
import NewPostPage from './pages/NewPostPage';
import { useEffect } from 'react';
import { getMe } from './redux/features/auth/authSlice';
import { useAppDispatch } from './redux/hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/registration" element={<RegistrPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/new" element={<NewPostPage />} />
      </Routes>
      <ToastContainer style={{ color: 'red' }} />
    </Layout>
  );
};

export default App;

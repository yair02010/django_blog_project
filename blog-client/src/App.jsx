// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewArticle from './pages/NewArticle';
import AdminArticles from './pages/AdminArticles';
import EditArticle from './pages/EditArticle';
import ArticleDetails from './pages/ArticleDetails';
import Header from './components/Header';

const App = () => {
  const token = localStorage.getItem('access');
  const isAdmin = localStorage.getItem('isStaff') === 'true';

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/new"
          element={token ? <NewArticle /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/articles"
          element={token && isAdmin ? <AdminArticles /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/articles/:id/edit"
          element={token && isAdmin ? <EditArticle /> : <Navigate to="/login" />}
        />
        <Route path="/articles/:id" element={<ArticleDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
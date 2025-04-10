    // src/services/api.js

    import axios from 'axios';

    const BASE_URL = 'http://localhost:8000/api/';

    const api = axios.create({
    baseURL: BASE_URL,
    });

    export const registerUser = (userData) => api.post('register/', userData);
    export const loginUser = (credentials) => api.post('token/', credentials);
    export const fetchArticles = () => api.get('articles/');
    export const fetchComments = (articleId) => api.get(`articles/${articleId}/comments/`);
    export const postComment = (data, token) =>
    api.post('comments/', data, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    export const createArticle = (data, token) =>
    api.post('articles/', data, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    export const updateArticle = (id, data, token) =>
    api.put(`articles/${id}/`, data, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    export const deleteArticle = (id, token) =>
    api.delete(`articles/${id}/`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    export const fetchArticleById = (id) => api.get(`articles/${id}/`);

    export const updateComment = (id, data, token) =>
    api.put(`comments/${id}/`, data, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    export const deleteComment = (id, token) =>
    api.delete(`comments/${id}/`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    export default api;

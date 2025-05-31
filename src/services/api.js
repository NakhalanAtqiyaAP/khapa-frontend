// src/services/api.js
import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data.message || 'Something went wrong!',
        footer: `Status: ${status}`,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Please check your internet connection',
      });
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const response = await api.post('/api/login', credentials);
    
    // Store token and user data in localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return {
      success: true,
      user: response.data.user,
      token: response.data.token
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
export const authApi = {
  // Goals
  getGoals: () => api.get('/auth/goals'),
  createGoal: (goal) => api.post('/auth/goals', goal),
  updateGoal: (id, goal) => api.put(`/auth/goals/${id}`, goal),
  deleteGoal: (id) => api.delete(`/auth/goals/${id}`),

  // Articles
  getArticles: () => api.get('/auth/articles'),
  getArticle: (id) => {
    if (!id) {
      console.warn('getArticle dipanggil dengan id undefined/null');
    }
    return api.get(`/auth/articles/${id}`);
  },
  
  createArticle: (article) => api.post('/auth/articles', article),
  updateArticle: (id, article) => api.put(`/auth/articles/${id}`, article),
  deleteArticle: (id) => api.delete(`/auth/articles/${id}`),

  // Gallery
  getGalleries: () => api.get('/auth/gallery'),
  createGallery: (formData) => api.post('/auth/gallery', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}),
  deleteGallery: (id) => api.delete(`/auth/gallery/${id}`),
  
  // Comments
  getComments: (articleId) => api.get(`/auth/articles/${articleId}/comments`),
  addComment: (articleId, comment) => api.post(`/auth/articles/${articleId}/comments`, comment),
  deleteComment: (articleId, commentId) => api.delete(`/auth/articles/${articleId}/comments/${commentId}`),
};

export default api;
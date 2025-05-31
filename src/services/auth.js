// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8080',
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const { status, data } = error.response;
//       console.error(`API Error: ${status} - ${data.message || 'Something went wrong'}`);
//     } else {
//       console.error('Network Error: Please check your internet connection');
//     }
//     return Promise.reject(error);
//   }
// );

// export const login = async (credentials) => {
//   try {
//     const response = await api.post('/api/login', credentials);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const authApi = {
//   // Goals
//   getGoals: () => api.get('/auth/goals'),
//   createGoal: (goal) => api.post('/auth/goals', goal),
//   updateGoal: (id, goal) => api.put(`/auth/goals/${id}`, goal),
//   deleteGoal: (id) => api.delete(`/auth/goals/${id}`),

//   // Articles
//   getArticles: () => api.get('/auth/articles'),
//   getArticle: (id) => api.get(`/auth/articles/${id}`),
//   createArticle: (article) => api.post('/auth/articles', article),
//   updateArticle: (id, article) => api.put(`/auth/articles/${id}`, article),
//   deleteArticle: (id) => api.delete(`/auth/articles/${id}`),

//   // Gallery
//   getGalleryItems: () => api.get('/auth/gallery'),
//   uploadImage: (formData) => api.post('/auth/gallery', formData),
//   deleteImage: (id) => api.delete(`/auth/gallery/${id}`),

//   // Comments
//   getComments: (articleId) => api.get(`/auth/articles/${articleId}/comments`),
//   addComment: (articleId, comment) => api.post(`/auth/articles/${articleId}/comments`, comment),
//   deleteComment: (articleId, commentId) => api.delete(`/auth/articles/${articleId}/comments/${commentId}`),
// };

// export default api;
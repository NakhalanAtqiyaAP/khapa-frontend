import React, { useState, useEffect } from 'react';
import { authApi } from '../services/api';
import ArticleCard from '../components/ArticleCard';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ArticlesPage = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newArticle, setNewArticle] = useState({
    judul: '',
    text: '',
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.getArticles();
      setArticles(response.data?.data || []);
      setLoading(false);
    } catch (error) {
      setError('Failed to load articles');
      setLoading(false);
      setArticles([]); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({
      ...newArticle,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newArticle.judul.trim() || !newArticle.text.trim()) return;

    try {
      const response = await authApi.createArticle(newArticle);
      setArticles(prev => [response.data, ...(prev || [])]);
      setNewArticle({ judul: '', text: '' });
    } catch (error) {
      setError('Failed to create article');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await authApi.deleteArticle(id);
      setArticles(prev => (prev || []).filter(article => article._id !== id));
    } catch (error) {
      setError('Failed to delete article');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Retro Articles</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {user && (
        <div className="win-card mb-4">
        <div className="p-2">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="judul"
                value={newArticle.judul}
                onChange={handleInputChange}
                placeholder="Enter article title"
                className="win-input w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Content</label>
              <textarea
                rows={4}
                name="text"
                value={newArticle.text}
                onChange={handleInputChange}
                placeholder="Enter article content"
                className="win-input w-full"
                required
              />
            </div>
            <button 
              type="submit" 
              className="win-button"
            >
              Create Article
            </button>
          </form>
        </div>
      </div>
      )}
      
      {loading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-6">
          {articles?.length ? (
            articles.map((article) => (
              <ArticleCard 
                key={article._id}
                article={article} 
                onDelete={handleDelete} 
                deletable={!!user}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No articles found</p>
              {!user && (
                <p className="text-sm text-gray-400 mt-2">
                  Log in to create the first article
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
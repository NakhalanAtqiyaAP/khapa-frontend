import React, { useState, useEffect } from 'react';
import { authApi } from '../services/api';
import ArticleCard from '../components/ArticleCard';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await authApi.getArticles();
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    if (!newArticle.title.trim() || !newArticle.content.trim()) return;

    try {
      const response = await authApi.createArticle(newArticle);
      setArticles([response.data, ...articles]);
      setNewArticle({ title: '', content: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await authApi.deleteArticle(id);
      setArticles(articles.filter(article => article._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Retro Articles</h1>
      
      {user && (
        <div className="win-card mb-4">
          <div className="p-2">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newArticle.title}
                  onChange={handleInputChange}
                  placeholder="Enter article title"
                  className="win-input w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Content</label>
                <textarea
                  rows={3}
                  name="content"
                  value={newArticle.content}
                  onChange={handleInputChange}
                  placeholder="Enter article content"
                  className="win-input w-full"
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
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleCard 
              key={article._id}
              article={article} 
              onDelete={handleDelete} 
              deletable={!!user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
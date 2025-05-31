import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import CommentList from '../components/CommentList';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      fetchArticle();
      fetchComments();
    }
  }, [id]);
  

  const fetchArticle = async () => {
    try {
      const response = await authApi.getArticle(id);
      setArticle(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate('/articles');
    }
  };

  const fetchComments = async () => {
    try {
      const response = await authApi.getComments(id);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await authApi.addComment(id, { text: newComment });
      setComments([response.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await authApi.deleteComment(id, commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleArticleDelete = async () => {
    try {
      await authApi.deleteArticle(id);
      navigate('/articles');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!article) {
    return (
      <div className="win-card p-4">
        <p>Article not found</p>
      </div>
    );
  }

  return (
    <div>
      <button 
        onClick={() => navigate(-1)} 
        className="win-button mb-3"
      >
        Back to Articles
      </button>
      
      <div className="win-card mb-4">
        <div className="p-2">
          <h2 className="text-xl font-bold">{article.judul}</h2>
          <div className="text-sm text-win-dark-gray mb-3">
            Posted on {new Date(article.created_at).toLocaleDateString()}
          </div>
          <div className="whitespace-pre-line mb-3">{article.text}</div>
          
          {user && (
            <button 
              onClick={handleArticleDelete}
              className="win-button"
            >
              Delete Article
            </button>
          )}
        </div>
      </div>
      
      <section className="mb-5">
        <h3 className="text-lg mb-3">Comments</h3>
        
        {user && (
          <div className="win-card mb-3">
            <div className="p-2">
              <form onSubmit={handleCommentSubmit}>
                <div className="mb-2">
                  <label className="block mb-1">Add Comment</label>
                  <textarea
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    className="win-input w-full"
                  />
                </div>
                <button 
                  type="submit" 
                  className="win-button"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        )}
        
        <CommentList 
          comments={comments} 
          onDelete={handleCommentDelete} 
          deletable={!!user}
        />
      </section>
    </div>
  );
};

export default ArticleDetailPage;
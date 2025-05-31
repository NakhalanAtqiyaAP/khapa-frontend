import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article, onDelete, deletable }) => {
  return (
    <div className="win-card">
      <div className="p-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <Link 
              to={`/articles/${article.id}`} 
              className="text-win-blue hover:underline font-bold"
            >
              {article.judul}
            </Link>
            <div className="text-xs text-win-dark-gray my-1">
              {new Date(article.created_at).toLocaleDateString()}
            </div>
            <div className="line-clamp-2">{article.text}</div>
          </div>
          {deletable && (
            <button 
              onClick={() => onDelete(article._id)}
              className="win-button text-xs"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
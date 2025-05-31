import React from 'react';

const Comment = ({ comment, onDelete, deletable }) => {
  return (
    <div className="win-border p-2 mb-2 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-bold">{comment.author || 'Anonymous'}</div>
          <div className="text-xs text-win-dark-gray mb-1">
            {new Date(comment.created_at).toLocaleString()}
          </div>
          <div className="whitespace-pre-line">{comment.text}</div>
        </div>
        {deletable && (
          <button 
            onClick={() => onDelete(comment.id)}
            className="win-button text-xs"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onDelete, deletable }) => {
  if (!Array.isArray(comments)) {
    console.warn("Invalid comments data:", comments); 
    return (
      <div className="win-border p-2 bg-white text-center text-win-dark-gray">
        No comments yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {comments.length === 0 ? (
        <div className="win-border p-2 bg-white text-center text-win-dark-gray">
          No comments yet
        </div>
      ) : (
        comments.map(comment => (
          <Comment 
            key={comment._id || comment.id} 
            comment={comment} 
            onDelete={onDelete} 
            deletable={deletable}
          />
        ))
      )}
    </div>
  );
};


export default CommentList;
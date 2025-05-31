import React, { useState } from 'react';

const GoalCard = ({ goal, onUpdate, onDelete, editable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({
    text: '',
    date: ''
  });

  const handleUpdate = () => {
    onUpdate(goal._id, editedGoal);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="win-card">
      <div className="p-2">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="date"
              name="date"
              value={editedGoal.date}
              onChange={handleInputChange}
              className="win-input w-full mb-2"
            />
            <input
              type="text"
              name="text"
              value={editedGoal.text}
              onChange={handleInputChange}
              className="win-input w-full"
            />
            <div className="flex space-x-2">
              <button onClick={handleUpdate} className="win-button">
                Save
              </button>
              <button 
                onClick={() => setIsEditing(false)} 
                className="win-button"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs text-win-dark-gray mb-1">
              {new Date(goal.date).toLocaleDateString()}
            </div>
            <div className="flex justify-between items-start">
              <div className="flex-1">{goal.text}</div>
              {editable && (
                <div className="flex space-x-1">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="win-button text-xs"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(goal._id)}
                    className="win-button text-xs"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalCard;
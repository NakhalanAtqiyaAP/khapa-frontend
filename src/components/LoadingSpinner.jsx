import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-8 h-8 border-4 border-win-blue border-t-win-gray animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
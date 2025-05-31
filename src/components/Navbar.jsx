import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, loading, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  if (loading) {
    return null;
  }

  return (
    <div className="win-card mb-4">
      <div className="win-title-bar">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-win-gray border-t-win-white border-l-win-white border-r-win-black border-b-win-black border-2 mr-1"></div>
          <span className="font-bold">KhapaSite</span>
        </div>
        <div className="flex">
          {user ? (
            <>
              <span className="px-2">Selamat datang, {user.username}!</span>
              <button 
                onClick={handleLogoutClick}
                className="win-button ml-1"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="win-button">
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="p-2 flex space-x-2">
        <Link to="/home" className="win-button">Home</Link>
        <Link to="/gallery" className="win-button">Gallery</Link>
        <Link to="/articles" className="win-button">Articles</Link>
      </div>
    </div>
  );
};

export default Navbar;
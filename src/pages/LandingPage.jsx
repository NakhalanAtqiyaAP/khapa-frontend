// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-win-gray flex flex-col items-center justify-center p-4">
      {/* Main Window */}
      <div className="window shadow-win-outset w-full max-w-4xl">
        {/* Title Bar */}
        <div className="win-title-bar bg-win-blue text-white px-2 py-1 flex justify-between items-center">
          <div className="flex items-center">
            <div className="win-icon mr-2">💻</div>
            <span className="font-bold">Welcome to RetroSite</span>
          </div>
          <div className="flex">
            <div className="win-button w-5 h-5 flex items-center justify-center mx-1">-</div>
            <div className="win-button w-5 h-5 flex items-center justify-center mx-1">□</div>
            <div className="win-button w-5 h-5 flex items-center justify-center mx-1">✕</div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="win-content bg-white p-4">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Graphic */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
              <div className="win-banner bg-win-light-blue p-8 text-center border-2 border-win-black">
                <div className="text-5xl mb-4">🖥️</div>
                <h1 className="text-2xl font-bold mb-2">RetroSite 95</h1>
                <p className="mb-4">Your nostalgic web experience</p>
              </div>
            </div>
            
            {/* Right Side - Content */}
            <div className="w-full md:w-1/2 p-4">
              <div className="win-panel bg-win-gray p-4 border-2 border-win-white border-r-win-black border-b-win-black">
                <h2 className="text-xl font-bold mb-4">Welcome</h2>
                <p className="mb-4">
                  Experience the nostalgia of Windows 95 with our retro-themed website. 
                  Browse articles, view galleries, and manage your goals in classic style.
                </p>
                
                <div className="win-group-box p-3 mb-4">
                  <div className="win-group-title bg-win-gray px-2 -mt-4 mb-2 w-auto inline-block">
                    Features
                  </div>
                  <ul className="list-disc pl-5">
                    <li className="mb-1">Windows 95 authentic interface</li>
                    <li className="mb-1">Article management system</li>
                    <li className="mb-1">Photo gallery</li>
                    <li className="mb-1">Goal tracking</li>
                  </ul>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Link 
                    to="/login" 
                    className="win-button px-6 py-2 text-center"
                  >
                    Click Here to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="win-status-bar bg-win-gray mt-4 p-2 border-t-win-black border-l-win-black border-r-win-white border-b-win-white flex justify-between">
            <div>RetroSite v1.0</div>
            <div>© 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import GalleryPage from './pages/Gallery';
import ArticlesPage from './pages/Articles';
import ArticleDetailPage from './pages/ArticleDetail';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-win-gray">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={
              <>
                <Navbar />
                <div className="container mx-auto px-4 py-4">
                  <HomePage />
                </div>
              </>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/gallery" element={
              <>
                <Navbar />
                <div className="container mx-auto px-4 py-4">
                  <GalleryPage />
                </div>
              </>
            } />
            <Route path="/articles" element={
              <>
                <Navbar />
                <div className="container mx-auto px-4 py-4">
                  <ArticlesPage />
                </div>
              </>
            } />
            <Route path="/articles/:id" element={
              <>
                <Navbar />
                <div className="container mx-auto px-4 py-4">
                  <ArticleDetailPage />
                </div>
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
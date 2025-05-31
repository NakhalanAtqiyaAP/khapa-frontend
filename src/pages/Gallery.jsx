import React, { useState, useEffect } from 'react';
import { authApi } from '../services/api';
import GalleryItem from '../components/GalleryItem';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await authApi.getGalleries();
      // Safely handle the response data
      const items = Array.isArray(response?.data?.data) 
        ? response.data.data.map(item => ({
            id: item.id || '',
            text: item.text || '',
            img: item.img || '',
            user_id: item.user_id || '',
            // Add any other required fields with fallbacks
          }))
        : [];
      setGalleryItems(items);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setError('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!selectedFile) {
      setError('Please select an image');
      return;
    }
    if (!text) {
      setError('Please enter a description');
      return;
    }
    if (!user?.id) {
      setError('You must be logged in to upload');
      return;
    }
  
    const formData = new FormData();
    formData.append('gallery', selectedFile); 
    formData.append('text', text);
    formData.append('user_id', user.id);
  
    try {
      const response = await authApi.createGallery(formData);
      
      if (response?.data?.success) {
        const newItem = {
          id: response.data.data?.id || Date.now().toString(),
          text: response.data.data?.text || text,
          gallery: response.data.data?.gallery || URL.createObjectURL(selectedFile),
          user_id: user.id
        };
        setGalleryItems(prevItems => [...prevItems, newItem]);
        setSelectedFile(null);
        setText('');
      } else {
        setError(response?.data?.msg || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error.response?.data?.msg || 'Failed to upload image');
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await authApi.deleteGallery(id);
      if (response?.data?.success) {
        setGalleryItems(prevItems => prevItems.filter(item => item.id !== id));
      } else {
        setError(response?.data?.msg || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setError(error.response?.data?.msg || 'Failed to delete image');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Retro Gallery</h1>
      
      {error && (
        <div className="win-card mb-4 bg-red-100 text-red-800 p-2">
          {error}
        </div>
      )}
      
      {user && (
        <div className="win-card mb-4">
          <div className="p-2">
            <form onSubmit={handleUpload}>
              <div className="mb-2">
                <label className="block mb-1">Upload New Image</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="win-input w-full"
                  />
                  <input
                    type="text"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Enter description"
                    className="win-input w-full"
                    required
                  />
                  {preview && (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-full h-48 object-contain bg-white p-1 win-border"
                    />
                  )}
                  <button 
                    type="submit" 
                    disabled={!selectedFile || !text}
                    className="win-button"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {loading ? (
        <LoadingSpinner />
      ) : galleryItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <GalleryItem 
              key={item.id}
              item={item} 
              onDelete={handleDelete} 
              deletable={!!user && user.id === item?.user_id}
            />
          ))}
        </div>
      ) : (
        <div className="win-card p-4 text-center">
          No gallery items found
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
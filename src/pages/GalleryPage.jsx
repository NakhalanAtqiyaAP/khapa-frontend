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
      const response = await authApi.getGalleryItems();
      setGalleryItems(response.data);
      setLoading(false);
    } catch (error) {
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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await authApi.uploadImage(formData);
      setGalleryItems([...galleryItems, response.data]);
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await authApi.deleteImage(id);
      setGalleryItems(galleryItems.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Retro Gallery</h1>
      
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
                  {preview && (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-full h-48 object-contain bg-white p-1 win-border"
                    />
                  )}
                  <button 
                    type="submit" 
                    disabled={!selectedFile}
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <GalleryItem 
              key={item._id}
              item={item} 
              onDelete={handleDelete} 
              deletable={!!user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
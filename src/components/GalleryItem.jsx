import React from 'react';
import Swal from 'sweetalert2';

const GalleryItem = ({ item, onDelete, deletable }) => {
  const backendUrl = 'http://localhost:8080'; 
  const imageUrl = `${backendUrl}/uploads/gallery/${item.img}`;

  const handleDelete = () => {
    Swal.fire({
      title: 'Kamu yakin?',
      text: 'Menghapus gambar ini akan menghilang secara permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batalkan',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(item.id)
          .then(() => {
            Swal.fire('Terhapus!', 'Gambar telah terhapus.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', error?.message || 'Gagal menghapus gambar', 'error');
          });
      }
    });
  };

  return (
    <div className="win-card">
      <div className="p-1">
        <img 
          src={imageUrl}
          alt={item.text || 'Gallery item'} 
          className="w-full h-48 object-cover"
        />
        <div className="mt-1 flex justify-between items-center">
          <span className="text-sm truncate">{item.text || 'Untitled'}</span>
          {deletable && (
            <button 
              onClick={handleDelete}
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

export default GalleryItem;

// src/UploadModal.js
import React from 'react';
import './UploadModal.css'; // Separate CSS file for the modal

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onUpload(file);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Upload Document</h2>
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
        />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadModal;

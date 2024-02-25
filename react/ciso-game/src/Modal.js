import React from 'react';
import './Modal.css';

function Modal({ onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {children}
          <span className="close" onClick={onClose}>&times;</span>
        </div>
      </div>
    </div>
  );
}

export default Modal;
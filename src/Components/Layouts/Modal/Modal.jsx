import React from 'react';
import './Modal.css';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-popup">
        <h2>{title}</h2>
        <div className="modal-body">{children}</div>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
        <button className='carrito-button'>
            Añadir Al Carrito
        </button>
      </div>
    </div>
  );
};

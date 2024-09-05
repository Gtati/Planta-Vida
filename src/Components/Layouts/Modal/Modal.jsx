import React from 'react';
import './Modal.css';
import { FaXmark } from "react-icons/fa6";

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-popup">
        <h2>{title}</h2>
        <FaXmark onClick={onClose} className='close-mark'/> 
        <div className="modal-body">{children}</div>
        <button className='carrito-button'>
            Añadir Al Carrito
        </button>
      </div>
  </div>
);
};

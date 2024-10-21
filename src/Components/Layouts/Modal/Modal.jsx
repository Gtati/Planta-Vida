import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext/CartContext'; // Importamos el contexto del carrito
import './Modal.css';
import { FaXmark } from "react-icons/fa6";

export const Modal = ({ isOpen, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [closing, setClosing] = useState(false);
  const { addToCart } = useCart(); // Usamos el contexto

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.classList.add('modal-open');
    } else if (!isOpen && isVisible) {
      setClosing(true);
      setTimeout(() => {
        setIsVisible(false);
        setClosing(false);
        document.body.classList.remove('modal-open');
        onClose();
      }, 300);
    }
  }, [isOpen, isVisible, onClose]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setClosing(false);
      document.body.classList.remove('modal-open');
      onClose();
    }, 300);
  };

  return isVisible ? (
    <div className={`modal-overlay ${isOpen && !closing ? 'show' : ''}`}>
      <div className={`modal-popup ${closing ? 'fade-out' : ''}`}>
        <h2>{title}</h2>
        <FaXmark onClick={handleClose} className="close-mark" />
        <div className="modal-body">{children}</div>
        <button className="carrito-button" onClick={addToCart}>
          Añadir Al Carrito
        </button>
      </div>
    </div>
  ) : null;
};

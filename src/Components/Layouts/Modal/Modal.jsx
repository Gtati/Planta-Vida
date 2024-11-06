import React, { useState, useEffect, useContext } from 'react';
import { useCart } from '../CartContext/CartContext'; // Importamos el contexto del carrito
import { BonoContext } from '../../Layouts/BonoContext/BonoContext'; // Importamos el BonoContext
import { useNavigate } from 'react-router-dom'; // Importamos el hook de navegación
import './Modal.css';
import { FaXmark } from "react-icons/fa6";

export const Modal = ({ isOpen, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [closing, setClosing] = useState(false);
  const { addToCart } = useCart(); // Usamos el contexto del carrito
  const { setSelectedBono } = useContext(BonoContext); // Usamos el contexto del bono
  const navigate = useNavigate(); // Usamos el hook de navegación

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

  // Manejar cuando el usuario hace clic en "Añadir Al Carrito"
  const handleAddToCart = () => {
    setSelectedBono(title); // Establece el bono seleccionado en el contexto de Bono
    addToCart(); // Añadir el bono al carrito usando el contexto del carrito
    navigate('/shopping-cart'); // Redirige al carrito de compras
  };

  return isVisible ? (
    <div className={`modal-overlay ${isOpen && !closing ? 'show' : ''}`}>
      <div className={`modal-popup ${closing ? 'fade-out' : ''}`}>
        <h2>{title}</h2>
        <FaXmark onClick={handleClose} className="close-mark" />
        <div className="modal-body">{children}</div>
        <button className="carrito-button" onClick={handleAddToCart}>
          Añadir Al Carrito
        </button>
      </div>
    </div>
  ) : null;
};

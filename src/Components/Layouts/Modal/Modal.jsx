import React, { useState, useEffect } from 'react';
import './Modal.css';
import { FaXmark } from "react-icons/fa6";

export const Modal = ({ isOpen, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen); // Controla la visibilidad de la modal
  const [closing, setClosing] = useState(false); // Controla si está en proceso de cierre

  // Efecto para manejar la apertura y cierre de la modal
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.classList.add('modal-open'); // Bloquear scroll cuando la modal está abierta
    } else if (!isOpen && isVisible) {
      setClosing(true); // Inicia la animación de cierre
      setTimeout(() => {
        setIsVisible(false); // Oculta la modal después de la animación
        setClosing(false); // Reinicia el estado de cierre
        document.body.classList.remove('modal-open'); // Habilitar scroll nuevamente
        onClose(); // Llama la función de cierre pasada como prop
      }, 300); // Duración de la animación de cierre
    }
  }, [isOpen, isVisible, onClose]);

  // Manejador para el botón de cierre (FaXmark)
  const handleClose = () => {
    setClosing(true); // Activa la animación de cierre
    setTimeout(() => {
      setIsVisible(false); // Oculta la modal después de la animación
      setClosing(false); // Reinicia el estado de cierre
      document.body.classList.remove('modal-open'); // Habilitar scroll nuevamente
      onClose(); // Llama la función de cierre
    }, 300); // Duración de la animación
  };

  if (!isVisible) return null; // Si no es visible, no renderiza nada

  return (
    <div className={`modal-overlay ${isOpen && !closing ? 'show' : ''}`}>
      <div className={`modal-popup ${closing ? 'fade-out' : ''}`}>
        <h2>{title}</h2>
        <FaXmark onClick={handleClose} className="close-mark" />
        <div className="modal-body">{children}</div>
        <button className="carrito-button">Añadir Al Carrito</button>
      </div>
    </div>
  );
};

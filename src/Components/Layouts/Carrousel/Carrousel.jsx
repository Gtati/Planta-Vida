import React, { useState, useEffect } from 'react';
import './Carrousel.css'; 

import imagen1 from '../../../assets/imagenes/img1.jpg';
import imagen2 from '../../../assets/imagenes/img2.jpg';
import imagen3 from '../../../assets/imagenes/img3.jpg';
import imagen4 from '../../../assets/imagenes/img4.jpg';
import imagen5 from '../../../assets/imagenes/img5.avif';
import { FaPlus } from 'react-icons/fa';

const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState(null);

  // Las imágenes predeterminadas y las imágenes adicionales almacenadas en localStorage
  const defaultImages = [imagen1, imagen2, imagen3, imagen4, imagen5];

  useEffect(() => {
    // Leer el usuario desde localStorage (si existe)
    const user = JSON.parse(localStorage.getItem('user'));
    const savedImages = JSON.parse(localStorage.getItem('additionalImages')) || [];

    if (user?.role === 'admin') {
      setIsAdmin(true);
    }

    // Establecer las imágenes adicionales leídas de localStorage
    setAdditionalImages(savedImages);
  }, []);

  const images = [...defaultImages, ...additionalImages];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleAddImage = () => {
    if (newImage) {
      const updatedImages = [...additionalImages, newImage];
      setAdditionalImages(updatedImages);
      localStorage.setItem('additionalImages', JSON.stringify(updatedImages)); // Guardar en localStorage
      setNewImage(null);
      setShowModal(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = additionalImages.filter((_, i) => i !== index);
    setAdditionalImages(updatedImages);
    localStorage.setItem('additionalImages', JSON.stringify(updatedImages)); // Guardar en localStorage
  };

  const handleLogout = () => {
    // Limpiar datos del usuario y cerrar sesión
    localStorage.removeItem('user');
    setIsAdmin(false); // Cambiar el estado para mostrar la vista de usuario
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carrusel">
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="slide">
        <img src={images[currentIndex]} alt={`Imagen ${currentIndex + 1}`} />
      </div>

      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? 'dot active' : 'dot'}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>

      {isAdmin && (
        <div className="admin-controls">
          <button 
            onClick={() => setShowModal(true)} 
            className="edit-button"
          >
            <FaPlus className="add-icon" />
          </button>
          
        </div>
      )}

      {showModal && (
        <div className="modal-carrusel">
          <div className="modal-carrusel-content">
            <h3>Editar Carrusel</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(URL.createObjectURL(e.target.files[0]))}
            />
            <button onClick={handleAddImage}>Agregar Imagen</button>
            <h4>Imágenes adicionales</h4>
            <ul>
              {additionalImages.map((image, index) => (
                <li key={index}>
                  <img src={image} alt={`Adicional ${index + 1}`} width={50} />
                  <button onClick={() => handleRemoveImage(index)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)} className="close-modal-carrusel">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrusel;

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Carrousel.css';

import imagen1 from '../../../assets/imagenes/img1.jpg';
import imagen2 from '../../../assets/imagenes/img2.jpg';
import imagen3 from '../../../assets/imagenes/img3.jpg';
import imagen4 from '../../../assets/imagenes/img4.jpg';
import imagen5 from '../../../assets/imagenes/img5.avif';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';

const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [imageToRemove, setImageToRemove] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const defaultImages = [imagen1, imagen2, imagen3, imagen4, imagen5];

  useEffect(() => {
    // Comprobamos si hay un usuario en el localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.role === 'admin') {
        setIsAdmin(true); // Si el usuario es admin, mostramos los botones de admin
      }
    }
    
    const savedImages = JSON.parse(localStorage.getItem('additionalImages')) || [];
    setAdditionalImages(savedImages);
  }, []);

  // Función de logout
  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se cerrará tu sesión actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user'); // Eliminamos al usuario del localStorage
        setIsAdmin(false); // Ocultamos los botones de admin
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: 'Tu sesión ha sido cerrada correctamente.',
          confirmButtonText: 'Ok',
        });
      }
    });
  };

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
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres agregar esta imagen al carrusel?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedImages = [...additionalImages, newImage];
          setAdditionalImages(updatedImages);
          localStorage.setItem('additionalImages', JSON.stringify(updatedImages));
          setNewImage(null);
          setShowAddModal(false);
          Swal.fire('Imagen agregada', '', 'success');
        }
      });
    }
  };

  const handleOpenRemoveModal = () => {
    if (additionalImages.length === 0) {
      Swal.fire('No hay imágenes adicionales', 'Agrega imágenes para poder eliminarlas.', 'info');
    } else {
      setShowAddModal(false);
      setShowRemoveModal(true);
    }
  };

  const handleRemoveImage = () => {
    if (imageToRemove !== null) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la imagen seleccionada del carrusel.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedImages = additionalImages.filter((_, index) => index !== imageToRemove);
          setAdditionalImages(updatedImages);
          localStorage.setItem('additionalImages', JSON.stringify(updatedImages));
          setShowRemoveModal(false);
          setImageToRemove(null);
          Swal.fire('Imagen eliminada', '', 'success');
        }
      });
    }
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
          {/* Botón para agregar imágenes */}
          <button onClick={() => setShowAddModal(true)} className="edit-button">
            <FaPlus className="add-icon" />
          </button>

          {/* Botón para abrir el modal de eliminación */}
          <button onClick={handleOpenRemoveModal} className="remove-button">
            <FaTrashAlt className="remove-icon" />
          </button>
        </div>
      )}

      {/* Modal para agregar imágenes */}
      {showAddModal && (
        <div className="modal-carrusel">
          <div className="modal-carrusel-content">
            <h3>Agregar Nueva Imagen</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(URL.createObjectURL(e.target.files[0]))}
            />
            <button onClick={handleAddImage}>Agregar Imagen</button>
            <button onClick={() => setShowAddModal(false)} className="close-modal-carrusel">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal para eliminar imágenes */}
      {showRemoveModal && (
        <div className="modal-carrusel">
          <div className="modal-carrusel-content">
            <h3>Selecciona una imagen para eliminar</h3>
            {additionalImages.length === 0 ? (
              <p>No hay imágenes agregadas.</p>
            ) : (
              <ul>
                {additionalImages.map((image, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <img src={image} alt={`Adicional ${index + 1}`} width={50} style={{ marginRight: '10px' }} />
                    <button onClick={() => setImageToRemove(index)}>Seleccionar</button>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={handleRemoveImage} disabled={imageToRemove === null}>Eliminar Imagen</button>
            <button onClick={() => setShowRemoveModal(false)} className="close-modal-carrusel">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrusel;

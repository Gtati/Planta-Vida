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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.role === 'admin') {
        setIsAdmin(true);
      }
    }

    const savedImages = JSON.parse(localStorage.getItem('additionalImages')) || [];
    setAdditionalImages(savedImages);
  }, []);

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
        localStorage.removeItem('user');
        setIsAdmin(false);
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
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Reducir tamaño de la imagen
          canvas.width = 300; // Ajusta el ancho
          canvas.height = (img.height / img.width) * 300;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7); // Ajusta la calidad (0.7 = 70%)

          Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres agregar esta imagen al carrusel?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, agregar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              const updatedImages = [...additionalImages, resizedBase64];
              setAdditionalImages(updatedImages);
              localStorage.setItem('additionalImages', JSON.stringify(updatedImages));
              setNewImage(null);
              setShowAddModal(false);
              Swal.fire('Imagen agregada', '', 'success');
            }
          });
        };
      };
      reader.readAsDataURL(newImage);
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

  const handleSelectImageToRemove = (index) => {
    setImageToRemove(index);
    Swal.fire({
      icon: 'success',
      title: 'Imagen seleccionada correctamente',
      text: `Has seleccionado la imagen ${index + 1} para eliminar.`,
      confirmButtonText: 'Ok',
    });
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
          <button onClick={() => setShowAddModal(true)} className="edit-button">
            <FaPlus className="add-icon" />
          </button>

          <button onClick={handleOpenRemoveModal} className="remove-button">
            <FaTrashAlt className="remove-icon" />
          </button>
        </div>
      )}

      {showAddModal && (
        <div className="modal-carrusel">
          <div className="modal-carrusel-content">
            <h3>Agregar Nueva Imagen</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
            <button onClick={handleAddImage}>Agregar Imagen</button>
            <button onClick={() => setShowAddModal(false)} className="close-modal-carrusel">
              Cerrar
            </button>
          </div>
        </div>
      )}

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
                    <button onClick={() => handleSelectImageToRemove(index)}>Seleccionar</button>
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

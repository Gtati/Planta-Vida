import React, { useState } from 'react';
import './CreateTree.css';  // Asegúrate de importar el archivo CSS
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

// Imágenes importadas
import acaciaImage from '../../../assets/imagenes/arboles/Acacia.jpg';
import robleImage from '../../../assets/imagenes/arboles/roble.jpg';
import guayacanaImage from '../../../assets/imagenes/arboles/Guayacan a.jpg';
import guayacanrImage from '../../../assets/imagenes/arboles/Guayacan r.jpg';
import manzanoImage from '../../../assets/imagenes/arboles/Manzano.jpg';
import pinoImage from '../../../assets/imagenes/arboles/Pino.jpg';

export const CreateTree = () => {
  const [selectedTree, setSelectedTree] = useState(null);
  const navigate = useNavigate();  // Inicializa el hook useNavigate

  const images = [
    { tipo: "frutal", descripcion: "Guayacan amarillo", ubicacion: "18 N 424287.312 502444.620", imagen: "guayacanaImage", url: guayacanaImage },
    { tipo: "madera", descripcion: "Roble", ubicacion: "18 N 424287.312 502444.620", imagen: "robleImage", url: robleImage },
    { tipo: "frutal", descripcion: "Acacia", ubicacion: "18 N 424287.312 502444.620", imagen: "acaciaImage", url: acaciaImage },
    { tipo: "floral", descripcion: "Guayacan Rosado", ubicacion: "18 N 424287.312 502444.620", imagen: "guayacanrImage", url: guayacanrImage },
    { tipo: "frutal", descripcion: "Manzano", ubicacion: "18 N 424287.312 502444.620", imagen: "manzanoImage", url: manzanoImage },
    { tipo: "madera", descripcion: "Pino", ubicacion: "18 N 424287.312 502444.620", imagen: "pinoImage", url: pinoImage }
  ];

  const handleAssignTree = () => {
    if (selectedTree) {
      const requestData = {
        descripcion: selectedTree.descripcion,
        tipo: selectedTree.tipo,
        ubicacion: selectedTree.ubicacion,
        imagen: selectedTree.imagen,
      };

      // Obtener el idBono de localStorage
      const bonoId = localStorage.getItem('idBono');

      if (bonoId) {
        fetch(`https://apirestplantavida-production.up.railway.app/api/arboles/${bonoId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEiLCJpc3MiOiJwbGFudGF2aWRhIiwiZXhwIjoxNzM0NzI4NTAzLCJpYXQiOjE3MzM0MzI1MDN9.Z1hpdog719QTLe4dOQJ1-dI0-dIL575O58-vOmBFRac',
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.json())
          .then((data) => {
            // Mostrar SweetAlert de éxito
            Swal.fire({
              title: '¡Árbol asignado!',
              text: `El árbol ${data.descripcion} ha sido asignado con éxito.`,
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then(() => {
              // Redirigir al perfil de administrador después de hacer clic en "Aceptar"
              navigate('/admin-profile');
            });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al asignar el árbol.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No se encontró el ID del bono.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      Swal.fire({
        title: 'Advertencia',
        text: 'Por favor, selecciona un árbol.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="create-tree-container">
      <h1 className="header">Selecciona un árbol</h1>
      <div className="image-gallery">
        {images.map((image) => (
          <div
            key={image.descripcion}
            className={`image-item ${selectedTree?.descripcion === image.descripcion ? 'selected' : ''}`}
            onClick={() => setSelectedTree(image)}
          >
            <img src={image.url} alt={image.descripcion} className="tree-image" />
            <p className="image-description">{image.descripcion}</p>
          </div>
        ))}
      </div>
      <button className="assign-button" onClick={handleAssignTree}>Asignar árbol</button>
    </div>
  );
};

export default CreateTree;

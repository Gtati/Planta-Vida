import React from 'react';

import './UserProfile.css'
import {LocationCard} from '../../Layouts/LocationCard/LocationCard'

const UserProfile = () => {
  const userInfo = {
    nombre: 'Juan Jose Calderon',
    telefono: '3128495625',
    correo: 'juan.perez@example.com',
  };

  const treeInfo = {
    nombreArbol: 'Guayacan',
    motivoCompra: 'Cumpleaños',
    caracteristicas: 'Es un arbusto de 2 a 5 m de altura, presenta ramas gruesas y torcidas desde la base, con un diametro del tronco de hasta 20 cm, de copa densa, apretada, prenennifolio. Sus flores son pequeñas y violaceas. Sus frutos son capsulas moradas, tiene numerosas semillas',
    localizacion: <LocationCard/>,
    fotosCrecimiento: [
      'foto1.jpg',
      'foto2.jpg',
      'foto3.jpg',
    ],
  };

  return (
    <div className="user-profile">
      <div className="user-info">
        <h2>Información del Usuario</h2>
        <p><strong>Nombre:</strong> {userInfo.nombre}</p>
        <p><strong>Telefono:</strong>{userInfo.telefono}</p>
        <p><strong>Correo:</strong>{userInfo.correo}</p>
      </div>

      <div className="tree-info">
        <h2>Caracteristicas del Arbol</h2>
        <div  className='principal-information'>
        <p>{treeInfo.nombreArbol}</p>
        <p> {treeInfo.motivoCompra}</p>
        </div>
        <div className='characteristics'>
            <div className='tree-description'>
            <p>{treeInfo.caracteristicas}</p>
            </div>
        <p>{treeInfo.localizacion}</p>
        </div>
        <div className="fotos-crecimiento">
          <h3>Registro de Crecimiento</h3>
          {treeInfo.fotosCrecimiento.map((foto, index) => (
            <img key={index} src={foto} alt={`Crecimiento ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
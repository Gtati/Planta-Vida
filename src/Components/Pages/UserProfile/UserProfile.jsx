import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import { UserContext } from '../../UserContext/UserContext';
import "./UserProfile.css"; 
import { FaHome } from "react-icons/fa";
import Swal from 'sweetalert2';
import { LocationCard } from "../../Layouts/LocationCard/LocationCard";

const UserProfile = () => {
  const { userData } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState("src/assets/user.png");
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Guardamos la imagen del perfil
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    Swal.fire({
      icon: 'success',
      title: 'Felicitaciones',
      text: 'Tu cambio se guardó exitosamente',
      confirmButtonText: 'Ok'
    });
  };

  // Función para redirigir a la página principal al hacer clic en "Cerrar Sesión"
  const handleCancel = () => {
    // Puedes agregar lógica para cerrar sesión aquí si es necesario

    // Redirige a la página principal
    navigate('/'); // Cambia la ruta si la página principal no está en '/'
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-content">
        {/* Header con Logo e Icono para ir al Home */}
        <header className="user-profile-header">
          <img src="src/assets/logoPlantaVida.png" alt="Logo" className="logo" />
          <Link to="/" className="home-icon"><FaHome/></Link>
        </header>

        {/* Sección de Información del Usuario */}
        <div className="info-section user-section">
          {/* Mostrar la imagen de perfil subida o la imagen por defecto */}
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="information-user">
            <h2>{userData.fullName || "Nombre no disponible"}</h2>
            <p><strong>Phone:</strong> {userData.phone || "Teléfono no disponible"}</p>
            <p><strong>Email:</strong> {userData.email || "Correo no disponible"}</p>
          </div>
          <div className="image-upload">
            <label>Subir Imagen de Perfil</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Sección del Árbol */}
        <div className="tree-section">
          <h3>Nombre del Árbol: <span>Roble</span></h3>

          {/* Contenedor de tarjetas de características y localización */}
          <div className="tree-info-cards">
            <div className="tree-card">
              <h4>Características</h4>
              <p>Árbol robusto, de tronco grueso y con una gran capacidad para crecer en diversas condiciones climáticas.</p>
            </div>
            <div className="tree-card">
              <h4>Localización</h4>
              <LocationCard/>
            </div>
          </div>

          {/* Imágenes del Árbol */}
          <div className="tree-images-container">
            <img src="src/assets/roble1.jpg" alt="Árbol 1" className="tree-image" />
            <img src="src/assets/roble2.jpg" alt="Árbol 2" className="tree-image" />
            <img src="src/assets/roble3.jpg" alt="Árbol 3" className="tree-image" />
          </div>
        </div>

        {/* Botones Guardar y Cancelar al final */}
        <div className="buttons-container">
          <button className="button save-button" onClick={handleSave}>Guardar</button>
          <button className="button cancel-button" onClick={handleCancel}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

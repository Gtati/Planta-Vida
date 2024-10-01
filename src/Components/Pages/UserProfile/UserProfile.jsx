import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext/UserContext';
import "./UserProfile.css"; 
import { FaHome } from "react-icons/fa";
import Swal from 'sweetalert2';
import { LocationCard } from "../../Layouts/LocationCard/LocationCard";
import Roble1 from '../../../assets/imagenes/roble1.jpg'
import Roble2 from '../../../assets/imagenes/roble2.jpg'
import Roble3 from '../../../assets/imagenes/roble3.jpg'


const UserProfile = () => {
  const { userData } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState("src/assets/user.png");
  const navigate = useNavigate(); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
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
          <img src={profileImage} alt="" className="profile-image" />
          <div className="information-user">
            <h2>{userData.fullName || "Nombre no disponible"}</h2>
            <p><strong>Telefono:</strong> {userData.phone || "Teléfono no disponible"}</p>
            <p><strong>Correo Electrónico:</strong> {userData.email || "Correo no disponible"}</p>
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
          <h3>Nombre del Árbol: <span className="arbol">Roble</span></h3>

          {/* Contenedor de tarjetas de características y localización */}
          <div className="tree-info-cards">
            <div className="tree-card">
              <h4>Características</h4>
              <p>Los robles pueden alcanzar entre 20 y 40 metros de altura, con un tronco grueso que puede llegar a medir hasta 2 metros de diámetro.</p>
              <p>Es un árbol de crecimiento lento, lo que contribuye a la dureza de su madera.</p>
              <p>Produce bellotas, que son esenciales para la alimentación de muchos animales, como ardillas, jabalíes y aves.</p>
              <p>Los robles son árboles muy longevos, algunos pueden vivir varios cientos de años. Existen ejemplares que han superado los 1,000 años.</p>
            </div>
            <div className="tree-card">
              <h4>Localización</h4>
              <LocationCard/>
            </div>
          </div>

          {/* Imágenes del Árbol */}
          <div className="tree-images-container">
            <img src={Roble1} alt="Árbol 1" className="tree-image" />
            <img src={Roble2} alt="Árbol 2" className="tree-image" />
            <img src={Roble3} alt="Árbol 3" className="tree-image" />
          </div>
        </div>

        {/* Botones Guardar y Cancelar al final */}
        <div className="buttons-container">
          <button className="save-button" onClick={handleSave}>Guardar</button>
          <button className="cancel-button" onClick={handleCancel}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

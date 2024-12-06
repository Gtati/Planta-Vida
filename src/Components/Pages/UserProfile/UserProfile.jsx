import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa"; // Importar ícono predeterminado
import Swal from "sweetalert2";
import { LocationCard } from "../../Layouts/LocationCard/LocationCard";
import Roble1 from "../../../assets/imagenes/roble1.jpg";
import Roble2 from "../../../assets/imagenes/roble2.jpg";
import Roble3 from "../../../assets/imagenes/roble3.jpg";
import Logo from "../../../assets/imagenes/logoPlantaVidaBlanco.png";
import "./UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || null); // No hay imagen por defecto al inicio

  const username = localStorage.getItem("username"); // Recuperar el nombre de usuario guardado en localStorage

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result;
        setProfileImage(imageBase64);
        localStorage.setItem("profileImage", imageBase64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    Swal.fire({
      title: "¿Eliminar imagen?",
      text: "Se restablecerá el ícono predeterminado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setProfileImage(null);
        localStorage.removeItem("profileImage"); // Elimina la imagen del localStorage
        Swal.fire(
          "Imagen eliminada",
          "Se ha restablecido el ícono predeterminado.",
          "success"
        );
      }
    });
  };

  const handleSave = () => {
    navigate("/postal");
  };

  const handleCancel = () => {
    localStorage.removeItem("user"); // Elimina la información del usuario
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Tu sesión será cerrada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-content">
        {/* Header con Logo e Icono para ir al Home */}
        <header className="user-profile-header">
          <img src={Logo} alt="Logo" className="logo" />
          <Link to="/" className="home-icon">
            <FaHome />
          </Link>
        </header>

        {/* Sección de Información del Usuario */}
        <div className="info-section user-section">
          {/* Mostrar la imagen de perfil subida o el ícono por defecto */}
          {profileImage ? (
            <img src={profileImage} alt="Imagen de perfil" className="profile-image2" />
          ) : (
            <FaUserCircle className="default-profile-icon" /> // Ícono por defecto
          )}
          <div className="information-user">
            <h2>{username || "Nombre no disponible"}</h2> {/* Mostrar el username desde localStorage */}
            <p>
              <strong>Correo Electrónico:</strong>{" "}
              {localStorage.getItem("email") || "Correo no disponible"} {/* Correo desde localStorage */}
            </p>
          </div>
          <div className="image-upload">
            <label>Subir Imagen de Perfil</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleImageDelete} className="delete-image-button">
              Eliminar Imagen
            </button>
          </div>
        </div>

        {/* Botones Guardar y Cancelar */}
        <div className="buttons-container">
          <button className="save-button" onClick={handleSave}>
            Crear Postal
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

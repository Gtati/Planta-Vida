import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContext';
import Swal from "sweetalert2";
import { FaHome, FaQuestionCircle, FaEye, FaEyeSlash } from "react-icons/fa"; // Agregamos íconos
import Logo from '../../../assets/imagenes/logoPlantaVidaBlanco.png';
import './SignUp.css';

const SignUp = () => {
  const { setUserData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmación de contraseña
  const [showPasswordInfo, setShowPasswordInfo] = useState(false); // Estado para mostrar la información de la contraseña
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        text: "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un carácter especial.",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      const response = await fetch(
        'https://apirestplantavida-production.up.railway.app/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Te has registrado correctamente",
        });

        // Guardar datos en el contexto
        setUserData({
          fullName: formData.fullName,
          email: formData.email,
        });

        navigate('/'); // Redirigir a la página de perfil
      } else {
        const errorData = await response.json();
        const message = errorData.message || "No se pudo completar el registro";
        if (message.includes("ya registrado")) {
          Swal.fire({
            icon: "error",
            title: "Usuario ya registrado",
            text: "El correo ya está registrado. Por favor, inicia sesión.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: message,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema con el servidor. Intenta más tarde.",
      });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const togglePasswordInfo = () => {
    setShowPasswordInfo(!showPasswordInfo);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-logo">
          <div className="logo-container">
            <img src={Logo} alt="Logo" />
            <Link to="/" className="home-icon">
              <FaHome />
            </Link>
          </div>
        </div>
        <h2 className="title-sign">Registro</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre Completo</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nombre Completo"
                required
              />
            </div>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contraseña</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  required
                />
                <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="password-info">
                <button type="button" className="info-toggle" onClick={togglePasswordInfo}>
                  <FaQuestionCircle />
                </button>
                {showPasswordInfo && (
                  <small className="password-hint">
                    La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un carácter especial.
                  </small>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <div className="password-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmar Contraseña"
                  required
                />
                <button type="button" className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          <div className="signup-buttons">
            <button type="button" onClick={handleCancel} className="btn-cancel">Cancelar</button>
            <button type="submit" className="btn-confirm">Confirmar</button>
          </div>
          <div className="login-link">
            ¿Ya tienes una cuenta? 
            <NavLink to="/LogIn">
              <span className="log">Iniciar Sesión</span>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

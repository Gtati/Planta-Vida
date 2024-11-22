import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import Logo from '../../../assets/imagenes/logoPlantaVidaBlanco.png';
import './LogIn.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://apirestplantavida-production.up.railway.app/api/auth/login',
        {
          username: formData.username,
          password: formData.password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { username } = formData;
      const userRole = username === 'admin1' ? 'admin' : 'user';

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify({ username, role: userRole }));

      // Mostrar mensaje de bienvenida
      Swal.fire({
        icon: 'success',
        title: `Bienvenido ${userRole === 'admin' ? 'Administrador' : 'Usuario'}`,
        text: `Hola ${username}, estás ingresando al sistema.`,
        confirmButtonText: 'Continuar',
      }).then(() => {
        navigate('/'); // Redirigir al Home
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Usuario o contraseña incorrectos. Inténtalo de nuevo.',
        confirmButtonText: 'Reintentar',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={Logo} alt="Logo" />
          <Link to="/" className="home-icon"><FaHome/></Link>
        </div>
        <h2 className="login-title">Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de Usuario"
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">¿Olvidaste la contraseña?</Link>
          </div>
          <div className="login-buttons">
            <button type="submit" className="btn-login">Iniciar Sesión</button>
          </div>
          <div className="signup-link">
            ¿No tienes una cuenta? <Link to="/signup"><span className="signup-link-text">Regístrate</span></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

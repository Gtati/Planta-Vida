import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './LogIn.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de inicio de sesión:', formData);
    // Aquí se podría agregar la lógica de autenticación
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src="src/assets/logoPlantaVida.png" alt="Logo" />
        </div>
        <h2 className="login-title">Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Correo Electrónico'
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
            label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Contraseña'
              required
            />
          </div>
          <div className="forgot-password">
            <NavLink to="/forgot-password">¿Olvidaste la contraseña?</NavLink>
          </div>
          <div className="login-buttons">
            <button type="submit" className="btn-login">Iniciar Sesión</button>
          </div>
          <div className="signup-link">
            ¿No tienes una cuenta? <NavLink to="/signup"><span className="signup-link-text">Regístrate</span></NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
      return;
    }
  
    // Si las contraseñas coinciden
    console.log('Datos enviados:', formData);
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
        <>
    <div className="signup-container" >
      <div className="signup-box">
        <div className="signup-logo">
          <img src="src/assets/logoPlantaVida.png" alt="Logo" />
        </div>
        <h2 className='title-sign'> Registro</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre Completo</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder='Nombre Completo'
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
                placeholder='Correo Electrónico'
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Número de Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder='Teléfono'
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Contraseña'
                required
              />
            </div>
            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Contraseña'
                required
              />
            </div>
          </div>
          <div className="signup-buttons">
            <button type="button" onClick={handleCancel} className="btn-cancel">Cancelar</button>
            <button type="submit" className="btn-confirm">Confirmar</button>
          </div>
          <div className="login-link">
           ¿Ya tienes una cuenta? <NavLink to="/LogIn"> <span className='log'>Iniciar Sesión</span> </NavLink>
          </div>
        </form>
      </div>
    </div>
        </>
  );
};

export default SignUp;

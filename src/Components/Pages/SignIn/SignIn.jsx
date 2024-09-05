import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../UserProfile/UserProfile';

function SignIn() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/user-profile'); // Redirige al componente UserProfile
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación básica (puedes agregar validaciones más complejas según sea necesario)
    const validationErrors = {};
    if (!username) validationErrors.username = 'Se requiere el usuario';
    if (!email) validationErrors.email = 'Se requiere el correo';
    if (!password) validationErrors.password = 'Se requiere la contraseña';
    if (!firstName) validationErrors.firstName = 'Se requiere el nombre';
    if (!lastName) validationErrors.lastName = 'Se requiere el apellido';
    if (!birthdate) validationErrors.birthdate = 'Se requiere la fecha de nacimiento';
    if (!gender) validationErrors.gender = 'Se requiere el genero';
    if (!phone) validationErrors.phone = 'Se requiere el numero telefonico';
    if (!address) validationErrors.address = 'Se requiere la direccion';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Enviar los datos del formulario a tu backend para autenticación
      console.log('Form submitted:', { username, email, password, firstName, lastName, birthdate, gender, phone, address });
      
      // Redirigir al perfil de usuario
      handleClick();
    }
  };

  return (
    <>
      <section className='general-signin'>
        <form className='container-signin' onSubmit={handleSubmit}>
          <h1>Registrarse</h1>
          <div>
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </section>

      <section className='general-signin'>
        <form className='container-signin' onSubmit={handleSubmit}>
          <h1>Su informacion personal</h1>

          <div>
            <label htmlFor="firstName">Nombres:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName">Apellidos:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>

          <div>
            <label htmlFor="birthdate">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            {errors.birthdate && <p className="error">{errors.birthdate}</p>}
          </div>

          <div>
            <label htmlFor="gender">Genero:</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Seleccione su genero</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>

          <div>
            <label htmlFor="phone">Numero de celular:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="address">Direccion:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <button type="submit">Listo</button>
        </form>
       
      </section>
    </>
  );
}

export default SignIn;

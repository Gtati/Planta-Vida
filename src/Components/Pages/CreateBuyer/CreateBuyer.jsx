import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import './CreateBuyer.css';

export const CreateBuyer = () => {
  const [comprador, setComprador] = useState({
    idComprador: '',
    nombre: '',
    direccion: '',
    correoElectronico: '',
    tipoBono: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComprador({ ...comprador, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlzcyI6InBsYW50YXZpZGEiLCJleHAiOjE3MzQ2NzM0ODUsImlhdCI6MTczMzM3NzQ4NX0.Z8CPqsmU75Gw8ugIAkdy-_7Uz7ljEtUpoC4Cst21zvY";
    const url = "https://apirestplantavida-production.up.railway.app/api/compradores";

    try {
      // Enviar solicitud al servidor
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idComprador: comprador.idComprador,
          nombre: comprador.nombre,
          direccion: comprador.direccion,
          correoElectronico: comprador.correoElectronico,
        }),
      });

      if (response.ok) {
        // Enviar correo electrónico con EmailJS
        const serviceID = 'service_dltxr9j';
        const templateID = 'template_mnxxejk';
        const userID = 'fEcD5F3XzT_XZ1j-1';

        const templateParams = {
          idComprador: comprador.idComprador,
          nombre: comprador.nombre,
          direccion: comprador.direccion,
          correoElectronico: comprador.correoElectronico,
          tipoBono: comprador.tipoBono,
        };

        emailjs.send(serviceID, templateID, templateParams, userID)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Proceso de compra realizado correctamente, espera un mensaje en tu correo para continuar con el proceso y puedas ver la informacion de tu árbol',
              confirmButtonText: 'Ok',
            }).then(() => {
              // Redirigir después de hacer clic en "Ok"
              window.location.href = 'http://localhost:5173/#quienes-somos';
            });
          })
          .catch((error) => {
            console.error('Error al enviar el correo:', error);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Comprador creado, pero ocurrió un error al enviar el correo.',
              confirmButtonText: 'Ok',
            });
          });

        setMensaje('¡Comprador creado exitosamente!');
        setComprador({
          idComprador: '',
          nombre: '',
          direccion: '',
          correoElectronico: '',
          tipoBono: '',
        });
      } else {
        const errorData = await response.json();
        setMensaje(`Error: ${errorData.message || 'No se pudo crear el comprador'}`);
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="crear-comprador">
      <h2>Crear Comprador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Comprador:</label>
          <input
            type="number"
            name="idComprador"
            value={comprador.idComprador}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={comprador.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={comprador.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correoElectronico"
            value={comprador.correoElectronico}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tipo de Bono:</label>
          <select
            name="tipoBono"
            value={comprador.tipoBono}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="celebracion">Celebración</option>
            <option value="exequial">Exequial</option>
            <option value="ambiental">Ambiental</option>
          </select>
        </div>
        <button type="submit">Crear Comprador</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      <p className="informacion">
        Necesitamos esta información para continuar con el proceso de siembra de tu árbol.
      </p>
    </div>
  );
};

export default CreateBuyer;

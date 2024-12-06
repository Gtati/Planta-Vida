import React, { useState } from 'react';
import './CreateBono.css';  
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export const CreateBono = () => {
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cedula, setCedula] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); 
  const [bonoId, setBonoId] = useState(null);

  const navigate = useNavigate(); // Inicializa el hook para la navegación


  const handleSubmit = async () => {
    

    const url = `https://apirestplantavida-production.up.railway.app/api/bonos/${cedula}`;
  
    const bonoData = {
      tipo: tipo,
      descripcion: descripcion,
      precio: parseFloat(precio),
      treeId: selectedImage,  // Incluir el ID del árbol seleccionado
    };
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se asignará el árbol seleccionado a este bono.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, asignar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEiLCJpc3MiOiJwbGFudGF2aWRhIiwiZXhwIjoxNzM0NzA1ODE2LCJpYXQiOjE3MzM0MDk4MTZ9.A6FyIswBdUReBKitp3xMEM_uIP-bExlKbHluVaDzaDo',
            },
            body: JSON.stringify(bonoData),
          });
  
          if (response.ok) {
            const data = await response.json();
            setBonoId(data.idBono); // Asumimos que el servidor devuelve un campo llamado 'idBono'
            setMensaje('Bono creado con éxito');
            
            // Guardar el idBono en localStorage
            localStorage.setItem('idBono', data.idBono);
          
            Swal.fire({
              title: 'Éxito',
              text: `Bono creado con ID: ${data.idBono}`,
              icon: 'success',
            }).then(() => {
              navigate('/create-tree'); // Redirige al perfil de administrador
            });
          } else {
            const errorData = await response.json();
            setMensaje(errorData.message || 'Error al crear el bono');
          }
        } catch (error) {
          setMensaje('Error de conexión');
        }
      }
    });
  };
  
  return (
    <div className="container">
      <h2 className="form-title">Crear Bono</h2>
      <form className="form">
        <div className="form-group">
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            className="input-field"
          >
            <option value="">Seleccionar tipo</option>
            <option value="celebracion">Celebración</option>
            <option value="exequial">Exequial</option>
            <option value="ambiental">Ambiental</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input
            id="descripcion"
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            id="precio"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cedula">Cédula del comprador:</label>
          <input
            id="cedula"
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
            className="input-field"
          />
        </div>
        
        <button type="button" onClick={handleSubmit} className="submit-button">Crear Bono</button>
      </form>
      {mensaje && <p className="message">{mensaje}</p>}
    </div>
  );
};

export default CreateBono;

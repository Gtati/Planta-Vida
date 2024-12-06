import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminProfile.css';  // Importa el archivo de estilos

export const AdminProfile = () => {
  const [compradores, setCompradores] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apirestplantavida-production.up.railway.app/api/compradores', {
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlzcyI6InBsYW50YXZpZGEiLCJleHAiOjE3MzM1MTgxMjksImlhdCI6MTczMjIyMjEyOX0.rW7mIf-BzkNanbNi8NTJMmDB0znYkmdGa476iPd6rVE'
          }
        });
        setCompradores(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const handleBonoClick = () => {
    // Redirige al componente CreateBono
    navigate('/create-bono');
  };

  // Función para determinar el color según los datos de bono y árbol
  const getColor = (bonos) => {
    // Verificamos si el comprador tiene bonos y si alguno tiene un árbol asignado
    const tieneArbol = bonos.some(bono => bono.arbol); // Verifica si al menos un bono tiene un árbol
    return tieneArbol ? 'blue' : 'black';  // Si tiene árbol, nombre verde, si no, negro
  };

  return (
    <div className="admin-profile-container">
      <h1 className="admin-profile-title">Compradores</h1>
      <ul className="compradores-list">
        {compradores.map((comprador, index) => (
          <li 
            key={index} 
            className="comprador-item" 
            style={{ color: getColor(comprador.bonos) }}
          >
            {comprador.nombre}
          </li>
        ))}
      </ul>
      <button className="create-bono-button" onClick={handleBonoClick}>
        Crear bonos y asignarlos
      </button>
    </div>
  );
};

export default AdminProfile;

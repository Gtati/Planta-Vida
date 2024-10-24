import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirección
import Navbar from '../../Navbar/Navbar';
import { CartContext } from '../../Layouts/CartContext/CartContext'; // Importar CartContext
import Swal from 'sweetalert2'; // Importar SweetAlert
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { selectedBono, removeBono } = useContext(CartContext); // Extraer removeBono del contexto
  const navigate = useNavigate(); // Hook para redirección

  const handleDeleteBono = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeBono(); // Llama a removeBono para eliminar el bono
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu bono ha sido eliminado.",
          icon: "success"
        }).then(() => {
          navigate('/bonos'); // Redirige a la sección de bonos
        });
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="shopping-cart-content">
        {selectedBono ? (
          <>
            <p>Bono seleccionado: {selectedBono}</p>
            <button onClick={handleDeleteBono}>Eliminar Bono</button>
          </>
        ) : (
          <p>No has seleccionado ningún bono aún.</p>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;

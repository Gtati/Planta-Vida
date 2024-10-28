import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../Navbar/Navbar';
import { CartContext } from '../../Layouts/CartContext/CartContext';
import { BonoContext } from '../../Layouts/BonoContext/BonoContext'; 
import { TreeCards } from '../../Layouts/TreeCards/TreeCards'
import Swal from 'sweetalert2';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { removeBono } = useContext(CartContext); // Extraer removeBono del contexto del carrito
  const { selectedBono, setSelectedBono } = useContext(BonoContext); // Obtener selectedBono desde BonoContext
  const navigate = useNavigate(); // Hook para redirección

  // Redirigir si no hay bono seleccionado
  useEffect(() => {
    if (!selectedBono) {
      Swal.fire({
        title: "Carrito vacío",
        text: "Por favor, selecciona un bono antes de acceder al carrito.",
        icon: "info",
      }).then(() => {
        navigate('/#nuestros-planes');
      });                     
    }
  }, [selectedBono, navigate]);

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
        setSelectedBono(null); // Elimina el bono en el BonoContext
        removeBono(); // Llama a removeBono para actualizar el estado del carrito
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu bono ha sido eliminado.",
          icon: "success"
        }).then(() => {
          navigate(''); // Redirige a la sección de bonos
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
        <TreeCards/>
      </div>
    </>
  );
};

export default ShoppingCart;

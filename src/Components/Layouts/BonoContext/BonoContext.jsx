import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
export const BonoContext = createContext();

// Proveedor del contexto
export const BonoProvider = ({ children }) => {
  const [selectedBono, setSelectedBono] = useState(null); // Bono seleccionado
  const [cartItems, setCartItems] = useState(0); // Contador de artículos en el carrito

  // Función para agregar un bono al carrito
  const addToCart = (bono) => {
    if (!selectedBono) {
      setSelectedBono(bono); // Solo se selecciona un bono si no hay ninguno
      setCartItems(1); // Incrementa el contador del carrito a 1 cuando se selecciona el bono
    }
  };

  // Función para eliminar el bono del carrito
  const removeBono = () => {
    setSelectedBono(null); // Limpiar el bono seleccionado
    setCartItems(0); // Reiniciar el contador del carrito
  };

  return (
    <BonoContext.Provider value={{ selectedBono, setSelectedBono, removeBono, cartItems, addToCart }}>
      {children}
    </BonoContext.Provider>
  );
};

// Hook personalizado para usar el BonoContext
export const useBono = () => {
  const context = useContext(BonoContext);

  if (!context) {
    throw new Error('useBono debe ser usado dentro de un BonoProvider');
  }

  return context;
};

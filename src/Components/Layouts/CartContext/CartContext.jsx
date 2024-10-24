import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [selectedBono, setSelectedBono] = useState(null); // Estado para el bono seleccionado
  const [cartItems, setCartItems] = useState(0); // Contador de artículos en el carrito

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  const removeBono = () => {
    setSelectedBono(null); // Eliminar el bono
    setCartItems(0); // Si quieres que se reinicie el contador
  };

  return (
    <CartContext.Provider value={{ selectedBono, setSelectedBono, removeBono, cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);

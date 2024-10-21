// CartContext.js
import React, { createContext, useContext, useState } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(0); // Aquí puedes manejar los artículos del carrito

  // Función para añadir un artículo al carrito (ejemplo)
  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  // Función para vaciar el carrito (ejemplo)
  const clearCart = () => {
    setCartItems(0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);

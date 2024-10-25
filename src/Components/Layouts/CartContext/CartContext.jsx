import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedBono, setSelectedBono] = useState(null);
  const [cartItems, setCartItems] = useState(0);

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  const removeBono = () => {
    setSelectedBono(null);
    setCartItems(0);
  };

  return (
    <CartContext.Provider value={{ selectedBono, setSelectedBono, removeBono, cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

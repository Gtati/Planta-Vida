import React, { createContext, useState } from 'react';

// Crea el contexto
export const BonoContext = createContext();

// Proveedor del contexto
export const BonoProvider = ({ children }) => {
  const [selectedBono, setSelectedBono] = useState(null);

  return (
    <BonoContext.Provider value={{ selectedBono, setSelectedBono }}>
      {children}
    </BonoContext.Provider>
  );
};

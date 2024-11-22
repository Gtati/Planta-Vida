import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const UserContextBonos = createContext();

// Crear el proveedor del contexto
export const UserProviderBonos = ({ children }) => {
  // Estado para almacenar la información del usuario
  const [user, setUser] = useState(null);

  // Estado para almacenar los bonos
  const [bonos, setBonos] = useState([
    {
      title: "Bono Celebración",
      content:
        "Este bono representa la siembra y cuidado de un árbol nativo, ideal para celebrar cumpleaños, bodas, graduaciones u otros momentos especiales.",
      modalContent: <p>Detalles del Bono Celebración</p>,
    },
    {
      title: "Bono Exequial",
      content:
        "Este bono está diseñado para rendir homenaje a una persona fallecida, ofreciendo una manera significativa de honrar su memoria.",
      modalContent: <p>Detalles del Bono Exequial</p>,
    },
    {
      title: "Bono Ambiental",
      content:
        "Con este bono apoya la conservación y recuperación de los bosques de las zonas urbanas y rurales del departamento del Quindío.",
      modalContent: <p>Detalles del Bono Ambiental</p>,
    },
  ]);

  // Estado para manejar la creación de un nuevo bono
  const [newBono, setNewBono] = useState({
    title: "",
    content: "",
    modalContent: "",
    showModal: false,
  });

  // Simular la carga del usuario desde localStorage o API
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null); // Si no hay usuario, asignamos null
    }
  }, []);

  // Función para agregar un nuevo bono
  const handleAddBono = () => {
    if (newBono.title && newBono.content && newBono.modalContent) {
      setBonos([...bonos, newBono]);
      setNewBono({ title: "", content: "", modalContent: "", showModal: false });
    }
  };

  // Función para eliminar un bono
  const handleRemoveBono = (index) => {
    const updatedBonos = bonos.filter((_, i) => i !== index);
    setBonos(updatedBonos);
  };

  return (
    <UserContextBonos.Provider
      value={{
        user,
        setUser,
        bonos,
        setBonos,
        newBono,
        setNewBono,
        handleAddBono,
        handleRemoveBono,
      }}
    >
      {children}
    </UserContextBonos.Provider>
  );
};

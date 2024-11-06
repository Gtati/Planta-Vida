import React from "react";
import "./TreeInformation.css";
import { useParams } from "react-router-dom";
import GuayacanRosado from "../../../assets/imagenes/Guayacan Rosado.jpg";
import RobleComun from "../../../assets/imagenes/roble-comun.jpg";
import Navbar from "../../Navbar/Navbar";

const treeData = [
  {
    id: 1,
    title: "Guayacan Rosado",
    description: "El guayacán rosado es un árbol originario de las regiones tropicales de América, conocido por su impresionante floración que cubre su copa de tonos rosados o violetas suave. Su presencia es un atractivo para una amplia variedad de aves, y su madera es muy valorada por su alta calidad. Este árbol es un verdadero espectáculo cuando florece en grandes cantidades, tiñendo su copa de rosa. Además, atrae a diversas especies de aves e insectos polinizadores. Contribuye a la estabilización y recuperación de suelos erosionados o degradados. Gracias a su madera resistente y de gran belleza, es utilizada en la fabricación de muebles, pisos, puertas y otros acabados. ",
    imageUrl: GuayacanRosado,
  },
  {
    id: 2,
    title: "Roble Común",
    description: "Descripción del Roble Común.",
    imageUrl: RobleComun,
  },
  // Agrega más datos de árboles según sea necesario
];

export const TreeInformation = () => {
  const { treeId } = useParams(); // Capturar el treeId desde la URL
  const tree = treeData.find((t) => t.id === parseInt(treeId)); // Buscar el árbol por su id

  if (!tree) return <p>Árbol no encontrado</p>;

  return (
    <>
      <Navbar />
      <div className="g-information">
        <div>
        <img className="treeimage" src={tree.imageUrl} alt={tree.title} />
        </div>
        <div className="info-tree">
        <h2 className="treetitle">{tree.title}</h2>
        <p className="treedescription">{tree.description}</p>
        <button className="finish-buy">Finalizar Compra</button>
        </div>
      </div>
    </>
  );
};

export default TreeInformation;

import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./TreeInformation.css";
import GuayacanRosado from "../../../assets/imagenes/Guayacan Rosado.jpg";
import RobleComun from "../../../assets/imagenes/roble-comun.jpg";
import Manzano from "../../../assets/imagenes/Manzano.jpg";
import Caoba from "../../../assets/imagenes/Caoba.jpg";
import Pino from "../../../assets/imagenes/Pino.jpg";
import Acacia from "../../../assets/imagenes/Acacia.jpg";
import Navbar from "../../Navbar/Navbar";

const treeData = [
  {
    id: 1,
    title: "Guayacan Rosado",
    description: [
      "El guayacán rosado es un árbol originario de las regiones tropicales de América,",
      " conocido por su impresionante floración que cubre su copa de tonos rosados o violetas suave.",
    ],
      imageUrl: GuayacanRosado,
  },
  {
    id: 2,
    title: "Roble Común",
    description:[
      "El roble común es un árbol majestuoso que pertenece al género Quercus de la familia Fagaceae.", 
      " Es originario de Europa y parte de Asia occidental, y es ampliamente conocido por su longevidad,",
      " resistencia y gran valor ecológico.",
    ],
      imageUrl: RobleComun,
  },
  {
    id: 3,
    title: "Manzano (Malus domestica)",
    description:[
      "Árbol caducifolio que produce manzanas. Florece en primavera y sus frutos maduran en otoño.",
       " Es común en climas templados.",
    ],
      imageUrl: Manzano,
  },
  {
    id: 4,
    title: "Caoba (Swietenia macrophylla)",
    description: [
      "Árbol tropical que produce madera dura y resistente, muy valorada en la construcción y fabricación",
      " de muebles.",
    ],
      imageUrl: Caoba,
  },
  {
    id: 5,
    title: "Pino (Pinus spp.)",
    description: [
      "Árbol de hoja perenne con forma de cono."," Es ideal para proporcionar sombra en climas cálidos y secos.",
    ],
      imageUrl: Pino,
  },
  {
    id: 6,
    title: "Acacia (Acacia spp.)",
    description: [
      "Árbol o arbusto con flores amarillas o blancas agrupadas en racimos esféricos.",
      "Muchas especies tienen espinas para protegerse de herbívoros.",
    ],
    imageUrl: Acacia,
  },
];

export const TreeList = () => {
  return (
    <>
      <Navbar />
      <div className="tree-list">
        <h1 className="tree-list-title">Árboles Disponibles</h1>
        <div className="tree-cards">
          {treeData.map((tree) => (
            <div key={tree.id} className="tree-card">
              <img
                className="tree-card-image"
                src={tree.imageUrl}
                alt={tree.title}
              />
              <h2 className="tree-card-title">{tree.title}</h2>
              <p className="tree-card-description">
                {Array.isArray(tree.description)
                  ? tree.description[0]
                  : tree.description.slice(0, 50)}
                ...
              </p>
              <Link to={`/tree-information/${tree.id}`} className="view-details">
                Ver Detalles
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const TreeInformation = () => {
  const { treeId } = useParams();
  const navigate = useNavigate();
  const tree = treeData.find((t) => t.id === parseInt(treeId, 10));

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
          <p className="tree-description">
            {Array.isArray(tree.description) ? (
              tree.description.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))
            ) : (
              <span>{tree.description}</span>
            )}
          </p>
          <div className="buttons-tree-buy">
            <button className="finish-buy">Finalizar Compra</button>
            <button
              className="cancel-button"
              onClick={() => navigate("/shopping-cart")}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TreeList;

import React from 'react';
import './TreeCards.css'
import { IndividualTree } from '../IndividualTree/IndividualTree';
import GuayacanRosado from '../../../assets/imagenes/Guayacan Rosado.jpg';
import RobleComun from '../../../assets/imagenes/roble-comun.jpg';
import Manzano from '../../../assets/imagenes/Manzano.jpg'
import Caoba from '../../../assets/imagenes/Caoba.jpg'
import Pino from '../../../assets/imagenes/Pino.jpg'
import Acacia from '../../../assets/imagenes/Acacia.jpg'

// Agregar identificadores únicos en cada objeto del árbol
const treeData = [
  { id: 1, title: 'Guayacan Rosado', imageUrl: GuayacanRosado },
  { id: 2, title: 'Roble Común', imageUrl: RobleComun },
  { id: 3, title: "Manzano (Malus domestica)", imageUrl: Manzano },
  { id: 4, title: "Caoba (Swietenia macrophylla)", imageUrl: Caoba },
  { id: 5, title: "Pino (Pinus spp.)", imageUrl: Pino },
  { id: 6, title: "Acacia (Acacia spp.)", imageUrl: Acacia },


  // Agrega más árboles si es necesario
];

export const TreeCards = () => {
  return (
    <div className="tree-cards-container">
      {treeData.map((tree) => (
        <IndividualTree
          key={tree.id}
          title={tree.title}
          imageUrl={tree.imageUrl}
          link={`/tree-information/${tree.id}`}
        />
      ))}
    </div>
  );
};

export default TreeCards;

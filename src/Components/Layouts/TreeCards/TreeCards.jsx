import React from 'react';
import './TreeCards.css'
import { IndividualTree } from '../IndividualTree/IndividualTree';
import GuayacanRosado from '../../../assets/imagenes/Guayacan Rosado.jpg';
import RobleComun from '../../../assets/imagenes/roble-comun.jpg';

// Agregar identificadores únicos en cada objeto del árbol
const treeData = [
  { id: 1, title: 'Guayacan Rosado', imageUrl: GuayacanRosado },
  { id: 2, title: 'Roble Común', imageUrl: RobleComun },
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

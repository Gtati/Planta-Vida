import React from 'react';
import {IndividualTree} from '../IndividualTree/IndividualTree'
import GuayacanRosado from '../../../assets/imagenes/Guayacan Rosado.jpg'

export const TreeCards = () => {
  return (
    <div className="tree-cards-container">
      <IndividualTree
        title="Guayacan Rosado"
        imageUrl= {GuayacanRosado} 
        link="/tree-information"
      />
      <IndividualTree
        title="Tree 2"
        imageUrl="url-de-la-imagen-2"
        link="/tree-information"
      />
      {/* Agrega más TreeCard con distintos títulos, imágenes y links según sea necesario */}
    </div>
  );
};

export default TreeCards;

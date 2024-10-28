import React from 'react';
import {IndividualTree} from '../IndividualTree/IndividualTree'
import GuayacanRosado from '../../../assets/imagenes/Guayacan Rosado.jpg'
import RobleComun from '../../../assets/imagenes/roble-comun.jpg'

export const TreeCards = () => {
  return (
    <div className="tree-cards-container">
      <IndividualTree
        title="Guayacan Rosado"
        imageUrl= {GuayacanRosado} 
        link="/tree-information"
      />
      <IndividualTree
        title="Roble Común"
        imageUrl= {RobleComun}
        link="/tree-information"
      />
      {/* Agrega más TreeCard con distintos títulos, imágenes y links según sea necesario */}
    </div>
  );
};

export default TreeCards;

// src/components/TreeCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './IndividualTree.css'; // Opcional para estilos

export const IndividualTree = ({ title, imageUrl, link }) => {
  return (
    <Link to={link} className="tree-card">
      <div className="card-content">
        <img src={imageUrl} alt={title} className="tree-images" />
        <h3 className="tree-title">{title}</h3>
      </div>
    </Link>
  );
};

export default IndividualTree;

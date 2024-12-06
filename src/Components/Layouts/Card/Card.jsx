import React, { useState } from 'react';
import './Card.css';
import { Modal } from '../Modal/Modal';
import { LuTrees } from "react-icons/lu";

export const Card = ({ title, content, buttonText, bonoId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getModalContent = () => {
    switch (bonoId) {
      case 1:
        return (
          <p>
            ◆ Siembra de un árbol nativo <br /><br />
            ◆ Mantenimiento por 18 meses <br /><br />
            ◆ Reporte de seguimiento del árbol por medio de la página web: <span className="resalto">www.plantavida.camaraarmenia.org.co</span><br /><br />
            ◆ Placa con numeración del árbol <br /><br />
            ◆ Envío de bono físico a la persona a quien está dirigido (territorio nacional) <br /><br />
            ◆ Valor: <span className="resalto">$100.000</span>
          </p>
        );
      case 2:
        return (
          <p>
            ◆ Siembra de un árbol nativo <br /><br />
            ◆ Mantenimiento por 18 meses <br /><br />
            ◆ Reporte de seguimiento del árbol por medio de la página web: <span className="resalto">www.plantavida.camaraarmenia.org.co</span><br /><br />
            ◆ Placa con numeración del árbol <br /><br />
            ◆ Envío de bono físico a la persona a quien está dirigido (territorio nacional) <br /><br />
            ◆ Valor: <span className="resalto">$100.000</span>
          </p>
        );
      case 3:
        return (
          <p>
            ◆ Siembra de un árbol nativo <br /><br />
            ◆ Mantenimiento por 18 meses <br /><br />
            ◆ Reporte de seguimiento del árbol por medio de la página web: <span className="resalto">www.plantavida.camaraarmenia.org.co</span><br /><br />
            ◆ Placa con numeración del árbol <br /><br />
            ◆ Envío de bono físico a la persona a quien está dirigido (territorio nacional) <br /><br />
            ◆ Valor: <span className="resalto">$100.000</span>
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bono">
      <LuTrees className="circle-icon" />
      <hr className="bono-line" />
      <h2 className="title-card">{title}</h2>
      <p className="text-card">{content}</p>
      <button className="button-card" onClick={handleOpenModal}>
        {buttonText}
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
        {getModalContent()}
      </Modal>
    </div>
  );
};

import React, { useState } from 'react';
import './Card.css';
import { Modal } from '../Modal/Modal';
import { LuTrees } from "react-icons/lu";

export const Card = ({ title, content, buttonText, modalContent }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bono">
      <LuTrees className='circle-icon'/>
      <hr className="bono-line" />
      <h2 className="title-card">{title}</h2>
      <p className="text-card">{content}</p>
      <button className="button-card" onClick={handleOpenModal}>
        {buttonText}
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
        {modalContent}
      </Modal>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import Navbar from "../../Navbar/Navbar";
import Carousel from "../../Layouts/Carrousel/Carrousel";
import { Card } from "../../Layouts/Card/Card";
import { LocationCard } from "../../Layouts/LocationCard/LocationCard";
import ImageLink from "../../Layouts/ImageLink/ImageLink";
import LaAurora from '../../../assets/imagenes/AuroraLogo.png';
import ContactForm from "../../Layouts/ContactForm/ContactForm";
import Pagos from "../../../assets/imagenes/formas-de-pago.jpg";
import { Information } from "../../Layouts/Information/Information";
import { Footer } from "../Footer/Footer";
import { FaTree, FaEdit } from "react-icons/fa";
import { GoGift } from "react-icons/go";

import './Home.css';

function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [bonos, setBonos] = useState([
    {
      id: 1,
      title: "Bono Celebración",
      content: "Este bono representa la siembra y cuidado de un árbol nativo, ideal para celebrar cumpleaños, bodas u otros momentos especiales.",
      backgroundColor: "#daff99"
    },
    {
      id: 2,
      title: "Bono Exequial",
      content: "Este bono está diseñado para rendir homenaje a una persona fallecida, ofreciendo una manera significativa de honrar su memoria.",
      backgroundColor: "#dbd7ff"
    },
    {
      id: 3,
      title: "Bono Ambiental",
      content: "Con este bono apoya la conservación y recuperación de los bosques de las zonas urbanas y rurales del departamento del Quindío.",
      backgroundColor: "#daeafd"
    }
  ]);

  const [selectedBono, setSelectedBono] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleEditBono = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Vas a editar este bono!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const bonoToEdit = bonos.find(bono => bono.id === id);
        setSelectedBono(bonoToEdit);
      }
    });
  };

  const handleSaveBono = () => {
    Swal.fire({
      title: '¿Deseas guardar los cambios?',
      text: "Se guardarán los cambios realizados en el bono.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setBonos(bonos.map(bono => (bono.id === selectedBono.id ? selectedBono : bono)));
        setSelectedBono(null);
        Swal.fire('¡Guardado!', 'Los cambios fueron guardados correctamente.', 'success');
      }
    });
  };

  const handleCancelEdit = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se perderán los cambios realizados.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedBono(null);
      }
    });
  };

  return (
    <div>
      <Navbar />
      <section id="quienes-somos" className="QuienesSomos">
        <div className="quienes-somos">
          <h2 className="title">Un programa liderado por <span className="title-span">La Cámara de Comercio de Armenia y del Quindío</span></h2>
          <h3 className="title-text">Más allá de plantar un árbol, este bono es símbolo de vida, un aporte al bienestar del planeta y al recuerdo de momentos memorables, que se prolongan desde la semilla hasta el crecimiento de un nuevo ser...</h3>
          <Carousel />
        </div>
      </section>

      <section id="nuestros-planes" className="NuestrosPlanes">
        <div className="containerBonos">
          <div className="header-bonos">
            <FaTree className="tree-icon" />
            <h2 className="title-bonos">Nuestros Planes</h2>
          </div>

          <div className="cards-container">
            {bonos.map(bono => (
              <div key={bono.id} className={`bonos${bono.id}`} style={{ backgroundColor: bono.backgroundColor }}>
                <div className="card-content">
                  <Card
                    title={bono.title}
                    content={bono.content}
                    buttonText="Ver Más"
                  />
                  {isAdmin && (
                    <button onClick={() => handleEditBono(bono.id)} className="edit-bono-button">
                      <FaEdit className="edit-icon" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedBono && (
        <div className="modal-bono-edit">
          <div className="modal-content">
            <h2>Editar Bono</h2>
            <label>Título del Bono:</label>
            <input
              type="text"
              value={selectedBono.title}
              onChange={(e) => setSelectedBono({ ...selectedBono, title: e.target.value })}
            />
            <label>Descripción del Bono:</label>
            <textarea
              value={selectedBono.content}
              onChange={(e) => setSelectedBono({ ...selectedBono, content: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleSaveBono} className='save-edit-bono'>Guardar</button>
              <button onClick={handleCancelEdit} className='cancel-edit-bono'>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <section id="preguntas-frecuentes" className="PreguntasFrecuentes">
        <div className="containerPreguntas">
          <div className="header-preguntas">
            <GoGift />
            <h2>Formas de Adquirir el Bono</h2>
          </div>
          <div className="formas-bono">
            <div className="preguntas-frecuentes">
              <h2>Nuestra Ubicación</h2>
              <LocationCard />
            </div>
            <div className="preguntas-frecuentes">
              <h2>Formas de Pago</h2>
              <ImageLink
                image={Pagos}
                linkUrl="https://www.bancolombia.com/centro-de-ayuda/canales/sucursal-virtual-personas"
                altText="Descripción de la imagen"
              />
            </div>
            <div className="preguntas-frecuentes">
              <h2>Nuestros Aliados</h2>
              <ImageLink
                image={LaAurora}
                linkUrl="https://funeraleslaaurora.com/"
                altText="Descripción de la imagen"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="FormularioContacto">
        <ContactForm />
      </section>

      <section className="infor">
        <Information />
      </section>

      <Footer />
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
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
import { FaTree } from "react-icons/fa";
import { GoGift } from "react-icons/go";

import './Home.css';

function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Bonos predeterminados, estos no cambiarán ni podrán eliminarse
  const [bonos, setBonos] = useState([
    {
      id: 1,
      title: "Bono Celebración",
      content: "Este bono representa la siembra y cuidado de un árbol nativo, ideal para celebrar cumpleaños, bodas, graduaciones u otros momentos especiales.",
      backgroundColor: "#daff99", // Color predeterminado
      buttonText: "Ver más",
      modalContent: (
        <p>
          ◆ Siembra de un árbol nativo <br /> <br />
          ◆ Mantenimiento por 18 meses <br /> <br />
          ◆ Reporte de seguimiento del árbol por medio de la página web: <span className="resalto"> www.plantavida.camaraarmenia.org.co. </span><br /> <br />
          ◆ Placa con numeración del árbol <br /> <br />
          ◆ Envío de bono físico a la persona a quien está dirigido (territorio nacional) <br /> <br />
          ◆ Valor: <span className="resalto"> $100.000 </span>
        </p>
      )
    },
    {
      id: 2,
      title: "Bono Exequial",
      content: "Este bono está diseñado para rendir homenaje a una persona fallecida, ofreciendo una manera significativa de honrar su memoria.",
      backgroundColor: "#dbd7ff", // Color predeterminado
      buttonText: "Ver Más",
      modalContent: (
        <p>
          ◆ Siembra de un árbol nativo <br /> <br />
          ◆ Mantenimiento por 18 meses <br /> <br />
          ◆ Reporte de seguimiento del árbol por medio de la página web: <span className="resalto"> www.plantavida.camaraarmenia.org.co. </span><br /> <br />
          ◆ Placa con numeración del árbol <br /> <br />
          ◆ Envío de bono físico a la persona a quien está dirigido (territorio nacional) <br /> <br />
          ◆ Valor: <span className="resalto"> $100.000 </span>
        </p>
      )
    },
    {
      id: 3,
      title: "Bono Ambiental",
      content: "Con este bono apoya la conservación y recuperación de los bosques de las zonas urbanas y rurales del departamento del Quindío.",
      backgroundColor: "#daeafd", // Color predeterminado
      buttonText: "Ver Más",
      modalContent: (
        <p>
          ◆ Siembra de un árbol nativo <br /> <br />
          ◆ Mantenimiento por 18 meses <br /> <br />
          ◆ Reporte de seguimiento del árbol por medio de la página web: <span className="resalto"> www.plantavida.camaraarmenia.org.co. </span><br /> <br />
          ◆ Placa con numeración del árbol <br /> <br />
          ◆ Envío de bono físico a la persona a quien está dirigido (territorio nacional) <br /> <br />
          ◆ Valor: <span className="resalto"> $100.000 </span>
        </p>
      )
    }
  ]);

  
 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoBono, setNuevoBono] = useState({
    title: '',
    content: '',
    modalContent: '',
    backgroundColor: '#ffffff' // Color inicial de los nuevos bonos
  });

  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    // Comprobamos si hay un usuario en el localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.role === 'admin') {
        setIsAdmin(true); // Si el usuario es admin, mostramos los botones de admin
      }
    }
    
    
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoBono(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const agregarBono = () => {
    if (nuevoBono.title && nuevoBono.content) {
      const bonoId = bonos.length + 1;
      const nuevoBonoObjeto = {
        id: bonoId,
        title: nuevoBono.title,
        content: nuevoBono.content,
        backgroundColor: nuevoBono.backgroundColor,
        buttonText: "Ver Más",
        className: "nuevo-bono",
        modalContent: (
          <p>
            ◆ Siembra de un árbol nativo <br /> <br />
            ◆ Mantenimiento por 18 meses <br /> <br />
            ◆ Reporte de seguimiento del árbol por medio de la página web: <span className="resalto"> www.plantavida.camaraarmenia.org.co. </span><br /> <br />
            ◆ Placa con numeración del árbol <br /> <br />
            ◆ Envío de bono físico a la persona a quien está dirigido (territorio nacional) <br /> <br />
            ◆ Valor: <span className="resalto"> $100.000 </span>
          </p>
        )
      };
      setBonos([...bonos, nuevoBonoObjeto]);
      setNuevoBono({ title: '', content: '', modalContent: '', backgroundColor: '#ffffff' });
      setIsModalOpen(false); 
    }
  };

  const eliminarBono = (id) => {
    if (bonos.length > 3) { // Solo se puede eliminar bonos nuevos (id > 3)
      setBonos(bonos.filter(bono => bono.id !== id));
      setMensajeError(''); // Borrar mensaje de error si se elimina con éxito
    } else {
      setMensajeError('Debe crear más bonos primero para poder eliminar.');
    }
  };

  const abrirModal = () => {
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
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
                <Card
                  title={bono.title}
                  content={bono.content}
                  buttonText={bono.buttonText}
                  modalContent={bono.modalContent}
                />
                {bono.id > 3 && (
                  <button onClick={() => eliminarBono(bono.id)} className="eliminar-bono-button">Eliminar</button>
                )}
              </div>
            ))}
          </div>

      

          {isAdmin && (
        <div className="admin-controls">
          {/* Botón para agregar bonos */}
          <button className="add-bono-button" onClick={abrirModal}>Agregar Bono</button>


  
        </div>
      )}

        </div>
      </section>

      {isModalOpen && (
        <div className="modal-bono-edit">
          <div className="modal-content">
            <h2>Editar Bono</h2>
            <label>Título del Bono:</label>
            <input
              type="text"
              name="title"
              placeholder="Título del Bono"
              value={nuevoBono.title}
              onChange={handleInputChange}
            />
            <label>Descripción del Bono:</label>
            <textarea
              name="content"
              placeholder="Descripción del Bono"
              value={nuevoBono.content}
              onChange={handleInputChange}
            />
            <label>Color de Fondo:</label>
            <input
              type="color"
              name="backgroundColor"
              value={nuevoBono.backgroundColor}
              onChange={handleInputChange}
            />
            <div className="modal-buttons">
              <button onClick={agregarBono}>Agregar Bono</button>
              <button onClick={cerrarModal}>Cancelar</button>
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
              <h2>Nuestra Ubicacion</h2>
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

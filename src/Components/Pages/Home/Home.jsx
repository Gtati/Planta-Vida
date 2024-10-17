import Navbar from "../../Navbar/Navbar"
import Carousel from "../../Layouts/Carrousel/Carrousel"
import { Card } from "../../Layouts/Card/Card"
import { LocationCard } from "../../Layouts/LocationCard/LocationCard"
import ImageLink from "../../Layouts/ImageLink/ImageLink"
import LaAurora from '../../../assets/imagenes/AuroraLogo.png'
import ContactForm from "../../Layouts/ContactForm/ContactForm"
import Pagos from "../../../assets/imagenes/formas-de-pago.jpg"
import { Information } from "../../Layouts/Information/Information"
import { Footer } from "../Footer/Footer"
import { FaTree } from "react-icons/fa";
import { GoGift } from "react-icons/go";

import './Home.css'
function Home() {

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
            <div className="bonos1">
              <Card
                title="Bono Celebración"
                content="Este bono representa la siembra y cuidado de un árbol nativo, ideal para celebrar cumpleaños, bodas, graduaciones u otros momentos especiales."
                buttonText="Ver más"
                modalContent={
                  <p>
                    ◆ Siembra de un árbol nativo <br /> <br />
                    ◆ Mantenimiento por 18 meses <br /> <br />
                    ◆ Reporte de seguimiento del árbol por medio de la página web: <span className="resalto"> www.plantavida.camaraarmenia.org.co. </span><br /> <br />
                    ◆ Placa con numeración del árbol <br /> <br />
                    ◆ Envío de bono físico a la persona a quien está dirigido (territorio nacional) <br /> <br />
                    ◆ Valor: <span className="resalto"> $100.000 </span>
                  </p>
                }
              />
            </div>

            <div className="bonos2">
              <Card
                title="Bono Exequial"
                content="Este bono está diseñado para rendir homenaje a una persona fallecida, ofreciendo una manera significativa de honrar su memoria."
                buttonText="Ver Más"
                modalContent={
                  <p>
                    ◆ Siembra de un árbol nativo <br /> <br />
                    ◆ Mantenimiento por 18 meses <br /> <br />
                    ◆ Reporte de seguimiento del árbol por medio de la página web: <span className="resalto"> www.plantavida.camaraarmenia.org.co. </span><br /> <br />
                    ◆ Placa con numeración del árbol <br /> <br />
                    ◆ Envío de bono físico a la persona a quien está dirigido (territorio nacional) <br /> <br />
                    ◆ Valor: <span className="resalto"> $100.000 </span>
                  </p>
                }
              />
            </div>

            <div className="bonos3">
              <Card
                title="Bono Ambiental"
                content="Con este bono apoya la conservación y recuperación de los bosques de las zonas urbanas y rurales del departamento del Quindío."
                buttonText="Ver Más"
                modalContent={
                  <p>
                    ◆ Siembra de un árbol nativo <br /> <br />
                    ◆ Mantenimiento por 18 meses <br /> <br />
                    ◆ Reporte de seguimiento del árbol por medio de la página web: <span className="resalto"> www.plantavida.camaraarmenia.org.co. </span><br /> <br />
                    ◆ Placa con numeración del árbol <br /> <br />
                    ◆ Envío de bono físico a la persona a quien está dirigido (territorio nacional) <br /> <br />
                    ◆ Valor: <span className="resalto"> $100.000 </span>
                  </p>
                }
              />
            </div>
          </div>
        </div>
      </section>

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
  )

}
export default Home


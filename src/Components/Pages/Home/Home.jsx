import Navbar from "../../Navbar/Navbar"
import Carousel from "../../Layouts/Carrousel/Carrousel"
import {Card} from "../../Layouts/Card/Card"
import { LocationCard } from "../../Layouts/LocationCard/LocationCard"
import ImageLink from "../../Layouts/ImageLink/ImageLink"
import LaAurora from '../../../assets/AuroraLogo.png'
import ContactForm from "../../Layouts/ContactForm/ContactForm"
import Pagos from "../../../assets/formas-de-pago.jpg"
import { Information } from "../../Layouts/Information/Information"
import { Footer } from "../Footer/Footer"
import './Home.css'
function  Home() {

  return(
    <div>
      <Navbar/>
      <section id="quienes-somos" className="QuienesSomos">
            <div className="quienes-somos">
                <Carousel/>
            </div>
           </section>
           <section id="nuestros-planes" className="NuestrosPlanes">
            <div className="containerBonos">
           <div className="bonos1">
            <Card 
                title="Bono celebracion" 
                content="Este bono representa la siembra y mantenimiento de un árbol nativo; ideal para celebrar momentos como: cumpleaños, matrimonios, grados, nacimientos, aniversarios u otro acontecimiento." 
                buttonText="Ver más"
                modalContent={<p>Incluye: <br />

                  Siembra de un árbol nativo <br />
                  Mantenimiento por 18 meses <br />
                  Reporte de seguimiento del árbol por medio de la página web www.plantavida.camaraarmenia.org.co. <br />
                  Placa con numeración del árbol <br />
                  Envío de bono físico a la persona a quien está dirigido (territorio nacional)</p>}
            />
            </div>
            <div className="bonos2">
            <Card 
                title="Bono exequial" 
                content="Este bono es destinado a homenajear a una persona fallecida y recordar su existencia con la siembra de un árbol." 
                buttonText="Ver Más"
                modalContent={<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex distinctio magni dolor officiis tempore deserunt rem cum a eligendi neque harum fugit, ad sint dignissimos possimus, aperiam quia fuga eveniet!</p>}
            />
            </div>
            <div className="bonos3">
            <Card 
                title="Bono Aporte Ambiental" 
                content="Con este bono apoya la conservación y recuperación de los bosques de las zonas urbanas y rurales del departamento del Quindío." 
                buttonText="Ver Más"
                modalContent={<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex distinctio magni dolor officiis tempore deserunt rem cum a eligendi neque harum fugit, ad sint dignissimos possimus, aperiam quia fuga eveniet!</p>}
            />
            </div>
            </div>
           </section>
           <section id="preguntas-frecuentes" className="PreguntasFrecuentes">
            <div className="containerPreguntas">
            <div className="preguntas-frecuentes">
            <h2>Nuestra Ubicacion</h2>
            <LocationCard/>
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
           </section>
           <section id="contacto" className="FormularioContacto">

            <ContactForm/>
            </section>
            
           <section className="infor">
            <Information/>
           </section>
           
           <Footer/>

    </div>
  )

}
export default Home


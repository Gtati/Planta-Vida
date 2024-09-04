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
            <p className="text-container">Un programa liderado por la Cámara de Comercio de Armenia y del Quindío
            Más allá de plantar un árbol, este bono es símbolo de vida, un aporte al bienestar del planeta y al recuerdo de momentos memorables, que se prolongan desde la semilla hasta el crecimiento de un nuevo ser..</p>
           </section>
           <section id="nuestros-planes" className="NuestrosPlanes">
           <div className="bonos">
            <Card 
                title="Bono Exequial Planta Vida" 
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo obcaecati dolore quia harum accusamus veritatis eius autem. Fugiat voluptatum ratione veniam unde fuga aliquid consequuntur doloribus cumque distinctio error?" 
                buttonText="Conoce Más"
                modalContent={<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut culpa ullam, odio amet nulla voluptates vitae iusto voluptatem atque porro. Dolor voluptate enim eligendi nostrum dignissimos ullam saepe similique alias!</p>}
            />
            </div>
            <div className="bonos">
            <Card 
                title="Bono Exequial Planta Vida" 
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo obcaecati dolore quia harum accusamus veritatis eius autem. Fugiat voluptatum ratione veniam unde fuga aliquid consequuntur doloribus cumque distinctio error?" 
                buttonText="Conoce Más"
                modalContent={<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut culpa ullam, odio amet nulla voluptates vitae iusto voluptatem atque porro. Dolor voluptate enim eligendi nostrum dignissimos ullam saepe similique alias!</p>}
            />
            </div>
            <div className="bonos">
            <Card 
                title="Bono Aporte Ambiental" 
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo obcaecati dolore quia harum accusamus veritatis eius autem. Fugiat voluptatum ratione veniam unde fuga aliquid consequuntur doloribus cumque distinctio error?" 
                buttonText="Conoce Más"
                modalContent={<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex distinctio magni dolor officiis tempore deserunt rem cum a eligendi neque harum fugit, ad sint dignissimos possimus, aperiam quia fuga eveniet!</p>}
            />
            </div>
           </section>
           <section id="preguntas-frecuentes" className="PreguntasFrecuentes">
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
           </section>
           <section id="contacto" className="FormularioContacto">
            <ContactForm/>
            </section>
            
           <section className="infor">
            <Information/>
           </section>
           <section>

           </section>
           <Footer/>

    </div>
  )

}
export default Home


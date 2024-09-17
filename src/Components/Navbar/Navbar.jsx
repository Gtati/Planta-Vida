import logoPlantaVida from '../../assets/logoPlantaVida.png'
import { HashLink as Link } from 'react-router-hash-link';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='container-items'>
      <ul className='logo-list'>
        <Link smooth to='/'>
          <img src={logoPlantaVida} alt="Logo Planta Vida" className="logo" />
        </Link>
      </ul>
      <ul className='itemNavbar'>
        <li>
          <Link smooth to='/#quienes-somos' className='container1'>
            Quienes Somos
          </Link>
        </li>
        <li>
          <Link smooth to='/#nuestros-planes' className='container1'>
            Nuestros Planes
          </Link>
        </li>
        <li>
          <Link smooth to='/#preguntas-frecuentes' className='container1'>
            Preguntas Frecuentes
          </Link>
        </li>
        <li>
          <Link smooth to='/#contacto' className='container1'>
            Contacto
          </Link>
        </li>
      </ul>
      <button className='btn-login'>Login</button>
    </nav>
  );
};

export default Navbar;
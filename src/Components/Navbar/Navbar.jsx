import React, { useState, useEffect } from 'react';
import logoPlantaVida from '../../assets/imagenes/logoPlantaVidaBlanco.png';
import { HashLink as Link } from 'react-router-hash-link';
import { HiShoppingBag } from "react-icons/hi2";
import './Navbar.css';
import { useCart } from '../Layouts/CartContext/CartContext'; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Nuevo estado para controlar el hover
  const { cartItems } = useCart(); // Accedemos al contexto del carrito

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Manejo del evento hover (cuando el mouse entra y sale del área del carrito)
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <nav className={`container-items ${scrolled ? 'scrolled' : ''}`}>
      <ul className='logo-list'>
        <Link smooth to='/#quienes-somos'>
          <img src={logoPlantaVida} alt="Logo Planta Vida" className="logo" />
        </Link>
      </ul>
      <ul className='itemNavbar'>
        <li><Link smooth to='/#quienes-somos' className='container1'>Quienes Somos</Link></li>
        <li><Link smooth to='/#nuestros-planes' className='container1'>Nuestros Planes</Link></li>
        <li><Link smooth to='/#preguntas-frecuentes' className='container1'>Formas de Adquirir Bono</Link></li>
        <li><Link smooth to='/#contacto' className='container1'>Contacto</Link></li>
      </ul>
      <div className='buttons'>
        <Link smooth to='/shopping-cart' className='btn'>
          <div
            className="cart-container"
            onMouseEnter={handleMouseEnter} // Activa el estado al entrar el mouse
            onMouseLeave={handleMouseLeave} // Desactiva el estado al salir el mouse
          >
            <HiShoppingBag className='shopi-bag' />
            {cartItems > 0 && <div className="cart-indicator">{cartItems}</div>}

            {/* Muestra el mensaje solo cuando el carrito está vacío y el icono está en hover */}
            {cartItems === 0 && isHovered && (
              <div className="cart-tooltip">
                El carrito está vacío
              </div>
            )}
          </div>
        </Link>
        <Link smooth to='/LogIn' className='btn'>Iniciar Sesión</Link>
        <Link smooth to='/SignUp' className='btn register'>Registrarse</Link>
      </div>
    </nav>
  );
};

export default Navbar;

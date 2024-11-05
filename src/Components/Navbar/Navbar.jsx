import React, { useState, useEffect } from 'react';
import logoPlantaVida from '../../assets/imagenes/logoPlantaVidaBlanco.png';
import { HashLink as Link } from 'react-router-hash-link';
import { HiShoppingBag } from "react-icons/hi2";
import './Navbar.css';
import { useCart } from '../Layouts/CartContext/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { cartItems } = useCart(); // Obtiene el número de artículos en el carrito

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <nav className={`container-items ${scrolled ? 'scrolled' : ''}`}>
      <ul className='logo-list'>
        <Link smooth to='/#quienes-somos'>
          <img src={logoPlantaVida} alt="Logo Planta Vida" className="logo" />
        </Link>
      </ul>

      {/* Menú Hamburguesa */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>

      {/* Icono de cierre (X) cuando el menú está abierto */}
      <div className={`close-icon ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)}>
        &#10005;
      </div>

      {/* Menú lateral */}
      <ul className={`itemNavbar ${isOpen ? 'open' : ''}`}>
        <li onClick={() => setIsOpen(false)}>
          <Link smooth to='/#quienes-somos' className='container1'>Quienes Somos</Link>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <Link smooth to='/#nuestros-planes' className='container1'>Nuestros Planes</Link>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <Link smooth to='/#preguntas-frecuentes' className='container1'>Formas de Adquirir Bono</Link>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <Link smooth to='/#contacto' className='container1'>Contacto</Link>
        </li>
      </ul>

      {/* Botones de carrito, login y registro */}
      <div className='buttons'>
        <Link smooth to='/shopping-cart' className='btn'>
          <div
            className="cart-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <HiShoppingBag className='shopi-bag' />
            {cartItems > 0 && <div className="cart-indicator">{cartItems}</div>} {/* Muestra el contador */}
            {cartItems === 0 && isHovered && (
              <div className="cart-tooltip">El carrito está vacío</div> // Tooltip para carrito vacío
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

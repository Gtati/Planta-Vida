import React, { useState, useEffect } from 'react';
import logoPlantaVida from '../../assets/imagenes/logoPlantaVidaBlanco.png';
import { HashLink as Link } from 'react-router-hash-link';
import { HiShoppingBag, HiUserCircle } from "react-icons/hi2";
import Swal from 'sweetalert2';
import './Navbar.css';
import { useCart } from '../Layouts/CartContext/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se cerrará tu sesión actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        setUser(null);
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: 'Tu sesión ha sido cerrada correctamente.',
          confirmButtonText: 'Ok',
        });
      }
    });
  };

  return (
    <nav className={`container-items ${scrolled ? 'scrolled' : ''}`}>
      <ul className='logo-list'>
        <Link smooth to='/#quienes-somos'>
          <img src={logoPlantaVida} alt="Logo Planta Vida" className="logo" />
        </Link>
      </ul>

      <ul className='itemNavbar'>
        <li>
          <Link smooth to='/#quienes-somos' className='container1'>Quienes Somos</Link>
        </li>
        <li>
          <Link smooth to='/#nuestros-planes' className='container1'>Nuestros Planes</Link>
        </li>
        <li>
          <Link smooth to='/#preguntas-frecuentes' className='container1'>Formas de Adquirir Bono</Link>
        </li>
        <li>
          <Link smooth to='/#contacto' className='container1'>Contacto</Link>
        </li>
      </ul>

      <div className='buttons'>
        <Link smooth to='/shopping-cart' className='btn'>
          <HiShoppingBag className='shopi-bag' />
          {cartItems > 0 && <div className="cart-indicator">{cartItems}</div>}
        </Link>

        {user ? (
          <>
            <div className="profile-icon">
              <HiUserCircle size={30} />
              <span>{user.username}</span>
            </div>
            {user.role === 'admin' && (
              <button
                onClick={() => alert('Habilitando edición del Home...')}
                className="edit-home-button"
              >
                Editar Home
              </button>
            )}
            <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link smooth to='/LogIn' className='btn-sign'>Iniciar Sesión</Link>
            <Link smooth to='/SignUp' className='register'>Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

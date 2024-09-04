import logoPlantaVida from '../../assets/plantavida-logo.webp'
import { FaSearch } from "react-icons/fa";
import { TbShoppingCart } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import { HashLink as Link} from 'react-router-hash-link';
import "./Navbar.css"


const Navbar = () => {
    return(
<nav className='container-items'>
    <ul>
        <Link smooth to='/'>
        <img src={logoPlantaVida} alt=""  className="logo"/>
        </Link>
       
        </ul>
        <ul className='itemNavbar'>
        <li>
        <Link smooth to='/#quienes-somos' className='container1'>
        Quienes Somos
        </Link>
        </li>
        <li>
        <Link smooth to='/#nuestros-planes' className='container1' >
        Nuestros planes
        </Link>
        </li>
        <li>
        <Link smooth to='/#preguntas-frecuentes' className='container1'>
        Preguntas frecuentes
        </Link>
        </li>
        <li>
        <Link smooth to='/#contacto' className='container1'>
        Contacto
        </Link>
        </li>
    </ul>

    <ul className='itemNavbar'>
<li >

<NavLink to='/contactenos' >
<FaSearch className='icons'/>
</NavLink>
</li>
<li >
    <NavLink to="/">
<TbShoppingCart className='icons'/>
</NavLink>
</li>
<li >
    <NavLink to="/signIn">
<FaRegUserCircle className='icons'/>
</NavLink>
</li>
    </ul>
</nav>
    )
}

export default Navbar  
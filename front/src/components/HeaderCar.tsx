import logoUrl from '../img/logo.png'
import {Link} from 'react-router-dom'
import BurgerMenu from './BurgerMenu';
import useBurger from '../hooks/useBurger';
import { CartModal } from './CartModal';
import { useCartContext } from '../context/cartContext';
export default function HeaderCar({ fixed, title }:{fixed: boolean, title: string}) {
  const { cart } = useCartContext(); 
    const { isOpen, toggleMenu } = useBurger()

  return (
    <header className={fixed ? 'header fixed' : 'header '} id="header">
    <div className="container">
        <div className="header__inner">
            <div className="header__logo">
                <Link to="/">
                    <img src={logoUrl} alt=""/>
                </Link>
            </div>
            <nav className={`nav ${isOpen ? 'show' : ''}`} id="nav">
              <Link to="/" className="nav__link ">← Повернутись до автосалону</Link>
              <div className="nav__link active">{title}</div>
              <CartModal cart={cart} />
            </nav>
            <BurgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
    </div>
</header>
  )
}
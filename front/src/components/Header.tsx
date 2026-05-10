import BurgerMenu from './BurgerMenu'; 
import logoUrl from '../img/logo.png';
import useBurger from '../hooks/useBurger';
import { useLocation } from 'react-router-dom';
import Button from './Button/Button';
import { useAdmin } from '../context/adminContext';
import { useCartContext } from '../context/cartContext';
import { CartModal } from './CartModal';

const Header = ({ scrollToElements, fixed }: any) => {
    const { cart } = useCartContext(); 

    const { isOpen, toggleMenu, handleLinkClick } = useBurger()
    const { user, logout, error} = useAdmin();
    const location = useLocation()
    const isAdminPage = location.pathname.includes('/admin')

    return (
        <header className={fixed ? 'header fixed' : 'header '} id="header">
            <div className="container">
                <div className="header__inner">
                    <div className="header__logo">
                        <img src={logoUrl} alt="" />
                    </div>
                    <nav className={`nav ${isOpen ? 'show' : ''}`} id="nav">
                        {isAdminPage ? 
                            <>
                            <div style={{fontSize: '15px', textTransform: 'none'}} className='nav__link'> User: {user} </div>
                            <div className='nav__link'><Button isActive={!error} onClick={logout}>Logout</Button></div>
                            </>
                         : <>
                        <div onClick={() => { scrollToElements.mainScroll(); handleLinkClick(); }} className="nav__link">Головна</div>
                        <div onClick={() => { scrollToElements.autoScroll(); handleLinkClick();}} className="nav__link">Наші авто</div>
                        <div onClick={() => { scrollToElements.buyScroll(); handleLinkClick();}} className="nav__link">Замовити</div>
                        <div onClick={() => { scrollToElements.teamScroll(); handleLinkClick();}} className="nav__link">Наша команда</div>
                        <div onClick={() => { scrollToElements.interestingScroll(); handleLinkClick();}} className="nav__link">Цікаве про нас</div>
                        <CartModal cart={cart} />
                        </>}
                            
                    </nav>
                    <BurgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
                </div>
            </div>
        </header>
    );
};

export default Header;

import React from 'react';

interface BurgerMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, toggleMenu }) => {
    return (
        <button className={`burger ${isOpen ? 'open' : ''}`} type="button" id="navToggle" onClick={toggleMenu}>
            <span className="burger__item">
                <span className="burger__line"></span>
                <span className="burger__line"></span>
                <span className="burger__line"></span>
            </span>
        </button>
    );
};

export default BurgerMenu;

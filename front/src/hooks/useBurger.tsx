import { useState } from 'react';

export default function useBurger() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleLinkClick = () => {
        closeMenu();
    };

    return {
        isOpen,
        toggleMenu,
        closeMenu,
        handleLinkClick, 
    };
}

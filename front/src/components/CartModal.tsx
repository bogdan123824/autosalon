import { useEffect, useState } from 'react';
import { PiCarProfile } from "react-icons/pi";
import CarBasket from './CarBasket'; 

export const CartModal = ({ cart }: any) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [cartCar, setCartCar] = useState<any>(null);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        const savedCar = localStorage.getItem('cartCar');
        if (savedCar) {
            setCartCar(JSON.parse(savedCar));
        }
    }, [isModalOpen]);

    return (
        <>
            <div className="nav__link">
                <PiCarProfile 
                    onClick={openModal} 
                    style={{ color: cart ? 'rgb(14 255 0)' : 'rgb(255 0 0)' }} 
                    size="40" 
                />
            </div>

            <CarBasket isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};
import { createContext, useContext, useEffect, useState } from 'react';
import { ICars } from '../interfaces/cars';

interface CartContextType {
    addCarToCart: (car: ICars) => void;
    isCarInCart: (id: string | undefined) => boolean;
    removeCarFromCart: () => void; 
    cart: ICars | null; 
}

const CartContext = createContext<CartContextType>({
    addCarToCart: () => {},
    isCarInCart: () => false,
    removeCarFromCart: () => {},
    cart: null, 
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<ICars | null>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : null;
    });

    useEffect(() => {
        if (cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart');
        }
    }, [cart]);

    const addCarToCart = (car: ICars) => {
        setCart(car); 
    };

    const isCarInCart = (id: string | undefined): boolean => {
        return cart?.id.toString() === id;
    };

    const removeCarFromCart = () => {
        setCart(null); 
    };

    return (
        <CartContext.Provider value={{ addCarToCart, isCarInCart, removeCarFromCart, cart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
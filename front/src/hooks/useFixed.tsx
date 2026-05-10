import { useEffect, useState } from 'react';

export default function useFixed() {
    const [fixed, setFixed] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setFixed(true);
        } else {
            setFixed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        scrollToTop();
    }, []);

    return fixed;
}

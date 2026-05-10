import React, { createContext, useContext, useState, useEffect } from 'react';
import { ICars } from '../interfaces/cars';
import { useParams } from 'react-router-dom';
import { IGalleryImage, GalleryType, IGallery } from '../interfaces/gallery';

interface CarContextType {
    getAllCars: () => Promise<any>;
    formatPrice: (price: string) => string;
    deleteCar: (id: number) => Promise<any>;
    car: ICars | null;
    setCar: React.Dispatch<React.SetStateAction<ICars | null>>;
    cars: ICars[];
    error: string | null;
    isLoading: boolean;
    getImgCar: (item: ICars) => string;
    getCar: (id: string) => Promise<ICars | null>;
    useCarId: () => number;
    deleteImages: number[];
    setDeleteImages: React.Dispatch<React.SetStateAction<number[]>>;
    getImagesByType: (type: GalleryType) => IGallery[];
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [car, setCar] = useState<ICars | null>(null);
    const [cars, setCars] = useState<ICars[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteImages, setDeleteImages] = useState<number[]>([]);

    const useCarId = () => {
        const params = useParams();
        return Number(params.id);
    };

    function formatPrice(price: string): string {
        return price.replace(/\d+/g, (match) => {
            return new Intl.NumberFormat('en-US').format(parseInt(match, 10));
        });
    }

    const getAllCars = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/getCars`
        );
        const dataCars = await response.json();
        setCars(dataCars.data);
        return dataCars;
    };

    const getCar = async (id: string) => {
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/getCarById`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), 
            }
        );
        if (response.ok) {
            const {car} = await response.json();
            setCar(car); 
            return car;
        } else {
            console.error('Failed to fetch car data');
            return null;
        }
    };

    const deleteCar = async (id: number) => {
        const params = {
            id,
        };
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/deleteCar`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete car');
        }

        const result = await response.json();
        await getAllCars();
        alert('Операція пройшла успішно');
        return result;
    };

    const getImagesByType = (type: GalleryType ): IGallery[] => {
        return car?.images.filter((image) => image.img_type === type)?? [];
    };

    const getImgCar = (item: ICars) => {
        const url = item.images.find(
            (image) => image.img_type === GalleryType.main
        )?.img_url;
        if (url) {
            return `${process.env.REACT_APP_DEV_URL}/${url}`;
        } else {
            return '';
        }
    };

    return (
        <CarContext.Provider value={{
            getAllCars,
            formatPrice,
            deleteCar,
            car,
            cars,
            error,
            isLoading,
            getImgCar,
            getCar,
            useCarId,
            deleteImages,
            setDeleteImages,
            getImagesByType,
            setCar
        }}>
            {children}
        </CarContext.Provider>
    );
};

export const useCarContext = () => {
    const context = useContext(CarContext);
    if (context === undefined) {
        throw new Error('useCarContext must be used within a CarProvider');
    }
    return context;
};
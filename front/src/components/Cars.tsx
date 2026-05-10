import { ICars } from '../interfaces/cars';
import CarItem from './CarItem';
import { forwardRef, useEffect, useState } from 'react';

const Cars = forwardRef<HTMLDivElement>((props, ref) => {
    const [cars, setCars] = useState<ICars[]>([]);
    useEffect(() => {
        getAllCars();
    }, []);

    const getAllCars = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/getCars`
        );
        const dataCars = await response.json();
        setCars(dataCars.data);
        return dataCars;
    };


    return (
            <div ref={ref} className="container " id="our-auto">
                <h2 className="h2-auto">Наші авто</h2>
                <div className="our-auto">
                {cars.map((item: ICars) => (
                    <CarItem key={item.id} {...item} />
                ))}
                </div>
            </div>
    )
})

export default Cars;
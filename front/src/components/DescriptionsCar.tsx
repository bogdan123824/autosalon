import { useParams } from "react-router-dom";
import { useCarContext } from "../context/carContext";
import { useEffect } from "react";
import SalonCar from "./SalonCar";

export default function DescriptionsCar() {

    const { car, getCar} = useCarContext();
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        if (id) {
            getCar(id);
        }
    }, [id]);  

    return (
    <>
    <div className="auto--info line">
    <div className="auto--info__title h2-auto">Опис</div>
        <div className="container auto" >
            <div className="auto--info__inner">
            <div className="auto--info__title h2-auto" style={{padding: '0', marginBottom: '25px'}}>Дізнаємось про авто детальніше</div>

            {car?.description_info && car?.description_info?.length > 0 ? (
                   car?.description_info?.map((description, index) => (
                    <div key={index} className="auto--info__text">
                        {description.description}
                    </div>
                ))
                ) : (
                    <div className="auto-gallery__no-images">
                        <p>Опис авто відсутній</p>
                    </div>
                )}
            </div>
            <div className="auto--info__inner">
                <SalonCar />
            </div>
        </div>
    </div>
            
    </>
    )
}
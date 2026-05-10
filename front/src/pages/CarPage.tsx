import '../css/car.css';
import '../css/index.css';
import GalleryCar from "../components/GalleryCar";
import CharacteristicsCar from "../components/CharacteristicsCar";
import DescriptionsCar from "../components/DescriptionsCar";
import Footer from "../components/Footer";
import HeaderCar from "../components/HeaderCar";
import useFixed from "../hooks/useFixed";
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useCarContext } from '../context/carContext';
import { GalleryType, IGallery } from '../interfaces/gallery';
import Button from '../components/Button/Button';
import { useCartContext } from '../context/cartContext';
import ModalBasketConfirm from '../components/ModalBasketConfirm';
import { ICars } from '../interfaces/cars';
import initDatabase from '../db/sqlite.init';

export default function CarPage() {
    const navigate = useNavigate();

    const fixed = useFixed();
    const [ images, setImages ] =  useState<IGallery[]>([]);
    const { car, getCar, getImagesByType} = useCarContext();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        initDatabase();
    }, []);

    const getImgCar = () => {
        let url = ''

        if (images && images.length > 0) {
            url =  images[0].img_url
        } 
        return `${process.env.REACT_APP_DEV_URL}/${url}`;
    };

    const { addCarToCart, isCarInCart, cart } = useCartContext();
    const [isAdded, setIsAdded] = useState(false); 

    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); 
    const [pendingCar, setPendingCar] = useState<ICars | null>(null);


    const handleAddCarToCart = () => {
        if (car) {
            if (cart && cart.id !== car.id) {
                setPendingCar(car);
                setConfirmModalOpen(true);
            } else {
                addCarToCart(car);
                setIsAdded(true);
            }
        }
    };

    const confirmOverwrite = () => {
        if (pendingCar) {
            addCarToCart(pendingCar);
            setIsAdded(true);
        }
        setConfirmModalOpen(false);
    };

    const cancelOverwrite = () => {
        setPendingCar(null);
        setConfirmModalOpen(false);
    };

    useEffect(() => {
        if (car) {
            const inCart = isCarInCart(car.id.toString());
            setIsAdded(inCart);
        }
    }, [car, isCarInCart]);

    useEffect(() => {
        if (id) {
            const loadCar = async () => {
                const car = await getCar(id);
                if (!car) {
                    navigate('/404')
                }
            }
        loadCar();
        }
    }, [id]);

    useEffect(() => {
        if (car) {
            document.title = `${car.title}`;
            const imgs = getImagesByType(GalleryType.hero)
            setImages(imgs)
        }
    }, [car]);
    
    return (
        <>
        <HeaderCar  title={car?.title ?? ''} fixed={fixed} />
        <div className="intro__auto" style={{ backgroundImage: `url(${getImgCar()})`  }}  id="intro"></div>
        <div className="container--auto" id="auto">
            <h1>{car?.title}</h1>
            <div className="auto">
                <GalleryCar  />
                <CharacteristicsCar />
            </div>
        </div>
        <DescriptionsCar />

        <Button
                isActive={isAdded}
                onClick={handleAddCarToCart}
                disabled={isAdded}
                style={{
                    margin: '20px auto',
                    display: 'flex'
                }}
            >
                {isAdded ? 'Авто вже додано' : 'Додати до кошика'}
        </Button>

        <ModalBasketConfirm
                isOpen={isConfirmModalOpen}
                onConfirm={confirmOverwrite}
                onCancel={cancelOverwrite}
            />
        
        <Footer />
        </>
        
    )
}
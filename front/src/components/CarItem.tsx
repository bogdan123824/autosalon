import { Link, useLocation  } from 'react-router-dom';
import { ICars } from '../interfaces/cars';
import { GalleryType, IGallery } from '../interfaces/gallery';
import { useCarContext } from '../context/carContext';

export default function CarItem(car: ICars) {

    const {id, title, description, price, images} = car
    const href = `/car/${id}`
    const location = useLocation()
    const isPricePage = location.pathname === '/price'

    const { formatPrice} = useCarContext();
    const getImgCar = (images: IGallery[]) => {
        const url =  images.find(
          (image) => image.img_type === GalleryType.main
      )?.img_url
      if (url) {
          return `${process.env.REACT_APP_DEV_URL}/${url}`;
      } else {
          return '';
      }
    };
    const priceCarString = `Price: from $${formatPrice(price.toString())} `

    return (
        <div className="our-auto__item" style={{padding: isPricePage ? '0 25px' : '0 40px'}}>
            {isPricePage 
            ? <>
            <img style={{transform: 'none'}} className="our-auto__icon" src={getImgCar(images)} alt=""/>
            <h4 className="our-auto__title">{title}</h4>
            </>
            : 
            <Link to={href}>
                <img className="our-auto__icon" src={getImgCar(images)} alt=""/>
                <h4 className="our-auto__title">{title}</h4>
            </Link>}
            <div className="our-auto__text">
                {isPricePage ? priceCarString : description}
            </div>
            <div className="our-auto__text">
                {isPricePage ? <Link to={href} className="btn--blue btn--red">Read more</Link> : null}
            </div>
        </div>
    )
}
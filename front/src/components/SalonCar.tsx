import { useCarContext } from "../context/carContext";
import { GalleryType } from "../interfaces/gallery";

export default function SalonCar() {
    const { getImagesByType } = useCarContext();

    const images = getImagesByType(GalleryType.description);
    

    const getGalleryImgCar = (url: string) => {
      if (url) {
          return `${process.env.REACT_APP_DEV_URL}/${url}`;
      } else {
          return '';
      }
    };

    return (
        <>
            <div className="auto--info__title h2-auto" style={{padding: '0'}}>Що ж всередині?</div>
            <div className="auto-gallery" style={{ justifyContent: 'center', margin: '30px auto'}}>

                {images && images.length > 0 ? (
                   images.map((item, index) => (
                        <div key={index} className="auto-gallery__item">
                            <img src={getGalleryImgCar(item.img_url)} alt="" className="auto-item"  style={{maxWidth: '240px'}}/>
                        </div>
                ))
                ) : (
                    <div className="auto-gallery__no-images">
                        <p>Фото салону відсутнє</p>
                    </div>
                )}
            </div>
        </>
        
    )
}
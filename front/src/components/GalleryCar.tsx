import { useCarContext } from "../context/carContext";
import { GalleryType, IGallery } from "../interfaces/gallery";

export default function GalleryCar() {
    const { getImagesByType } = useCarContext();

    const images = getImagesByType(GalleryType.gallery);
    

    const getGalleryImgCar = (url: string) => {
      if (url) {
          return `${process.env.REACT_APP_DEV_URL}/${url}`;
      } else {
          return '';
      }
    };

    return (
        <div className="auto--left">
            <h2>Фотогалерея</h2>
            <div className="auto-gallery">
                {images && images.length > 0 ? (
                   images.map((item, index) => (
                        <div key={index} className="auto-gallery__item">
                            <img src={getGalleryImgCar(item.img_url)} alt="" className="auto-item" />
                        </div>
                ))
                ) : (
                    <div className="auto-gallery__no-images">
                        <p>Фото відсутнє</p>
                    </div>
                )}
            </div>
        </div>
    )
}
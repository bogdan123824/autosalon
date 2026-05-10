import { useEffect, useState } from 'react';
import ImagePreview from './ImagePreview';
import { useCarContext } from '../../context/carContext';
import { GalleryType } from '../../interfaces/gallery';

interface GeneralInfoCarProps {
    heroFile: File | null;
    setHeroFile: (file: File | null) => void;
    heroFileName: string | null;
    setHeroFileName: (fileName: string | null) => void;
}

export default function HeroImageCar({ heroFile, setHeroFile, heroFileName, setHeroFileName}: GeneralInfoCarProps) {

    const [imgId, setImgId] = useState<number | null>(null);
    const { deleteImages, setDeleteImages, getImagesByType, car } =
        useCarContext();

    useEffect(() => {
        if (car?.images && car.images.length > 0) {
            const heroImages = getImagesByType(GalleryType.hero);
            if (heroImages.length > 0) {
                setHeroFileName(heroImages[0].img_url.split('/').pop() || null);
                setImgId(heroImages[0].id);
            }
        }
    }, [car]);

    return (
        <>
            <div className="input-group">
                <label className="file-label" htmlFor="hero">
                    {heroFile ? heroFile.name : heroFileName || 'Choose hero image'}
                </label>
                <input
                    type="file"
                    id="hero"
                    onChange={(e) => {
                        setHeroFile(e.target.files ? e.target.files[0] : null);
                        setHeroFileName(
                            e.target.files ? e.target.files[0].name : null
                        );
                        if (imgId && !deleteImages.includes(imgId)) {
                            setDeleteImages([...deleteImages, imgId]);
                        }
                    }}
                    required={!car}
                />
            </div>
            <ImagePreview
                file={heroFile}
                handleFileRemove={() => {
                    setHeroFile(null);
                    setHeroFileName(null);
                    if (imgId && !deleteImages.includes(imgId)) {
                        setDeleteImages([...deleteImages, imgId]);
                    }
                }}
                imageUrl={
                    heroFileName
                        ? `${process.env.REACT_APP_DEV_URL}/images/cars/${car?.id}/${heroFileName}`
                        : undefined
                }
            />
            
        </>
    );
}

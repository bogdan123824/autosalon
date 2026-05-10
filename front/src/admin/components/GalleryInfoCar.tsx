import { useEffect, useState } from "react";
import { ICars } from "../../interfaces/cars";
import ImagePreview from "./ImagePreview";
import { GalleryType, IGalleryImage } from "../../interfaces/gallery";
import { useParams } from "react-router-dom";
import { useCarContext } from "../../context/carContext";

interface GalleryInfoCarProps {
    galleryImages: IGalleryImage[];
    setGalleryImages: (galleryImages: IGalleryImage[]) => void;
    car: ICars | null;
}

export default function GalleryInfoCar({ galleryImages, setGalleryImages }: GalleryInfoCarProps) {

    const { car, getCar, deleteImages, setDeleteImages, getImagesByType } = useCarContext();
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        if (id) {
            getCar(id);
        }
    }, [id]);

    const deleteImgs = (index: number) => {
        const newGalleryImages = galleryImages.filter((img, idx) => idx !== index);
        if (newGalleryImages.length === 0) {
            newGalleryImages.push({
                fileName: null,
                file: null,
                id: 0
            });
        } 
        setGalleryImages(newGalleryImages);
    };

    const handleOnChangFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newGalleryImages = Array.from(files).map((file) => ({
                file: file,
                fileName: file.name,
                imageUrl: URL.createObjectURL(file),
            }));
            setGalleryImages([...galleryImages, ...newGalleryImages]);
        }
    };

    useEffect(() => {
                if (car?.images) {
                    const imagesFromServer = getImagesByType(GalleryType.gallery)
                    const galleryImagesFromServer = imagesFromServer.map((image) => ({
                            fileName: image.img_url.split('/').pop() ?? null,
                            imageUrl: `${process.env.REACT_APP_DEV_URL}/${image.img_url}`,
                            file: null, 
                            id: image.id
                        }));
                        if (galleryImagesFromServer.length === 0) {
                            galleryImagesFromServer.push({
                                fileName: null,
                                imageUrl: '',
                                file: null,
                                id: 0
                            });
                        }
                    setGalleryImages(galleryImagesFromServer);
                }
        
    }, [car]);
    
    return (
        <>
             <div className="input-group gallery-input">
                        {galleryImages.map((image, index) => (
                            <div key={index}>
                            <input
                            type="file"
                            id={`gfile${index}`}
                            onChange={(e) => {
                                handleOnChangFile(e);
                            }}
                            required={!car}
                        />

                            <ImagePreview
                                key={index}
                                file={image.file}
                                handleFileRemove={() => {
                                    deleteImgs(index);
                                    if (image.id && !deleteImages.includes(image.id)) {
                                        setDeleteImages([...deleteImages, image.id]);
                                    } 
                             }}
                                imageUrl={
                                image.fileName
                                    ? `${process.env.REACT_APP_DEV_URL}/images/cars/${car?.id}/${image.fileName}`
                                    : undefined
                            }
                                maxWidth="200"
                            />
                            </div>
                        ))}
                        <label className="gallery-label" htmlFor="gfile0">
                            +
                        </label>
            </div>
                    
        </>
    )
}
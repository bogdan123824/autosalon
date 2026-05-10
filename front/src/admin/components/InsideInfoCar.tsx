import { useEffect, useState } from "react";
import { ICars } from "../../interfaces/cars";
import ImagePreview from "./ImagePreview";
import { GalleryType, ISalonImage } from "../../interfaces/gallery";
import { useParams } from "react-router-dom";
import { useCarContext } from "../../context/carContext";

interface SalonInfoCarProps {
    salonImages: ISalonImage[];
    setSalonImages: (salonImages: ISalonImage[]) => void;
    car: ICars | null;
}

export default function InsideInfoCar({ salonImages, setSalonImages }: SalonInfoCarProps) {

    const { car, getCar, deleteImages, setDeleteImages, getImagesByType } = useCarContext();
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        if (id) {
            getCar(id);
        }
    }, [id]);

    const deleteImgs = (index: number) => {
        const newSalonImages = salonImages.filter((img, idx) => idx !== index);
        if (newSalonImages.length === 0) {
            newSalonImages.push({
                fileName: null,
                file: null,
                id: 0
            });
        } 
        setSalonImages(newSalonImages);
    };

    const handleOnChangFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newSalonImages = Array.from(files).map((file) => ({
                file: file,
                fileName: file.name,
                imageUrl: URL.createObjectURL(file),
            }));
            setSalonImages([...salonImages, ...newSalonImages]);
        }
    };

    useEffect(() => {
                if (car?.images) {
                    const imagesFromServer = getImagesByType(GalleryType.description)
                    const descriptionImagesFromServer = imagesFromServer.map((image) => ({
                            fileName: image.img_url.split('/').pop() ?? null,
                            imageUrl: `${process.env.REACT_APP_DEV_URL}/${image.img_url}`,
                            file: null, 
                            id: image.id
                        }));
                        if (descriptionImagesFromServer.length === 0) {
                            descriptionImagesFromServer.push({
                                fileName: null,
                                imageUrl: '',
                                file: null,
                                id: 0
                            });
                        }
                    setSalonImages(descriptionImagesFromServer);
                }
        
    }, [car]);
    
    return (
        <>
             <div className="input-group gallery-input">
                        {salonImages.map((image, index) => (
                            <div key={index}>
                            <input
                            type="file"
                            id={`description${index}`}
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
                        <label className="gallery-label" htmlFor="description0">
                            +
                        </label>
            </div>
                    
        </>
    )
}
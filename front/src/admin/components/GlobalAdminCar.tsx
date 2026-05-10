import { useEffect, useState } from "react";
import { ICars } from "../../interfaces/cars";
import GeneralInfoCar from "./GeneralInfoCar";
import useFixed from "../../hooks/useFixed";
import Header from "../../components/Header";
import AdditionalInfoCar from "./AdditionalInfoCar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IAdditionalBlock } from "../../interfaces/additionalInfoCar";
import GalleryInfoCar from "./GalleryInfoCar";
import { IGalleryImage, ISalonImage } from "../../interfaces/gallery";
import DescriptionInfoCar from "./DescriptionInfoCar";
import { IDescriptionBlock } from "../../interfaces/descriptionBlocks";
import { useCarContext } from "../../context/carContext";
import InsideInfoCar from "./InsideInfoCar";
import HeroImageCar from "./HeroImageCar";
import { IBrand } from "../../interfaces/brand";


export default function GlobalAdminCar() {
    const { getCar, deleteImages, setDeleteImages, car} = useCarContext();
    const fixed = useFixed();
    const [title, setTitle] = useState(car?.title || '');
    const [description, setDescription] = useState(car?.description || '');
    const [price, setPrice] = useState(car?.price?.toString() || '');
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null); 

    const [galleryImages, setGalleryImages] = useState<IGalleryImage[]>([{file: null, fileName: null}]);
    const [salonImages, setSalonImages] = useState<ISalonImage[]>([{file: null, fileName: null}]);

    const [heroFile, setHeroFile] = useState<File | null>(null);
    const [heroFileName, setHeroFileName] = useState<string | null>(null);

    const [blocks, setBlocks] = useState<IAdditionalBlock[]>([]);
    const [descriptionBlocks, setDescriptionBlocks] = useState<IDescriptionBlock[]>([]);

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (id) {
            getCar(id);
            setBlocks(car?.additional_info || []);
            setDescriptionBlocks(car?.description_info || []);
        }
    }, [id]);

    useEffect(() => {
        const getAllBrand = async () => {
            const response = await fetch(
                `${process.env.REACT_APP_DEV_URL}/getBrands`
            );
            const dataBrands = await response.json();
            setBrands(dataBrands.data);
            return dataBrands;
        };
    
        getAllBrand();
    }, [id]);

    const saveCar = async (event: React.FormEvent) => {
        event.preventDefault();
        const instruction = []
        const formData = new FormData();
        if (heroFile) {
            const hero = {
                fileName: heroFile.name,
                imgType: 'hero',
            }
            instruction.push(hero);
            formData.append('file', heroFile);
        }
        if (file) {
            const main = {
                fileName: file.name,
                imgType: 'main',
            }
            instruction.push(main);
            formData.append('file', file);
        }
        galleryImages.forEach((image, index) => {
            if (image.file) {
                const gallery = {
                    fileName: image.fileName,
                    imgType: 'gallery',
                }
                instruction.push(gallery);
                formData.append(`file`, image.file);
            }
        });
        salonImages.forEach((image, index) => {
            if (image.file) {
                const salon = {
                    fileName: image.fileName,
                    imgType: 'description',
                }
                instruction.push(salon);
                formData.append(`file`, image.file);
            }
        });
        formData.append('instruction', JSON.stringify(instruction));
        formData.append('deleteImages', JSON.stringify(deleteImages));
        if (selectedBrand) {
            formData.append('brand', selectedBrand.id.toString());
        }
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('blocks', JSON.stringify(blocks));
        formData.append('descriptionBlocks', JSON.stringify(descriptionBlocks));
        if (car) {
            formData.append('id', car.id.toString());
        }
        const url = car
            ? `${process.env.REACT_APP_DEV_URL}/updateCar`
            : `${process.env.REACT_APP_DEV_URL}/addCar`;

        const method = car ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            body: formData,
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit car');
        }

        const result = await response.json();
        alert('Операція пройшла успішно');
        console.log('Car submitted successfully:', result);
    }

    return(
    <div className="container">
        <Header fixed={fixed} />
        <h1 style={{marginTop: '75px'}}>{car ? `General Info car: ${car?.title}` : 'New car'}</h1>
        <form onSubmit={saveCar}>
        <div className="block-content">
            <div className="modal-content">
                <h2>Main info</h2>
                <GeneralInfoCar 
                        file={file} 
                        setFile={setFile} 
                        fileName={fileName} 
                        setFileName={setFileName}
                        brands={brands}
                        selectedBrand={selectedBrand}
                        setSelectedBrand={setSelectedBrand}
                        title={title} 
                        setTitle={setTitle} 
                        description={description} 
                        setDescription={setDescription} 
                        price={price} 
                        setPrice={setPrice} 
                        />
                </div>
                <div className="modal-content">
                <h2>Hero image</h2>
                <HeroImageCar 
                    heroFile={heroFile}
                    setHeroFile={setHeroFile}
                    heroFileName={heroFileName}
                    setHeroFileName={setHeroFileName}
                />
            </div>
            <div className="modal-content">
                <h2>Gallery</h2>
                <GalleryInfoCar 
                galleryImages={galleryImages}
                setGalleryImages={setGalleryImages}
                    car={car}
                />
            </div>
            <div className="modal-content">
                <h2>Additional info</h2>
                <AdditionalInfoCar
                blocks={blocks}
                setBlocks={setBlocks}
                car={car}
                />
            </div>
        </div>
        <h2 className="auto--info__title h2-auto">Description</h2>
        <div className="block-content">
            <div className="modal-content">
                <h2>Info</h2>
                <DescriptionInfoCar
                descriptionBlocks={descriptionBlocks}
                setDescriptionBlocks={setDescriptionBlocks}
                car={car}
                />
            </div>
            <div className="modal-content">
                <h2>Inside the car</h2>
                <InsideInfoCar
                salonImages={salonImages}
                setSalonImages={setSalonImages}
                car={car}
                />
            </div>
        </div>
                <div className="btn-content">
                    <button
                            type="submit"
                            className="action-btn-modal btn-create btn--red"
                            onClick={saveCar}
                            >
                            {car ? 'Save' : 'Add'}
                        </button>
                        <Link to='/admin'
                            className="action-btn-modal btn-create cancel-btn"
                            style={{textDecoration: 'none'}}>
                            Cancel
                        </Link>
                </div>
            
        </form>
       
                        
    </div>
    )
}
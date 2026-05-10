import { useEffect, useState } from 'react';
import '../../css/carModal.css';
import { ICars } from '../../interfaces/cars';
import { Link } from 'react-router-dom';
import GeneralInfoCar from './GeneralInfoCar';
import { useCarContext } from '../../context/carContext';
import { IBrand } from '../../interfaces/brand';

interface CarModalProps {
    car: ICars | null;
    onClose: () => void;
    getAllCars: () => void;
}

export default function CarModal({ car, onClose, getAllCars }: CarModalProps) {
    const [title, setTitle] = useState(car?.title || '');
    const [description, setDescription] = useState(car?.description || '');
    const [price, setPrice] = useState(car?.price?.toString() || '');
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const { deleteImages, setDeleteImages} = useCarContext();

    const [brands, setBrands] = useState<IBrand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null); 

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
    }, [car?.id]);

    const href = car?.id ? `/admin/car/${car.id}` : '/admin/car/new';

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const instruction = []
        const formData = new FormData();
        if (file) {
            const main = {
                fileName: file.name,
                imgType: 'main',
            }
            instruction.push(main);
            formData.append('file', file);
        }
        formData.append('instruction', JSON.stringify(instruction));
        formData.append('deleteImages', JSON.stringify(deleteImages));
        if (selectedBrand) {
            formData.append('brand', selectedBrand.id.toString());
        }
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
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
        console.log('Car submitted successfully:', result);

        getAllCars();
        alert('Операція пройшла успішно');
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{car ? 'Edit Car' : 'Add Car'}</h2>
                <form onSubmit={handleSubmit}>
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
                    <div className="modal-actions">
                        <button
                            type="submit"
                            className={car ? 'action-btn-modal edit-btn' : 'action-btn-modal btn--red'}
                        >
                            {car ? 'Update' : 'Add'}
                        </button>
                        <Link
                            to={href}
                            style={{
                                backgroundColor: 'rgb(169, 169, 169)', 
                                textDecoration: 'none',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgb(169, 169, 169)'; 
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgb(105, 105, 105)'; 
                            }}
                            className="action-btn-modal"
                        >
                            More details
                        </Link>
                        <button
                            type="button"
                            className="action-btn-modal cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

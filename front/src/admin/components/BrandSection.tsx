import { useEffect, useState } from 'react';
import '../../css/table-cars-section.css';
import { IBrand } from '../../interfaces/brand';
import BrandModal from './BrandModal';

export default function BrandSection() {
    const [brand, setBrand] = useState<IBrand[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentBrand, setCurrentBrand] = useState<IBrand | null>(null);

    useEffect(() => {
        getAllBrand();
    }, []);

    const getAllBrand = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/getBrands`
        );
        const dataBrands = await response.json();
        setBrand(dataBrands.data);
        return dataBrands;
    };

    const deleteBrand = async (id: number) => {
        const params = {
            id,
        };
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/deleteBrand`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete brand');
        }

        const result = await response.json();
        await getAllBrand();
        alert('Операція пройшла успішно');
        return result;
    };

    const handleOpenModal = (brand: IBrand | null) => {
        setCurrentBrand(brand);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentBrand(null);
    };

    return (
        <div className="cars-section">
            <div className="add-car-block" style={{width: '36%'}}>
                <h2 className="add-cars-text">Brand</h2>
                <button
                    className="action-btn add-cars-btn btn--red"
                    onClick={() => handleOpenModal(null)}
                >
                    + add brand
                </button>
            </div>
            <div className="table-container" style={{width: '35%'}}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brand.map((item: IBrand) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.brand}</td>
                                <td>
                                    <button
                                        onClick={() => deleteBrand(item.id)}
                                        className="action-btn cancel-btn"
                                    >
                                        delete
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="action-btn edit-btn"
                                    >
                                        edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {brand.length === 0 && (
                            <tr>
                                <td colSpan={3}>No brand found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <BrandModal
                    brand={currentBrand}
                    onClose={handleCloseModal}
                    getAllBrand={getAllBrand}
                />
            )}
        </div>
    );
}

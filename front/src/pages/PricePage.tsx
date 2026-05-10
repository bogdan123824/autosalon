import '../css/car.css';
import '../css/index.css';
import '../css/price.css';
import '../css/form.css';
import Footer from "../components/Footer";
import HeaderCar from "../components/HeaderCar";
import useFixed from "../hooks/useFixed";
import { useEffect, useState } from 'react';
import CarItem from '../components/CarItem';
import { ICars } from '../interfaces/cars';
import Button from '../components/Button/Button';
import { IBrand } from '../interfaces/brand';
import { IoCarSportSharp } from "react-icons/io5";

export default function PricePage() {
    const fixed = useFixed();
    const [cars, setCars] = useState<ICars[]>([]);

    const [priceFrom, setPriceFrom] = useState<number | string>(''); 
    const [priceTo, setPriceTo] = useState<number | string>(''); 

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [brands, setBrands] = useState<IBrand[]>([]); 
    const [selectedBrand, setSelectedBrand] = useState<string>('');

    const getAllCars = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/getCars`
        );
        const dataCars = await response.json();
        setCars(dataCars.data);
        return dataCars;
    };

    const getBrands = async () => {
        const response = await fetch(`${process.env.REACT_APP_DEV_URL}/getBrands`, {
            cache: "no-store",
        });
        const dataBrands = await response.json();
    
        const brands = (dataBrands.data as IBrand[]); 
    
        const uniqueBrands = Array.from(new Set(brands.map(brand => brand.brand))); 
    
        setBrands(brands.filter(brand => uniqueBrands.includes(brand.brand))); 
    };

    useEffect(() => {
        const fetchData = async () => {
            await getAllCars();
            await getBrands();
        };

        fetchData();
    }, []);

    useEffect(() => {
        document.title = `Price list`;
        getAllCars();
    }, []);
    
    const filteredCars = cars
        .filter(car => 
            car.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(car =>
            selectedBrand === '' || car.brand?.brand === selectedBrand
        )
        .filter(car => 
            (priceFrom === '' || car.price >= Number(priceFrom)) &&
            (priceTo === '' || car.price <= Number(priceTo))
        )
        .sort((a, b) => 
            sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );

    const resetFilters = () => {
        setSearchQuery('');
        setSortOrder('asc');
        setSelectedBrand('');
        setPriceFrom('');
        setPriceTo('');
    };

    return (
    <>
        <HeaderCar title="Price list" fixed={fixed} />
        <div className="intro__price" id="intro"></div>
            <div className="price-list">
                <div className="container" style={{maxWidth: '1400px', minHeight: '140vh'}}>
                    <h1>Прайс-лист</h1>
                    <h3>На даний момент ми пропонуємо наступні автомобілі за такими цінами:</h3>
                    <div className="filter">
                    <h3 style={{fontSize: '20px'}}>Фільтри</h3>
                    <div className="block">
                        <input 
                            type="text" 
                            placeholder="Пошук по назві..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                fontSize: '15px',
                            }}
                        />
                    </div>
                    <Button style={{padding: '0.5rem 1rem', marginRight: '0'}} onClick={() => setSortOrder('asc') } isActive={sortOrder === 'asc'} >
                        Від дешевих до дорогих
                    </Button>
                    <Button style={{padding: '0.5rem 1rem', marginRight: '0'}} onClick={() => setSortOrder('desc')} isActive={sortOrder === 'desc'} > 
                        Від дорогих до дешевих
                    </Button>
                    <Button style={{padding: '0.5rem 1rem', marginRight: '0'}} onClick={resetFilters} isActive={false} > 
                        Скинути фільтри
                    </Button>

                        <div className="input-group" style={{margin:'0',display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #15a0ed', paddingTop: '10px'}}>
                        <h4 style={{fontSize: '18px'}}>Ціна ($):</h4>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px'}}>
                                <label htmlFor="price-from" style={{fontSize: '16px'}}>Від</label>
                                <input
                                    type="number"
                                    id="price-from"
                                    placeholder="Від"
                                    value={priceFrom}
                                    onChange={(e) => setPriceFrom(e.target.value)}
                                    style={{fontSize: '15px', padding: '0.5rem', width: '45%'}}
                                />
                                <label htmlFor="price-to" style={{fontSize: '16px'}}>До</label>
                                <input
                                    type="number"
                                    id="price-to"
                                    placeholder="До"
                                    value={priceTo}
                                    onChange={(e) => setPriceTo(e.target.value)}
                                    style={{fontSize: '15px', padding: '0.5rem', width: '45%'}}
                                />
                            </div>
                        </div>
                    <div className='input-group' style={{display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #15a0ed', paddingTop: '10px', margin: '0'}}>
                        <h4 style={{fontSize: '18px'}}>Марки авто:</h4>
                            {brands.map((brand: IBrand) => (
                                
                                <label className='label-price' key={brand.id} htmlFor={brand.brand}  style={{ marginRight: '1rem', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <input
                                        type="radio"
                                        name="brand"
                                        value={brand.brand} 
                                        checked={selectedBrand === brand.brand} 
                                        onChange={(e) => setSelectedBrand(e.target.value)}
                                        style={{height: '20px', width: '20px'}}
                                    />
                                    {brand.brand} 
                                </label>
                            ))}
                            <label className='label-price' style={{ marginRight: '1rem', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <input
                                    type="radio"
                                    name="brand"
                                    value=""
                                    checked={selectedBrand === ''}
                                    onChange={() => setSelectedBrand('')}
                                    style={{height: '20px', width: '20px'}}
                                />
                                Усі
                            </label>
                        </div>
                    </div>
                    
                    <div className="our-auto">
                    {filteredCars.length > 0 ?  filteredCars.map(car => (
                    <CarItem  key={car.id} {...car} />
                )) : (
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
                        <IoCarSportSharp size={200} color='red' />
                        <p style={{fontSize: '20px', fontWeight: 'bold'}}>Авто за вашим запитом не знайдено</p>
                    </div>
                    
                )}
                </div> 
            </div>    
        </div>
        <Footer />
    </>
        
    )
}
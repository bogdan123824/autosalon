import React, { useEffect, useState } from 'react';
import '../css/form.css';
import ModalForm from '../components/ModalForm';
import HeaderCar from '../components/HeaderCar';
import useFixed from '../hooks/useFixed';
import Footer from '../components/Footer';
import useForm from '../hooks/useForm';
import { useCartContext } from '../context/cartContext';
import { ICars } from '../interfaces/cars';
import { FaClosedCaptioning } from "react-icons/fa";

const OrderPage: React.FC = () => {

    const [captchaValue, setCaptchaValue] = useState('');

    const {
        orderSubmitted, 
        setOrderSubmitted,
        contactFields,
        handleChange,
        errors,
        handleValidation
    } = useForm();

    const { cart, removeCarFromCart } = useCartContext(); 
    const fixed = useFixed();

    const getAllCars = async () => {
        const response = await fetch(`${process.env.REACT_APP_DEV_URL}/getCars`);
        const dataCars = await response.json();
        setCars(dataCars.data);  
    };
    const [cars, setCars] = useState<ICars[]>([]); 

    useEffect(() => {
        getAllCars();
        document.title = `Order - form`;
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (captchaValue !== "сс") {
            alert("Incorrect CAPTCHA.");
            return; 
        }

        if (!handleValidation()) {
            console.log('Форма має помилки:', errors);
            return; 
        }
        const selectedType = contactFields.type || (cart && cart.title ? cart.title : '');
        const dataToSend = {
            username: contactFields.username,
            company_name: contactFields.company_name,
            telephone: contactFields.telephone,
            email: contactFields.email,
            car: selectedType,
            wishes: contactFields.textarea,
        };

        try {
            console.log(dataToSend);
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/submitOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(dataToSend), 
            });
            
            
            if (response.ok) {
                removeCarFromCart();
                setOrderSubmitted(true);
                console.log('Відповідь сервера:', await response.json());
                
            } else {
                console.error('Помилка при відпраці: ', response.statusText);
            }
        } catch (error) {
            console.error('Помилка:', error);
        }
    };

    const handleCaptchaChange = (value:any) => {
        setCaptchaValue(value);
    };

    return (
        <>
            <HeaderCar title="Order - form" fixed={fixed} />
            <div className="intro-buy" id="intro"></div>
            <div className="buy-auto">
                <div className="container">
                    {orderSubmitted ? <ModalForm /> : null}

                    <h1>Замовлення авто</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="forma">
                            <div className="left-forma">
                                <div className="block">
                                    <div className="name">Ім'я *</div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={contactFields.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="block">
                                    <div className="name">Прізвище</div>
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={contactFields.company_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="block">
                                    <div className="name">Телефон</div>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        value={contactFields.telephone}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.telephone && (
                                        <div className="error">
                                            {errors.telephone}
                                        </div>
                                    )}
                                </div>
                                <div className="block">
                                    <div className="name">Ел. пошта *</div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={contactFields.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && (
                                        <div className="error">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="right-forma">
                                <div className="block">
                                    <div className="name">Бажане авто</div>
                                    <select
                                        name="type"
                                        value={contactFields.type || (cart ? cart.title : '')} 
                                        onChange={handleChange}
                                        required
                                    >
                                    <option value="">...</option>
                                    {cars.map((car) => (
                                        <option key={car.id} value={car.title}>
                                            {car.title}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                <div className="block">
                                    <div className="name">Ваші побажання</div>
                                    <textarea
                                        name="textarea"
                                        className="area__buy__connection"
                                        value={contactFields.textarea}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="block name">Будь ласка, введіть код
                                    <div className="captcha" style={{display: 'flex', gap: '30px', alignItems: 'center', marginTop: '10px'}}>
                                        <FaClosedCaptioning size={40} />
                                        <input
                                            type="text"
                                            required
                                            name="captcha"
                                            value={captchaValue}
                                            onChange={(e) =>
                                                setCaptchaValue(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="block block-btn">
                                    <button
                                        type="submit"
                                        className="button-form btn--red"
                                    >
                                        Надіслати форму
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderPage;

import Footer from '../components/Footer';
import HeaderCar from '../components/HeaderCar';
import useFixed from '../hooks/useFixed';
import { useEffect, useState } from 'react';
import '../css/form.css';
import '../css/test.css';
import useForm from '../hooks/useForm';
import ModalForm from '../components/ModalForm';
import { useCartContext } from '../context/cartContext';
import { ICars } from '../interfaces/cars';
import { FaClosedCaptioning } from "react-icons/fa";

export default function TestDrivePage() {

    const [captchaValue, setCaptchaValue] = useState('');

    const {
        orderSubmitted, 
        setOrderSubmitted,
        contactFields,
        handleChange,
        errors,
        handleValidation
    } = useForm();
    const fixed = useFixed();
    const [showCalendar, setShowCalendar] = useState(false);

    const { cart } = useCartContext(); 
    const getAllCars = async () => {
        const response = await fetch(`${process.env.REACT_APP_DEV_URL}/getCars`);
        const dataCars = await response.json();
        setCars(dataCars.data);  
    };
    const [cars, setCars] = useState<ICars[]>([]); 

    const handleToggleCalendar = () => {
        setShowCalendar(true);
    };

    useEffect(() => {
        getAllCars();
        document.title = `Test Drive - form`;
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
            time: contactFields.time,
            car: selectedType,
            color: contactFields.other_specify,
            transmission: contactFields.auto,
            wishes: contactFields.textarea,
        };

        try {
            console.log(dataToSend);
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/submitDrive`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(dataToSend), 
            });
            
            
            if (response.ok) {
                setOrderSubmitted(true);
                console.log('Відповідь сервера:', await response.json());
                
            } else {
                console.error('Помилка при відпраці: ', response.statusText);
            }
        } catch (error) {
            console.error('Помилка:', error);
        }
    };

    return (
        <>
            <HeaderCar title="Test Drive - form" fixed={fixed} />
            <div className="intro__test" id="intro"></div>
            <div className="buy-auto">
                <div className="container">
                    {orderSubmitted ? <ModalForm /> : null}

                    <h1>Запис на тест-драйв</h1>
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
                                <div className="block">
                                    <div className="name">Бажаний час</div>
                                    <input
                                        onClick={handleToggleCalendar}
                                        type={showCalendar ? 'date' : 'text'}
                                        name="time"
                                        value={contactFields.time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="right-forma">
                                <div className="block">
                                    <div className="name">
                                        Яке авто будемо тестувати?
                                    </div>
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
                                    <div className="name">
                                        Побажання у кольорі
                                    </div>
                                    <select
                                        name="other_specify"
                                        value={contactFields.other_specify}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">...</option>
                                        <option value="Чорний">Чорний</option>
                                        <option value="Сірий">Сірий</option>
                                        <option value="Білий">Білий</option>
                                        <option value="Інший">Інший</option>
                                    </select>
                                </div>
                                <div className="block-radio">
                                    <div className="name">
                                        Авто повинно бути на
                                    </div>
                                    <div className="block-radio__block name">
                                        <input
                                            name="auto"
                                            type="radio"
                                            value="Автомат"
                                            required
                                            id="1"
                                            checked={
                                                contactFields.auto ===
                                                'Автомат'
                                            }
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="1">Автоматі</label>
                                    </div>
                                    <div className="block-radio__block name">
                                        <input
                                            name="auto"
                                            type="radio"
                                            value="Механіка"
                                            required
                                            id="2"
                                            checked={
                                                contactFields.auto ===
                                                'Механіка'
                                            }
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="2">Механиці</label>
                                    </div>
                                </div>
                                <div className="block">
                                    <div className="name">Ваші побажання</div>
                                    <textarea
                                        name="textarea"
                                        className="area__test"
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
                                <div className="block block-btn btn--test">
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
}

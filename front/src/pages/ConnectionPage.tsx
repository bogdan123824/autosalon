import Footer from '../components/Footer';
import HeaderCar from '../components/HeaderCar';
import useFixed from '../hooks/useFixed';
import { useEffect, useState } from 'react';
import '../css/form.css';
import '../css/connection.css';
import ContactInfo from '../components/ContactInfo';
import useForm from '../hooks/useForm';
import ModalForm from '../components/ModalForm';
import { FaClosedCaptioning } from 'react-icons/fa';

export default function ConnectionPage() {

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

    useEffect(() => {
        document.title = `Connection - form`;
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
        const dataToSend = {
            username: contactFields.username,
            company_name: contactFields.company_name,
            telephone: contactFields.telephone,
            email: contactFields.email,
            problems: contactFields.type,
            wishes: contactFields.textarea,
        };

        try {
            console.log(dataToSend);
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/submitConnection`, {
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
            <HeaderCar title="Connection - form" fixed={fixed} />
            <div className="intro__connection" id="intro"></div>
            <div className="buy-auto">
                <div className="container">
                    {orderSubmitted ? <ModalForm /> : null}

                    <h1>Зв'язок з нами</h1>
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
                                    <div className="name">Мета зв'язку</div>
                                    <select
                                        name="type"
                                        value={contactFields.type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">...</option>
                                        <option value="гарантійне обслуговування">
                                            гарантійне обслуговування
                                        </option>
                                        <option value="регулярне технічне обслуговування">
                                            регулярне технічне обслуговування
                                        </option>
                                        <option value="комп'ютерна діагностика всіх систем автомобіля">
                                            комп'ютерна діагностика всіх систем
                                            автомобіля
                                        </option>
                                        <option value="ремонт ходової частини та двигуна">
                                            ремонт ходової частини та двигуна
                                        </option>
                                        <option value="кузовний ремонт та фарбування">
                                            кузовний ремонт та фарбування
                                        </option>
                                        <option value="встановлення додаткового обладнання та аксесуарів">
                                            встановлення додаткового обладнання
                                            та аксесуарів
                                        </option>
                                        <option value="інше">інше</option>
                                    </select>
                                </div>
                                <div className="block">
                                    <div className="name">
                                        Додаткова інформація
                                    </div>
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
            <ContactInfo />
            <Footer />
        </>
    );
}

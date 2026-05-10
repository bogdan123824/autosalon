import React, { useState } from 'react';
import '../css/modal.css'; 
import { Link } from 'react-router-dom';

const Modal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            {isOpen && (
                <div className="modal">
                    <div className="modal__content">
                        <Link to="/" className="modal__link end-end ">← Повернутись до автосалону</Link>
                        <div className="end-end">
                            Велике дякуємо за заповнення форми! 
                            Наші менеджери зв'яжуться з вами для подальших дій!
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;

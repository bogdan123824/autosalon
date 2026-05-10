import React from 'react';

interface ModalBasketConfirmProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ModalBasketConfirm: React.FC<ModalBasketConfirmProps> = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-modal">
            <div className="confirm-modal-content">
                <p className='modal--main'>Увага</p>
                <p>В кошику вже є авто. Ви дійсно хочете замінити його?</p>
                <div className="modal--btn">
                    <button className="action-btn-modal btn--red" onClick={onConfirm}>Так</button>
                    <button className="action-btn-modal cancel-btn" onClick={onCancel}>Ні</button>
                </div>
            </div>
        </div>
    );
};

export default ModalBasketConfirm;
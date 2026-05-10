import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const Order = forwardRef<HTMLDivElement>((props, ref) => {

    return (
    <div ref={ref} className="buy line" id="buy">
        <div className="container ">
            <h2 className="h2-auto">Замовити</h2>
            <div className="buy__text">Якщо вас щось зацікавило, ми пропонуємо:</div>
            <div className="buy__block">
                <Link to="/order" className="btn btn--red">Замовити</Link>
                <Link to="/price" className="btn btn--red">Прайс-лист</Link>
                <Link to="/testdrive" className="btn btn--red">Тест-драйв</Link>
            </div>
        </div>
    </div>
    )
})

export default Order;
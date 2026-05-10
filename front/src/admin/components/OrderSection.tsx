import { useEffect, useState } from 'react';
import '../../css/table-cars-section.css';
import { IOrder } from '../../interfaces/orders';

export default function OrderSection({ onNewOrderCount }: { onNewOrderCount: (count: number) => void }) {
    const [orders, setOrders] = useState<IOrder[]>([]);

    const getAllOrders = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/getOrders`
        );
        const dataOrders = await response.json();
        setOrders(dataOrders);

        const viewedOrders = JSON.parse(localStorage.getItem('viewedOrders') || '[]');

        const newOrders = dataOrders.filter((order: IOrder) => !viewedOrders.includes(order.id));

        if (onNewOrderCount) {
            onNewOrderCount(newOrders.length);
        }
        
        return dataOrders;
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    useEffect(() => {
        if (orders.length > 0) {
            const orderIds = orders.map(order => order.id);
            localStorage.setItem('viewedOrders', JSON.stringify(orderIds));
        }
    }, [orders]);

    return (
        <div className="cars-section">
            <div className="add-car-block">
                <h2 className="add-cars-text">Orders</h2>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Lastname</th>
                            <th>Telephone</th>
                            <th>Email</th>
                            <th>Car</th>
                            <th>Wishes</th>
                        </tr>
                    </thead>
                    <tbody>
                        { orders && orders.length > 0 &&
                        orders.map((order: IOrder) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.username}</td>
                                <td>{order.company_name}</td>
                                <td>{order.telephone}</td>
                                <td>{order.email}</td>
                                <td>{order.car}</td>
                                <td>{order.wishes}</td>
                            </tr>
                        ))}
                        
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={7}>No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

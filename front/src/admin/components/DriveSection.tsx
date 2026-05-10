import { useEffect, useState } from 'react';
import '../../css/table-cars-section.css';
import { IDrive } from '../../interfaces/orders';

export default function DriveSection({ onNewDriveCount }: { onNewDriveCount: (count: number) => void }) {
    const [drives, setDdrives] = useState<IDrive[]>([]);

    const getAllOrders = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/getDrives`
        );
        const dataOrders = await response.json();
        setDdrives(dataOrders);

        const viewedOrders = JSON.parse(localStorage.getItem('viewedOrders') || '[]');

        const newOrders = dataOrders.filter((drive: IDrive) => !viewedOrders.includes(drive.id));

        if (onNewDriveCount) {
            onNewDriveCount(newOrders.length);
        }
        
        return dataOrders;
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    useEffect(() => {
        if (drives.length > 0) {
            const orderIds = drives.map(order => order.id);
            localStorage.setItem('viewedDrives', JSON.stringify(orderIds));
        }
    }, [drives]);

    return (
        <div className="cars-section">
            <div className="add-car-block">
                <h2 className="add-cars-text">Test-Drives</h2>
            </div>
            <div className="table-container" style={{width: '90%'}}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Lastname</th>
                            <th>Telephone</th>
                            <th>Email</th>
                            <th>Time</th>
                            <th>Car</th>
                            <th>Color</th>
                            <th>Transmission</th>
                            <th>Wishes</th>
                        </tr>
                    </thead>
                    <tbody>
                        { drives && drives.length > 0 &&
                        drives.map((drive: IDrive) => (
                            <tr key={drive.id}>
                                <td>{drive.id}</td>
                                <td>{drive.username}</td>
                                <td>{drive.company_name}</td>
                                <td>{drive.telephone}</td>
                                <td>{drive.email}</td>
                                <td>{drive.time}</td>
                                <td>{drive.car}</td>
                                <td>{drive.color}</td>
                                <td>{drive.transmission}</td>
                                <td>{drive.wishes}</td>
                            </tr>
                        ))}
                        
                        {drives.length === 0 && (
                            <tr>
                                <td colSpan={10}>No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

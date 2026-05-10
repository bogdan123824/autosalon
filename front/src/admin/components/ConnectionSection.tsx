import { useEffect, useState } from 'react';
import '../../css/table-cars-section.css';
import { IConnection, IDrive } from '../../interfaces/orders';

export default function ConnectionSection({ onNewConnectionCount }: { onNewConnectionCount: (count: number) => void }) {
    const [connections, setConnections] = useState<IConnection[]>([]);

     const getAllConnections = async () => {
         const response = await fetch(
             `${process.env.REACT_APP_DEV_URL}/getConnection`,
         );
         const dataOrders = await response.json();
         setConnections(dataOrders);

         const viewedOrders = JSON.parse(localStorage.getItem('viewedConnections') || '[]');

         const newOrders = dataOrders.filter((connection: IConnection) => !viewedOrders.includes(connection.id));

         if (onNewConnectionCount) {
             onNewConnectionCount(newOrders.length);
         }
        
         return dataOrders;
     };

     useEffect(() => {
        getAllConnections();
     }, []);

     useEffect(() => {
         if (connections.length > 0) {
             const orderIds = connections.map(connections => connections.id);
             localStorage.setItem('viewedConnections', JSON.stringify(orderIds));
         }
     }, [connections]);

    return (
        <div className="cars-section">
            <div className="add-car-block">
                <h2 className="add-cars-text">Connection</h2>
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
                            <th>Problem</th>
                            <th>Wishes</th>
                        </tr>
                    </thead>
                    <tbody>
                        { connections && connections.length > 0 &&
                        connections.map((connections: IConnection) => (
                            <tr key={connections.id}>
                                <td>{connections.id}</td>
                                <td>{connections.username}</td>
                                <td>{connections.company_name}</td>
                                <td>{connections.telephone}</td>
                                <td>{connections.email}</td>
                                <td>{connections.problems}</td>
                                <td>{connections.wishes}</td>
                            </tr>
                        ))}
                        
                        {connections.length === 0 && (
                            <tr>
                                <td colSpan={6}>No orders found</td>
                            </tr>
                            
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

import '../../css/admin.css';
import { useEffect, useState } from 'react';
import TabsSection from './TabSection';
import CarsSection from './CarsSection';
import TeamSection from './TeamSection';
import Header from '../../components/Header';
import useFixed from '../../hooks/useFixed';
import OrderSection from './OrderSection';
import DriveSection from './DriveSection';
import ConnectionSection from './ConnectionSection';
import BrandSection from './BrandSection';

export default function Dashboard() {
    const [tab, setTab] = useState('cars');
    const fixed = useFixed();

    const [newOrderCount, setNewOrderCount] = useState(0);
    const [newDriveCount, setNewDriveCount] = useState(0);
    const [newConnectionCount, setNewConnectionCount] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/getOrders`);
            const orders = await response.json();

            const viewedOrders = JSON.parse(localStorage.getItem('viewedOrders') || '[]');

            const newOrders = orders.filter((order: any) => !viewedOrders.includes(order.id));

            setNewOrderCount(newOrders.length);
        };

        fetchOrders();

        const fetchDrives = async () => {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/getDrives`);
            const drives = await response.json();

            const viewedDrives = JSON.parse(localStorage.getItem('viewedDrives') || '[]');

            const newDrives = drives.filter((drives: any) => !viewedDrives.includes(drives.id));

            setNewDriveCount(newDrives.length);
        };

        fetchDrives();

        const fetchConnections = async () => {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/getConnection`);
            const connections = await response.json();

            const viewedConnections = JSON.parse(localStorage.getItem('viewedConnections') || '[]');

            const newConnections = connections.filter((connections: any) => !viewedConnections.includes(connections.id));

            setNewConnectionCount(newConnections.length);
        };

        fetchConnections();
    }, []); 

    return (
        <>
            <Header fixed={fixed} />
            <main className="main-tabs">
                <h1 className="h1--admin">Dashboard</h1>

                <TabsSection
                    active={tab}
                    onChange={(current) => setTab(current)}
                    orderCount={newOrderCount}
                    driveCount={newDriveCount}
                    connectionCount={newConnectionCount}
                />

                {tab === 'cars' && <CarsSection />}
                {tab === 'brand' && <BrandSection />}
                {tab === 'team' && <TeamSection />}
                {tab === 'orders' && <OrderSection onNewOrderCount={(count) => setNewOrderCount(count)} />}
                {tab === 'drives' && <DriveSection onNewDriveCount={(count) => setNewDriveCount(count)} />}
                {tab === 'connections' && <ConnectionSection onNewConnectionCount={(count) => setNewConnectionCount(count)} />}
            </main>
        </>
    );
}

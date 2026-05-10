import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarPage from './pages/CarPage';
import PricePage from './pages/PricePage';
import BuyPage from './pages/OrderPage';
import ConnectionPage from './pages/ConnectionPage';
import TestDrivePage from './pages/TestDrivePage';
import { AdminProvider } from './context/adminContext';
import AdminPage from './admin/pages/AdminPage';
import NewCarPage from './admin/pages/NewCarPage';
import EditCarPage from './admin/pages/EditCarPage';
import { CarProvider } from './context/carContext';
import { CartProvider } from './context/cartContext';

function App() {
    return (
        <AdminProvider>
            <CarProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/car/:id" element={<CarPage />} />
                        <Route path="/price" element={<PricePage />} />
                        <Route path="/order" element={<BuyPage />} />
                        <Route path="/connection" element={<ConnectionPage />} />
                        <Route path="/testdrive" element={<TestDrivePage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/admin/car/new" element={<NewCarPage />} />
                        <Route path="/admin/car/:id" element={<EditCarPage />} />
                    </Routes>
                </CartProvider>
            </CarProvider>
        </AdminProvider>
    );
}

export default App;

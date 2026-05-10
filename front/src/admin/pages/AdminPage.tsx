import '../../css/admin.css';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import { useAdmin } from '../../context/adminContext';

export default function AdminPage() {
    const { isAuthenticated } = useAdmin();

    return <>{isAuthenticated ? <Dashboard /> : <Login />}</>;
}

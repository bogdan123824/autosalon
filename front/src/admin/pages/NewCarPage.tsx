import useFixed from "../../hooks/useFixed";
import { useAdmin } from '../../context/adminContext';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalAdminCar from "../components/GlobalAdminCar";

export default function NewCarPage() {
    const { isAuthenticated } = useAdmin();
    const fixed = useFixed();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);
    useEffect(() => {
        document.title = 'New Car';
    }, []);
    
    return (
        <>
        <GlobalAdminCar  />
        </>
      

    )
}
import { useNavigate, useOutlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './ProtectedLayout.scss';
import Slider from '../../components/Slider/Slider';

export const ProtectedLayout = () => {
    const { isTokenValid } = useAuth();
    const outlet = useOutlet();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTokenValid()) {
            navigate('/');
        }
    }, [isTokenValid, navigate]);

    return (
        <div className="protected-layout">
            <Navbar />
            <Slider>
                <h2>please works</h2>
            </Slider>
            {outlet}
        </div>
    );
};

import { useNavigate } from 'react-router-dom';
import logo from '../../assets/sportlyLogo2.png';
import './Logo.style.scss';
import { useEvents } from '../../providers/EventsProvider/EventsProvider';
const Logo = () => {
    const navigate = useNavigate();
    const { removeDrafts } = useEvents();

    const handleClick = () => {
        removeDrafts();
        navigate('/home');
    };

    return <img src={logo} onClick={handleClick} className="logo" alt="logo" />;
};

export default Logo;

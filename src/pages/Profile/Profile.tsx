import './Profile.scss';

import { logout } from '../../api/proxyApi';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const navigate = useNavigate();

    return (
        <div className="buttons-panel">
            <button
                className='achievements-button'
                onClick={() => navigate('/profile/achievements')}
            >
                Achievements
            </button>
            <button
                className='logout-button'
                onClick={logout}
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;

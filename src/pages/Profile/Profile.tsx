import './Profile.scss';

import { logout } from '../../api/proxyApi';

const Profile = () => {
    return (
        <button
            className='logout-button'
            onClick={logout}
        >
            Logout
        </button>
    );
};

export default Profile;

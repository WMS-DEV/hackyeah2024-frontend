// import { navigateToGoogleAuth } from "../../../../api/googleAuth";
import './Panel.scss';
import googleLogo from '@/assets/google-logo.webp';
import spotlyLogo from '@/assets/logoSpotly.png';

const LoginPanel = () => {
    const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // navigateToGoogleAuth();
        localStorage.setItem('isAuthenticated', 'true');
        window.location.reload();
    };

    return (
        <div className="login-panel">
            <div className="login-panel__header">Sign in to preview</div>
            <div className="login-panel__body">
                <button className="login-panel__body__button" onClick={handleGoogleLogin}>
                    <img
                        src={googleLogo}
                        alt="Google logo"
                        className="login-panel__body__button__logo"
                        width="40"
                    />
                    <span className="login-panel__body__button__text">Sign in with Google</span>
                </button>
            </div>
            <div>
                <img className="login-panel__sportly-logo" alt="Sportly logo" src={spotlyLogo} />
            </div>
        </div>
    );
};
export default LoginPanel;

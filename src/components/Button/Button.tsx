import { FC } from 'react';
import './Button.scss';

type ButtonProps = {
    to: string;
    label: string;
    isActive: boolean;
    onClick?: () => void;
    children: React.ReactNode;
};

const Button: FC<ButtonProps> = ({ label, children, isActive, onClick }) => {
    return (
        <div className="nav-button" onClick={onClick}>
            {children}
            <span className={`nav-button__label ${isActive && 'nav-button__label--active'}`}>
                {label}
            </span>
        </div>
    );
};

export default Button;

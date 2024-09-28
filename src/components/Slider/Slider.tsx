import { FC, useEffect, useState } from 'react';
import './slider.style.scss';
import { AnimatePresence, motion } from 'framer-motion';

const sliderVariants = {
    desctop: {
        hidden: {
            x: '100%',
        },
        visible: {
            x: 0,
            transition: {
                duration: 0.5,
            },
        },
        exit: {
            x: '100%',
        },
    },
    mobile: {
        hidden: {
            y: '100%',
        },
        visible: {
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
        exit: {
            y: '100%',
        },
    },
};

const isMobileDevice = () => {
    return window.innerWidth <= 768;
};

type SliderProps = {
    children: React.ReactNode;
};

const Slider: FC<SliderProps> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(isMobileDevice());

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        const handleResize = () => {
            setIsMobile(isMobileDevice());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="slider"
                    initial={
                        isMobile ? sliderVariants.mobile.hidden : sliderVariants.desctop.hidden
                    }
                    animate={
                        isMobile ? sliderVariants.mobile.visible : sliderVariants.desctop.visible
                    }
                    exit={isMobile ? sliderVariants.mobile.exit : sliderVariants.desctop.exit}
                    transition={{ duration: 0.5 }}
                >
                    <div className="slider__content">
                        {isMobile && (
                            <button className="slider__close-button" onClick={handleClose}>
                                &times;
                            </button>
                        )}
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Slider;

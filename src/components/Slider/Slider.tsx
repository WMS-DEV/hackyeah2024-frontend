import { FC, useEffect, useState } from 'react';
import './slider.style.scss';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../Navbar/Navbar';

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

const contentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: '60vh', opacity: 1 },
    exit: { height: 0, opacity: 0 },
};

const Slider: FC<SliderProps> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(isMobileDevice());
    const [isContentVisible, setIsContentVisible] = useState(true);

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
        setIsContentVisible(!isContentVisible);
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
                    <div className="slider__wrapper">
                        {isMobile && <div className="slider__close-button" onClick={handleClose} />}
                        <AnimatePresence>
                            {isContentVisible && (
                                <motion.div
                                    className="slider__content"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={contentVariants}
                                    transition={{ duration: 0.3 }}
                                >
                                    {children}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <Navbar />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Slider;

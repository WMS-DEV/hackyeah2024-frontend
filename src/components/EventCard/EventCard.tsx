import { FC } from 'react';
import { EventProps } from '../../types/eventType';
import VolleyballIcon from '../../assets/icon_volleyball.png';
import BasketballIcon from '../../assets/icon_basketball.png';
import SoccerIcon from '../../assets/icon_soccer.png';
import BaseballIcon from '../../assets/icon_baseball.png';
import FootballIcon from '../../assets/icon_football.png';
import TennisIcon from '../../assets/icon_table_tennis.png';
import GolfIcon from '../../assets/icon_golf.png';
import GymIcon from '../../assets/icon_gym.png';

import './EventCard.style.scss';
import { useNavigate } from 'react-router-dom';

const eventCategoryToIcon: { [key: string]: string } = {
    Volleyball: VolleyballIcon,
    Basketball: BasketballIcon,
    Soccer: SoccerIcon,
    Baseball: BaseballIcon,
    Football: FootballIcon,
    Tennis: TennisIcon,
    Golf: GolfIcon,
    Gym: GymIcon,
};

const EventCard: FC<EventProps> = (props) => {
    const { name, startTime, endTime, category } = props;
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/home?eventId=${props.id}`);
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const categoryIcon = eventCategoryToIcon[category.name] || eventCategoryToIcon.Gym;

    return (
        <div className="event-card" onClick={() => handleNavigate()}>
            <div className="event-card__wrapper">
                <div className="event-card__header">
                    <h3 className="event-card__title">{name}</h3>
                    {/* {createdBy && <p className="event-card__edit">Edit</p>} */}
                </div>
                <div className="event-card__content">
                    <div className="event-card__time-wrapper">
                        <div className="event-card__time">
                            <p>Start time</p>
                            <span>{formatTime(startTime)}</span>
                        </div>
                        <div className="event-card__time">
                            <p>End time</p>
                            <span>{formatTime(endTime)}</span>
                        </div>
                    </div>

                    <div className="event-card__category">
                        <img
                            src={categoryIcon}
                            alt={category.name}
                            className="event-card__category--icon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;

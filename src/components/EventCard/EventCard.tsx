import { FC } from 'react';
import { EventProps } from '../../types/eventType';
import './EventCard.style.scss';

const EventCard: FC<EventProps> = (props) => {
    const { name, startTime, endTime, createdBy } = props;

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="event-card">
            <div className="event-card__wrapper">
                <div className="event-card__header">
                    <h3 className="event-card__title">{name}</h3>
                    {createdBy && <p className="event-card__edit">Edit</p>}
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
                </div>
            </div>
        </div>
    );
};

export default EventCard;

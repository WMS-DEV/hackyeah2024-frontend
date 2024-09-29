import { EventCategory, EventInfo } from '../../providers/EventsProvider/EventsProvider';
import VolleyballIcon from '../../assets/icon_volleyball.png';
import BasketballIcon from '../../assets/icon_basketball.png';
import SoccerIcon from '../../assets/icon_soccer.png';

interface PinProps {
    event: EventInfo;
    onClick?: (event: EventInfo) => void;
}

export const eventCategoryToIcon: {
    [key in EventCategory]: string;
} = {
    Soccer: SoccerIcon,
    Volleyball: VolleyballIcon,
    Basketball: BasketballIcon,
};

export const Pin = ({ onClick, event }: PinProps) => {
    const icon = eventCategoryToIcon[event.category];

    const handleClick = () => {
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <div className="pin" onClick={handleClick}>
            <img src={icon} width="50px" height="50px" />
        </div>
    );
};

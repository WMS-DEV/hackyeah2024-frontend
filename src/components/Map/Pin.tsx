import BaseballIcon from "../../assets/icon_baseball.png";
import FootballIcon from "../../assets/icon_football.png";
import TennisIcon from "../../assets/icon_table_tennis.png";
import GolfIcon from "../../assets/icon_golf.png";
import GymIcon from "../../assets/icon_gym.png";
import SoccerIcon from "../../assets/icon_soccer.png";
import {
  EventCategory,
  EventInfo,
} from "../../providers/EventsProvider/EventsProvider";
import VolleyballIcon from "../../assets/icon_volleyball.png";
import BasketballIcon from "../../assets/icon_basketball.png";
import { Pin as DefaultPin } from "@vis.gl/react-google-maps";

interface PinProps {
  event: EventInfo;
  onClick?: (event: EventInfo) => void;
}

export const eventCategoryToIcon: {
  [key in EventCategory]: string;
} = {
  Volleyball: VolleyballIcon,
  Basketball: BasketballIcon,
  Soccer: SoccerIcon,
  Baseball: BaseballIcon,
  Football: FootballIcon,
  Tennis: TennisIcon,
  Golf: GolfIcon,
  Gym: GymIcon,
  Draft: VolleyballIcon,
};

export const Pin = ({ onClick, event }: PinProps) => {
  const icon = eventCategoryToIcon[event.category] || eventCategoryToIcon.Gym;

  const handleClick = () => {
    if (onClick) {
      onClick(event);
    }
  };

  if (event.category === "Draft") {
    return <DefaultPin />;
  }

  return (
    <div className="pin" onClick={handleClick}>
      <img src={icon} width="50px" height="50px" />
    </div>
  );
};

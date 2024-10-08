import { useEffect, useState } from "react";
import { useMap } from "../../providers/MapProvider/MapProvider";
import { EventInfo } from "../../providers/EventsProvider/EventsProvider";
import { useSlider } from "../../providers/SliderProvider/SliderProvider";
import { TextInfoBox, AccentTextInfoBox } from "./TextInfoBox";
import "./Home.scss";
import { getUserId, joinEvent } from "../../api/backendApi";
import { useLocation, useNavigate } from "react-router-dom";
import PointerIcon from "../../assets/icon_map_pointer.png";

const Home = () => {
  const { addEventClickListener, removeEventClickListener, selectedEvent } =
    useMap();
  const [event, setEvent] = useState<EventInfo | null>(null);
  const { setVisibility } = useSlider();
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    setVisibility(true);
  }, [location]);

  useEffect(() => {
    const handleSelectedEvent = (event: EventInfo) => {
      setEvent(event);
      setVisibility(true);
    };

    if (selectedEvent) {
      setEvent({ ...selectedEvent });
      setVisibility(true);
    }

    addEventClickListener({
      key: "homeEventListener",
      listener: handleSelectedEvent,
    });

    return () => {
      removeEventClickListener("homeEventListener");
    };
  }, []);

  if (!event) {
    return (
      <div className="home__empty">
        <div className="home__empty__title">
          Pick an event to view its details
        </div>
        <div className="home__empty__pointer">
          <img src={PointerIcon} width="100px" />
        </div>
      </div>
    );
  }

  const getNumberOfParticipants = (event: EventInfo) => {
    return `${event.participants.length}/${event.maxNumberOfParticipants}`;
  };

  const prefixWithZero = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = prefixWithZero(date.getDate());
    const month = prefixWithZero(date.getMonth());
    const hours = prefixWithZero(date.getHours());
    const minutes = prefixWithZero(date.getMinutes());
    return `${day}-${month}-${date.getFullYear()} - ${hours}:${minutes}`;
  };

  const handleJoin = async (event: EventInfo) => {
    if (!isEventAlreadyJoined(event)) {
      await joinEvent(1, event.id);
      navigate("/calendar");
    }
  };

  const isEventAlreadyJoined = (event: EventInfo) => {
    return event.participants.find((part) => part.id === getUserId())
      ? true
      : false;
  };

  return (
    <div className="home">
      <div className="home__header">{event.name}</div>
      <div className="home__separator" />
      <div className="home__body">
        <div className="home__body__columns">
          <div className="home__row">
            <TextInfoBox label="Sport" value={event.category} />

            <TextInfoBox
              label="Start time"
              value={formatDate(event.startTime)}
            />
          </div>
          <div className="home__row">
            <TextInfoBox
              label="Participants"
              value={getNumberOfParticipants(event)}
            />

            <TextInfoBox label="End time" value={formatDate(event.endTime)} />
          </div>
          <div className="home__row">
            <TextInfoBox
              label="Experience/skill"
              value={event.requiredExperience}
            />
            <AccentTextInfoBox label="Calories" value={`${event.calories}`} />
          </div>
          <div className="home__row">
            <TextInfoBox label="Adults/children/all" value={event.age} />
          </div>
        </div>

        <TextInfoBox label={"Description"} value={event.description} />
      </div>

      <div className="home__signup">
        <div
          className={`home__signup__button ${
            isEventAlreadyJoined(event) ? "home__signup__button--disabled" : ""
          }`}
          onClick={() => handleJoin(event)}
        >
          {isEventAlreadyJoined(event) ? "Already joined" : "Join"}
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useMap } from "../../providers/MapProvider/MapProvider";
import { EventInfo } from "../../providers/EventsProvider/EventsProvider";
import { useSlider } from "../../providers/SliderProvider/SliderProvider";
import { TextInfoBox, AccentTextInfoBox } from "./TextInfoBox";
import "./Home.scss";
import { joinEvent } from "../../api/backendApi";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { addEventClickListener, removeEventClickListener, selectedEvent } =
    useMap();
  const [event, setEvent] = useState<EventInfo | null>(null);
  const { setVisibility } = useSlider();
  const location = useLocation();

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
      <div className="home__empty"> Pick an event to view its details </div>
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

  const handleJoin = (event: EventInfo) => {
    joinEvent(1, event.id);
  };

  const title = (val: string) => {
    if (val.length <= 0) {
      return "";
    }
    if (val.length === 1) {
      return val.toUpperCase();
    }
    return val[0].toUpperCase() + val.substring(1).toLowerCase();
  }

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
              value={title(event.requiredExperience)}
            />
            <AccentTextInfoBox label="Calories burnt" value={`${event.calories}`} />
          </div>
          <div className="home__row">
            <TextInfoBox label="Age group" value={title(event.age)} />
          </div>
        </div>

        <TextInfoBox label={"Description"} value={event.description} />
      </div>

      <div className="home__signup">
        <div className="home__signup__button" onClick={() => handleJoin(event)}>
          Join
        </div>
      </div>
    </div>
  );
};

export default Home;

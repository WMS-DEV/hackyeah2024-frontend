import { useEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";
import { EventProps } from "../../types/eventType";
import "./IncomingEvents.style.scss";
import Loader from "../Loader/Loader";
import { useMap } from "../../providers/MapProvider/MapProvider";
import { useNavigate } from "react-router-dom";
import { EventInfo } from "../../providers/EventsProvider/EventsProvider";
import { useSlider } from "../../providers/SliderProvider/SliderProvider";
import { getEvents } from "../../api/backendApi";

const IncomingEvents = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { addEventClickListener, removeEventClickListener, setSelectedEvent } =
    useMap();
  const navigate = useNavigate();
  const { setVisibility } = useSlider();

  useEffect(() => {
    setVisibility(true);
    const handleSelectedEvent = (event: EventInfo) => {
      setSelectedEvent({ ...event });
      navigate(`/home`);
    };

    addEventClickListener({
      key: "incomingEventListener",
      listener: handleSelectedEvent,
    });

    return () => {
      removeEventClickListener("incomingEventListener");
    };
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents();
        setEvents(events);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="events">
      <div className="events__wraper">
        <div className="events__header">
          <h2 className="events__header--title">Incoming Events</h2>
          <div className="events__header--style" />
        </div>
        <div className="events__content">
          {events.length === 0 ? (
            <p>No events found</p>
          ) : (
            events.map((event) => <EventCard key={event.id} {...event} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomingEvents;

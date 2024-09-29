import "./CreateEvent.scss";
import { useState, useEffect } from "react";
import { Location, useMap } from "../../providers/MapProvider/MapProvider";
import CreateEventForm from "../../components/CreateEventForm/CreateEventForm";
import {
  EventInfo,
  useEvents,
} from "../../providers/EventsProvider/EventsProvider";
import { useSlider } from "../../providers/SliderProvider/SliderProvider";

type LatLng = {
  lat: number;
  lng: number;
};

const App = () => {
  const { addLocationClickListener } = useMap();

  const createDraftEvent = (location: LatLng): EventInfo => ({
    id: -1,
    location: {
      lng: location.lng,
      lat: location.lat,
    },
    name: "Draft event",
    category: "Draft",
    createdBy: {
      id: -1,
      name: "",
      email: "",
    },
    participants: [],
    description: "",
    startTime: 0,
    endTime: 0,
    cyclic: "",
    maxNumberOfParticipants: 0,
    invitedEmails: [],
    isPublic: false,
    requiredExperience: "",
    age: "",
    longitude: location.lng,
    latitude: location.lat,
    calories: 0,
  });

  const { events, setEvents } = useEvents();

  const { setVisibility } = useSlider();

  const [location, setLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    setVisibility(true);
    const handleLocationClick = (location: Location) => {
      setLocation(location);
      setVisibility(true);
      setEvents([...events, createDraftEvent(location)]);
    };

    addLocationClickListener({
      key: "listenForUpdates",
      listener: handleLocationClick,
    });
  }, []);

  if (!location) {
    return (
      <div className="waiting-text">
        Pick a location on the map to create an event
      </div>
    );
  }

  return <CreateEventForm location={location} />;
};

export default App;

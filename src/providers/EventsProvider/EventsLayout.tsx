import { useOutlet } from "react-router-dom";
import { EventsProvider } from "./EventsProvider";
import Map from "../../components/Map/Map";

export const EventsLayout = () => {
  const outlet = useOutlet();

  return (
    <EventsProvider>
      <Map />
      {outlet}
    </EventsProvider>
  );
};

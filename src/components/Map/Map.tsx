import {
  APIProvider,
  Map,
  AdvancedMarker,
  ColorScheme,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { useEvents } from "../../providers/EventsProvider/EventsProvider";
import "./Map.scss";
import { Location } from "../../providers/MapProvider/MapProvider";
import { EventInfo } from "../../providers/EventsProvider/EventsProvider";
import { useMap } from "../../providers/MapProvider/MapProvider";
import { Pin } from "./Pin";

const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

const EventsMap = (props: { geolocation: Location }) => {
  const { events } = useEvents();
  const { locationClickListeners, eventClickListeners, selectedEvent } =
    useMap();

  const handleLocationClick = (event: MapMouseEvent) => {
    if (event.detail.latLng) {
      locationClickListeners.forEach((listener) => {
        listener.listener(event.detail.latLng!);
      });
    }
  };

  const handleEventClick = (event: EventInfo) => {
    if (event) {
      eventClickListeners.forEach((listener) => {
        listener.listener(event);
      });
    }
  };

  return (
    <div className="map">
      <APIProvider apiKey={API_KEY}>
        <Map
          mapId="defaultMap"
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={
            selectedEvent ? selectedEvent.location : props.geolocation
          }
          streetViewControl
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          colorScheme={ColorScheme.DARK}
          onClick={handleLocationClick}
          clickableIcons={true}
        >
          {events.length > 0
            ? events.map((event: EventInfo) => (
                <AdvancedMarker
                  key={event.id}
                  position={event.location}
                  onClick={() => handleEventClick(event)}
                  clickable={true}
                >
                  <Pin event={event} />
                </AdvancedMarker>
              ))
            : null}
        </Map>
      </APIProvider>
    </div>
  );
};

export default EventsMap;

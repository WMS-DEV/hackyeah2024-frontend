import {
  APIProvider,
  Map,
  AdvancedMarker,
  ColorScheme,
} from "@vis.gl/react-google-maps";
import { useEvents } from "../../providers/EventsProvider/EventsProvider";
import "./Map.scss";
import { Location } from "../../providers/EventsProvider/EventsLayout";

const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

export type Poi = { key: string; location: google.maps.LatLngLiteral };
const PoiMarkers = (props: { pois: Poi[] }) => {
  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker key={poi.key} position={poi.location}>
          <div
            style={{ backgroundColor: "red", width: "100px", height: "100px" }}
          ></div>
        </AdvancedMarker>
      ))}
    </>
  );
};

const EventsMap = (props: { geolocation: Location }) => {
  const { events } = useEvents();

  return (
    <div className="map">
      <APIProvider apiKey={API_KEY}>
        <Map
          mapId="defaultMap"
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={props.geolocation}
          defaultZoom={10}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          colorScheme={ColorScheme.DARK}
        >
          <PoiMarkers
            pois={events.map((event) => ({
              key: event.id,
              location: event.location,
            }))}
          />
        </Map>
      </APIProvider>
    </div>
  );
};

export default EventsMap;

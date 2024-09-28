import {
  APIProvider,
  Map,
  AdvancedMarker,
  ColorScheme,
  // Pin,
} from "@vis.gl/react-google-maps";
import { useEvents } from "../../providers/EventsProvider/EventsProvider";
import { useEffect, useState } from "react";
import "./Map.scss";

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

const DEFAULT_LOCATION = {
  lat: 50.070607,
  lng: 19.88719,
};

const App = () => {
  const { events } = useEvents();
  const [geolocation, setGeolocation] = useState<{
    lat: number;
    lng: number;
  }>(DEFAULT_LOCATION);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setGeolocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      console.log("geolocation");
      console.log(location);
    });
  }, []);

  return (
    <div className="map">
      <APIProvider apiKey={API_KEY}>
        <Map
          mapId="defaultMap"
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={DEFAULT_LOCATION}
          defaultZoom={5}
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

export default App;

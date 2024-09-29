import { useLoaderData, useOutlet } from "react-router-dom";
import { EventInfo, EventsProvider } from "./EventsProvider";
import { Await } from "react-router-dom";
import { Suspense } from "react";
import Map from "../../components/Map/Map";
import Slider from "../../components/Slider/Slider";
import { MapProvider } from "../MapProvider/MapProvider";
import { Location } from "../MapProvider/MapProvider";

export const EventsLayout = () => {
  const outlet = useOutlet();
  const { geolocation, events } = useLoaderData() as {
    geolocation: Location;
    events: EventInfo[];
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await
        resolve={Promise.all([geolocation, events])}
        children={([geolocation, events]) => {
          return (
            <EventsProvider initialEvents={events}>
              <MapProvider>
                <Slider>{outlet}</Slider>
                <Map geolocation={geolocation} />
              </MapProvider>
            </EventsProvider>
          );
        }}
      />
    </Suspense>
  );
};

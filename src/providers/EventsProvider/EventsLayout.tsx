import { useLoaderData, useOutlet } from "react-router-dom";
import { EventsProvider } from "./EventsProvider";
import { Await } from "react-router-dom";
import { Suspense } from "react";
import Map from "../../components/Map/Map";
import Slider from "../../components/Slider/Slider";

export interface Location {
  lat: number;
  lng: number;
}

export const EventsLayout = () => {
  const outlet = useOutlet();
  const { geolocation } = useLoaderData() as {
    geolocation: Location;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await
        resolve={geolocation}
        children={(geolocation: Location) => {
          return (
            <EventsProvider>
              <Slider>
                <h2>It works!</h2>
              </Slider>
              <Map geolocation={geolocation} />
              {outlet}
            </EventsProvider>
          );
        }}
      />
    </Suspense>
  );
};

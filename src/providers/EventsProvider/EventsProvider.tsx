import { ReactNode, createContext, useContext, useState } from "react";
import { Location } from "../MapProvider/MapProvider";

export type EventCategory = "Soccer" | "Basketball" | "Volleyball";

export interface EventInfo {
  id: string;
  location: {
    lng: number;
    lat: number;
  };
  name: string;
  category: EventCategory;
}

export interface LocationClickListener {
  listener: (arg: Location) => void;
  key: string;
}

export interface EventClickListener {
  listener: (arg: EventInfo) => void;
  key: string;
}

export interface EventsContext {
  events: EventInfo[];
  setEvents: (value: EventInfo[]) => void;
}

export const EventsContext = createContext<EventsContext>({
  events: [],
  setEvents: () => {},
});

const locations: Array<{
  key: string;
  location: {
    lat: number;
    lng: number;
  };
}> = [
  { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
  { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
  { key: "poland", location: { lat: 52.402178, lng: 16.918659 } },
  { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
  { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
  { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
  { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
  { key: "harbourBridge", location: { lat: -33.852228, lng: 151.2038374 } },
  { key: "kingsCross", location: { lat: -33.8737375, lng: 151.222569 } },
  { key: "botanicGardens", location: { lat: -33.864167, lng: 151.216387 } },
  { key: "museumOfSydney", location: { lat: -33.8636005, lng: 151.2092542 } },
  { key: "maritimeMuseum", location: { lat: -33.869395, lng: 151.198648 } },
  { key: "kingStreetWharf", location: { lat: -33.8665445, lng: 151.1989808 } },
  { key: "aquarium", location: { lat: -33.869627, lng: 151.202146 } },
  { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
  { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } },
];

export const EventsProvider = (props: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventInfo[]>(
    locations.map((location) => ({
      ...location,
      id: location.key,
      category: "Soccer",
      name: "My name",
    })),
  );

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  return useContext(EventsContext);
};

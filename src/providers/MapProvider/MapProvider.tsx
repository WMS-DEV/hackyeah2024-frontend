import { ReactNode, createContext, useContext, useState } from "react";
import { EventInfo } from "../EventsProvider/EventsProvider";

export interface Location {
  lat: number;
  lng: number;
}

export interface LocationClickListener {
  listener: (arg: Location) => void;
  key: string;
}

export interface EventClickListener {
  listener: (arg: EventInfo) => void;
  key: string;
}

export interface MapContext {
  addLocationClickListener: (listener: LocationClickListener) => void;
  addEventClickListener: (listener: EventClickListener) => void;
  removeLocationClickListener: (key: string) => void;
  removeEventClickListener: (key: string) => void;
  locationClickListeners: Array<LocationClickListener>;
  eventClickListeners: Array<EventClickListener>;
  selectedEvent: EventInfo | null;
  setSelectedEvent: (event: EventInfo) => void;
}

export const MapContext = createContext<MapContext>({
  addLocationClickListener: () => {},
  addEventClickListener: () => {},
  locationClickListeners: [],
  eventClickListeners: [],
  removeEventClickListener: () => {},
  removeLocationClickListener: () => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
});

export const MapProvider = (props: { children: ReactNode }) => {
  const [eventClickListeners, setEventClickListeners] = useState<
    Array<EventClickListener>
  >([]);

  const [locationClickListeners, setLocationClickListeners] = useState<
    Array<LocationClickListener>
  >([]);

  const [selectedEvent, setSelectedEvent] = useState<EventInfo | null>(null);

  const addEventClickListener = (listener: EventClickListener) => {
    setEventClickListeners((listeners) => [...listeners, listener]);
  };

  const addLocationClickListener = (listener: LocationClickListener) => {
    setLocationClickListeners((listeners) => [...listeners, listener]);
  };

  const removeLocationClickListener = (key: string) => {
    setLocationClickListeners((listeners) =>
      listeners.filter(({ key: currKey }) => currKey != key),
    );
  };

  const removeEventClickListener = (key: string) => {
    setEventClickListeners((listeners) =>
      listeners.filter(({ key: currKey }) => currKey != key),
    );
  };

  return (
    <MapContext.Provider
      value={{
        addEventClickListener,
        addLocationClickListener,
        locationClickListeners,
        eventClickListeners,
        removeLocationClickListener,
        removeEventClickListener,
        selectedEvent,
        setSelectedEvent,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  return useContext(MapContext);
};

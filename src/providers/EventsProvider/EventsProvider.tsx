import { ReactNode, createContext, useContext, useState } from "react";
import { Location } from "../MapProvider/MapProvider";

export type EventCategory =
  | "Soccer"
  | "Basketball"
  | "Volleyball"
  | "Baseball"
  | "Football"
  | "Tennis"
  | "Golf"
  | "Gym"
  | "Draft";

export interface EventInfo {
  id: number;
  location: {
    lng: number;
    lat: number;
  };
  name: string;
  category: EventCategory;
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
  participants: Array<{
    id: number;
    name: string;
    email: string;
  }>;
  description: string;
  startTime: number;
  endTime: number;
  cyclic: string;
  maxNumberOfParticipants: number;
  invitedEmails: Array<string>;
  isPublic: boolean;
  requiredExperience: string;
  age: string;
  longitude: number;
  latitude: number;
  calories: number;
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
  removeDrafts: () => void;
}

export const EventsContext = createContext<EventsContext>({
  events: [],
  setEvents: () => {},
  removeDrafts: () => {},
});

export const EventsProvider = (props: {
  children: ReactNode;
  initialEvents: EventInfo[];
}) => {
  const [events, setEvents] = useState<EventInfo[]>(props.initialEvents);

  const removeDrafts = () => {
    setEvents((events) => events.filter((event) => event.category != "Draft"));
  };
  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        removeDrafts,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  return useContext(EventsContext);
};

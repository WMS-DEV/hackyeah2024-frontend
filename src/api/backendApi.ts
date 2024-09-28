import axios from "axios";

export const backendAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

export interface EventData {
    name: string;
    categoryId: int;
    creatorId: int;
    description: string;
    startTimestamp: number;
    endTimestamp: number;
    cyclic: string;
    maxNumberOfParticipants: number;
    invitedEmails: Array<string>;
    isPublic: boolean;
    requieredExperience: string;
    age: string;
    longitude: number;
    latitude: number;
}

export const createEvent = async (eventData: EventData) => {
    const response = await backendAxios.post("/events", JSON.stringify(eventData));
    return response.data;
}
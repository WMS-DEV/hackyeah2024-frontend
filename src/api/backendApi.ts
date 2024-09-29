import axios from "axios";

const BACKEND_URL = "https://hackyeah2024-backend.wmsdev.pl";

export const backendAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserId = () => {
  return 1;
};

export interface EventData {
  name: string;
  categoryId: number;
  creatorId: number;
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
}

export const createEvent = async (eventData: EventData) => {
  eventData.categoryId = Number(eventData.categoryId);
  const response = await backendAxios.post(
    "/api/v1/events",
    JSON.stringify(eventData),
  );
  return response.data;
};

interface Category {
  id: number;
  name: string;
}

export const getCategoryList = async () => {
  const response = await backendAxios.get("/api/v1/categories");
  return response.data as Array<Category>;
};

export interface GetEventsResponse {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
  description: string;
  startTime: number;
  endTime: number;
  cyclic: string;
  participants: Array<{
    id: number;
    name: string;
    email: string;
  }>;
  maxNumberOfParticipants: number;
  invitedEmails: Array<string>;
  isPublic: boolean;
  requiredExperience: string;
  age: string;
  longitude: number;
  latitude: number;
  calories: number;
}

export const getEvents = async () => {
  const response = await backendAxios.get("/api/v1/events");
  return response.data as Array<GetEventsResponse>;
};

export const joinEvent = async (participantId: number, eventId: number) => {
  await backendAxios.post(`/api/v1/events/${eventId}/join`, {
    participantId,
  });
};

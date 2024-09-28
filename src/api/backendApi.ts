import axios from "axios";

export const backendAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

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
    const response = await backendAxios.post("/api/v1/events", JSON.stringify(eventData));
    return response.data;
}

interface Category {
    id: number;
    name: string;
}

export const getCategoryList = async () => {
    const response = await backendAxios.get("/api/v1/categories");
    return response.data as Array<Category>;
};

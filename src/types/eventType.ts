export type EventProps = {
    id: number;
    name: string;
    createdBy: {
        id: number;
        name: string;
        email: string;
    };
    category: {
        id: number;
        name: string;
    };
    description: string;
    startTime: number;
    endTime: number;
    latitude: number;
    longitude: number;
    cyclic: string;
    maxNumberOfParticipants: number;
    participants: {
        id: number;
        name: string;
        email: string;
    }[];
    isPublic: boolean;
    requiredExperience: string;
    age: string;
    calories: number;
};

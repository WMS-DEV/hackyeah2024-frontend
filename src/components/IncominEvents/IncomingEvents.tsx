import axios from 'axios';
import { useEffect, useState } from 'react';
import EventCard from '../EventCard/EventCard';
import { EventProps } from '../../types/eventType';
import './IncomingEvents.style.scss';
import Loader from '../Loader/Loader';

const eventAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const IncomingEvents = () => {
    const [events, setEvents] = useState<EventProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await eventAxios.get('/api/v1/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="events">
            <div className="events__wraper">
                <div className="events__header">
                    <h2 className="events__header--title">Incoming Events</h2>
                    <div className="events__header--style" />
                </div>
                <div className="events__content">
                    {events.length === 0 ? (
                        <p>No events found</p>
                    ) : (
                        events.map((event) => <EventCard key={event.id} {...event} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default IncomingEvents;

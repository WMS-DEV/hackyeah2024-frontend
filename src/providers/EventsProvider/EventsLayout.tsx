import { useLoaderData, useOutlet } from 'react-router-dom';
import { EventInfo, EventsProvider } from './EventsProvider';
import { Await } from 'react-router-dom';
import { Suspense } from 'react';
import Map from '../../components/Map/Map';
import Slider from '../../components/Slider/Slider';
import { MapProvider } from '../MapProvider/MapProvider';
import { Location } from '../MapProvider/MapProvider';
import Logo from '../../components/Logo/Logo';
import '../../components/Spinner/Spinner';
import Spinner from '../../components/Spinner/Spinner';

export const EventsLayout = () => {
    const outlet = useOutlet();
    const { geolocation, events } = useLoaderData() as {
        geolocation: Location;
        events: EventInfo[];
    };

    return (
        <Suspense fallback={<Spinner />}>
            <Await
                resolve={Promise.all([
                    geolocation,
                    events,
                ])}
                children={([geolocation, events]) => {
                    return (
                        <EventsProvider initialEvents={events}>
                            <MapProvider>
                                <Logo />
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

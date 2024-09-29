import { useLoaderData, useOutlet } from 'react-router-dom';
import { EventsProvider } from './EventsProvider';
import { Await } from 'react-router-dom';
import { Suspense } from 'react';
import Map from '../../components/Map/Map';
import Slider from '../../components/Slider/Slider';
import { MapProvider } from '../MapProvider/MapProvider';
import { Location } from '../MapProvider/MapProvider';

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
                            <MapProvider>
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

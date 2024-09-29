import './CreateEvent.scss';
import { useState, useEffect } from "react";
import { Location, useMap } from "../../providers/MapProvider/MapProvider";
import CreateEventForm from "../../components/CreateEventForm/CreateEventForm";

type LatLng = {
    lat: number;
    lng: number;
};

const App = () => {
    const {
        addLocationClickListener,
    } = useMap();

    const [location, setLocation] = useState<LatLng | null>(null);

    useEffect(() => {
        const handleLocationClick = (location: Location) => {
            setLocation(location);
        };

        addLocationClickListener({
            key: "listenForUpdates",
            listener: handleLocationClick,
        });
    }, []);

    if (!location) {
        return (
            <div className='waiting-text'>
                Pick a location on the map to create an event
            </div>
        );
    }

    return <CreateEventForm location={location} />;

};

export default App;

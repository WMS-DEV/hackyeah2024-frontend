import { useEffect } from "react";
import { Location, useMap } from "../../providers/MapProvider/MapProvider";
import "./Config.scss";
import { EventInfo } from "../../providers/EventsProvider/EventsProvider";

const App = () => {
  const {
    addEventClickListener,
    addLocationClickListener,
    removeEventClickListener,
    removeLocationClickListener,
  } = useMap();

  useEffect(() => {
    const logLocation = (location: Location) => {
      console.log(location);
    };

    const logEvent = (event: EventInfo) => {
      console.log("Events");
      console.log(event);
    };

    addLocationClickListener({
      key: "listenForUpdates",
      listener: logLocation,
    });

    addEventClickListener({
      key: "listenForEvents",
      listener: logEvent,
    });

    return () => {
      removeLocationClickListener("listenForUpdates");
      removeEventClickListener("listenForEvents");
    };
  }, []);

  return <div>hello</div>;
};

export default App;

import { useEffect, useState } from "react";
import { useMap } from "../../providers/MapProvider/MapProvider";
import { EventInfo } from "../../providers/EventsProvider/EventsProvider";
import { useSlider } from "../../providers/SliderProvider/SliderProvider";

const Home = () => {
  const { addEventClickListener } = useMap();

  const [event, setEvent] = useState<EventInfo | null>(null);

  const { setVisibility } = useSlider();

  useEffect(() => {
    const handleSelectedEvent = (event: EventInfo) => {
      setEvent(event);
      setVisibility(true);
    };

    addEventClickListener({
      key: "homeEventListener",
      listener: handleSelectedEvent,
    });
  }, []);

  return (
    <div>
      <div>Home</div>
      {event?.name}
    </div>
  );
};

export default Home;

import { useOutlet } from "react-router-dom";
import { SliderProvider } from "./SliderProvider";

export const SliderLayout = () => {
  const outlet = useOutlet();

  return <SliderProvider>{outlet}</SliderProvider>;
};

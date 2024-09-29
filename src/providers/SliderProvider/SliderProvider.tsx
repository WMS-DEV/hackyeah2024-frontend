import { ReactNode, createContext, useContext, useState } from "react";

export interface SliderContext {
  isVisible: boolean;
  setVisibility: (arg: boolean) => void;
}

export const SliderContext = createContext<SliderContext>({
  isVisible: false,
  setVisibility: () => {},
});

export const SliderProvider = (props: { children: ReactNode }) => {
  const [isVisible, setVisibility] = useState(false);

  return (
    <SliderContext.Provider
      value={{
        isVisible,
        setVisibility,
      }}
    >
      {props.children}
    </SliderContext.Provider>
  );
};

export const useSlider = () => {
  return useContext(SliderContext);
};

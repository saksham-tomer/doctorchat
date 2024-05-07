import React, { useState, createContext, useContext } from "react";

const SliderContext = createContext(false);
function SliderProvider({ children }) {
  const [sliderVisible, setSliderVisible] = useState(false);

  const toggleSlider = () => {
    setSliderVisible((prevState) => !prevState);
  };

  return (
    <SliderContext.Provider value={{ sliderVisible, toggleSlider }}>
      {children}
    </SliderContext.Provider>
  );
}

export const useSlider = () => useContext(SliderContext);
export default SliderProvider;

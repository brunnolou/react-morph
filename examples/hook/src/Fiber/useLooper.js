import { Spring } from "wobble";
import { useState } from "react";

const useTimeLoop = (time = 0, options = {}) => {
  const [t, setT] = useState(time);
  const [velocity, setVelocity] = useState(time);

  const spring = new Spring({
    fromValue: t,
    initialVelocity: velocity,
    toValue: 1,
    ...options.spring
  });

  spring.onUpdate(s => {
    setT(s.currentValue);
    setVelocity(s.currentVelocity);
  });

  return [time, setTime];
};


export default useTimeLoop;

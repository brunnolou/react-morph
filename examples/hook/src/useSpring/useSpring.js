import { useEffect, useState } from "react";
import { Spring } from "wobble";

const noop = x => x;
const defaultInitValue = {
  currentValue: null,
  currentVelocity: null,
  isAtRest: true,
  isAnimating: false
};

const useWobble = ({
  fromValue = 0,
  toValue = 1,
  initialVelocity,
  onStart = noop,
  onUpdate = noop,
  onStop = noop,
  ...options
} = {}) => {
  const spring = new Spring({
    fromValue,
    toValue,
    initialVelocity,
    ...options
  });
  const [value, setValue] = useState(defaultInitValue);

  useEffect(() => {
    return () => spring.removeAllListeners();
  }, []);

  spring
    .onStart(onStart)
    .onUpdate(s => {
      setValue(s);
      onUpdate(s);
    })
    .onStop(s => {
      onStop(s);
    });

  useEffect(() => spring.start(), [(fromValue, initialVelocity, toValue)]);

  return value;
};

export default useWobble;

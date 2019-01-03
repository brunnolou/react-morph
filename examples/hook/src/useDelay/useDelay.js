import { useRef, useState, useEffect } from "react";
import arrayDiff from "./arrayDiff";
import getItems from "./getItems";
import useWobble from "../useSpring/useSpring";
import usePrevious from "../usePrevious";

const defaultOptions = {
  key: x => x,
  spring: {
    damping: 26,
    mass: 1,
    stiffness: 120
  }
};

const STATES = {
  "0": "entered",
  "-1": "exiting",
  "1": "entering"
};

const getState = value => {
  return STATES[String(value)];
};

const isEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

const useAnimatedList = (nextList, options = {}) => {
  const { key } = { ...defaultOptions, ...options };
  const [dList, setList] = useState(getItems(nextList));

  const prevList = usePrevious(nextList) || nextList;
  const [springToValue, setSpringToValue] = useState(0);
  const [state, setState] = useState("STARTED");

  const prevKeys = prevList.map(key);
  const nextKeys = nextList.map(key);

  const setDiffList = () => {
    if (isEqual(nextKeys, prevKeys)) return;

    // Only diff one per change.
    const diff = arrayDiff(prevKeys, nextKeys);
    const dList = diff.map(({ key, index, value }) => {
      return {
        key,
        item: value >= 0 ? nextList[index] : prevList[index],
        in: value >= 0,
        t: 1,
        index,
        state: getState(value)
      };
    });

    setList(dList);
    setState("ANIMATING");
  };

  // On next key change.
  useEffect(() => {
    switch (state) {
      case "STARTED":
        setDiffList();

        break;

      case "ANIMATING":
        setSpringToValue(1);
        break;

      case "STOPPED":
        // Set list final value.
        setList(getItems(nextList));
        setState("STARTED");
        break;

      default:
        break;
    }
  }, nextKeys.concat(state));

  const onStop = () => {
    setState("STOPPED");
    setSpringToValue(0);
  };

  const spring = useWobble({
    toValue: springToValue,
    onStop,
    ...options.spring
  });

  // Animate
  useEffect(
    () => {
      if (state !== "ANIMATING") return;

      setList(
        dList.map(({ state, ...rest }) => {
          if (state === "entered") return { state, ...rest };

          return {
            ...rest,
            state,
            t:
              state === "entering"
                ? spring.currentValue
                : 1 - spring.currentValue
          };
        })
      );
    },
    [spring.currentValue]
  );

  return [dList, state];
};

export default useAnimatedList;

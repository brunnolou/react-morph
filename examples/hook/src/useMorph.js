import { useRef, useReducer } from "react";

import morphTransition from "./morphTransition";
import { getRect } from "./utils";

const defaultsOptions = {
  portalElement: document.body,
  getMargins: true,
  type: "morph",
  spring: {
    damping: 26,
    mass: 1,
    stiffness: 170
  }
};

const initialState = { count: 0 };

function reducer(state, { type, id, value }) {
  switch (type) {
    case "SET":
      return { [id]: value };
    default:
      return state;
  }
}

export default function useMorph(opts = defaultsOptions) {
  const options = { ...defaultsOptions, ...opts };

  const [state, dispatch] = useReducer(reducer, initialState);
  const setRefs = (id, ...refs) => dispatch({ type: "SET", ...refs });

  const prevToRef = useRef();
  const preFromRect = useRef();
  const prevSpring = useRef();

  let isAnimating = false;
  let cleanup;

  const animate = ({ from, to, rectFrom, rectTo }) => {
    if (!to) {
      console.warn("Morph created without any mounted element!");
      return;
    }

    to.style.visibility = "visible";

    if (!from) return;
    // if (isAnimating) return;
    isAnimating = true;

    switch (options.type) {
      case "fade":
      case "morph":
      default:
        cleanup = morphTransition({
          from,
          to,
          rectFrom,
          rectTo,
          fromValue:
            prevSpring.current !== undefined &&
            prevSpring.current.currentValue !== 1
              ? 1 - prevSpring.current.currentValue
              : 0,
          initialVelocity:
            prevSpring.current !== undefined &&
            prevSpring.current.currentVelocity !== 0
              ? prevSpring.current.currentVelocity * -1
              : 0,
          onUpdate(s) {
            prevSpring.current = s;
          },
          options
        });
    }

    return () => {
      if (isAnimating) cleanup();
    };
  };

  const getRef = instance => node => {
    if (!node) {
      // Cleanup maybe.
      if (cleanup) cleanup();
      return;
    }
    const to = node;
    const from = prevToRef.current;

    const rectFrom = preFromRect.current;
    const rectTo = getRect(to, { getMargins: options.getMargins });

    animate({ from, rectFrom, to, rectTo });

    prevToRef.current = to;
    preFromRect.current = rectTo;
  };

  const props = instance => ({
    ref: getRef(instance),
    style: { visibility: "hidden" },
    "data-rm": true,
    ...(options.onClick ? { onClick: options.onClick } : {})
  });

  return props;
}

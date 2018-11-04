import { useRef, useEffect } from "react";

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

// const STATES_MAXINE = {
//   initialState: "INIT",
//   states: {
//     // Hide to
//     // Save previous
//     INIT: "GET_RECTS"
//   }
// };

export default function useMorph(opts = defaultsOptions) {
  const options = { ...defaultsOptions, ...opts };
  const ref = useRef();
  let to = ref.current;

  const prevToRef = useRef();
  const from = prevToRef.current;

  const rectFrom = from && getRect(from, { getMargins: options.getMargins });

  let isAnimating = false;
  const prevSpring = useRef();

  useEffect(() => {
    prevToRef.current = to;
	});

  useEffect(() => {
    if (!to) {
      console.warn("Morph created without any mounted element!");
      return;
    }

    to.style.visibility = "visible";

    if (!from) return;
    if (isAnimating) return;
    isAnimating = true;

    const rectTo = getRect(to, { getMargins: options.getMargins });
    let cleanup;

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
            prevSpring.current && prevSpring.current.currentVelocity,
          onUpdate(s) {
            prevSpring.current = s;
          },
          options
        });
    }

    return () => {
      if (isAnimating) cleanup();
    };
  });

  const getRef = node => {
    console.log("node: ", node);

    if (!node) return;
    to = node;
  };

  const props = (p = {}) => ({
    ...p,
    ref: getRef,
    style: { visibility: "hidden" },
    "data-rm": true,
    ...(options.onClick ? { onClick: options.onClick } : {})
  });

  return props;
}

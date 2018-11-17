import { useRef, useCallback, useReducer } from "react";

import morphTransition from "./morphTransition";
import { getRect } from "./utils";

const defaultsOptions = {
  portalElement: document.body,
  getMargins: false,
  type: "morph",
  spring: {
    damping: 26,
    mass: 1,
    stiffness: 170
  }
};

const initialState = {};

function reducer(state, { type, id, value }) {
  switch (type) {
    case "SET":
      return { ...state, [id]: { ...(state[id] || {}), ...value } };
    case "RESET_OTHERS":
      return { [id]: state[id] };
    default:
      return state;
  }
}

export default function useMorph(opts = defaultsOptions) {
  const options = { ...defaultsOptions, ...opts };

  const [refs, dispatch] = useReducer(reducer, initialState);
  const setRefs = (id, value) => dispatch({ type: "SET", id, value });

  // const prevToRef = useRef();
  // const preFromRect = useRef();

  let isAnimating = false;
  let cleanup;

  const animate = ({ id, from, to, rectFrom, rectTo }) => {
    if (!to) {
      console.warn("Morph created without any mounted element!");
      return;
    }

    to.style.visibility = "visible";

    if (!from) return;
    // if (isAnimating) return;
    isAnimating = true;

    const { prevSpring } = refs[id] || {};

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
            prevSpring !== undefined && prevSpring.currentValue !== 1
              ? 1 - prevSpring.currentValue
              : 0,
          initialVelocity:
            prevSpring !== undefined && prevSpring.currentVelocity !== 0
              ? prevSpring.currentVelocity * -1
              : 0,
          onUpdate(s) {
            setRefs(id, { prevSpring: s });
          },
          options
        });

        setRefs(id, { cleanupFrom: cleanup });
    }

    return () => {
      if (isAnimating) cleanup();
    };
  };

  const getRef = (id = "__MORPH__") => {
    return useCallback(node => {
      const { cleanupFrom } = refs[id] || {};
      const willAnimate = !!node && !!refs[id];
      console.log("id: ", id, !!node);

      if (cleanupFrom) cleanupFrom();
      if (!node) {
        if (cleanup) cleanup();
        if (!willAnimate) dispatch({ type: "RESET_OTHERS", id });
        return;
      }

      const { from, rectFrom } = refs[id] || {};
      const to = node;

      const rectTo = getRect(to, { getMargins: options.getMargins });

      animate({ id, from, rectFrom, to, rectTo });

      const morphElement = {
        from: to,
        rectFrom: rectTo,
        cleanupFrom: cleanup
      };

      setRefs(id, morphElement);
    }, []);
  };

  const props = id => ({
    ref: getRef(id),
    style: { visibility: "hidden" },
    "data-rm": id,
    ...(options.onClick ? { onClick: options.onClick } : {})
  });

  return props;
}

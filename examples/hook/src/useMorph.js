import {
  useRef,
  useCallback,
  useState,
  // useReducer
  // useLayoutEffect,
  useEffect
} from "react";

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

// const initialState = {};

// function reducer(state, { type, id, value }) {
//   switch (type) {
//     case "SET":
//       return { ...state, [id]: { ...(state[id] || {}), ...value } };
//     case "RESET_OTHERS":
//       return { [id]: state[id] };
//     default:
//       return state;
//   }
// }

export default function useMorph(opts = defaultsOptions) {
  const options = { ...defaultsOptions, ...opts };

  // const [refs, dispatch] = useReducer(reducer, initialState);
  // const setRefs = (id, value) => dispatch({ type: "SET", id, value });

  const prevToRef = useRef();
  const prevToRectRef = useRef();
  const prevSpringRef = useRef();
  const cleanupFromRef = useRef();

  let isAnimating = false;
  let cleanup;

  useEffect(() => {
		console.log('prevToRef.current: ', prevToRef.current);

		if(!prevToRef.current) return;

    function resize() {
      prevToRectRef.current = getRect(prevToRef.current, {
				getMargins: options.getMargins
      });
    }

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const animate = ({ from, to, rectFrom, rectTo, willBack }) => {
    if (!to) {
      console.warn("Morph created without any mounted element!");
      return;
    }

    to.style.visibility = "visible";
    // console.log('to: ', to.innerText);

    if (!from) return;
    // if (isAnimating) return;
    isAnimating = true;

    const prevSpring = prevSpringRef.current;

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
            prevSpringRef.current = s;
          },
          willBack,
          options
        });

        cleanupFromRef.current = cleanup;
      // setRefs(id, { cleanupFrom: cleanup });
    }

    return () => {
      if (isAnimating) cleanup();
    };
  };

  const getRef = useCallback((to, willBack, isBackwards) => {
    const from = prevToRef.current;
    const cleanupFrom = cleanupFromRef.current;
    // const willAnimate = !!to && !!from;

    if (cleanupFrom) cleanupFrom();
    if (!to) {
      if (cleanup) cleanup();
      // if (!willAnimate) dispatch({ type: "RESET_OTHERS", id });
      return;
    }

    const rectFrom = prevToRectRef.current;

    const rectTo = getRect(to, { getMargins: options.getMargins });

    if (isBackwards) {
      animate({ from: to, rectFrom: rectTo, to: from, rectTo: rectFrom });
    } else {
      animate({ from, rectFrom, to, rectTo, willBack });
    }

    if (!willBack) {
      prevToRef.current = to;
      prevToRectRef.current = rectTo;
    }

    // const morphElement = {
    //   from: to,
    //   rectFrom: rectTo,
    //   cleanupFrom: cleanup
    // };

    // setRefs(id, morphElement);
  }, []);

  // const ref = useRef();
  // const idRef = useRef();
  // const cache = {};

  // useLayoutEffect(() => {
  //   const to = ref.current;
  //   console.log("to: ", cache);
  // }, []);

  const props = {
    ref: getRef,
    style: { visibility: "hidden" }
    // "data-rm": id,
    // ...(options.onClick ? { onClick: options.onClick } : {})
  };

  return props;
}

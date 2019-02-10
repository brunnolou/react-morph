import { useRef, useCallback, useEffect } from "react";

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

export default function useMorph(opts = defaultsOptions) {
  const options = { ...defaultsOptions, ...opts };
  const { getMargins } = options;

  const prevToRef = useRef();
  const prevToRectRef = useRef();
  const prevSpringRef = useRef();
  const cleanupFromRef = useRef();

  let isAnimating = false;
  let cleanup;

  useEffect(() => {
    if (!prevToRef.current) return;

    function resize() {
      prevToRectRef.current = getRect(prevToRef.current, { getMargins });
    }

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const animate = ({ from, to, rectFrom, rectTo, willBack }) => {
    if (!to) return;

    to.style.visibility = "visible";

    if (!from) return;

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
    }

    return () => {
      if (isAnimating) cleanup();
    };
  };

  const getRef = useCallback((to, willBack, isBackwards) => {
    const from = prevToRef.current;
    const cleanupFrom = cleanupFromRef.current;

    const willUnmount = !to;
    const willAnimate = !!to && !!from;

    console.log(
      !!to ? "|" + to.innerHTML + "|" : "",
      "prev:",
      !!from,
      " next:",
      !!to,
      " willUnmount:",
      willUnmount,
      " willAnimate:",
      willAnimate
    );

    if (cleanupFrom) {
      console.log("cleanupFrom: ", !!cleanupFrom);
      cleanupFrom();
    }

    if (willUnmount) {
      if (cleanup) {
        console.log("cleanup: ", !!cleanup);
        cleanup();
      }
      return;
    }

    const rectFrom = prevToRectRef.current;

    const rectTo = getRect(to, { getMargins });

    if (isBackwards) {
      animate({ from: to, rectFrom: rectTo, to: from, rectTo: rectFrom });
    } else {
      animate({ from, rectFrom, to, rectTo, willBack });
    }

    if (!willBack) {
      prevToRef.current = to;
      prevToRectRef.current = rectTo;
    }
  }, []);

  const props = {
    ref: getRef,
    style: { visibility: "hidden" }
  };

  return props;
}

import { useRef, useCallback, useEffect, useLayoutEffect } from "react";

import morphTransition from "./morphTransition";
import { getRect } from "./utils";

const defaultsOptions = {
  keepFrom: false,
  type: "morph",
  getMargins: false,
  portalElement: document.body,
  spring: {
    damping: 26,
    mass: 1,
    stiffness: 170
  }
};

export default function useMorph(opts = defaultsOptions) {
  const options = { ...defaultsOptions, ...opts };
  const {
    getMargins,
    keepFrom,
    spring: { damping, mass, stiffness }
  } = options;

  const backAnimationRef = useRef();
  const prevToRef = useRef();
  const prevToRectRef = useRef();
  const prevSpringRef = useRef();
  const cleanupFromRef = useRef();

  let isAnimating = false;
  let cleanup;

  // Window on resize effect.
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

  const getRef = useCallback(
    to => {
      const from = prevToRef.current;
      const cleanupFrom = cleanupFromRef.current;

      if (from === to) return;

      const willUnmount = !to;
      const willAnimate = !!to && !!from;

      const willBack = keepFrom && willAnimate;
      const isBackwards = keepFrom && willUnmount && !!from;

      if (cleanupFrom) cleanupFrom();

      if (isBackwards) {
        animate(backAnimationRef.current);

        return;
      }

      if (willUnmount) {
        if (cleanup) cleanup();
        return;
      }

      const rectFrom = prevToRectRef.current;
      const rectTo = getRect(to, { getMargins });

      animate({ from, rectFrom, to, rectTo, willBack });

      backAnimationRef.current = {
        from: to,
        rectFrom: rectTo,
        to: from,
        rectTo: rectFrom
      };

      if (!willBack) {
				console.log('willBack: ', willBack);
        prevToRef.current = to;
        prevToRectRef.current = rectTo;
      }
    },
    [keepFrom, damping, mass, stiffness]
  );

  const props = {
    ref: getRef,
    style: { visibility: "hidden", willChange: 'transform; opacity' }
  };

  return props;
}

import { useRef, useCallback, useEffect } from 'react';

import morphTransition from './morphTransition';
import { getRect } from './util';
import { MorphOptions } from './types';
import { Spring } from 'wobble';
import { linear } from '@popmotion/easing';

type AnimateObject = {
  from: HTMLElement;
  to: HTMLElement;
  rectFrom: CSSStyleDeclaration;
  rectTo: CSSStyleDeclaration;
  willBack?: boolean;
};

const defaultsOptions = {
  keepFrom: false,
  type: 'morph',
  getMargins: false,
  portalElement: document.body,
  spring: {
    damping: 26,
    mass: 1,
    stiffness: 180,
  },
	easings: linear,
	isReversed: false,
};

export default function useMorph(opts: MorphOptions = defaultsOptions) {
  const options = { ...defaultsOptions, ...opts };
  const {
    getMargins,
    keepFrom,
    spring: { damping, mass, stiffness },
    isReversed,
  } = options;

  const backAnimationRef = useRef() as React.MutableRefObject<AnimateObject>;
  const prevToRef = useRef() as React.MutableRefObject<HTMLElement>;
  const prevToRectRef = useRef() as React.MutableRefObject<CSSStyleDeclaration>;
  const prevSpringRef = useRef() as React.MutableRefObject<Spring>;
  const cleanupFromRef = useRef() as React.MutableRefObject<() => void>;

  let isAnimating = false;
  let cleanup: () => void;

  // Window on resize effect.
  useEffect(() => {
    if (!prevToRef.current) return;

    function resize() {
      if (!prevToRef.current) return;
      // @ts-ignore: Unreachable code error
      prevToRectRef.current = getRect(prevToRef.current, { getMargins });
    }

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  const animate = ({ from, to, rectFrom, rectTo, willBack }: AnimateObject) => {
    if (!to) return;

    to.style.visibility = 'visible';

    if (!from) return;

    isAnimating = true;

    const prevSpring = prevSpringRef.current;

    switch (options.type) {
      case 'fade':
      case 'morph':
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
          options,
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

      animate({
        from,
        rectFrom,
        to,
        rectTo,
        willBack,
      });

      backAnimationRef.current = {
        from: to,
        rectFrom: rectTo,
        to: from,
        rectTo: rectFrom,
      };

      if (!willBack) {
        prevToRef.current = to;
        prevToRectRef.current = rectTo;
      }
    },
    [keepFrom, damping, mass, stiffness, isReversed],
  );

  const style: React.CSSProperties = { visibility: 'hidden' };

  const props = {
    ref: getRef,
    style,
  };

  const propsFn = ({ style = {}, ...extra } = {}) => {
    return { ...props, style: { ...props.style, ...style } };
  };

  propsFn.ref = getRef;
  propsFn.style = style;

  return propsFn;
}

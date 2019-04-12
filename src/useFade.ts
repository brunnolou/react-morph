import { useRef, useCallback, useEffect } from 'react';
import { Spring } from 'wobble';

import { getRect, cloneElement, applyOverlayStyle } from './util';
import { FadeOptions } from './types';
import { linear, easeOut, easeInOut } from '@popmotion/easing';
import { clamp, interpolate } from '@popmotion/popcorn';

const globalAny: any = global;

const defaultsOptions = {
  keepFrom: false,
  type: 'morph',
  getMargins: false,
  portalElement: globalAny.document && globalAny.document.body,
  spring: {
    damping: 26,
    mass: 1,
    stiffness: 180,
    overshootClamping: true,
  },
  easings: linear,
  delaysRatio: 0.1,
  isInitial: false,
};

export default function useFade(opts: FadeOptions = defaultsOptions) {
  const options = { ...defaultsOptions, ...opts };
  const { getMargins, isInitial, delaysRatio } = options;

  const prevNodeRef = useRef() as React.MutableRefObject<HTMLElement>;
  const cloneContainerRef = useRef() as React.MutableRefObject<HTMLElement>;
  const isMountedRef = useRef() as React.MutableRefObject<boolean>;

  const cleanup = () => {
    if (!cloneContainerRef.current) return;
    prevNodeRef.current.style.visibility = null;
    options.portalElement.removeChild(cloneContainerRef.current);
    cloneContainerRef.current = null;
  };

  const halfClampEnd = clamp(1 - delaysRatio, 1);
  const easeFast = (x: number) =>
    easeInOut(
      Number(interpolate([1 - delaysRatio, 1], [0, 1])(halfClampEnd(x))),
    );

  const spring = new Spring({
    fromValue: Number(isInitial),
    toValue: Number(!isInitial),
    ...options.spring,
  });

  spring
    .onUpdate(s => {
			if (!cloneContainerRef.current) return;

      cloneContainerRef.current.style.opacity = String(
        easeFast(s.currentValue),
      );
    })
    .onStop(cleanup);

  const getRef = useCallback(n => {
    const node = n || prevNodeRef.current;
    const hasNode = !!node;

    if (hasNode && isMountedRef.current) {
      node.style.visibility = 'visible';
      const rect = getRect(node, { getMargins });

      if (!cloneContainerRef.current)
        cloneContainerRef.current = cloneElement(node, options);

      node.style.visibility = 'hidden';

      prevNodeRef.current = node;

      applyOverlayStyle(cloneContainerRef.current, {
        ...rect,
        // border: '2px solid red',
      });
    }

    const toValue = Number(!!n);

    if (spring.currentValue === toValue) cleanup();

    spring.updateConfig({ toValue }).start();
  }, []);

  isMountedRef.current = true;

  const style: React.CSSProperties = { visibility: 'hidden' };

  const props = {
    ref: getRef,
    style,
  };

  const propsFn = ({ style = {}, ...extra } = {}) => ({
    ...props,
    style: { ...props.style, ...style },
  });

  propsFn.ref = getRef;
  propsFn.style = style;

  return propsFn;
}

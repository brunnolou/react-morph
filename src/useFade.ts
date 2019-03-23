import { useRef, useCallback, useEffect } from 'react';

import morphTransition from './morphTransition';
import { getRect, cloneElement, applyOverlayStyle } from './util';
import { MorphOptions } from './types';
import { Spring } from 'wobble';
import { linear } from '@popmotion/easing';

const defaultsOptions = {
  keepFrom: false,
  type: 'morph',
  getMargins: false,
  portalElement: document.body,
  spring: {
    damping: 26,
    mass: 1,
    stiffness: 180,
    overshootClamping: true,
  },
  easings: linear,
  isInitial: false,
};

export default function useFade(opts: MorphOptions = defaultsOptions) {
  const options = { ...defaultsOptions, ...opts };
  const { getMargins, isInitial } = options;

  const prevNodeRef = useRef() as React.MutableRefObject<HTMLElement>;
  const cloneContainerRef = useRef() as React.MutableRefObject<HTMLElement>;
  const isMountedRef = useRef() as React.MutableRefObject<boolean>;


  const cleanup = () => {
    if (!cloneContainerRef.current) return;
    prevNodeRef.current.style.visibility = null;
    options.portalElement.removeChild(cloneContainerRef.current);
    cloneContainerRef.current = null;
  };

  const spring = new Spring({
    fromValue: Number(isInitial),
    toValue: Number(!isInitial),
    ...options.spring,
  });

  spring
    .onUpdate(s => {
      if (!cloneContainerRef.current) return;
      cloneContainerRef.current.style.opacity = String(s.currentValue);
    })
    .onStop(() => cleanup());

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

      applyOverlayStyle(cloneContainerRef.current, rect);
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
